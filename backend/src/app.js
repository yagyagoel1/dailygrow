import express from 'express'
import cookieParser from 'cookie-parser'



const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

import Router from './routes/index.route.js'

app.use('/api/v1', Router)



export default app
