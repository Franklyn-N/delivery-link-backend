import express from "express";
import userController from "../controllers/user.controller";
import isAuthenticated from "../isAuthenticated";
const userRouter = express.Router();



userRouter.post("/register", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/:userId", isAuthenticated, userController.getUser);





export = userRouter;

  