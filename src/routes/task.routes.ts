import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleCompleteTask,
} from "../controllers/task.controller";
import {
  processAndSaveFileByHash,
  upload,
} from "../middlewares/upload.middleware";
import slugify from "slugify";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/complete", toggleCompleteTask);
router.post(
  "/upload",
  upload.single("file"),
  processAndSaveFileByHash,
  (req, res) => {
    const { hashedFilename, originalFilename } = (req as any).fileInfo;
    const fileUrl = `${process.env.BASE_URL}/api/files/${hashedFilename}/${originalFilename}`;

    res.status(201).json({ url: fileUrl });
  }
);

export default router;
