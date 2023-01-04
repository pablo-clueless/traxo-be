import mongoose from 'mongoose'

import { ICard } from '../interfaces'

const cardSchema = new mongoose.Schema<ICard>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    budget: {type: mongoose.Types.ObjectId, ref: 'Budget'},
    carrier: {type: mongoose.Types.ObjectId, ref: 'Employee'},
    issuedBy: {type: mongoose.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    policy: {type: String, default: 'strict'},
    spendLimit: {type: Number, required: true}
})

export const Card = mongoose.model<ICard>('Card', cardSchema)