import { createUserController } from "./auth.controller"
import { Express } from 'express'


const auth = (app:Express) => {
    app.route("/auth/register").post(
        async(req, res, next) => {
            try {
                await createUserController(req, res)
                
            } catch (error) {
                next(error)
                
            }
        }
    )
}


export default auth