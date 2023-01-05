import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import http from 'http'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { Server, Socket } from 'socket.io'

import { wrap } from './middlewares/io'
import { sessionMiddleware } from './middlewares/session'
import authRoutes from './routes/auth'
import employeeRoute from './routes/employee'

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:5174', 'http://localhost:5174', '*'],
        allowedHeaders: ['Authorization'],
    },
})

dotenv.config()

const PORT = process.env.PORT as string
const MONGO_URI = process.env.MONGO_URI as string

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionMiddleware)
app.use(cors())
app.use(morgan('common'))

// mongo connection
mongoose.connect(MONGO_URI)
const db = mongoose.connection
db.once('open', () => console.log('successfully connected to MongoDB'))
db.on('error', console.error.bind(console, 'connection error: '))

//socket connection
io.use(wrap(sessionMiddleware))
io.on('connection', (socket: Socket) => console.log(`socket id: ${socket.id}`))

app.get('/', async (req: Request, res: Response) =>
    res.send({ message: 'Welcome to Traxo Finance servers.' })
)

app.use('/auth', authRoutes)
app.use('/employees', employeeRoute)

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))
