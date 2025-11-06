import { Request, Response } from "express";
import TaskModel, { ITask } from "../models/Task.model";
import mongoose from "mongoose";

const BASE_URL = process.env.BASE_URL;

export const getTasks = async (req: Request, res: Response) => {
  try {
    const {
      search,
      gender,
      is_complete,
      page: pageQuery,
      limit: limitQuery,
    } = req.query;

    const page = parseInt(pageQuery as string) || 1;
    const limit = parseInt(limitQuery as string) || 30;
    const skip = (page - 1) * limit;

    const query: mongoose.FilterQuery<ITask> = {};

    if (search && typeof search === "string") {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { fullname: searchRegex },
        { title: searchRegex },
        { major: searchRegex },
      ];
    }

    if (gender && typeof gender === "string") {
      query.gender = gender;
    }

    if (is_complete && (is_complete === "true" || is_complete === "false")) {
      query.is_complete = is_complete === "true";
    }
    const totalTasks = await TaskModel.countDocuments();
    const totalPages = Math.ceil(totalTasks / limit);

    const tasks = await TaskModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      tasks,
      currentPage: page,
      totalPages,
      totalTasks,
    });
  } catch (error: any) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Đã có lỗi xảy ra phía server." });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { fullname, title } = req.body;

    if (!fullname || !title) {
      return res
        .status(400)
        .json({ message: "Họ tên và Tiêu đề công việc là bắt buộc." });
    }

    const newTaskData: Partial<ITask> = {
      ...req.body,
    };

    const task = await TaskModel.create(newTaskData);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không hợp lệ" });
  }

  try {
    const updateData: Partial<ITask> = { ...req.body };

    const updatedTask = await TaskModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Không tìm thấy công việc" });
    }
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không hợp lệ" });
  }

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Không tìm thấy công việc" });
    }
    res.status(200).json({ message: "Xóa công việc thành công", id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleCompleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "ID không hợp lệ" });
  }
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy công việc" });
    }
    task.is_complete = !task.is_complete;
    await task.save();
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
