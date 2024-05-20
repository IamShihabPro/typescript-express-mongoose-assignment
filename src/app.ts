import express, {Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoute } from './modules/products/product.route'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/products', ProductRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 2')
})

export default app