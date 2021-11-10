import { nyx_account_logs } from 'db/entity'
import { Request, RequestHandler } from 'express'
import { getRepository } from 'typeorm'

export const getAccountLogs: RequestHandler = async (req: Request, res, next) => {
  try {
    const logs = await getRepository(nyx_account_logs)
      .createQueryBuilder()
      .where({ account: req.user!.memb___id })
      .select(['date', 'ip', 'log_message', 'type'])
      .orderBy({ date: 'DESC' })
      .getRawMany()

    res.json(logs)
  } catch (error) {
    next(error)
  }
}
