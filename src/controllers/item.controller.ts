import { Request, Response } from "express";
import HttpStatus from 'http-status'
import { createItem, deleteItem, getItemByUserId, getItemsByUserId, updateItem } from "../services/item.service";

const userCreateItem = async (req: Request, res: Response) => {
    const item = await createItem(req.body);
    res.status(HttpStatus.CREATED).send(item);

}

const getUserItems = async (req: Request, res: Response) => {
    const items = await getItemsByUserId(req.params.userId);
    res.status(HttpStatus.OK).send(items);

}

const getUserItem = async (req: Request, res: Response) => {
    const item = await getItemByUserId(req.params.userId, req.params.itemId);
    res.status(HttpStatus.OK).send(item);

}

const updateUserItem = async (req: Request, res: Response) => {
    const item = await updateItem(req.params.itemId, req.body);
    res.status(HttpStatus.OK).send(item);

}

const deleteUserItem = async (req: Request, res: Response) => {
    await deleteItem(req.params.itemId);
    res.status(HttpStatus.NO_CONTENT).send();

}


export default { userCreateItem, getUserItems, getUserItem, updateUserItem, deleteUserItem }