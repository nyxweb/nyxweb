import KNEX, { Knex } from 'knex'
import { logger } from 'tools'

export let knex: Knex

// @ts-ignore
if (!knex) {
  knex = KNEX({
    client: 'mssql',
    connection: {
      server: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT),
    },
  })

  knex
    .raw(`SELECT 1`)
    .then(() => {
      logger.info(`Database connection successfully established on ${process.env.DB_HOST}:${process.env.DB_PORT}.`)
    })
    .catch((error) => {
      logger.error(`Could not connect to the database`, { error: error.message })
    })
}
