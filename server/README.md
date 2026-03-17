# WebBrochure Server (MongoDB)

Backend nhỏ dùng **Express + Mongoose** để lưu `Account` và `Customer` (có trường `voucher`).

## 1) Yêu cầu

- Node.js 18+ (khuyến nghị 20+)
- MongoDB (local hoặc Atlas)

Tuỳ chọn (dễ nhất): chạy MongoDB bằng Docker:

```bash
docker compose up -d
```

## 2) Cấu hình

Trong thư mục `server/`:

```bash
npm install
Copy-Item .env.example .env
```

Sửa `MONGODB_URI` trong `.env` nếu cần.

## 3) Chạy server

```bash
npm run dev
```

Healthcheck:

- GET `http://localhost:4000/health`

## 4) API chính (voucher)

- POST `/api/customers`
  - body:
    ```json
    { "name": "Nguyen Van A", "phone": "0901234567", "voucher": "SALE10" }
    ```
  - Tự động **upsert** theo `phone` (có thể gọi lại để cập nhật voucher).

- GET `/api/customers/by-phone/:phone`
- GET `/api/customers/by-phone/:phone/voucher`

## 5) Account (demo)

- POST `/api/accounts/register`
  - body: `{ "username": "thai", "password": "your_password" }`

Trong MongoDB document sẽ lưu dạng:

```json
{ "username": "thai", "password": "<hashed_password>" }
```

## 6) Seed dữ liệu mẫu

```bash
npm run seed
```

Seed sẽ tạo 1 account + 1 customer mẫu.
