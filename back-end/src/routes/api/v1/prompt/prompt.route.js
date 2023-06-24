import { Router } from "express";
import { createItem, deleteItem, getItemById, getItemByUserId } from "../../../../controllers/prompt/prompt.controller";
import { authenticateToken } from "../../../../middlewares/auth";

const route = Router()

route.use(authenticateToken)

route.get('/', getItemByUserId);
route.post('/create', createItem);
route.get('/:id', getItemById);
route.delete('/:id', deleteItem);



export default route;