
import { Router } from 'express'
import taskRouter from './tasks.route.js'
const router = Router()
router.use("/tasks",taskRouter)


export default router