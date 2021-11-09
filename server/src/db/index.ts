import { logger } from 'tools'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
import 'dotenv/config'

import { MEMB_INFO, MEMB_STAT, AccountCharacter, Character, Guild, GuildMember, nyx_resources, nyx_hof } from './entity'

(async () => {
  try {
    await createConnection({
      type: 'mssql',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT),
      synchronize: false,
      logging: true,
      extra: {
        trustServerCertificate: true,
      },
      entities: [MEMB_INFO, MEMB_STAT, AccountCharacter, Character, Guild, GuildMember, nyx_resources, nyx_hof],
    })

    logger.info(`Database connection successfully established on ${process.env.DB_HOST}:${process.env.DB_PORT}.`)
  } catch (error) {
    logger.error(`Could not connect to the database`, { error: error.message })
  }
})()
