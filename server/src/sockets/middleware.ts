import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import { parse } from 'cookie'
import jwt from 'jsonwebtoken'
import { logger } from 'tools'
import { getConnectedUsers } from 'sockets'
import { io } from '../app'

export const wsAuthMiddleware = (socket: Socket, next: (error?: ExtendedError) => void) => {
  try {
    const cookies = parse(socket.handshake.headers.cookie!)
    const payload = jwt.verify(cookies.nyx_auth, process.env.JWT_SECRET!)
    socket.data.user = payload
    next()
  } catch (error) {
    logger.debug(`Unauthorized socket connected ${socket.id}`)
    next(new Error('Unauthorized'))
  }
}

/**
 * Checks for older connection from the same IP and disconnects it
 */
export const wsMultiConnectionMiddleware = (socket: Socket, next: (error?: ExtendedError) => void) => {
  const users = getConnectedUsers()
  const exists = users.find((user) => user.ip === socket.request.socket.remoteAddress && user.id !== socket.id)

  if (exists) {
    logger.debug(`New connection found, disconnecting old socket`, exists)

    try {
      io.sockets.sockets.get(exists.id)!.disconnect(true)
    } catch (error) {
      logger.debug(`Failed to disconnect old socket`, exists)
    }
  }

  next()
}
