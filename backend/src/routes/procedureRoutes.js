const express = require('express');
const router = express.Router();
const {
    themKhachHang,
    capNhatKhachHang,
    xoaKhachHang,
    taoDonHang,
    themMonVaoDonHang,
    thongKeDoanhThu,
    monAnPhoBien,
    tinhDiemKhachHang,
    kiemTraMembership,
    tinhDoanhThuNhanVien,
    demDonHang
} = require('../controllers/procedureController');

// ==========================================
// STORED PROCEDURES ROUTES
// ==========================================

// Quản lý khách hàng
router.post('/customers', themKhachHang);
router.put('/customers/:id', capNhatKhachHang);
router.delete('/customers/:id', xoaKhachHang);

// Quản lý đơn hàng
router.post('/orders', taoDonHang);
router.post('/orders/items', themMonVaoDonHang);

// Thống kê & báo cáo
router.get('/reports/revenue', thongKeDoanhThu);
router.get('/reports/popular-dishes', monAnPhoBien);

// ==========================================
// FUNCTIONS ROUTES
// ==========================================

// Functions cho khách hàng
router.get('/customers/:id/points', tinhDiemKhachHang);
router.get('/customers/:id/membership', kiemTraMembership);
router.get('/customers/:id/order-count', demDonHang);

// Functions cho nhân viên
router.get('/staff/:id/revenue', tinhDoanhThuNhanVien);

module.exports = router;
