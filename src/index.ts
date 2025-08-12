import express from 'express'
import auth from './auth/auth.router'


const initializeApp = () => {
    const app = express()
    app.use(express.json())
    
    const port = process.env.PORT || 8081
    
    auth(app)
    
    app.get('/', (req, res) => {
        res.send('Hello world')
    })
    
    
  return app

}

const app = initializeApp()
export default app




