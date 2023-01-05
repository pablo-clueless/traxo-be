import dotenv from 'dotenv'
import session from 'express-session'

dotenv.config()

const secret = process.env.JWT_SECRET as string

export const sessionMiddleware = session({
    secret,
    resave: false,
    saveUninitialized: false,
})
