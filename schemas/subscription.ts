import mongoose from 'mongoose'

import { ISubscription } from '../interfaces'

const subscriptionSchema = new mongoose.Schema<ISubscription>({
    accountCreated: {type: Date, default: Date.now, immutable: false},
    accountModified: {type: Date},
    addeBy: {type: mongoose.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    policy: {type: String, default: 'strict'},
})

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema)