import express, { Request, Response } from "express";
import { json } from "body-parser";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes";

const app = express();
const router = express.Router();

app.use(json());
// app.use(json());
// router.get("/", (req, res) => {
// 	console.log("Hello");
// 	res.send("Hello");
// });
// app.use("/api/auth", router);

app.use("/api/auth", authRouter);
app.use("/api/auth/user", userRouter);

export { app };
