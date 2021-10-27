import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import './db'
import { router } from './routes'
import { errorHandler } from 'utils'

const PORT = process.env.PORT
const app = express()

// app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
app.use(express.json({ type: 'application/json', limit: '1kb' }))
app.use(cookieParser())
app.use(
  rateLimit({
    windowMs: 1000,
    max: 10,
  }),
)
app.use('/api', router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`)
})
