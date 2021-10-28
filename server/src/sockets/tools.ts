import { Socket } from 'socket.io'
import { SocketUser } from 'typings'
import { io } from 'app'

export const getConnectedUsers = (): SocketUser[] => {
  return [...io.sockets.sockets.values()].map((socket) => ({
    id: socket.id,
    ip: socket.request.socket.remoteAddress,
    user: socket.data.user,
  }))
}

export const getUserFromSocket = (socket: Socket): SocketUser => {
  return {
    id: socket.id,
    ip: socket.request.socket.remoteAddress,
    user: socket.data.user,
  }
}
