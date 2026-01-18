import { Router } from "express";
import { createUser, getUsers } from "../../modules/users/users.controller.js";
import { authenticate } from "../../middlewares/middleware.js";

export const router = Router();

//  ** GET USERS **
router.get("/", authenticate, getUsers);

//  ** SIGNUP **
router.post("/", createUser);


