import { Schema, Types, model} from 'mongoose'

import { IBudget } from '../interfaces'

const budgetSchema = new Schema<IBudget>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    name: {type: String, required: true, unique: true},
    policy: {type: String, default: 'strict'},
    spendLimit: {type: Number, required: true},
    type: {type: String, required: true}
})

export const Budget = model<IBudget>('Budget', budgetSchema)