import { Request, RequestHandler } from 'express'
import { prisma } from 'db'

export const getCharacters: RequestHandler = async (req: Request, res, next) => {
  try {
    const characters = await prisma.character.findMany({
      select: {
        Name: true,
        cLevel: true,
        Class: true,
        Strength: true,
        Dexterity: true,
        Vitality: true,
        Energy: true,
        Leadership: true,
        LevelUpPoint: true,
        memb_stat: {
          select: {
            ConnectStat: true,
            ConnectTM: true,
            DisConnectTM: true,
          },
        },
        account_character: {
          select: {
            GameIDC: true,
          },
        },
      },
      where: { AccountID: req.user!.memb___id },
      orderBy: [{ cLevel: 'desc' }, { Name: 'asc' }],
    })

    res.json(
      characters.map((char) => ({
        ...char,
        is_online: char.account_character?.GameIDC === char.Name && char.memb_stat?.ConnectStat === 1,
      })),
    )
  } catch (error) {
    next(error)
  }
}
