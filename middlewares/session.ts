import dotenv from 'dotenv'
import session from 'express-session'
import mongoStore from 'connect-mongodb-session'

dotenv.config()

const secret = process.env.JWT_SECRET as string
const uri = process.env.MONGO_URI as string

const { MongoDBStore } = mongoStore
const store = new MongoDBStore({
    uri,
    collection: 'traxo-collection',
    expires: 86400,
})

export const sessionMiddleware = session({
    secret,
    store,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 864000, httpOnly: true, secure: false }
})
