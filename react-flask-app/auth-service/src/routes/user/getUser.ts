import express, { Request, Response } from "express";
import { User } from "../../models/user";

const router = express.Router();

router.get("/:role", async (req: Request, res: Response) => {
	const role = req.params.role;
	// @ts-ignore
	const users = await User.find({ role: role });

	res.status(200).send(users);
});

export { router as getUserRouter };
