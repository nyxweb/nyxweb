import { Socket } from 'socket.io'
import { logger } from 'tools'

export const wsAttachListeners = (socket: Socket) => {
  logger.debug(`Socket connected.`, { id: socket.id, ip: socket.request.socket.remoteAddress })

  socket.on('disconnect', () => {
    logger.debug(`Socket disconnected`, { id: socket.id, ip: socket.request.socket.remoteAddress })
  })

  // socket.on('test line', (message) => {
  //   //socket.data.user.username
  //   logger.info(`[ ${socket.id} ] says: ${message}`)
  // })
}

export * from './tools'
export * from './middleware'
