# Quản lý Công việc API (Task Manager Backend)

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-5.1-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19-4EA94B?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

Đây là một REST API backend được xây dựng để quản lý các công việc, ứng viên hoặc nhân sự. API được xây dựng bằng Node.js, Express, TypeScript và sử dụng MongoDB làm cơ sở dữ liệu. Dự án đã được đóng gói bằng Docker để dễ dàng triển khai và thiết lập môi trường.

## Mục lục

- [Tính năng nổi bật](#tính-năng-nổi-bật)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Yêu cầu](#yêu-cầu)
- [Hướng dẫn cài đặt và khởi chạy](#hướng-dẫn-cài-đặt-và-khởi-chạy)
  - [1. Tải mã nguồn](#1-tải-mã-nguồn)
  - [2. Cấu hình môi trường](#2-cấu-hình-môi-trường)
  - [3. Chạy ứng dụng](#3-chạy-ứng-dụng)
    - [Cách 1: Sử dụng Docker (Khuyến khích)](#cách-1-sử-dụng-docker-khuyến-khích)
    - [Cách 2: Chạy trực tiếp trên máy (Local)](#cách-2-chạy-trực-tiếp-trên-máy-local)
- [Các scripts có sẵn](#các-scripts-có-sẵn)
- [Tài liệu API (Endpoints)](#tài-liệu-api-endpoints)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)

## Tính năng nổi bật

- **Quản lý công việc (Task):** Hỗ trợ đầy đủ các thao tác CRUD (Tạo, Đọc, Cập nhật, Xóa).
- **Tìm kiếm và Lọc nâng cao:** Tìm kiếm theo từ khóa, lọc theo giới tính, trạng thái hoàn thành.
- **Phân trang:** Tối ưu hóa hiệu năng khi lấy danh sách lớn.
- **Upload File:**
  - Hỗ trợ tải lên các tệp tin như CV, ảnh đại diện, tài liệu.
  - Sử dụng cơ chế băm (hashing) nội dung file để tránh lưu trữ các file trùng lặp, tiết kiệm dung lượng.
- **Data Seeding:** Cung cấp script để tạo nhanh 500 dữ liệu mẫu với Faker.js, thuận tiện cho việc kiểm thử.
- **Dockerized:** Đóng gói sẵn với Docker và Docker Compose, giúp khởi chạy toàn bộ ứng dụng chỉ bằng một lệnh.

## Công nghệ sử dụng

- **Backend:** Node.js, Express.js
- **Ngôn ngữ:** TypeScript
- **Cơ sở dữ liệu:** MongoDB với Mongoose ODM
- **Upload file:** Multer
- **Containerization:** Docker, Docker Compose
- **Quản lý package:** Yarn

## Yêu cầu

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v20.x hoặc cao hơn)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) và [Docker Compose](https://docs.docker.com/compose/) (nếu chạy bằng Docker)
- Một instance MongoDB (nếu chạy local)

## Hướng dẫn cài đặt và khởi chạy

### 1. Tải mã nguồn

```bash
git clone https://github.com/khanh29204/task_manager_be.git
cd task_manager_be
```

### 2. Cấu hình môi trường

Tạo một file `.env` ở thư mục gốc của dự án bằng cách sao chép từ file `.env.example` (nếu có) hoặc tạo mới với nội dung sau:

```env
# Cổng mà server sẽ chạy
PORT=3000

# Chuỗi kết nối tới MongoDB
# Ví dụ cho local: MONGO_URI=mongodb://localhost:27017/task_manager_db
# Ví dụ cho Docker: MONGO_URI=mongodb://mongodb:27017/task_manager_db
MONGO_URI=mongodb://localhost:27017/task_manager_db

# URL cơ sở của API, dùng để tạo đường dẫn cho file đã upload
BASE_URL=http://localhost:3000
```

**Lưu ý:** Nếu bạn chạy bằng `docker-compose.yml` mà không có service MongoDB, bạn cần cung cấp một chuỗi kết nối `MONGO_URI` đến một cơ sở dữ liệu MongoDB đang hoạt động.

### 3. Chạy ứng dụng

#### Cách 1: Sử dụng Docker (Khuyến khích)

Đây là cách đơn giản và nhanh nhất để khởi chạy ứng dụng mà không cần cài đặt Node.js hay MongoDB trên máy của bạn.

1.  **Chạy Docker Compose:**

    ```bash
    docker-compose up -d
    ```

    Lệnh này sẽ tự động build image và khởi chạy container `task-manager-api` ở chế độ nền.

2.  **Kiểm tra:**
    API sẽ chạy tại `http://localhost:3000`. Thư mục `uploads` sẽ được ánh xạ ra bên ngoài thư mục gốc của dự án.

3.  **Dừng ứng dụng:**
    ```bash
    docker-compose down
    ```

#### Cách 2: Chạy trực tiếp trên máy (Local)

1.  **Cài đặt các dependencies:**

    ```bash
    yarn install --frozen-lockfile
    ```

2.  **Đảm bảo MongoDB đang chạy:**
    Hãy chắc chắn rằng bạn có một server MongoDB đang chạy và `MONGO_URI` trong file `.env` đã được cấu hình chính xác.

3.  **Khởi chạy server development:**

    ```bash
    yarn dev
    ```

    Server sẽ tự động khởi động lại mỗi khi có thay đổi trong mã nguồn.

4.  **Chạy ở chế độ production:**
    ```bash
    yarn build
    yarn start
    ```

## Các scripts có sẵn

Dưới đây là danh sách các script được định nghĩa trong `package.json`:

| Script       | Mô tả                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------- |
| `yarn dev`   | Chạy server ở chế độ development với `ts-node-dev`, tự động reload khi có thay đổi.         |
| `yarn build` | Biên dịch mã nguồn TypeScript từ thư mục `src` sang JavaScript trong thư mục `dist`.        |
| `yarn start` | Chạy ứng dụng đã được biên dịch từ thư mục `dist`. Thích hợp cho môi trường production.     |
| `yarn seed`  | Chạy script để xóa toàn bộ dữ liệu cũ và tạo 500 bản ghi công việc mẫu trong cơ sở dữ liệu. |

## Tài liệu API (Endpoints)

**URL cơ sở:** `/api`

---

### Tasks

#### 1. Lấy danh sách công việc

- **Endpoint:** `GET /tasks`
- **Mô tả:** Lấy danh sách tất cả công việc với khả năng lọc và phân trang.
- **Query Params (tùy chọn):**
  - `search` (string): Tìm kiếm theo `fullname`, `title`, `major`.
  - `gender` (string): Lọc theo giới tính (`MALE`, `FEMALE`, `OTHER`).
  - `is_complete` (boolean): Lọc theo trạng thái hoàn thành (`true` hoặc `false`).
  - `page` (number): Số trang (mặc định: 1).
  - `limit` (number): Số lượng kết quả mỗi trang (mặc định: 30).
- **Phản hồi thành công (200):**
  ```json
  {
    "tasks": [
      {
        "id": "60d0fe4f5311236168a109ca",
        "title": "...",
        "fullname": "...",
        "...": "..."
      }
    ],
    "currentPage": 1,
    "totalPages": 17,
    "totalTasks": 500
  }
  ```

#### 2. Tạo công việc mới

- **Endpoint:** `POST /tasks`
- **Mô tả:** Tạo một công việc mới.
- **Request Body (JSON):**
  ```json
  {
    "title": "Phân tích yêu cầu khách hàng",
    "fullname": "Nguyễn Văn A",
    "gender": "MALE",
    "major": "Phân tích dữ liệu",
    "position": "Nhân viên",
    "cv_path": "http://localhost:3000/api/files/...",
    "avatar": "http://localhost:3000/api/files/..."
  }
  ```
- **Phản hồi thành công (201):** Dữ liệu của công việc vừa được tạo.

#### 3. Cập nhật công việc

- **Endpoint:** `PUT /tasks/:id`
- **Mô tả:** Cập nhật thông tin của một công việc đã có.
- **Request Body (JSON):** Các trường cần cập nhật.
- **Phản hồi thành công (200):** Dữ liệu của công việc sau khi cập nhật.

#### 4. Xóa công việc

- **Endpoint:** `DELETE /tasks/:id`
- **Mô tả:** Xóa một công việc.
- **Phản hồi thành công (200):**
  ```json
  { "message": "Xóa công việc thành công", "id": "id của công việc đã xóa" }
  ```

#### 5. Chuyển đổi trạng thái hoàn thành

- **Endpoint:** `PATCH /tasks/:id/complete`
- **Mô tả:** Đảo ngược trạng thái `is_complete` của công việc (từ `true` sang `false` và ngược lại).
- **Phản hồi thành công (200):** Dữ liệu của công việc sau khi cập nhật.

---

### File Upload

#### Tải file lên

- **Endpoint:** `POST /tasks/upload`
- **Mô tả:** Tải lên một tệp tin.
- **Request Body (`multipart/form-data`):**
  - Key: `file`
  - Value: Tệp tin cần tải lên.
- **Phản hồi thành công (201):**
  ```json
  {
    "url": "http://localhost:3000/api/files/hashedFilename/originalFilename.pdf"
  }
  ```
  URL này có thể được sử dụng để lưu vào các trường như `cv_path`, `avatar` khi tạo hoặc cập nhật công việc.

## Cấu trúc thư mục

```
task_manager_be-main/
├── dist/                     # Thư mục chứa mã nguồn JavaScript đã biên dịch
├── node_modules/             # Chứa các thư viện đã cài đặt
├── src/                      # Thư mục mã nguồn TypeScript
│   ├── config/
│   │   └── db.ts             # Cấu hình kết nối MongoDB
│   ├── controllers/
│   │   └── task.controller.ts # Logic xử lý các request
│   ├── middlewares/
│   │   └── upload.middleware.ts # Middleware xử lý upload file
│   ├── models/
│   │   └── Task.model.ts     # Định nghĩa Schema và Model cho Task
│   ├── routes/
│   │   └── task.routes.ts    # Định nghĩa các endpoints của API
│   ├── utils/
│   │   └── toJSONPlugin.ts   # Plugin cho Mongoose
│   ├── app.ts                # File khởi tạo ứng dụng Express
│   └── seed.ts               # Script tạo dữ liệu mẫu
├── uploads/                  # Thư mục chứa các file đã được upload
├── .env                      # File cấu hình biến môi trường (cần tự tạo)
├── Dockerfile                # Cấu hình để build Docker image
├── docker-compose.yml        # Cấu hình để chạy ứng dụng với Docker Compose
├── package.json              # Thông tin dự án và các dependencies
├── tsconfig.json             # Cấu hình cho trình biên dịch TypeScript
└── yarn.lock                 # Lock file của Yarn
```
