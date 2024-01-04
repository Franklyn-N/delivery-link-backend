import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from './utils/jsonwebtoken';

interface AuthenticatedRequest extends Request {
  payload?: any; // or define the type of payload
}

const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    let authToken = req.headers.authorization;

    if (authToken) {
      authToken = authToken.split(' ')[1];
      const payload = await verifyJWT(authToken);
      if (payload) {
        req.payload = payload;
        res.locals.jwt = payload;
        return next(); // Call next to proceed to the next middleware or route handler
      }
    }

    throw new Error('Not Authorized!');
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};

export default isAuthenticated;
