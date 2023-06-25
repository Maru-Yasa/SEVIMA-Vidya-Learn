import { Router } from "express";
import { createItem, deleteItem, getAnalyticUses, getItemById, getItemByUserId, getSelfAnalyticUses, getTrend } from "../../../../controllers/prompt/prompt.controller";
import { authenticateToken } from "../../../../middlewares/auth";

const route = Router()

route.use(authenticateToken)

route.get('/', getItemByUserId);
route.post('/create', createItem);
route.get('/:id', getItemById);
route.delete('/:id', deleteItem);

route.get('/analytic/trend', getTrend);
route.get('/analytic/uses', getAnalyticUses);
route.get('/analytic/selfuses', getSelfAnalyticUses);



export default route;