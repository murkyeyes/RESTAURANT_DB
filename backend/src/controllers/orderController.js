const Order = require('../models/order');

const orderController = {
    // Lấy danh sách tất cả đơn hàng
    getAllOrders: async (req, res, next) => {
        try {
            const orders = await Order.getAll();
            res.json({
                success: true,
                data: orders
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin đơn hàng theo ID
    getOrderById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await Order.getById(id);
            
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng'
                });
            }

            res.json({
                success: true,
                data: order
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy chi tiết đơn hàng
    getOrderDetails: async (req, res, next) => {
        try {
            const { id } = req.params;
            const orderDetails = await Order.getOrderDetails(id);
            
            res.json({
                success: true,
                data: orderDetails
            });
        } catch (error) {
            next(error);
        }
    },

    // Tạo đơn hàng mới
    createOrder: async (req, res, next) => {
        try {
            const result = await Order.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo đơn hàng thành công',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    // Thêm món ăn vào đơn hàng
    addOrderItem: async (req, res, next) => {
        try {
            const result = await Order.addOrderItem(req.body);
            res.status(201).json({
                success: true,
                message: 'Thêm món ăn vào đơn hàng thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Cập nhật đơn hàng
    updateOrder: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Order.update(id, req.body);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng'
                });
            }

            res.json({
                success: true,
                message: 'Cập nhật đơn hàng thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Xóa đơn hàng
    deleteOrder: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Order.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng'
                });
            }

            res.json({
                success: true,
                message: 'Xóa đơn hàng thành công'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = orderController;
