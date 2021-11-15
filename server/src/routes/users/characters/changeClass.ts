import { Request, RequestHandler } from 'express'
import { prisma } from 'db'
import validator from 'validator'
import { logger, getClassName } from 'tools'

export const changeClass: RequestHandler = async (req: Request, res, next) => {
  try {
    const { character, newClass } = req.body

    if (typeof character !== 'string' || !validator.isLength(character, { min: 1, max: 10 }))
      return res.status(400).json({ error: 'Invalid character selected.' })

    if (typeof newClass !== 'number' || ![1, 17, 33, 48, 64].includes(newClass))
      return res.status(400).json({ error: 'Please select a valid new class.' })

    const char = await prisma.character.findFirst({
      select: {
        Name: true,
        Class: true,
        memb_stat: {
          select: {
            ConnectStat: true,
          },
        },
        account_character: {
          select: {
            GameIDC: true,
          },
        },
      },
      where: { AccountID: req.user!.memb___id, Name: character },
    })

    if (!char) return res.status(400).json({ error: 'This character does not belong to you.' })
    if (char.account_character?.GameIDC === char.Name && char.memb_stat?.ConnectStat === 1)
      return res.status(400).json({ error: 'You cannot be online with this character.' })

    const curClassInfo = getClassName(char.Class!)
    const newClassInfo = getClassName(newClass)

    if (char.Class === newClass)
      return res.status(400).json({ error: `You are already a ${curClassInfo.short}, ${character}.` })

    const resources = await prisma.nyx_resources.findFirst({
      where: { account: req.user!.memb___id },
    })

    if (!resources || resources.gold < 500) return res.status(400).json({ error: 'You need 500 gold to change class.' })

    try {
      await prisma.$transaction([
        prisma.character.updateMany({
          data: { Class: newClass },
          where: { AccountID: req.user!.memb___id, Name: character },
        }),
        prisma.charPreview.updateMany({ data: { Class: newClass }, where: { Name: character } }),
        prisma.eVENT_INFO.updateMany({ data: { Class: newClass }, where: { CharacterName: character } }),
        prisma.eVENT_INFO_BC.updateMany({ data: { Class: newClass }, where: { CharacterName: character } }),
        prisma.eVENT_INFO_BC_3RD.updateMany({ data: { Class: newClass }, where: { CharacterName: character } }),
        prisma.eVENT_INFO_BC_4TH.updateMany({ data: { Class: newClass }, where: { CharacterName: character } }),
        prisma.eVENT_INFO_BC_5TH.updateMany({ data: { Class: newClass }, where: { CharacterName: character } }),

        prisma.nyx_resources.update({ data: { gold: { decrement: 500 } }, where: { account: req.user!.memb___id } }),
        prisma.nyx_account_logs.create({
          data: {
            account: req.user!.memb___id,
            date: new Date(),
            ip: req.ip,
            type: 'change-class',
            log_message: `Character ${character} class changed from ${curClassInfo.long} to ${newClassInfo.long}.`,
            properties: JSON.stringify({ character, oldClass: char.Class, newClass }),
          },
        }),
      ])
    } catch (error) {
      logger.error(`Change class failed: ${error.message}`)
      return res.status(400).json({ error: `Character class change failed, please try again later.` })
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
