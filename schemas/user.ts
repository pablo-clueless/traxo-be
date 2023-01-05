import { model, Schema, Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import validator from 'validator'

import { IUser } from '../interfaces'

const userSchema = new Schema<IUser>(
    {
        accessType: {
            type: String,
            enum: ['super-user', 'admin'],
            default: 'super-user',
            required: true,
        },
        accountCreated: { type: Date, default: Date.now, immutable: false },
        accountModified: { type: Date },
        companyId: { type: Types.ObjectId, ref: 'Company' },
        companyImage: { type: String },
        companyName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: (value: string) => validator.isEmail(value),
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: {
            type: String,
            required: true,
            validate: (value: string) => validator.isStrongPassword(value),
        },
        userId: { type: String, default: uuidv4 },
        userImage: { type: String },
    },
    //  removes password field from data returned by db
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.password
            },
        },
    }
)

export const User = model<IUser>('User', userSchema)
