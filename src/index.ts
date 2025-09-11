import express from 'express'
import auth from './auth/auth.router'
import orderItem from './orderItems/orderItems.router'
import order from './orders/orders.router'
import sellerProfile from './sellersProfile/sellerProfile.router'
import product from './products/products.router'
import payment from './paymentsTable/payments.router'
import category from './categories/categories.router'
import supportTickets from './supportTickets/supportTickets.router'
import message from './messages/messages.router'
import cors from 'cors'


const initializeApp = () => {
    const app = express()
    app.use(express.json())
    app.use(cors({
      origin: 'http://localhost:5173',
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true


    }))
    
    const port = process.env.PORT || 8081
    
    auth(app)
    sellerProfile(app)
    order(app)
    orderItem(app)
    product(app)
    payment(app)
    category(app)
    supportTickets(app)
    message(app)


    app.get('/', (req, res) => {
        res.send('Hello world')
    })
    
    
  return app

}

const app = initializeApp()
export default app




