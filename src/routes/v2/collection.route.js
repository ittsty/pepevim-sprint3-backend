import { Router } from "express";
import { createCollection, deleteCollection, editCollection, getCollection, getCollections } from "../../modules/collections/collections.controller.js";

export const router = Router();

router.get("/",getCollections);
router.get("/:id",getCollection);
router.post("/", createCollection);
router.patch("/:id",editCollection);
router.delete("/:id",deleteCollection);