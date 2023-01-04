import { Schema, Types, model} from 'mongoose'

import { ISubscription } from '../interfaces'

const subscriptionSchema = new Schema<ISubscription>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    addeBy: {type: Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    policy: {type: String, default: 'strict'},
})

export const Subscription = model<ISubscription>('Subscription', subscriptionSchema)