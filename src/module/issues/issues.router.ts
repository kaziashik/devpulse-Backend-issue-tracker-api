import { Router } from "express";
import { issuesController } from "./issues.controller";



const route= Router()

route.post('/',issuesController.createIssues)
route.get('/',issuesController.getAllIssues)
route.get('/:id',issuesController.GetissuesById)
route.patch('/:id',issuesController.updateIssues)
route.delete('/:id',issuesController.deletIssue)




export const issuesRouter=route