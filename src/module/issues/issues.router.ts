import { Router } from "express";
import { issuesController } from "./issues.controller";
import { auth } from "../../middleware/auth";
import { DeleteAuth } from "../../middleware/checkRole";
import { USER_ROLE } from "../../type/type";



const route= Router()

route.post('/',auth(),issuesController.createIssues)
route.get('/',auth(),issuesController.getAllIssues)
route.get('/:id',issuesController.GetissuesById)
route.patch('/:id',issuesController.updateIssues)
route.delete('/:id',auth(),DeleteAuth(USER_ROLE.maintainer),issuesController.deletIssue)




export const issuesRouter=route