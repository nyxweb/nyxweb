import { Request, RequestHandler } from 'express'
import { prisma } from 'db'
import validator from 'validator'

export const setMainCharacter: RequestHandler = async (req: Request, res, next) => {
  try {
    const { character } = req.body

    if (typeof character !== 'string' || !validator.isLength(character, { min: 1, max: 10 }))
      return res.status(400).json({ error: 'Invalid character selected.' })

    const char = await prisma.character.findFirst({
      select: {
        Name: true,
        cLevel: true,
      },
      where: { AccountID: req.user!.memb___id, Name: character },
    })

    if (!char) return res.status(400).json({ error: 'This character does no longer exist.' })

    if (char.Name === req.user?.main_character)
      return res.status(400).json({ error: 'This is already your main character.' })

    if (char.cLevel! < 50)
      return res.status(400).json({ error: 'Your character needs to be at least level 50 to be your main.' })

    await prisma.memb_info.update({
      data: { main_character: character },
      where: { memb___id: req.user!.memb___id },
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
