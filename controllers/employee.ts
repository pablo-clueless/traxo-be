import { Request, Response } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import validator from 'validator'

import { Employee } from '../schemas'

const searchEmployee = async(req: Request, res: Response) => {
    const { query } = req.body
    //'$match': { 'firstName': { '$regex': query, '$options': 'i' }}
    const queryRegex = new RegExp(query, 'i')
    try {
        const employees = await Employee.find({
            '$or': [
                {firstName: queryRegex},
                {lastName: queryRegex}
            ]
        })
        if(!employees) return res.status(404).json({message: 'No employees found.'})
        return res.status(200).json({message: 'Success.', employees})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

const createEmployee = async(req: Request, res: Response) => {
    const { firstName, lastName, email, designation } = req.body

    if(!firstName) return res.status(400).json({message: 'Invalid first name.'})
    if(!lastName) return res.status(400).json({message: 'Invalid last name.'})
    if(!email || !validator.isEmail(email)) return res.status(400).json({message: 'Invalid email.'})
    if(!designation) return res.status(400).json({message: 'Invalid designation.'})

    try {
        if(req.file) {
            const isEmailInUse = await Employee.findOne({email})
            if(isEmailInUse) return res.status(409).json({message: 'This user exists already, try signing in instead.'})
            const image = req.file.path
            const result = await cloudinary.uploader.upload(image, { folder: 'employee-images'})
            if(!result) return res.status(500).json({message: 'Unable to upload image.'})
            const employee = new Employee({firstName, lastName, email, designation, userImage: result.url})
            employee.save(async(err: any) => {
                if(err) return res.status(500).json({message: 'An error occurred while adding employee.'})
                return res.status(201).json({message: 'Employee added successfully.'})
            })
        } else {
            const isEmailInUse = await Employee.findOne({email})
            if(isEmailInUse) return res.status(409).json({message: 'This user exists already, try signing in instead.'})
            const employee = new Employee({firstName, lastName, email, designation})
            employee.save(async(err: any) => {
                if(err) return res.status(500).json({message: 'An error occurred while adding employee.'})
                return res.status(201).json({message: 'Employee added successfully.'})
            })
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

const fetchAllEmployee = async(req: Request, res: Response) => {
    try {
        const employees = await Employee.find({})
        return res.status(200).json({message: 'Retrieved all employees', employees})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

const fetchEmployee = async(req: Request, res: Response) => {
    const { id } = req.params
    try {
        const employee = await Employee.find({_id: id})
        if(!employee) return res.status(404).json({message: 'Employee not found.'})
        return res.status(200).json({message: 'Retrieved employee', employee})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

const modifyEmployee = async(req: Request, res: Response) => {
    const { firstName, lastName, email, designation } = req.body
    const { id } = req.params

    try {
        if(req.file) {
            const image = req.file.path
            const result = await cloudinary.uploader.upload(image, { folder: 'employee-images'})
            if(!result) return res.status(500).json({message: 'Unable to upload image.'})
            const employee = await Employee.find({_id: id})
            if(!employee) return res.status(404).json({message: 'Employee not found.'})
            const updates = {firstName, lastName, email, designation, userImage: result.secure_url}
            const updatedEmployee = await Employee.findOneAndUpdate({_id: id}, updates, {new: true})
            if(!updatedEmployee) return res.status(500).json({message: 'An error occurred.'})
            return res.status(200).json({message: 'Employee updated successfully.'})
        } else {
            const employee = await Employee.find({_id: id})
            if(!employee) return res.status(404).json({message: 'Employee not found.'})
            const updates = {firstName, lastName, email, designation}
            const updatedEmployee = await Employee.findOneAndUpdate({_id: id}, updates, {new: true})
            if(!updatedEmployee) return res.status(500).json({message: 'An error occurred.'})
            return res.status(200).json({message: 'Employee updated successfully.'})
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

const deleteEmployee = async(req: Request, res: Response) => {
    const { id } = req.params
    try {
        const employee = await Employee.findOneAndDelete({_id: id})
        if(!employee) return res.status(500).json({message: 'An error occurred. Try again later.'})
        return res.status(200).json({message: 'Employee deleted successfully.'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

export {createEmployee, deleteEmployee, fetchAllEmployee, fetchEmployee, modifyEmployee, searchEmployee}