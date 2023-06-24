import { Router } from "express";
import { createItem, getItemById, getItemByUserId } from "../../../../controllers/prompt/prompt.controller";
import { authenticateToken } from "../../../../middlewares/auth";

const route = Router()

route.use(authenticateToken)

route.get('/', getItemByUserId);
route.post('/create', createItem);
route.get('/:id', getItemById);



export default route;