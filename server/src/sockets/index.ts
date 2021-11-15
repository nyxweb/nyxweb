import { io } from 'app'
import { prisma } from 'db'
import { Socket } from 'socket.io'
import { logger } from 'tools'

export const wsAttachListeners = (socket: Socket) => {
  logger.debug(`Socket connected.`, { id: socket.id, ip: socket.request.socket.remoteAddress })

  socket.on('disconnect', () => {
    logger.debug(`Socket disconnected`, { id: socket.id, ip: socket.request.socket.remoteAddress })
  })

  socket.on('chat global message', async (message) => {
    const user = await prisma.memb_info.findFirst({
      select: {
        main_character: true,
      },
      where: { memb___id: socket.data.user.account },
    })

    if (!user?.main_character) {
      return console.log(`woops no main char`)
    }

    const chat = await prisma.nyx_chat_global.create({
      data: {
        author: user.main_character,
        date: new Date(),
        message,
      },
    })

    io.emit('chat global message', chat)
  })

  // socket.on('test line', (message) => {
  //   //socket.data.user.username
  //   logger.info(`[ ${socket.id} ] says: ${message}`)
  // })
}

export * from './tools'
export * from './middleware'
