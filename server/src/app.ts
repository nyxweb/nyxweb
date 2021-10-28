import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import ws from 'ws'
import 'dotenv/config'
import './db'

import cors from 'cors'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'

import { router } from 'routes'
import { wsListeners, wsAuthMiddleware } from 'sockets'
import { errorHandler, logger } from 'tools'

const PORT = process.env.PORT
const app = express()
const server = http.createServer(app)
export const io = new Server(server, { cors: { origin: process.env.ORIGIN, credentials: true }, wsEngine: ws.Server })

// app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(cors({ origin: [process.env.ORIGIN!, 'http://localhost:5001'], credentials: true }))
app.use(express.json({ type: 'application/json', limit: '1kb' }))
app.use(cookieParser())
app.use(rateLimit({ windowMs: 1000, max: 10 }))

app.get('/api/health', (_req, res) => res.end('ok'))
app.use('/api', router)
app.use(errorHandler)

io.use(wsAuthMiddleware)
io.on('connection', (socket) => wsListeners(io, socket))

server.listen(PORT, () => {
  logger.info(`Application started on port ${PORT}`)
})
