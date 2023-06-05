import express from "express";
import dontenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import connectDb from "./config/db.js";

dontenv.config(); // config the .env environment

connectDb();
const app = express();

//Middleares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoutes);
app.use(errorHandler); // custom error middleware

app.listen(process.env.PORT, () => {
  console.log(`server listening on ${process.env.PORT}`);
});
