import jwt from "jsonwebtoken";
import { IPayload } from "../types";

const secret = process.env.JWT_SECRET_TOKEN;

export const signJWT = async ({ email, _id }: IPayload, expiresIn = 86400): Promise<string> => {
  try {
    const token = await jwt.sign({ email, _id }, `${secret}`, {
      expiresIn,
    });
    return token;
  } catch (error) {
    throw new Error("Unable to generate token.");
  }
};

export const verifyJWT = async (token: string): Promise<IPayload> => {
  try {
    return jwt.verify(token, `${secret}`) as IPayload;
  } catch (error) {
    throw new Error("Unable to verify token.");
  }
};
