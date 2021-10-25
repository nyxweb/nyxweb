import { Router } from 'express'
import { knex } from '../db'

export const character = Router()

character.get('/:name', async (req, res) => {
  const { name } = req.params

  if (!name?.length || name.length > 10) {
    return res.status(404).json({ error: 'Character not found' })
  }

  const [character] = await knex.raw(
    `SELECT
      Name as name,
      Resets as reset,
      cLevel as level,
      Strength + Dexterity + Vitality + Energy + LeaderShip + LevelUpPoint as points,
      Inventory as inventory
    FROM Character
    WHERE Name = :name
  `,
    { name }
  )

  if (!character) {
    return res.status(404).json({ error: 'Character not found' })
  }

  res.json({ ...character, inventory: character.inventory.toString('hex') })
})

character.get('/', async (req, res) => {
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
    [Number(top)]
  )

  res.json(characters)
})
