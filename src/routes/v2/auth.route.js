import { Router } from "express";
import { login, logout } from "../../modules/auth/auth.controller.js";
import { getUserProfile } from "../../modules/users/users.controller.js";
import { authenticate } from "../../middlewares/middleware.js";

export const router = Router();

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", authenticate, getUserProfile);
