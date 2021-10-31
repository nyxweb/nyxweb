import { RequestHandler } from 'express'
import { knex } from 'db'

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params

    if (!name?.length || name.length > 10) return res.status(404).json({ error: 'Character not found' })

    const [character] = await knex.raw(
      `SELECT
      Name as name,
      cLevel as level,
      Resets as reset,
      Strength + Dexterity + Vitality + Energy + LeaderShip + LevelUpPoint as total_points,
      Inventory as inventory,
      Money as zen,
      MapNumber as map_number,
      MapPosX as map_pos_x,
      MapPosY as map_pos_y,
      PkCount as pk_count,
      CtlCode as ctl_code,
      ChatLimitTime as chat_limit_time,
      BanPost as ban_post,
      IsMarried as is_married,
      MarryName as marry_name,
      QuestInProgress as quest_in_progress,
      QuestNumber as quest_number,
      QuestMonsters as quest_monsters,
      SkyEventWins as sky_event_wins,
      IsVip as is_vip,
      VipExpirationTime as vip_expiration
    FROM Character
    WHERE Name = :name
  `,
      { name },
    )

    if (!character) return res.status(404).json({ error: 'Character not found' })

    const guild = await knex('Guild')
      .select('G_Name as name', 'G_Mark as mark', 'G_Score as score', 'G_Rival as rival', 'G_Union as union')
      .first()

    if (guild) {
      const member = await knex('GuildMember').select('G_Status as position').where({ Name: name }).first()
      guild.position = member.position
    }

    const equipment = character.inventory?.toString('hex').substr(0, 240)
    delete character.inventory

    res.json({ ...character, equipment, guild: guild || null })
  } catch (error) {
    next(error)
  }
}

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const { top = 50 } = req.query

    const characters = await knex.raw(
      `
    SELECT TOP ??
      Name as name,
      Resets as reset,
      cLevel as level,
      Strength + Dexterity + Vitality + Energy + LeaderShip + LevelUpPoint as points
    FROM Character
    ORDER BY Resets DESC, cLevel DESC, Name ASC
  `,
      [Number(top)],
    )

    res.json(characters)
  } catch (error) {
    next(error)
  }
}

export const getHOF: RequestHandler = async (_req, res, next) => {
  try {
    const characters = await knex('nyx_hof')
      .select('name', 'reset', 'level', 'class', 'date', 'rank')
      .where({ rank: 1 })
      .orderBy([{ column: 'date', order: 'desc' }, 'class'])
      .limit(5)

    res.json(characters)
  } catch (error) {
    next(error)
  }
}
