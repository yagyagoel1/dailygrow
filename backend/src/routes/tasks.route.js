import { Router } from "express";
import { verifyUser } from "../middlewares/getToken.middleware.js";
import { getTasks } from "../controllers/tasks.controller.js";


const router  = Router()

router.route('/')
.get(verifyUser,getTasks)





export default router