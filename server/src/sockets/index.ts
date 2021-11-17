import { io } from 'app'
import { prisma } from 'db'
import { Socket } from 'socket.io'
import { logger } from 'tools'
import { getConnectedUsers } from './tools'

export const wsAttachListeners = (socket: Socket) => {
  logger.debug(`Socket connected.`, { id: socket.id, ip: socket.request.socket.remoteAddress })

  socket.on('disconnect', () => {
    logger.debug(`Socket disconnected`, { id: socket.id, ip: socket.request.socket.remoteAddress })
  })

  socket.on('chat global message', async (message) => {
    const user = await prisma.memb_info.findFirst({ where: { memb___id: socket.data.user.account } })
    if (!user?.main_character) return

    const msg = await prisma.nyx_chat_global.create({
      data: {
        author: user.main_character,
        date: new Date(),
        message,
      },
    })

    io.emit('chat global message', msg)
  })

  socket.on('chat private message', async ({ message, character }) => {
    const receiver = await prisma.memb_info.findFirst({ where: { main_character: character } })
    if (!receiver?.main_character) return
    const sender = await prisma.memb_info.findFirst({ where: { memb___id: socket.data.user.account } })
    if (!sender?.main_character) return

    const blocked = await prisma.nyx_chat_blocked.count({
      where: {
        OR: [
          { AND: [{ blocker: receiver.memb___id }, { blocked: socket.data.user.account }] },
          { AND: [{ blocked: receiver.memb___id }, { blocker: socket.data.user.account }] },
        ],
      },
    })
    if (blocked) return

    const msg = await prisma.nyx_chat_dms.create({
      data: {
        receiver: receiver.main_character,
        author: sender.main_character,
        date: new Date(),
        message,
        seen: 0,
      },
      select: {
        author: true,
        receiver: true,
        date: true,
        message: true,
        seen: true,
      },
    })

    const receiverSocket = getConnectedUsers().find((socket) => socket.user.account === receiver.memb___id)
    if (!receiverSocket) return

    socket.to(receiverSocket.id).emit('chat private message', msg)
  })
}

export * from './tools'
export * from './middleware'
