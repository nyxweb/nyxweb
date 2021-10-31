import { RequestHandler } from 'express'
// import { knex } from 'db'

export const reset: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params

    if (!name?.length || name.length > 10) return res.status(404).json({ error: 'Character not found' })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
