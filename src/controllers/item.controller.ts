import { Request, Response } from "express";
import HttpStatus from 'http-status'
import { createItem, deleteItem, getItemByUserId, getItems, updateItem } from "../services/item.service";
import ApiError from "../utils/apiError";

const userCreateItem = async (req: Request, res: Response) => {
    try {
        const item = await createItem(req.body);
        res.status(HttpStatus.CREATED).send(item);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).send({ error: error.message }); // Use error.message to get the error message
          } else {
            console.error('Internal Server Error:', error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
          } 
    }

}

const getUserItems = async (_: Request, res: Response) => {
    const items = await getItems();
    res.status(HttpStatus.OK).send(items);

}

const getUserItem = async (req: Request, res: Response) => {
    try {
        const item = await getItemByUserId(req.params.userId, req.params.itemId);
        res.status(HttpStatus.OK).send(item);
        
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).send({ error: error.message }); // Use error.message to get the error message
          } else {
            console.error('Internal Server Error:', error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
          }
    }

}

const updateUserItem = async (req: Request, res: Response) => {
    try {
      const item = await updateItem(req.params.itemId, req.body);
      res.status(HttpStatus.OK).send(item);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).send({ error: error.message }); // Use error.message to get the error message
      } else {
        console.error('Internal Server Error:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
      }
    }
};
  
const deleteUserItem = async (req: Request, res: Response) => {
    try {
        await deleteItem(req.params.itemId, req.params.userId);
        res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).send({ error: error.message }); // Use error.message to get the error message
          } else {
            console.error('Internal Server Error:', error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
          }
    }
    

}

export default { userCreateItem, getUserItems, getUserItem, updateUserItem, deleteUserItem }