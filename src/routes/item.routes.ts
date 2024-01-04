import express from "express";
import itemController from "../controllers/item.controller";
import isAuthenticated from "../isAuthenticated";
const itemRouter = express.Router();



itemRouter.post("/create", isAuthenticated, itemController.userCreateItem);
itemRouter.get("/all/:userId", isAuthenticated, itemController.getUserItems);
itemRouter.get("/:userId/:itemId", isAuthenticated, itemController.getUserItem);
itemRouter.put("/edit/:itemId", isAuthenticated, itemController.updateUserItem);
itemRouter.delete("/delete/:itemId", isAuthenticated, itemController.deleteUserItem);





export = itemRouter;