import { Schema, Types, model} from 'mongoose'
import validator from 'validator'

import { IEmployee } from '../interfaces'

const employeeSchema = new Schema<IEmployee>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    cards: [{type: Types.ObjectId, ref: 'Card'}],
    email: {type: String, required: true, unique: true, validate: (value: string) => validator.isEmail(value)},
    designation: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    subscriptions: [{type: Types.ObjectId, ref: 'Subscription'}],
    userImage: {type: String}
})

export const Employee = model<IEmployee>('Employee', employeeSchema)