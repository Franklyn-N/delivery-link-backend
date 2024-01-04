import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import userRouter from "./routes/user.routes";
import itemRouter from "./routes/item.routes";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(compression());


app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
