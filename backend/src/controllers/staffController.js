const Staff = require('../models/staff');

const staffController = {
    // Lấy danh sách tất cả nhân viên
    getAllStaff: async (req, res, next) => {
        try {
            const staff = await Staff.getAll();
            res.json({
                success: true,
                data: staff
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin nhân viên theo ID
    getStaffById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const staff = await Staff.getById(id);
            
            if (!staff) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy nhân viên'
                });
            }

            res.json({
                success: true,
                data: staff
            });
        } catch (error) {
            next(error);
        }
    },

    // Tạo nhân viên mới
    createStaff: async (req, res, next) => {
        try {
            const result = await Staff.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo nhân viên thành công',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    // Cập nhật thông tin nhân viên
    updateStaff: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Staff.update(id, req.body);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy nhân viên'
                });
            }

            res.json({
                success: true,
                message: 'Cập nhật nhân viên thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Xóa nhân viên
    deleteStaff: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Staff.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy nhân viên'
                });
            }

            res.json({
                success: true,
                message: 'Xóa nhân viên thành công'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = staffController;
