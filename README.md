# Restaurant Database Management System

Hệ thống quản lý nhà hàng sử dụng Node.js Backend với SQL Server Database.

## 📋 Mục lục
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt](#cài-đặt)
- [Cấu hình Database](#cấu-hình-database)
- [Chạy ứng dụng](#chạy-ứng-dụng)
- [API Endpoints](#api-endpoints)
- [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)

---

## 🔧 Yêu cầu hệ thống

### Phần mềm cần cài đặt:
- **Node.js** (v14 trở lên) - [Download](https://nodejs.org/)
- **SQL Server Express** (hoặc SQL Server) - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- **SQL Server Management Studio (SSMS)** - [Download](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
- **Git** (tùy chọn) - [Download](https://git-scm.com/)

---

## 📁 Cấu trúc dự án

```
RESTAURANT/
│
├── backend/                          # Backend Node.js
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Cấu hình kết nối SQL Server
│   │   ├── controllers/             # Business logic
│   │   ├── models/                  # Data models
│   │   ├── routes/                  # API routes
│   │   ├── middleware/              # Middleware functions
│   │   └── server.js                # Entry point
│   │
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies
│   └── test-connection.js           # Test database connection
│
├── restaurantdb_full_sqlserver.sql  # SQL script tạo database
└── README.md                        # File này
```

---

## 🚀 Cài đặt

### Bước 1: Clone hoặc tải project
```bash
cd D:\HCMUT\HCMUT_HK251\DATA_BASE\RESTAURANT
```

### Bước 2: Cài đặt dependencies
```bash
cd backend
npm install
```

Dependencies sẽ được cài:
- `express` - Web framework
- `mssql` - SQL Server client
- `dotenv` - Environment variables
- `cors` - Cross-Origin Resource Sharing
- `body-parser` - Parse request body

---

## 🗄️ Cấu hình Database

### Bước 1: Tạo Database trong SQL Server

1. **Mở SQL Server Management Studio (SSMS)**
2. **Kết nối** với server: `localhost\SQLEXPRESS` (Windows Authentication)
3. **Mở file SQL script**:
   - File → Open → File...
   - Chọn: `restaurantdb_full_sqlserver.sql`
4. **Execute (F5)** để tạo database và insert data

Database `restaurantdb` sẽ được tạo với:
- 19 tables
- Sample data cho tất cả tables

### Bước 2: Kiểm tra tài khoản SQL Server

Trong SSMS, chạy query sau để kiểm tra tài khoản `sa`:

```sql
-- Kiểm tra tài khoản sa
SELECT name, is_disabled 
FROM sys.sql_logins 
WHERE name = 'sa';

-- Nếu is_disabled = 1, bật tài khoản:
ALTER LOGIN sa ENABLE;
ALTER LOGIN sa WITH PASSWORD = 'your_password_here';
```

### Bước 3: Cấu hình file .env

Tạo/chỉnh sửa file `backend/.env`:

```env
# Database Configuration (Microsoft SQL Server)
DB_SERVER=localhost
DB_NAME=restaurantdb
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=your_password_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

**⚠️ Lưu ý:**
- `DB_SERVER=localhost` (không cần `\SQLEXPRESS` khi kết nối qua port)
- `DB_USER=sa` và `DB_PASSWORD` cần khớp với tài khoản trong SQL Server
- Đổi `your_password_here` thành password thực tế của bạn

### Bước 4: Test kết nối Database

```bash
cd backend
node test-connection.js
```

**Kết quả mong đợi:**
```
✅ Kết nối database thành công!
📋 Danh sách tables trong database:
1. audit_log
2. bill
3. customer
...
```

---

## ▶️ Chạy ứng dụng

### Development mode (tự động restart khi code thay đổi):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

Server sẽ chạy tại: **http://localhost:3000**

---

## 🧪 Test API với Postman

### Cài đặt Postman
- **Download**: [Postman](https://www.postman.com/downloads/)
- Hoặc dùng **Thunder Client** extension trong VS Code

### Các bước test API:

1. **Khởi động server**:
   ```bash
   npm start
   ```

2. **Mở Postman** và tạo request mới

3. **Test endpoint mẫu**:

#### Ví dụ 1: Lấy danh sách khách hàng
- Method: `GET`
- URL: `http://localhost:3000/api/customers`
- Click **Send**

#### Ví dụ 2: Tạo khách hàng mới
- Method: `POST`
- URL: `http://localhost:3000/api/customers`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  ```json
  {
    "Customer_ID": 7,
    "Email": "test@example.com",
    "Full_Name": "Nguyen Van Test",
    "PhoneNumber": "0907000001"
  }
  ```

#### Ví dụ 3: Lấy thông tin 1 khách hàng
- Method: `GET`
- URL: `http://localhost:3000/api/customers/1`

#### Ví dụ 4: Cập nhật khách hàng
- Method: `PUT`
- URL: `http://localhost:3000/api/customers/7`
- Body (raw JSON):
  ```json
  {
    "Full_Name": "Nguyen Van Updated"
  }
  ```

#### Ví dụ 5: Xóa khách hàng
- Method: `DELETE`
- URL: `http://localhost:3000/api/customers/7`

---

## 🌐 API Endpoints

### Customer Management
- `GET /api/customers` - Lấy danh sách khách hàng
- `GET /api/customers/:id` - Lấy thông tin 1 khách hàng
- `POST /api/customers` - Tạo khách hàng mới
- `PUT /api/customers/:id` - Cập nhật khách hàng
- `DELETE /api/customers/:id` - Xóa khách hàng

### Staff Management
- `GET /api/staff` - Lấy danh sách nhân viên
- `GET /api/staff/:id` - Lấy thông tin 1 nhân viên
- `POST /api/staff` - Tạo nhân viên mới
- `PUT /api/staff/:id` - Cập nhật nhân viên
- `DELETE /api/staff/:id` - Xóa nhân viên

### Menu Management
- `GET /api/menu` - Lấy danh sách món ăn
- `GET /api/menu/:id` - Lấy thông tin 1 món
- `POST /api/menu` - Tạo món mới
- `PUT /api/menu/:id` - Cập nhật món
- `DELETE /api/menu/:id` - Xóa món

### Order Management
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng
- `DELETE /api/orders/:id` - Xóa đơn hàng

### Bill Management
- `GET /api/bills` - Lấy danh sách hóa đơn
- `GET /api/bills/:id` - Lấy chi tiết hóa đơn
- `POST /api/bills` - Tạo hóa đơn mới

### Reservation Management
- `GET /api/reservations` - Lấy danh sách đặt bàn
- `POST /api/reservations` - Tạo đặt bàn mới
- `PUT /api/reservations/:id` - Cập nhật đặt bàn
- `DELETE /api/reservations/:id` - Hủy đặt bàn

### Table Management
- `GET /api/tables` - Lấy danh sách bàn
- `GET /api/tables/:id` - Lấy thông tin 1 bàn
- `PUT /api/tables/:id` - Cập nhật trạng thái bàn

### Feedback Management
- `GET /api/feedback` - Lấy danh sách feedback
- `POST /api/feedback` - Tạo feedback mới

### **🔥 Stored Procedures & Functions (MỚI)**

#### Quản lý khách hàng (Procedures)
- `POST /api/procedures/customers` - Thêm khách hàng (với validation)
- `PUT /api/procedures/customers/:id` - Cập nhật khách hàng
- `DELETE /api/procedures/customers/:id` - Xóa khách hàng (kiểm tra ràng buộc)

#### Quản lý đơn hàng (Procedures)
- `POST /api/procedures/orders` - Tạo đơn hàng mới
- `POST /api/procedures/orders/items` - Thêm món vào đơn hàng

#### Thống kê & Báo cáo (Procedures)
- `GET /api/procedures/reports/revenue?tuNgay=2025-12-01&denNgay=2025-12-31` - Thống kê doanh thu
- `GET /api/procedures/reports/popular-dishes?top=10` - Món ăn phổ biến

#### Functions - Khách hàng
- `GET /api/procedures/customers/:id/points` - Tính điểm tích lũy
- `GET /api/procedures/customers/:id/membership` - Kiểm tra hạng thành viên
- `GET /api/procedures/customers/:id/order-count` - Đếm số đơn hàng

#### Functions - Nhân viên
- `GET /api/procedures/staff/:id/revenue?tuNgay=2025-12-01&denNgay=2025-12-31` - Doanh thu nhân viên

---

## ⚠️ Xử lý lỗi thường gặp

### 1. Lỗi: `Failed to connect to localhost\SQLEXPRESS in 15000ms`

**Nguyên nhân:** SQL Browser service không chạy hoặc không thể kết nối named instance.

**Giải pháp:**
- Sửa `DB_SERVER=localhost\SQLEXPRESS` → `DB_SERVER=localhost` trong `.env`
- Đảm bảo `DB_PORT=1433`

### 2. Lỗi: `Login failed for user 'sa'`

**Nguyên nhân:** Tài khoản `sa` bị disable hoặc password sai.

**Giải pháp:**
```sql
-- Trong SSMS, chạy:
ALTER LOGIN sa ENABLE;
ALTER LOGIN sa WITH PASSWORD = 'your_password';
```

### 3. Lỗi: `Cannot open database "restaurantdb"`

**Nguyên nhân:** Database chưa được tạo.

**Giải pháp:**
- Chạy file `restaurantdb_full_sqlserver.sql` trong SSMS

### 4. Lỗi: `Login failed. The login is from an untrusted domain`

**Nguyên nhân:** Cố gắng dùng Windows Authentication nhưng không được hỗ trợ từ Node.js.

**Giải pháp:**
- Dùng SQL Server Authentication (tài khoản `sa`)
- Đảm bảo `DB_USER` và `DB_PASSWORD` có giá trị trong `.env`

### 5. Lỗi khi cài npm packages

**Giải pháp:**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 📊 Database Schema

Database bao gồm các tables chính:

### Core Tables
- **staff** - Thông tin nhân viên
- **customer** - Thông tin khách hàng
- **membership** - Thông tin thành viên
- **restaurant_table** - Thông tin bàn ăn
- **menu_item** - Thực đơn
- **dish** - Món ăn
- **ingredient** - Nguyên liệu
- **warehouse** - Kho hàng

### Transaction Tables
- **order** - Đơn hàng
- **orderitem** - Chi tiết đơn hàng
- **bill** - Hóa đơn
- **table_reservation** - Đặt bàn

### Relationship Tables
- **dish_ingredient** - Nguyên liệu của món ăn
- **phonenumber** - Số điện thoại khách hàng
- **staff_supervision** - Quan hệ quản lý nhân viên

### Feedback & Audit
- **feedback** - Phản hồi chung
- **dish_feedback** - Phản hồi món ăn
- **staff_feedback** - Phản hồi nhân viên
- **audit_log** - Lịch sử thao tác

---

## 🔐 Bảo mật

**⚠️ LƯU Ý QUAN TRỌNG:**
- **KHÔNG** commit file `.env` lên Git (đã có trong `.gitignore`)
- Đổi password `sa` thành password mạnh
- Sử dụng biến môi trường cho production
- Bật encryption nếu deploy lên server

---

## 👥 Tác giả

- **HCMUT - Database Course HK251**
- Project: Restaurant Management System

---

## 📝 License

This project is for educational purposes only.

---

## 🆘 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra lại các bước trong phần [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)
2. Chạy `node test-connection.js` để test kết nối database
3. Kiểm tra logs trong terminal khi chạy server

---

**Chúc bạn thành công! 🎉**
