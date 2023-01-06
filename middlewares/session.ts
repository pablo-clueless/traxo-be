import dotenv from 'dotenv'
import session from 'express-session'
import MongoStore from 'connect-mongo'

dotenv.config()

const secret = process.env.JWT_SECRET as string
const uri = process.env.MONGO_URI as string

const store = MongoStore.create({
    mongoUrl: uri,
    collectionName: 'traxo-client-sessions',
    ttl: 1209600,
    autoRemove: 'native',
})

export const sessionMiddleware = session({
    secret,
    store,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 864000, httpOnly: true, secure: false }
})
