import { Request, RequestHandler } from 'express'
import { nyx_chat_global } from '@prisma/client'
import { prisma } from 'db'
import { getConnectedUsers } from 'sockets'
import validator from 'validator'

const CHAT_ADMINS = ['Dea7h']

export const getChatGlobal: RequestHandler = async (_req: Request, res, next) => {
  try {
    const chats = await prisma.nyx_chat_global.findMany({
      select: {
        id: true,
        author: true,
        message: true,
        date: true,
      },
      orderBy: [{ date: 'asc' }],
      take: 100,
    })

    const groupedByDay = chats.reduce<Record<string, nyx_chat_global[]>>((prev, cur) => {
      const day = cur.date.toISOString().substring(0, 10)
      if (prev[day]) prev[day].push(cur)
      else prev[day] = [cur]
      return prev
    }, {})

    res.json(groupedByDay)
  } catch (error) {
    next(error)
  }
}

export const getChatDMs: RequestHandler = async (req: Request, res, next) => {
  try {
    const { character } = req.params
    if (typeof character !== 'string' || !validator.isLength(character, { min: 1, max: 10 }))
      return res.status(401).json({ error: 'This user no longer exists.' })

    const chats = await prisma.nyx_chat_dms.findMany({
      select: {
        id: true,
        author: true,
        message: true,
        date: true,
        receiver: true,
        seen: true,
      },
      where: {
        OR: [{ author: req.user!.main_character! }, { receiver: character }],
        AND: { OR: [{ author: character }, { receiver: req.user!.main_character! }] },
      },
      orderBy: [{ date: 'asc' }],
      take: 100,
    })

    res.json(chats)
  } catch (error) {
    next(error)
  }
}

interface Recent {
  name: string
  date: Date
  total_messages: number
  unseen: number
  class?: number | null
  is_online?: boolean
}

export const getChatRecents: RequestHandler = async (req: Request, res, next) => {
  try {
    const recentGroup = await prisma.nyx_chat_dms.groupBy({
      by: ['author', 'receiver'],
      _sum: {
        seen: true,
      },
      _max: {
        date: true,
      },
      _count: {
        _all: true,
      },
      orderBy: { _max: { date: 'desc' } },
      where: { OR: [{ receiver: req.user!.main_character! }, { author: req.user!.main_character! }] },
    })

    const recents = recentGroup.reduce<Recent[]>((prev, cur) => {
      const isAuthor = cur.author === req.user?.main_character
      const findInstanceIndex = prev.findIndex((r) => r.name === cur[isAuthor ? 'receiver' : 'author'])
      if (findInstanceIndex >= 0) {
        const find = prev[findInstanceIndex]
        prev[findInstanceIndex] = {
          ...find,
          total_messages: find.total_messages + cur._count._all,
          unseen: find.unseen + (isAuthor ? 0 : cur._count._all - (cur._sum.seen || 0)),
          date: find.date.getTime() > cur._max.date!.getTime() ? find.date : cur._max.date!,
        }

        return prev
      }

      prev.push({
        name: cur[isAuthor ? 'receiver' : 'author'],
        date: cur._max.date!,
        total_messages: cur._count._all,
        unseen: cur._count._all - (cur._sum.seen || 0),
      })

      return prev
    }, [])

    const connectedSockets = getConnectedUsers()

    const characters = await prisma.character.findMany({
      select: {
        Name: true,
        Class: true,
        AccountID: true,
      },
      where: {
        Name: {
          in: recents.map((r) => r.name).concat(CHAT_ADMINS),
        },
      },
    })

    const admins: Recent[] = CHAT_ADMINS.map((admin) => {
      const find = recents.find((r) => r.name === admin)
      const char = characters.find((c) => c.Name === admin)

      if (find) {
        find.class = char?.Class || null
        find.is_online = !!connectedSockets.find((s) => s.user.account === char?.AccountID)
      }

      return (
        find || {
          name: admin,
          date: new Date(),
          total_messages: 0,
          unseen: 0,
          class: char?.Class || null,
          is_online: !!connectedSockets.find((s) => s.user.account === char?.AccountID),
        }
      )
    })

    res.json({
      admins,
      list: recents
        .filter((r) => !CHAT_ADMINS.includes(r.name))
        .map((r) => {
          const char = characters.find((c) => c.Name === r.name)

          return {
            ...r,
            class: char?.Class || null,
            is_online: !!connectedSockets.find((s) => s.user.account === char?.AccountID),
          }
        }),
    })
  } catch (error) {
    next(error)
  }
}
