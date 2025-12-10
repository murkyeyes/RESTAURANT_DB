// Controller cho các stored procedures và functions đặc biệt
const { getConnection, sql } = require('../config/database');

// Thêm khách hàng (dùng stored procedure)
const themKhachHang = async (req, res, next) => {
    try {
        const { Customer_ID, Email, Full_Name, PhoneNumber } = req.body;
        
        const pool = await getConnection();
        await pool.request()
            .input('CustomerID', sql.Int, Customer_ID)
            .input('Email', sql.NVarChar(100), Email)
            .input('FullName', sql.NVarChar(100), Full_Name)
            .input('PhoneNumber', sql.NVarChar(20), PhoneNumber || null)
            .execute('sp_ThemKhachHang');
        
        res.status(201).json({
            success: true,
            message: 'Thêm khách hàng thành công',
            data: { Customer_ID, Email, Full_Name }
        });
    } catch (error) {
        next(error);
    }
};

// Cập nhật khách hàng
const capNhatKhachHang = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { Email, Full_Name } = req.body;
        
        const pool = await getConnection();
        await pool.request()
            .input('CustomerID', sql.Int, id)
            .input('Email', sql.NVarChar(100), Email || null)
            .input('FullName', sql.NVarChar(100), Full_Name || null)
            .execute('sp_CapNhatKhachHang');
        
        res.json({
            success: true,
            message: 'Cập nhật khách hàng thành công'
        });
    } catch (error) {
        next(error);
    }
};

// Xóa khách hàng
const xoaKhachHang = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const pool = await getConnection();
        await pool.request()
            .input('CustomerID', sql.Int, id)
            .execute('sp_XoaKhachHang');
        
        res.json({
            success: true,
            message: 'Xóa khách hàng thành công'
        });
    } catch (error) {
        next(error);
    }
};

// Tạo đơn hàng
const taoDonHang = async (req, res, next) => {
    try {
        const { Order_ID, Table_ID, Customer_ID, Staff_ID, Order_time } = req.body;
        
        const pool = await getConnection();
        await pool.request()
            .input('OrderID', sql.Int, Order_ID)
            .input('TableID', sql.Int, Table_ID)
            .input('CustomerID', sql.Int, Customer_ID)
            .input('StaffID', sql.Int, Staff_ID)
            .input('OrderTime', sql.DateTime, Order_time || null)
            .execute('sp_TaoDonHang');
        
        res.status(201).json({
            success: true,
            message: 'Tạo đơn hàng thành công',
            data: { Order_ID }
        });
    } catch (error) {
        next(error);
    }
};

// Thêm món vào đơn hàng
const themMonVaoDonHang = async (req, res, next) => {
    try {
        const { Order_ID, Dish_ID, Quantity, Item_note } = req.body;
        
        const pool = await getConnection();
        await pool.request()
            .input('OrderID', sql.Int, Order_ID)
            .input('DishID', sql.Int, Dish_ID)
            .input('Quantity', sql.Int, Quantity)
            .input('ItemNote', sql.NVarChar(200), Item_note || null)
            .execute('sp_ThemMonVaoDonHang');
        
        res.status(201).json({
            success: true,
            message: 'Thêm món vào đơn hàng thành công'
        });
    } catch (error) {
        next(error);
    }
};

// Thống kê doanh thu
const thongKeDoanhThu = async (req, res, next) => {
    try {
        const { tuNgay, denNgay } = req.query;
        
        const pool = await getConnection();
        const result = await pool.request()
            .input('TuNgay', sql.Date, tuNgay)
            .input('DenNgay', sql.Date, denNgay)
            .execute('sp_ThongKeDoanhThu');
        
        res.json({
            success: true,
            data: result.recordset
        });
    } catch (error) {
        next(error);
    }
};

// Món ăn phổ biến
const monAnPhoBien = async (req, res, next) => {
    try {
        const { top = 10 } = req.query;
        
        const pool = await getConnection();
        const result = await pool.request()
            .input('Top', sql.Int, parseInt(top))
            .execute('sp_MonAnPhoBien');
        
        res.json({
            success: true,
            data: result.recordset
        });
    } catch (error) {
        next(error);
    }
};

// Tính điểm khách hàng (function)
const tinhDiemKhachHang = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const pool = await getConnection();
        const result = await pool.request()
            .input('CustomerID', sql.Int, id)
            .query('SELECT dbo.fn_TinhDiemKhachHang(@CustomerID) AS TotalPoints');
        
        res.json({
            success: true,
            data: {
                Customer_ID: parseInt(id),
                Total_points: result.recordset[0].TotalPoints
            }
        });
    } catch (error) {
        next(error);
    }
};

// Kiểm tra membership (function)
const kiemTraMembership = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const pool = await getConnection();
        const result = await pool.request()
            .input('CustomerID', sql.Int, id)
            .query('SELECT dbo.fn_KiemTraMembership(@CustomerID) AS MemberRank');
        
        res.json({
            success: true,
            data: {
                Customer_ID: parseInt(id),
                Member_rank: result.recordset[0].MemberRank
            }
        });
    } catch (error) {
        next(error);
    }
};

// Tính doanh thu nhân viên (function)
const tinhDoanhThuNhanVien = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { tuNgay, denNgay } = req.query;
        
        const pool = await getConnection();
        const result = await pool.request()
            .input('StaffID', sql.Int, id)
            .input('TuNgay', sql.Date, tuNgay)
            .input('DenNgay', sql.Date, denNgay)
            .query('SELECT dbo.fn_TinhDoanhThuNhanVien(@StaffID, @TuNgay, @DenNgay) AS TotalRevenue');
        
        res.json({
            success: true,
            data: {
                Staff_ID: parseInt(id),
                Total_revenue: result.recordset[0].TotalRevenue,
                From_date: tuNgay,
                To_date: denNgay
            }
        });
    } catch (error) {
        next(error);
    }
};

// Đếm đơn hàng khách hàng (function)
const demDonHang = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const pool = await getConnection();
        const result = await pool.request()
            .input('CustomerID', sql.Int, id)
            .query('SELECT dbo.fn_DemDonHang(@CustomerID) AS OrderCount');
        
        res.json({
            success: true,
            data: {
                Customer_ID: parseInt(id),
                Order_count: result.recordset[0].OrderCount
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
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
};
