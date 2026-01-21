import { Router } from "express";
import { router as userRoutes } from "./user.route.js";
import { router as authRoutes } from "./auth.route.js";
import { router as productRoutes } from "./product.route.js";
import { router as collectionRoutes } from "./collection.route.js";

export const router = Router();

router.use("/user", userRoutes);

router.use("/auth", authRoutes);

router.use("/products",productRoutes);

router.use("/collections",collectionRoutes)