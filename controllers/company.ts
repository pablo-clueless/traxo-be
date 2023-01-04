import { Request, Response } from 'express'

import { Company } from '../schemas'

const createCompany = async(req: Request, res: Response) => {
    const { cmpanyName, email } = req.body

    try {
        
    } catch (error) {
       return res.status(500).json({message: 'Internal server error'})
    }
}

const fetchCompany = async(req: Request, res: Response) => {
    const { id } = req.params

    try {
        const company = await Company.findOne({_id: id})
    } catch (error) {
       return res.status(500).json({message: 'Internal server error'})
    }
}

const modifyCompany = async(req: Request, res: Response) => {
    const { id } = req.params

    try {
        
    } catch (error) {
       return res.status(500).json({message: 'Internal server error'})
    }
}

const deleteCompany = async(req: Request, res: Response) => {
    const { id } = req.params

    try {
        
    } catch (error) {
       return res.status(500).json({message: 'Internal server error'})
    }
}

export {createCompany, deleteCompany, fetchCompany, modifyCompany}