import { Schema, Types, model} from 'mongoose'
import { ICard } from '../interfaces'

const cardSchema = new Schema<ICard>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    budget: {type: Types.ObjectId, ref: 'Budget'},
    carrier: {type: Types.ObjectId, ref: 'Employee'},
    issuedBy: {type: Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    policy: {type: String, default: 'strict'},
    spendLimit: {type: Number, required: true}
})

export const Card = model<ICard>('Card', cardSchema)