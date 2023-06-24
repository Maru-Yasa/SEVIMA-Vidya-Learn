import { Router } from "express";
import { login, refreshToken, register, updateUser, validateToken } from "../../../../controllers/auth/auth.controller";
import { authenticateToken } from "../../../../middlewares/auth";

const route = Router()

route.post('/register', register);
route.post('/login', login);
route.post('/updateProfile', authenticateToken, updateUser);
route.get('/validate', authenticateToken, validateToken )
route.get('/refresh', authenticateToken, refreshToken )



export default route;