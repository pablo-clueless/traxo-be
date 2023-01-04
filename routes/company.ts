import express from 'express'

import { createCompany, deleteCompany, fetchCompany, modifyCompany } from '../controllers/company'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.post('/add', verifyToken, createCompany)
router.get('/one/:id', verifyToken, fetchCompany)
router.patch('/edit/:id', verifyToken, modifyCompany)
router.delete('/delete/:id', verifyToken, deleteCompany)

export default router