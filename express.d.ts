// express.d.ts

declare namespace Express {
    interface Request {
      payload?: any; // Add the payload property
    }
  }
  