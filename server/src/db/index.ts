import KNEX, { Knex } from 'knex'

export let knex: Knex

// @ts-ignore
if (!knex) {
  try {
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
    console.log(`Database connection successfully established.`)
  } catch (error) {
    console.log(`Connection to the DB failed`, error.message)
  }
}
