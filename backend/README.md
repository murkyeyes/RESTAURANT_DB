# Restaurant Management System Backend

Backend API cho hệ thống quản lý nhà hàng sử dụng Node.js, Express và SQL Server.

## Cài đặt

```bash
cd backend
npm install
```

## Cấu hình

Sửa file `.env` với thông tin database của bạn:

```
DB_USER=sa
DB_PASSWORD=your_password
DB_SERVER=localhost
DB_NAME=restaurantdb
DB_PORT=1433
PORT=3000
```

## Chạy ứng dụng

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm start
```

Server sẽ chạy tại: http://localhost:3000

## API Endpoints

### Staff
- `GET /api/staff` - Lấy danh sách nhân viên
- `GET /api/staff/:id` - Lấy thông tin nhân viên
- `POST /api/staff` - Tạo nhân viên mới
- `PUT /api/staff/:id` - Cập nhật nhân viên
- `DELETE /api/staff/:id` - Xóa nhân viên

### Customer
- `GET /api/customers` - Lấy danh sách khách hàng
- `GET /api/customers/:id` - Lấy thông tin khách hàng
- `POST /api/customers` - Tạo khách hàng mới
- `PUT /api/customers/:id` - Cập nhật khách hàng
- `DELETE /api/customers/:id` - Xóa khách hàng

### Menu
- `GET /api/menu` - Lấy danh sách menu
- `GET /api/menu/:id` - Lấy thông tin món ăn
- `POST /api/menu` - Tạo món ăn mới
- `PUT /api/menu/:id` - Cập nhật món ăn
- `DELETE /api/menu/:id` - Xóa món ăn

### Orders
- `GET /api/orders` - Lấy danh sách đơn hàng
- `GET /api/orders/:id` - Lấy thông tin đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng
- `DELETE /api/orders/:id` - Xóa đơn hàng

### Tables
- `GET /api/tables` - Lấy danh sách bàn
- `GET /api/tables/:id` - Lấy thông tin bàn
- `POST /api/tables` - Tạo bàn mới
- `PUT /api/tables/:id` - Cập nhật bàn
- `DELETE /api/tables/:id` - Xóa bàn

### Reservations
- `GET /api/reservations` - Lấy danh sách đặt bàn
- `POST /api/reservations` - Tạo đặt bàn mới
- `PUT /api/reservations/:id` - Cập nhật đặt bàn
- `DELETE /api/reservations/:id` - Hủy đặt bàn

### Bills
- `GET /api/bills` - Lấy danh sách hóa đơn
- `GET /api/bills/:id` - Lấy thông tin hóa đơn
- `POST /api/bills` - Tạo hóa đơn mới

### Feedback
- `GET /api/feedback` - Lấy danh sách đánh giá
- `POST /api/feedback` - Tạo đánh giá mới

## Cấu trúc thư mục

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── staff.js
│   │   ├── customer.js
│   │   ├── menu.js
│   │   ├── order.js
│   │   ├── table.js
│   │   └── ...
│   ├── controllers/
│   │   ├── staffController.js
│   │   ├── customerController.js
│   │   ├── menuController.js
│   │   └── ...
│   ├── routes/
│   │   ├── staffRoutes.js
│   │   ├── customerRoutes.js
│   │   └── ...
│   ├── middleware/
│   │   └── errorHandler.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```
