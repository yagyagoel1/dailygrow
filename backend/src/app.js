import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL||'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

import Router from './routes/index.route.js'

app.use('/api/v1', Router)



export default app
