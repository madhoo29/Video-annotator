import { Router, Request, Response } from "express";
import { json } from "body-parser";
import { User } from "../../models/user";
import generatePassword from "../../utils/generatePassword";

const router = Router();

router.use(json());

const roles = ["instructor", "student"];

router.post("/", async (req: Request, res: Response) => {
	console.log(req.body);
	const role =
		typeof req.body.role == "string" && roles.indexOf(req.body.role.trim()) > -1
			? req.body.role.trim()
			: false;
	const firstName =
		typeof req.body.firstName == "string" && req.body.firstName.length > 0
			? req.body.firstName.trim()
			: false;
	const lastName =
		typeof req.body.lastName == "string" && req.body.lastName.trim().length > 0
			? req.body.lastName.trim()
			: false;
	const email =
		typeof req.body.email == "string" && req.body.email.trim().length > 0
			? req.body.email.trim()
			: false;

	if (!role || !firstName || !lastName || !email) {
		res.status(400);
		res.json({
			message: "Missing or invalid required params",
		});
		return res.end();
	}

	let userData: {
		firstName: string;
		lastName: string;
		email: string;
		role: "student" | "instructor";
		branch?: string;
		semester?: string;
		password: string;
	} = { firstName, lastName, email, role, password: generatePassword(8) };
	let userObj;

	if (role == "admin" || role == "instructor") {
		userObj = await User.create(userData).catch(console.error);
	} else {
		const branch =
			typeof req.body.branch == "string" && req.body.branch.trim().length > 0
				? req.body.branch.trim()
				: false;
		const semester =
			typeof req.body.semester == "string" &&
			req.body.semester.trim().length > 0
				? req.body.semester.trim()
				: false;

		if (!branch || !semester) {
			res.status(400);
			res.json({
				message: "Missing or invalid SRN",
			});
			return res.end();
		}

		userData["branch"] = branch;
		userData["semester"] = semester;

		userObj = await User.create(userData).catch(console.error);
	}

	if (!userObj) {
		res.status(500);
		res.json({
			message: "Failed to create user",
		});
		return res.end();
	}

	const result = userObj.save().catch(console.error);

	if (!result) {
		res.status(500);
		res.json({
			message: "Failed to save user",
		});
		return res.end();
	}

	res.end();
});

export { router as addUserRouter };
