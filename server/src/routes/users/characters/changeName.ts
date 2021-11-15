import { Request, RequestHandler } from 'express'
import { prisma } from 'db'
import validator from 'validator'
import { logger } from 'tools'

export const changeName: RequestHandler = async (req: Request, res, next) => {
  try {
    const { character, newName } = req.body

    if (typeof character !== 'string' || !validator.isLength(character, { min: 1, max: 10 }))
      return res.status(400).json({ error: 'Invalid character selected.' })

    if (typeof newName !== 'string' || !validator.isLength(newName, { min: 4, max: 10 }))
      return res.status(400).json({ error: 'Your new name cannot be less than 4 or more than 10 characters.' })

    if (!/^[a-z0-9_\.!?@$^&*)(+-=><\][]+$/i.test(newName))
      return res.status(400).json({ error: 'Unsupported characters detected.' })

    if (character === newName) return res.status(400).json({ error: `Your name is already ${character}.` })

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

    const resources = await prisma.nyx_resources.findFirst({
      where: { account: req.user!.memb___id },
    })

    if (!resources || resources.gold < 500) return res.status(400).json({ error: 'You need 500 gold to change name.' })

    const newNameCheck = await prisma.character.count({
      where: { Name: newName },
    })

    if (newNameCheck) return res.status(400).json({ error: 'This name already exists. Please pick a different one.' })

    try {
      await prisma.$transaction([
        prisma.character.updateMany({
          data: { Name: newName },
          where: { AccountID: req.user!.memb___id, Name: character },
        }),
        prisma.memb_info.updateMany({
          data: { main_character: newName },
          where: { memb___id: req.user!.memb___id, main_character: character },
        }),
        prisma.account_character.updateMany({
          data: { GameID1: newName },
          where: { Id: req.user!.memb___id, GameID1: character },
        }),
        prisma.account_character.updateMany({
          data: { GameID2: newName },
          where: { Id: req.user!.memb___id, GameID2: character },
        }),
        prisma.account_character.updateMany({
          data: { GameID3: newName },
          where: { Id: req.user!.memb___id, GameID3: character },
        }),
        prisma.account_character.updateMany({
          data: { GameID4: newName },
          where: { Id: req.user!.memb___id, GameID4: character },
        }),
        prisma.account_character.updateMany({
          data: { GameID5: newName },
          where: { Id: req.user!.memb___id, GameID5: character },
        }),
        prisma.account_character.updateMany({
          data: { GameIDC: newName },
          where: { Id: req.user!.memb___id, GameIDC: character },
        }),
        prisma.charPreview.updateMany({ data: { Name: newName }, where: { Name: character } }),
        prisma.eVENT_INFO.updateMany({
          data: { CharacterName: newName },
          where: { AccountID: req.user!.memb___id, CharacterName: character },
        }),
        prisma.eVENT_INFO_BC.updateMany({
          data: { CharacterName: newName },
          where: { AccountID: req.user!.memb___id, CharacterName: character },
        }),
        prisma.eVENT_INFO_BC_3RD.updateMany({
          data: { CharacterName: newName },
          where: { AccountID: req.user!.memb___id, CharacterName: character },
        }),
        prisma.eVENT_INFO_BC_4TH.updateMany({
          data: { CharacterName: newName },
          where: { AccountID: req.user!.memb___id, CharacterName: character },
        }),
        prisma.eVENT_INFO_BC_5TH.updateMany({
          data: { CharacterName: newName },
          where: { AccountID: req.user!.memb___id, CharacterName: character },
        }),
        prisma.guild.updateMany({ data: { G_Master: newName }, where: { G_Master: character } }),
        prisma.guild_member.updateMany({ data: { Name: newName }, where: { Name: character } }),
        prisma.nyx_chat_dms.updateMany({ data: { author: newName }, where: { author: character } }),
        prisma.nyx_chat_dms.updateMany({ data: { receiver: newName }, where: { receiver: character } }),
        prisma.nyx_chat_global.updateMany({ data: { author: newName }, where: { author: character } }),
        prisma.nyx_hof.updateMany({ data: { name: newName }, where: { name: character } }),
        prisma.optionData.updateMany({ data: { Name: newName }, where: { Name: character } }),
        prisma.t_CC_OFFLINE_GIFT.updateMany({ data: { CharName: newName }, where: { CharName: character } }),
        prisma.t_CGuid.updateMany({ data: { Name: newName }, where: { Name: character } }),
        prisma.t_DL_OFFLINE_GIFT.updateMany({ data: { CharName: newName }, where: { CharName: character } }),
        prisma.t_ENTER_CHECK_BC.updateMany({ data: { CharName: newName }, where: { CharName: character } }),
        prisma.t_FriendList.updateMany({ data: { FriendName: newName }, where: { FriendName: character } }),
        prisma.t_FriendMail.updateMany({ data: { FriendName: newName }, where: { FriendName: character } }),
        prisma.t_FriendMain.updateMany({ data: { Name: newName }, where: { Name: character } }),
        prisma.t_FRIENDSHIP_STONE.updateMany({ data: { CharName: newName }, where: { CharName: character } }),

        prisma.nyx_resources.update({ data: { gold: { decrement: 500 } }, where: { account: req.user!.memb___id } }),
        prisma.nyx_account_logs.create({
          data: {
            account: req.user!.memb___id,
            date: new Date(),
            ip: req.ip,
            type: 'change-name',
            log_message: `Character name changed from ${character} to ${newName}`,
            properties: JSON.stringify({ character, newName }),
          },
        }),
      ])
    } catch (error) {
      logger.error(`Change name failed: ${error.message}`)
      return res.status(400).json({ error: `Character name change failed, please try again later.` })
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
