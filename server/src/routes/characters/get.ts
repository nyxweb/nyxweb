import { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import { Character, nyx_hof } from 'db/entity'

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params
    const charRepository = getRepository(Character)

    if (!name?.length || name.length > 10) return res.status(404).json({ error: 'Character not found' })

    const character = await charRepository
      .createQueryBuilder()
      .select([
        'Name',
        'cLevel',
        'Resets',
        'Strength + Dexterity + Vitality + Energy + Leadership + LevelUpPoint as total_stats',
        'Inventory',
        'Money',
        'MapNumber',
        'MapPosX',
        'MapPosY',
        'PkCount',
        'CtlCode',
        'ChatLimitTime',
        'BanPost',
        'IsMarried',
        'MarryName',
        'QuestInProgress',
        'QuestNumber',
        'QuestMonsters',
        'SkyEventWins',
        'IsVip',
        'VipExpirationTime',
      ])
      .where({ Name: name })
      .getRawOne()

    if (!character) return res.status(404).json({ error: 'Character not found' })

    // const guild = await knex('Guild')
    //   .select('G_Name as name', 'G_Mark as mark', 'G_Score as score', 'G_Rival as rival', 'G_Union as union')
    //   .first()

    // if (guild) {
    //   const member = await knex('GuildMember').select('G_Status as position').where({ Name: name }).first()
    //   guild.position = member.position
    // }

    const Inventory = character.Inventory?.toString('hex').substr(0, 240)

    res.json({ ...character, Inventory })
  } catch (error) {
    next(error)
  }
}

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    let { top = 50 } = req.query
    const charRepository = getRepository(Character)

    if (isNaN(Number(top)) || Number(top) > 100) top = 50

    const characters = await charRepository
      .createQueryBuilder()
      .select([
        'Name',
        'Resets',
        'cLevel',
        'Strength + Dexterity + Vitality + Energy + Leadership + LevelUpPoint as total_stats',
      ])
      .limit(Number(top))
      .orderBy({ Resets: 'DESC', cLevel: 'DESC', Name: 'ASC' })
      .getRawMany()

    res.json(characters)
  } catch (error) {
    next(error)
  }
}

export const getHOF: RequestHandler = async (_req, res, next) => {
  try {
    const hofRepository = getRepository(nyx_hof)

    const characters = await hofRepository
      .createQueryBuilder()
      .select(['name', 'reset', 'level', 'class', 'date', 'rank'])
      .where({ rank: 1 })
      .orderBy({ date: 'DESC', class: 'ASC' })
      .limit(5)
      .getRawMany()

    res.json(characters)
  } catch (error) {
    next(error)
  }
}
