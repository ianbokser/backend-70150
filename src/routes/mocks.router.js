import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as petController from "../controllers/pet.controller.js";
import * as generateData from "../controllers/generateData.controller.js";

const mocksRouter = Router();

mocksRouter.post("/mockingusers", userController.createUser);
mocksRouter.get("/mockingusers", userController.getUsers);
mocksRouter.post("/mockingpets", petController.createPet);
mocksRouter.get("/mockingpets", petController.getPets);
mocksRouter.post("/generateData", generateData.createData);


export default mocksRouter;

