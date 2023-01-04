import { Request, Response } from 'express'

import { Card } from '../schemas'

const createCard = async(req: Request, res: Response) => {}

const fetchAllCards = async(req: Request, res: Response) => {}

const fetchCard = async(req: Request, res: Response) => {}

const modifyCard = async(req: Request, res: Response) => {}

const deleteCard = async(req: Request, res: Response) => {}

export {createCard, deleteCard, fetchAllCards, fetchCard, modifyCard}