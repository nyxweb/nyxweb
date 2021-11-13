import { RequestHandler } from 'express'
import { guild } from '@prisma/client'
import { prisma } from 'db'

export const getGuild: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params

    if (!name || name.length > 10) return res.status(404).json({ error: 'Guild not found' })

    const guild = await prisma.guild.findFirst({
      select: {
        G_Name: true,
        G_Mark: true,
        members: {
          select: {
            Name: true,
            G_Status: true,
            character: {
              select: {
                cLevel: true,
              },
            },
          },
        },
      },
      where: { G_Name: name },
    })

    if (!guild) return res.status(404).json({ error: 'Guild not found' })

    res.json({
      ...guild,
      G_Mark: guild.G_Mark?.toString('hex'),
      levels: guild.members!.reduce((prev, curr) => (curr.character?.cLevel || 0) + prev, 0),
    })
  } catch (error) {
    next(error)
  }
}

export const getGuilds: RequestHandler = async (req, res, next) => {
  try {
    const { top = 50 } = req.query
    const limit = isNaN(Number(top)) || Number(top) > 100 || Number(top) < 1 ? 50 : Number(top)

    const guilds = await prisma.$queryRaw<guild[]>`
      SELECT
        G_Name,
        lower(convert(varchar(64), G_Mark, 2)) as G_Mark,
        G_Score,
        G_Master,
        (
          SELECT SUM(cLevel) FROM Character
          LEFT JOIN GuildMember ON Character.Name = GuildMember.Name
          WHERE GuildMember.G_Name = Guild.G_Name
        ) as levels,
        (
          SELECT COUNT(*) FROM Character
          LEFT JOIN GuildMember ON Character.Name = GuildMember.Name
          WHERE GuildMember.G_Name = Guild.G_Name
        ) as members
      FROM Guild
      ORDER BY levels DESC, members DESC, G_Name ASC
        OFFSET 0 ROWS
        FETCH NEXT ${limit} ROWS ONLY
    `

    res.json(guilds)
  } catch (error) {
    next(error)
  }
}
