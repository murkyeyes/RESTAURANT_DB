const Reservation = require('../models/reservation');

const reservationController = {
    // Lấy danh sách tất cả đặt bàn
    getAllReservations: async (req, res, next) => {
        try {
            const reservations = await Reservation.getAll();
            res.json({
                success: true,
                data: reservations
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin đặt bàn theo ID
    getReservationById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const reservation = await Reservation.getById(id);
            
            if (!reservation) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đặt bàn'
                });
            }

            res.json({
                success: true,
                data: reservation
            });
        } catch (error) {
            next(error);
        }
    },

    // Tạo đặt bàn mới
    createReservation: async (req, res, next) => {
        try {
            const result = await Reservation.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Đặt bàn thành công',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    // Cập nhật trạng thái đặt bàn
    updateReservation: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Reservation.update(id, req.body);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đặt bàn'
                });
            }

            res.json({
                success: true,
                message: 'Cập nhật đặt bàn thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Hủy đặt bàn
    deleteReservation: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Reservation.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đặt bàn'
                });
            }

            res.json({
                success: true,
                message: 'Hủy đặt bàn thành công'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = reservationController;
