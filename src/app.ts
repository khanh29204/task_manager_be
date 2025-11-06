import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import taskRoutes from "./routes/task.routes";
import multer from "multer";

dotenv.config();

connectDB();

const app = express();
const UPLOADS_DIR = path.join(__dirname, "../uploads");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.get("/api/files/:hashedFilename/:originalFilename", (req, res) => {
  const { hashedFilename } = req.params;
  const filePath = path.join(UPLOADS_DIR, hashedFilename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`File not found for hashed name: ${hashedFilename}`, err);
      res.status(404).send("File not found");
    }
  });
});
app.get("/api/files/:hashedFilename", (req, res) => {
  const { hashedFilename } = req.params;
  const filePath = path.join(UPLOADS_DIR, hashedFilename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`File not found for hashed name: ${hashedFilename}`, err);
      res.status(404).send("File not found");
    }
  });
});

app.get("/", (req, res) => {
  res.send("API đang chạy...");
});

app.use("/api/tasks", taskRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({ message: "Đã có lỗi xảy ra ở phía server." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
