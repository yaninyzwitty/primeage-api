import {Request, Response} from 'express'
export const createUserController = async(req: Request, res:Response) => {
    try {
        
    } catch (error: any) {

        return res.status(500).json({error: error.message})
        
    }
}