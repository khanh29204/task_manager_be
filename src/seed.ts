import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Task, { Gender, ITask } from "./models/Task.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

const SAMPLE_CV_URL =
  "https:www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const SAMPLE_DOC_URL = "https://tasks.quockhanh020924.id.vn/api/files/6b280d4a3ae05cdd5dc8e03fb04fa9a5c7a2300df087354b246e8e4be6806e52.docx/test.docx";

const seedTasks = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected for seeding.");

    await Task.deleteMany({});
    console.log("Old tasks cleared.");

    const tasks: Partial<ITask>[] = [];
    const genders: Gender[] = [Gender.MALE, Gender.FEMALE, Gender.OTHER];
    const jobTitles = [
      "Lập trình viên",
      "Nhà thiết kế UI/UX",
      "Quản lý dự án",
      "Kỹ sư QA",
      "Chuyên viên Marketing",
      "Phân tích dữ liệu",
    ];
    const positions = [
      "Nhân viên",
      "Trưởng nhóm",
      "Thực tập sinh",
      "Quản lý cấp cao",
      "Giám đốc",
    ];

    console.log("Generating 500 tasks with internet URLs...");
    for (let i = 0; i < 500; i++) {
      const gender = faker.helpers.arrayElement(genders);
      tasks.push({
        title: faker.lorem.sentence({ min: 5, max: 10 }),
        fullname: faker.person.fullName({
          sex: gender === Gender.MALE ? "male" : "female",
        }),
        gender: gender,
        major: faker.helpers.arrayElement(jobTitles),
        position: faker.helpers.arrayElement(positions),
        is_complete: faker.datatype.boolean(),

        avatar: faker.image.avatar(),
        cv_path: SAMPLE_CV_URL,
        document_path: SAMPLE_DOC_URL,
      });
      process.stdout.write(`Task ${i + 1}/500 created.\r`);
    }

    await Task.insertMany(tasks);
    console.log("\n500 tasks have been created successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

seedTasks();
