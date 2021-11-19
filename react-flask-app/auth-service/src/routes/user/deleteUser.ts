import express, { Request, Response } from "express";

import { User } from "../../models/user";

const router = express.Router();

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const user = await User.remove({ id: req.params.id });

		if (!user) {
			return res.status(404).send("No such user");
		}
		res.status(201).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

export { router as deleteUserRouter };
