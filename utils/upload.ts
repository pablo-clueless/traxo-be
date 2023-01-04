import cloudinary from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

const CLOUDINARY = cloudinary.v2

const CLOUD_NAME = process.env.CLOUD_NAME as string
const CLOUD_KEY = process.env.CLOUD_KEY as string
const CLOUD_SECRET = process.env.CLOUD_SECRET as string

CLOUDINARY.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
    secure: true,
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
		cb(null, 'uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now()+'-'+file.originalname)
	},
})

export const upload = multer({storage})