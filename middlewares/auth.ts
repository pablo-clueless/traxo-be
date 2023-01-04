import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

import { CustomRequest } from '../interfaces'

dotenv.config()

const secret = process.env.SECRET as string

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = <string> req.headers['x-access-token']
        if(!token) return res.status(403).json({message: 'No access token provided. Access denied!'})
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if(err) return res.status(401).json({message: 'User is unathorized'});
            (req as CustomRequest).userId = decoded.id
            next()
        })
    } catch (error: any) {
        res.status(401).json({message: 'Please authenticate.', error})
    }
}