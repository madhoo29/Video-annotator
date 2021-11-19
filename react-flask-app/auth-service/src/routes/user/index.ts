import { Router } from "express";
import { getUserRouter } from "./getUser";
import { addUserRouter } from "./addUser";
import { deleteUserRouter } from "./deleteUser";

const router = Router();

router.use(getUserRouter);
router.use(addUserRouter);
router.use(deleteUserRouter);

export { router as userRouter };
