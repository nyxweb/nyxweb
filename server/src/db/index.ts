import KNEX, { Knex } from 'knex'

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
}
