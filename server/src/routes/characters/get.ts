import { RequestHandler } from 'express'
import { prisma } from 'db'

export const getCharacterQuery = {
  select: {
    Name: true,
    Resets: true,
    cLevel: true,
    Class: true,
    Strength: true,
    Dexterity: true,
    Vitality: true,
    Energy: true,
    Leadership: true,
    LevelUpPoint: true,
    Inventory: true,
    Money: true,
    MapNumber: true,
    PkCount: true,
    CtlCode: true,
    ChatLimitTime: true,
    BanPost: true,
    IsMarried: true,
    MarryName: true,
    QuestInProgress: true,
    QuestNumber: true,
    QuestMonsters: true,
    SkyEventWins: true,
    IsVip: true,
    VipExpirationTime: true,
    member: {
      select: {
        G_Name: true,
        G_Status: true,
        guild: {
          select: {
            G_Mark: true,
            G_Score: true,
            G_Rival: true,
            G_Master: true,
            G_Union: true,
          },
        },
      },
    },
    memb_stat: {
      select: {
        ConnectStat: true,
        ConnectTM: true,
        DisConnectTM: true,
      },
    },
    account_character: {
      select: {
        GameIDC: true,
      },
    },
  },
}

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params

    if (!name?.length || name.length > 10) return res.status(404).json({ error: 'Character not found' })

    const character = await prisma.character.findFirst({
      ...getCharacterQuery,
      where: { Name: name },
    })

    if (!character) return res.status(404).json({ error: 'Character not found' })

    const { Strength, Dexterity, Vitality, Energy, Leadership, LevelUpPoint, ...char } = character

    if (char.member) {
      char.member = {
        ...char.member,
        guild: {
          ...char.member.guild,
          G_Mark: char.member.guild.G_Mark?.toString('hex') as any,
        },
      }
    }

    res.json({
      ...char,
      Inventory: char.Inventory?.toString('hex').substring(0, 240),
      total_stats: Strength! + Dexterity! + Vitality! + Energy! + Leadership! + LevelUpPoint!,
      is_online: char.account_character?.GameIDC === char.Name && char.memb_stat?.ConnectStat === 1,
    })
  } catch (error) {
    next(error)
  }
}

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const { top } = req.query
    const take = isNaN(Number(top)) || Number(top) < 1 ? undefined : Number(top)

    const characters = await prisma.character.findMany({
      ...getCharacterQuery,
      orderBy: [{ Resets: 'desc' }, { cLevel: 'desc' }, { Name: 'asc' }],
      take,
    })

    res.json(
      characters.map(({ Strength, Dexterity, Vitality, Energy, Leadership, LevelUpPoint, ...char }) => {
        if (char.member) {
          char.member = {
            ...char.member,
            guild: {
              ...char.member.guild,
              G_Mark: char.member.guild.G_Mark?.toString('hex') as any,
            },
          }
        }

        return {
          ...char,
          Inventory: char.Inventory?.toString('hex').substring(0, 240),
          total_stats: Strength! + Dexterity! + Vitality! + Energy! + Leadership! + LevelUpPoint!,
          is_online: char.account_character?.GameIDC === char.Name && char.memb_stat?.ConnectStat === 1,
        }
      }),
    )
  } catch (error) {
    next(error)
  }
}

export const getHOF: RequestHandler = async (_req, res, next) => {
  try {
    const characters = await prisma.nyx_hof.findMany({
      select: {
        name: true,
        reset: true,
        level: true,
        class: true,
        date: true,
        rank: true,
      },
      where: { rank: 1 },
      orderBy: [{ date: 'desc' }, { class: 'asc' }],
      take: 5,
    })

    res.json(characters)
  } catch (error) {
    next(error)
  }
}
