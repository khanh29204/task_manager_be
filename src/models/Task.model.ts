import mongoose, { Document, Schema } from "mongoose";
import { toJSONPlugin } from "../utils/toJSONPlugin";

export interface ITask extends Document {
  id: string;
  title: string;
  fullname: string;
  gender: Gender;
  cv_path?: string;
  avatar?: string;
  document_path?: string;
  major: string;
  position: string;
  is_complete: boolean;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

const TaskSchema: Schema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    fullname: { type: String, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
    cv_path: { type: String },
    avatar: { type: String },
    document_path: { type: String },
    major: { type: String, required: true },
    position: { type: String, required: true },
    is_complete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
TaskSchema.index({ fullname: "text", major: "text", position: "text", title: "text" });
TaskSchema.plugin(toJSONPlugin);

export default mongoose.model<ITask>("Task", TaskSchema);
