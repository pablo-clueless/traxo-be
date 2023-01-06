import { Request, Response } from 'express'

import { Company } from '../schemas'

const fetchCompany = async(req: Request, res: Response) => {
    const { id } = req.params

    try {
        const company = await Company.findOne({_id: id})
        if(!company) return res.status(400).json({message: 'Company not found.'})
        company
        return res.status(200).json({company})
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

export {deleteCompany, fetchCompany, modifyCompany}