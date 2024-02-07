import { Router } from "express";
import {
  getstudents,
  getStudent,
  createStudents,
  updateStudents,
  deleteStudents
} from "../controllers/students.controllers.js";

const router = Router();

router.get("/students", getstudents);

router.get("/students/:id", getStudent);

router.post("/students", createStudents);

router.put("/students/:id", updateStudents);

router.delete("/students/:id", deleteStudents);

export default router;
