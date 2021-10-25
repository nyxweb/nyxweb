import { Router } from 'express'
import { knex } from '../db'

export const guild = Router()

guild.get('/:name', async (req, res) => {
  const name = req.params.name

  if (name.length > 10) {
    return res.status(404).json({ error: 'Guild not found' })
  }

  const [guild] = await knex.raw(
    `SELECT
      G_Name as name,
      G_Mark as mark,
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
    WHERE G_Name = :name
  `,
    { name }
  )

  if (!guild) {
    return res.status(404).json({ error: 'Guild not found' })
  }

  res.json({ ...guild, mark: guild.mark.toString('hex') })
})

guild.get('/', async (req, res) => {
  const { top = 50 } = req.query

  const guilds = await knex.raw(
    `
    SELECT TOP ??
      G_Name as name,
      G_Mark as mark,
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
    FROM Character
    ORDER BY Resets DESC, cLevel DESC, Name ASC
  `,
    [Number(top)]
  )

  res.json(guilds)
})