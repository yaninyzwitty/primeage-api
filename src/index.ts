// src/app.ts
import express, { Express, Request, Response } from 'express'
import cors from 'cors'

// Routers
import auth from './auth/auth.router'
import sellerProfile from './sellersProfile/sellerProfile.router'
import order from './orders/orders.router'

const initializeApp = (): Express => {
  const app = express()

  // Middleware
  app.use(express.json())
  app.use(cors()) // ✅ call cors as a function

  // Routers
  auth(app)
  sellerProfile(app)
  order(app)

  // Test route
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello world')
  })

  return app
}

// Start the server only if this file is run directly
if (require.main === module) {
  const app = initializeApp()
  const port = process.env.PORT || 8081
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

// Export app for testing or other purposes
export default initializeApp()
