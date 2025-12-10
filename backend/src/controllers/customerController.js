const Customer = require('../models/customer');

const customerController = {
    // Lấy danh sách tất cả khách hàng
    getAllCustomers: async (req, res, next) => {
        try {
            const customers = await Customer.getAll();
            res.json({
                success: true,
                data: customers
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin khách hàng theo ID
    getCustomerById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await Customer.getById(id);
            
            if (!customer) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy khách hàng'
                });
            }

            res.json({
                success: true,
                data: customer
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin khách hàng với số điện thoại
    getCustomerWithPhones: async (req, res, next) => {
        try {
            const { id } = req.params;
            const customerData = await Customer.getWithPhoneNumbers(id);
            
            if (customerData.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy khách hàng'
                });
            }

            res.json({
                success: true,
                data: customerData
            });
        } catch (error) {
            next(error);
        }
    },

    // Tạo khách hàng mới
    createCustomer: async (req, res, next) => {
        try {
            const result = await Customer.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo khách hàng thành công',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    // Cập nhật thông tin khách hàng
    updateCustomer: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Customer.update(id, req.body);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy khách hàng'
                });
            }

            res.json({
                success: true,
                message: 'Cập nhật khách hàng thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Xóa khách hàng
    deleteCustomer: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Customer.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy khách hàng'
                });
            }

            res.json({
                success: true,
                message: 'Xóa khách hàng thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Thêm số điện thoại cho khách hàng
    addPhoneNumber: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { phoneNumber } = req.body;
            
            const result = await Customer.addPhoneNumber(id, phoneNumber);
            res.status(201).json({
                success: true,
                message: 'Thêm số điện thoại thành công'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = customerController;
