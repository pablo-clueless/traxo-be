import { Request } from 'express'
import { ObjectId } from "mongoose"
import { JwtPayload } from "jsonwebtoken"

export interface IUser {
    userId: string
    firstName: string
    lastName: string
    email: string
    password: string
    userImage: string
    companyId: string | ObjectId
    companyName: string
    companyImage: string
    accessType: string
    accountCreated?: Date | string | null
    accountModified?: Date | string | null
}

export interface IEmployee {
    accountCreated?: Date | string | null
    accountModified?: Date | string | null
    cards: Array<ICard>
    email: string
    firstName: string
    lastName: string
    userImage: string
    subscriptions: Array<ISubscription>
}

export interface ICompany {
    companyName: string
    email: string
    companyImage: string
    users: Array<IUser>
    employeeList: Array<IEmployee>
    budgets: Array<IBudget>
    subscriptions: Array<ISubscription>
    accountCreated?: Date | string | null
    accountModified?: Date | string | null
}

export interface IBudget {
    name: string
    type: string
    spendLimit: number
    policy: 'strict' | 'flexible' | 'fixed'
    accountCreated?: Date | string | null
    accountModified?: Date | string | null
}

export interface ISubscription {
    name: string
    addeBy: IUser
    policy: 'strict' | 'flexible' | 'fixed'
    accountCreated?: Date | string | null
    accountModified?: Date | string | null
}

export interface ICard {
    name: string
    issuedBy: IUser
    carrier: IEmployee
    budget: string | ObjectId
    spendLimit: number
    policy: 'strict' | 'flexible' | 'fixed'
    accountCreated?: Date | string | null
    accountModified?: Date | string | null
}

export interface MailOptions {
    from: string
    to: string
    subject: string
    template: string
    context: Object
}

export interface CustomRequest extends Request {
    token: string | JwtPayload
    userId: string
}