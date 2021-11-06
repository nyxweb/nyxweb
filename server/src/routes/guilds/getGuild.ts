import { RequestHandler } from 'express'
import { getRepository, getConnection } from 'typeorm'
import { Guild } from 'db/entity'

export const getGuild: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params

    if (!name || name.length > 10) return res.status(404).json({ error: 'Guild not found' })

    const guild = await getRepository(Guild)
      .createQueryBuilder('g')
      .select(['g.G_Name', 'g.G_Mark', 'members.Name', 'members.G_Status', 'character.Resets', 'character.cLevel'])
      .where('g.G_Name = :name', { name })
      .leftJoin('g.members', 'members')
      .leftJoin('members.character', 'character')
      .getOne()

    if (!guild) return res.status(404).json({ error: 'Guild not found' })

    const G_Mark = guild.G_Mark.toString('hex')

    res.json({ ...guild, G_Mark })
  } catch (error) {
    next(error)
  }
}

export const getGuilds: RequestHandler = async (req, res, next) => {
  try {
    const { top = 50 } = req.query
    const limit = isNaN(Number(top)) || Number(top) > 100 || Number(top) < 1 ? 50 : Number(top)

    const guilds: Guild[] = await getConnection().query(
      `
      SELECT TOP ${limit}
        G_Name,
        G_Mark,
        G_Score,
        (
          SELECT SUM(Resets) FROM Character
          LEFT JOIN GuildMember ON Character.Name = GuildMember.Name
          WHERE GuildMember.G_Name = Guild.G_Name
        ) as resets,
        (
          SELECT COUNT(*) FROM Character
          LEFT JOIN GuildMember ON Character.Name = GuildMember.Name
          WHERE GuildMember.G_Name = Guild.G_Name
        ) as members
      FROM Guild
      ORDER BY resets DESC, members DESC, G_Name ASC
    `,
    )

    res.json(guilds.map((guild) => ({ ...guild, G_Mark: guild.G_Mark.toString('hex') })))
  } catch (error) {
    next(error)
  }
}
