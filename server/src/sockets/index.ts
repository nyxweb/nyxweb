import { Server, Socket } from 'socket.io'
import { parse } from 'cookie'
import jwt from 'jsonwebtoken'

import { logger } from 'tools'

export const wsAuthMiddleware = (socket: Socket, next: () => void) => {
  try {
    const cookies = parse(socket.handshake.headers.cookie!)
    const payload = jwt.verify(cookies.nyx_auth, process.env.JWT_SECRET!)
    socket.data.user = payload
  } catch (error) {}

  next()
}

export const wsListeners = (_io: Server, socket: Socket) => {
  logger.info(`Socket ${socket.id} connected. IP: ${socket.request.socket.remoteAddress}`)

  socket.on('test line', (message) => {
    if (!socket.data.user) return logger.error(`[ ${socket.id} ] Unauthorized to send message: ${message}`)
    logger.info(`[ ${socket.id} ] ${socket.data.user.username}: ${message}`)
  })
}
