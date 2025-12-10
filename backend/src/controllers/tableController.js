const Table = require('../models/table');

const tableController = {
    // Lấy danh sách tất cả bàn
    getAllTables: async (req, res, next) => {
        try {
            const tables = await Table.getAll();
            res.json({
                success: true,
                data: tables
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy danh sách bàn trống
    getAvailableTables: async (req, res, next) => {
        try {
            const tables = await Table.getAvailable();
            res.json({
                success: true,
                data: tables
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin bàn theo ID
    getTableById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const table = await Table.getById(id);
            
            if (!table) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy bàn'
                });
            }

            res.json({
                success: true,
                data: table
            });
        } catch (error) {
            next(error);
        }
    },

    // Tạo bàn mới
    createTable: async (req, res, next) => {
        try {
            const result = await Table.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo bàn thành công',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    // Cập nhật thông tin bàn
    updateTable: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Table.update(id, req.body);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy bàn'
                });
            }

            res.json({
                success: true,
                message: 'Cập nhật bàn thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Cập nhật trạng thái bàn
    updateTableStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const rowsAffected = await Table.updateStatus(id, status);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy bàn'
                });
            }

            res.json({
                success: true,
                message: 'Cập nhật trạng thái bàn thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Xóa bàn
    deleteTable: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Table.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy bàn'
                });
            }

            res.json({
                success: true,
                message: 'Xóa bàn thành công'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = tableController;
