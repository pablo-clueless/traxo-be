import express from 'express'

import { googleAuthenticate, signin, signup } from '../controllers/auth'

const router = express.Router()

router.post('/google-auth', googleAuthenticate)
router.post('/signin', signin)
router.post('/signup', signup)

export default router