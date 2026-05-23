import { Router } from "express";
import { issuesController } from "./issues.controller";
import { auth } from "../../middleware/auth";
import { checkRole, updateIssueAuth } from "../../middleware/checkRole";
import { USER_ROLE } from "../../type/type";



const route= Router()

route.post('/',auth(),issuesController.createIssues)
route.get('/',issuesController.getAllIssues)
route.get('/:id',issuesController.getIssueById)
route.patch("/:id/status",auth(),checkRole(USER_ROLE.maintainer),issuesController.updateIssueStatus);
route.patch('/:id',auth(),updateIssueAuth(),issuesController.updateIssues)

route.delete('/:id',auth(),checkRole(USER_ROLE.maintainer),issuesController.deleteIssue)




export const issuesRouter=route