import { Request, Response } from "express";
import { createUser, getUserById, loginUser } from "../services/user.service";
import HttpStatus from 'http-status'
import ApiError from "../utils/apiError";

const signUp = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);
        res.status(HttpStatus.CREATED).send(user);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).send({ error: error.message }); // Use error.message to get the error message
          } else {
            console.error('Internal Server Error:', error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
        }
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const user = await loginUser(req.body);
        res.status(HttpStatus.OK).send(user);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).send({ error: error.message }); // Use error.message to get the error message
          } else {
            console.error('Internal Server Error:', error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
        }
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const user = await getUserById(req.params.userId);
        res.status(HttpStatus.OK).send(user);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).send({ error: error.message }); // Use error.message to get the error message
          } else {
            console.error('Internal Server Error:', error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
        }
    }
    
}

export default { signUp, login, getUser }