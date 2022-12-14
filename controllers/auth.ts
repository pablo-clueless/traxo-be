import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import jwt, { Secret } from 'jsonwebtoken'
import validator from 'validator'
import { IUser } from '../interfaces'

import { Company, User } from '../schemas'

dotenv.config()

const clientId = process.env.CLIENT_ID as string
const secret: Secret = process.env.JWT_SECRET as string

const googleClient = new OAuth2Client({
    clientId: clientId,
})

type UserSignup = Pick<
    IUser,
    | 'accessType'
    | 'firstName'
    | 'lastName'
    | 'companyName'
    | 'email'
    | 'companyName'
    | 'password'
>

const googleAuthenticate: any = async (req: Request, res: Response) => {
    const { token } = req.body

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: clientId,
        })
        if (!ticket)
            return res
                .status(400)
                .json({ message: 'Unable to authenticate user.' })
        const payload = ticket.getPayload()

        let user: any = await User.findOne({ email: payload?.email })
        if (user) return res.status(200).json({ user, token })
        user = await User.create({
            email: payload?.email,
            firstName: payload?.given_name,
            lastName: payload?.family_name,
            userImage: payload?.picture,
        })
        return res.status(200).json({ user, token })
    } catch (error) {
        return res.status(400).json({
            message: 'Authentication failed, please try again.',
            error,
        })
    }
}

const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Incomplete credentials.' })
    }

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res
                .status(404)
                .json({ message: 'User not found, try signing up.' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password.' })
        }
        const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: '30d',
        })

        return res.status(200).json({ token, user: user })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error })
    }
}

const signup = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, companyName, companyEmail } = req.body

    if(email.toLowerCase() === companyEmail.toLowerCase()) {
        return res.status(400).json({message: 'Admin email cannot be the same as company email.'})
    }

    if (!firstName || !lastName || !email || !password || !companyName) {
        return res.status(400).json({ message: 'Incomplete credentials.' })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email.' })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: 'Invalid password.' })
    }
    try {
        let isEmailInUse = await User.findOne({ email: email })

        if (isEmailInUse)
            return res.status(400).json({
                message:
                    'This email is registered. Try logging or use a different email.',
            })
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const user = new User({
            firstName,
            lastName,
            email,
            accessType: 'super-user',
            companyName,
            password: hashedPassword,
        })
        user.save(async (err: any) => {
            if (err) {
                return res.status(500).json({
                    message: 'Unable to create user. Please try again later.',
                    err,
                })
            }
            const isEmailUnavailable = await Company.findOne({email: companyEmail})
            if(isEmailUnavailable) return res.status(400).json({
                message: 'This company email is in use. Login to continue or contact support.'
            })
            const company = new Company({companyName, email: companyEmail})
            company.save(async(err: any) => {
                if(err) {
                    user.delete()
                    return res.status(500).json({
                        message: 'Error creating company. Please try again later.'
                    })
                }
                return res.status(200).json({ message: 'Company profile created.' })
            })
        })
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export { googleAuthenticate, signin, signup }
