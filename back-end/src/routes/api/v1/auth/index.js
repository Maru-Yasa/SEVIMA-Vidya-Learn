import { Router } from "express";
import { login, register, validateToken } from "../../../../controllers/auth/auth.controller";
import { authenticateToken } from "../../../../middlewares/auth";

const route = Router()

route.post('/register', register);
route.post('/login', login);
route.get('/validate', authenticateToken,validateToken )



export default route;