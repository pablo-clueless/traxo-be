import mongoose from 'mongoose'
import validator from 'validator'

import { ICompany } from '../interfaces'

const companySchema = new mongoose.Schema<ICompany>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    budgets: [{type: mongoose.Types.ObjectId, ref: 'Budget'}],
    companyImage: {type: String},
    companyName: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate: (value: string) => validator.isEmail(value)},
    employeeList: [{type: mongoose.Types.ObjectId, ref: 'Employee'}],
    subscriptions: [{type: mongoose.Types.ObjectId, ref: 'Subscription'}],
    users: [{type: mongoose.Types.ObjectId, ref: 'User'}],
})

export const Company = mongoose.model<ICompany>('Company', companySchema)