import { Request, Response } from "express";
import { createUser, getUserById, loginUser } from "../services/user.service";
import HttpStatus from 'http-status'

const signUp = async (req: Request, res: Response) => {
    const user = await createUser(req.body);
    res.status(HttpStatus.CREATED).send(user);

}

const login = async (req: Request, res: Response) => {
    const user = await loginUser(req.body);
    res.status(HttpStatus.OK).send(user);

}

const getUser = async (req: Request, res: Response) => {
    const user = await getUserById(req.params.userId);
    res.status(HttpStatus.OK).send(user);
}

export default { signUp, login, getUser }