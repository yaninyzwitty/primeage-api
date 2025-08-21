import express from 'express'
import auth from './auth/auth.router'
import sellerProfile from './sellersProfile/sellerProfile.router'
import order from './orders/orders.router'


const initializeApp = () => {
    const app = express()
    app.use(express.json())
    
    const port = process.env.PORT || 8081
    
    auth(app)
    sellerProfile(app)
    order(app)


    app.get('/', (req, res) => {
        res.send('Hello world')
    })
    
    
  return app

}

const app = initializeApp()
export default app




