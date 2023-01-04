import express from 'express'

import {} from '../controllers/susbcription'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.post('/add', verifyToken)
router.get('/all', verifyToken)
router.get('/one/:id', verifyToken)
router.patch('/edit/:id', verifyToken)
router.delete('/delete/:id', verifyToken)

export default router