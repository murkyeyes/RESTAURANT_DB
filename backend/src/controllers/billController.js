const Bill = require('../models/bill');

const billController = {
    // Lấy danh sách tất cả hóa đơn
    getAllBills: async (req, res, next) => {
        try {
            const bills = await Bill.getAll();
            res.json({
                success: true,
                data: bills
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin hóa đơn theo ID
    getBillById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const bill = await Bill.getById(id);
            
            if (!bill) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy hóa đơn'
                });
            }

            res.json({
                success: true,
                data: bill
            });
        } catch (error) {
            next(error);
        }
    },

    // Tạo hóa đơn mới
    createBill: async (req, res, next) => {
        try {
            const result = await Bill.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo hóa đơn thành công',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    // Xóa hóa đơn
    deleteBill: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Bill.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy hóa đơn'
                });
            }

            res.json({
                success: true,
                message: 'Xóa hóa đơn thành công'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = billController;
