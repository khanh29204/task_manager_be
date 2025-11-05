import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleCompleteTask,
} from "../controllers/task.controller";
import {
  processAndSaveFileWithHash,
  upload,
} from "../middlewares/upload.middleware";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/complete", toggleCompleteTask);
router.post(
  "/upload",
  upload.single("file"),
  processAndSaveFileWithHash,
  (req, res) => {
    if (!req.file || !req.file.filename) {
      return res
        .status(400)
        .json({ message: "Không có file hoặc xử lý file thất bại." });
    }
    const fileUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    res.status(201).json({ url: fileUrl });
  }
);

export default router;
