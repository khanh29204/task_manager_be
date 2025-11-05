import multer from "multer";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

const UPLOAD_DIR = path.join(__dirname, "../../uploads");
(async () => {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
})();

const memoryStorage = multer.memoryStorage();

export const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Loại file không được hỗ trợ!"));
    }
  },
});

export const processAndSaveFileWithHash = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next();
  }

  try {
    const buffer = req.file.buffer;
    const extension = path.extname(req.file.originalname).toLowerCase();

    const hash = crypto.createHash("sha256").update(buffer).digest("hex");

    const newFilename = `${hash}${extension}`;
    const filePath = path.join(UPLOAD_DIR, newFilename);

    try {
      await fs.access(filePath);
      console.log(`File exists, using existing: ${newFilename}`);
    } catch (error) {
      await fs.writeFile(filePath, buffer);
      console.log(`New file saved: ${newFilename}`);
    }

    req.file.filename = newFilename;

    next();
  } catch (error) {
    next(error);
  }
};
