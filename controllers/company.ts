import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import validator from 'validator'

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
    const { email, name } = req.body

    if(!validator.isEmail(email)) return res.status(400).json({message: 'Invalid email.'})
    if(!name) return res.status(400).json({message: 'Name cannot be blank.'})

    try {
        if(req.file) {
            const image = req.file.path
            const result = await cloudinary.uploader.upload(image, {folder: 'company-images'})
            if(!result) return res.status(500).json({message: 'Unable to upload image.'})
            const company = await Company.findOne({_id: id})
            if(!company) return res.status(404).json({message: 'Employee not found.'})
            const updates = { companyName: name, email, comapnyImage: result.secure_url}
            const updatedCompany = await Company.findOneAndUpdate({_id: id}, updates, {new: true})
            if(!updatedCompany) return res.status(500).json({message: 'An error occurred.'})
            return res.status(200).json({message: 'Company updated successfully.'})
        } else {
            const company = await Company.findOne({_id: id})
            if(!company) return res.status(404).json({message: 'Employee not found.'})
            const updates = { companyName: name, email}
            const updatedCompany = await Company.findOneAndUpdate({_id: id}, updates, {new: true})
            if(!updatedCompany) return res.status(500).json({message: 'An error occurred.'})
            return res.status(200).json({message: 'Company updated successfully.'})
        }
    } catch (error) {
       return res.status(500).json({message: 'Internal server error'})
    }
}

const deleteCompany = async(req: Request, res: Response) => {
    const { id } = req.params

    try {
        const company = await Company.findOneAndDelete({_id: id})
        if(!company) return res.status(500).json({message: 'An error occurred. Try again later.'})
        return res.status(200).json({message: 'Company deleted successfully.'})
    } catch (error) {
       return res.status(500).json({message: 'Internal server error'})
    }
}

export {deleteCompany, fetchCompany, modifyCompany}