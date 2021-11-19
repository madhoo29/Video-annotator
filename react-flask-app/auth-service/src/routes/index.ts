import { Router } from "express";
import { signinRouter } from "./signin";
import { signupRouter } from "./signup";
import { signoutRouter } from "./signout";

const router = Router();

router.use(signinRouter);
router.use(signupRouter);
router.use(signinRouter);

export { router as authRouter };
