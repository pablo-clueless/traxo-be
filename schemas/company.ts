import { Schema, Types, model} from 'mongoose'
import validator from 'validator'

import { ICompany } from '../interfaces'

const companySchema = new Schema<ICompany>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    budgets: [{type: Types.ObjectId, ref: 'Budget'}],
    companyImage: {type: String},
    companyName: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate: (value: string) => validator.isEmail(value)},
    employeeList: [{type: Types.ObjectId, ref: 'Employee'}],
    subscriptions: [{type: Types.ObjectId, ref: 'Subscription'}],
    users: [{type: Types.ObjectId, ref: 'User'}],
})

export const Company = model<ICompany>('Company', companySchema)