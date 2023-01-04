import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRET as string

export const sessionMiddleware = session({
    secret,
    resave: false,
    saveUninitialized: false  
  })