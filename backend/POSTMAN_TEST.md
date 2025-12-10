# Test API với Postman - Stored Procedures & Functions

## 📋 CÁC API MỚI CẦN TEST

### 1. Thêm khách hàng (Stored Procedure)
```
POST http://localhost:3000/api/procedures/customers
Content-Type: application/json

{
  "Customer_ID": 10,
  "Email": "newcustomer@example.com",
  "Full_Name": "Nguyen Van Test",
  "PhoneNumber": "0909000001"
}
```

### 2. Cập nhật khách hàng
```
PUT http://localhost:3000/api/procedures/customers/10
Content-Type: application/json

{
  "Full_Name": "Nguyen Van Updated"
}
```

### 3. Tạo đơn hàng mới
```
POST http://localhost:3000/api/procedures/orders
Content-Type: application/json

{
  "Order_ID": 10,
  "Table_ID": 1,
  "Customer_ID": 10,
  "Staff_ID": 1
}
```

### 4. Thêm món vào đơn hàng
```
POST http://localhost:3000/api/procedures/orders/items
Content-Type: application/json

{
  "Order_ID": 10,
  "Dish_ID": 1,
  "Quantity": 2,
  "Item_note": "Khong hanh"
}
```

### 5. Thống kê doanh thu
```
GET http://localhost:3000/api/procedures/reports/revenue?tuNgay=2025-12-01&denNgay=2025-12-31
```

### 6. Món ăn phổ biến
```
GET http://localhost:3000/api/procedures/reports/popular-dishes?top=5
```

### 7. Tính điểm khách hàng (Function)
```
GET http://localhost:3000/api/procedures/customers/1/points
```

### 8. Kiểm tra membership (Function)
```
GET http://localhost:3000/api/procedures/customers/1/membership
```

### 9. Đếm đơn hàng khách hàng (Function)
```
GET http://localhost:3000/api/procedures/customers/1/order-count
```

### 10. Doanh thu nhân viên (Function)
```
GET http://localhost:3000/api/procedures/staff/1/revenue?tuNgay=2025-12-01&denNgay=2025-12-31
```

### 11. Xóa khách hàng (Test ràng buộc)
```
DELETE http://localhost:3000/api/procedures/customers/10
```

---

## ✅ KẾT QUẢ MONG ĐỢI:

### Thành công:
```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

### Lỗi (vi phạm ràng buộc):
```json
{
  "success": false,
  "message": "Email khong hop le. Phai co dang: user@domain.com"
}
```

---

## 🎯 TEST RÀNG BUỘC:

### Test 1: Email không hợp lệ
```json
POST /api/procedures/customers
{
  "Customer_ID": 11,
  "Email": "invalid-email",  // ❌ Thiếu @
  "Full_Name": "Test"
}
```
**Kết quả:** Lỗi "Email khong hop le"

### Test 2: Email trùng lặp
```json
POST /api/procedures/customers
{
  "Customer_ID": 12,
  "Email": "alice@example.com",  // ❌ Đã tồn tại
  "Full_Name": "Test"
}
```
**Kết quả:** Lỗi "Email da ton tai"

### Test 3: Xóa khách hàng có đơn hàng
```
DELETE /api/procedures/customers/1
```
**Kết quả:** Lỗi "Khong the xoa khach hang da co don hang"

---

## 📊 TEST TRIGGER TỰ ĐỘNG:

### Test Trigger: Tự động tính Total_price
1. Tạo order mới
2. Thêm 2 món vào order
3. Kiểm tra `Total_price` trong table `order` được tự động cập nhật

### Test Trigger: Tự động cộng điểm membership
1. Tạo bill cho khách hàng có membership
2. Kiểm tra `Total_points` tăng lên
3. Kiểm tra `Member_rank` tự động nâng cấp

---

## 🚀 NHANH CHÓNG TEST TẤT CẢ:

Copy đoạn này vào Postman và chạy từng request!
