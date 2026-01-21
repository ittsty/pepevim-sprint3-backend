import express from "express";
import { 
  getDashboard, 
  updateDashboard, 
  seedDashboardData 
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", getDashboard);

// เฉพาะ Admin
router.post("/", updateDashboard);

// สร้างข้อมูลทดสอบ
router.post("/seed", seedDashboardData);

export default router;