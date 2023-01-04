import express from 'express'

import { createEmployee, deleteEmployee, fetchAllEmployee, fetchEmployee, modifyEmployee, searchEmployee } from '../controllers/employee'
import { verifyToken } from '../middlewares/auth'
import { upload } from '../utils/upload'

const router = express.Router()

router.post('/search', verifyToken, searchEmployee)
router.post('/add', [verifyToken, upload.single('image')], createEmployee)
router.get('/all', verifyToken, fetchAllEmployee)
router.get('/one/:id', verifyToken, fetchEmployee)
router.post('/edit/:id', verifyToken, modifyEmployee)
router.post('/del/:id', verifyToken, deleteEmployee)

export default router