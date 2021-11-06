import { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import { Character, nyx_hof } from 'db/entity'

export const getOne: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params

    if (!name?.length || name.length > 10) return res.status(404).json({ error: 'Character not found' })

    const character = await getRepository(Character)
      .createQueryBuilder('char')
      .select([
        'char.Name',
        'char.Resets',
        'char.cLevel',
        'char.Strength',
        'char.Dexterity',
        'char.Vitality',
        'char.Energy',
        'char.Leadership',
        'char.LevelUpPoint',
        'char.Inventory',
        'char.Money',
        'char.MapNumber',
        'char.PkCount',
        'char.CtlCode',
        'char.ChatLimitTime',
        'char.BanPost',
        'char.IsMarried',
        'char.MarryName',
        'char.QuestInProgress',
        'char.QuestNumber',
        'char.QuestMonsters',
        'char.SkyEventWins',
        'char.IsVip',
        'char.VipExpirationTime',
        'member.G_Name',
        'member.G_Status',
        'guild.G_Mark',
        'guild.G_Score',
        'guild.G_Master',
        'guild.G_Rival',
        'guild.G_Union',
      ])
      .leftJoin('char.member', 'member')
      .leftJoin('member.guild', 'guild')
      .where('char.Name = :name', { name })
      .getOne()

    if (!character) return res.status(404).json({ error: 'Character not found' })

    const { Strength, Dexterity, Vitality, Energy, Leadership, LevelUpPoint, ...char } = character

    if (char.member) {
      char.member = {
        ...char.member,
        guild: {
          ...char.member.guild,
          G_Mark: char.member.guild.G_Mark.toString('hex') as any,
        },
      }
    }

    res.json({
      ...char,
      Inventory: char.Inventory?.toString('hex').substr(0, 240) ?? null,
      total_stats: Strength + Dexterity + Vitality + Energy + Leadership + LevelUpPoint,
    })
  } catch (error) {
    next(error)
  }
}

export const getMany: RequestHandler = async (req, res, next) => {
  try {
    const { top = 50 } = req.query
    const limit = isNaN(Number(top)) || Number(top) > 100 || Number(top) < 1 ? 50 : Number(top)

    const characters = await getRepository(Character)
      .createQueryBuilder('char')
      .select([
        'char.Name',
        'char.Resets',
        'char.cLevel',
        'char.Strength',
        'char.Dexterity',
        'char.Vitality',
        'char.Energy',
        'char.Leadership',
        'char.LevelUpPoint',
        'char.Inventory',
        'char.Money',
        'char.MapNumber',
        'char.PkCount',
        'char.CtlCode',
        'char.ChatLimitTime',
        'char.BanPost',
        'char.IsMarried',
        'char.MarryName',
        'char.QuestInProgress',
        'char.QuestNumber',
        'char.QuestMonsters',
        'char.SkyEventWins',
        'char.IsVip',
        'char.VipExpirationTime',
        'member.G_Name',
        'member.G_Status',
        'guild.G_Mark',
        'guild.G_Score',
        'guild.G_Master',
        'guild.G_Rival',
        'guild.G_Union',
      ])
      .leftJoin('char.member', 'member')
      .leftJoin('member.guild', 'guild')
      .limit(limit)
      .orderBy({ 'char.Resets': 'DESC', 'char.cLevel': 'DESC', 'char.Name': 'ASC' })
      .getMany()

    res.json(
      characters.map(({ Strength, Dexterity, Vitality, Energy, Leadership, LevelUpPoint, ...char }) => {
        if (char.member) {
          char.member = {
            ...char.member,
            guild: {
              ...char.member.guild,
              G_Mark: char.member.guild.G_Mark.toString('hex') as any,
            },
          }
        }

        return {
          ...char,
          Inventory: char.Inventory.toString('hex').substr(0, 240),
          total_stats: Strength + Dexterity + Vitality + Energy + Leadership + LevelUpPoint,
        }
      }),
    )
  } catch (error) {
    next(error)
  }
}

export const getHOF: RequestHandler = async (_req, res, next) => {
  try {
    const characters = await getRepository(nyx_hof)
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
