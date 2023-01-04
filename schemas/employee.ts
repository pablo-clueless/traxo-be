import mongoose from 'mongoose'
import validator from 'validator'

import { IEmployee } from '../interfaces'

const employeeSchema = new mongoose.Schema<IEmployee>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    cards: [{type: mongoose.Types.ObjectId, ref: 'Card'}],
    email: {type: String, required: true, unique: true, validate: (value: string) => validator.isEmail(value)},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    subscriptions: [{type: mongoose.Types.ObjectId, ref: 'Subscription'}],
    userImage: {type: String}
})

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema)