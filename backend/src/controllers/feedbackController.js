const Feedback = require('../models/feedback');

const feedbackController = {
    // Lấy danh sách tất cả đánh giá
    getAllFeedback: async (req, res, next) => {
        try {
            const feedback = await Feedback.getAll();
            res.json({
                success: true,
                data: feedback
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin đánh giá theo ID
    getFeedbackById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const feedback = await Feedback.getById(id);
            
            if (!feedback) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đánh giá'
                });
            }

            res.json({
                success: true,
                data: feedback
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy đánh giá món ăn
    getDishFeedback: async (req, res, next) => {
        try {
            const { id } = req.params;
            const feedback = await Feedback.getDishFeedback(id);
            
            res.json({
                success: true,
                data: feedback
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy đánh giá nhân viên
    getStaffFeedback: async (req, res, next) => {
        try {
            const { id } = req.params;
            const feedback = await Feedback.getStaffFeedback(id);
            
            res.json({
                success: true,
                data: feedback
            });
        } catch (error) {
            next(error);
        }
    },

    // Tạo đánh giá mới
    createFeedback: async (req, res, next) => {
        try {
            const result = await Feedback.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo đánh giá thành công',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    // Xóa đánh giá
    deleteFeedback: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Feedback.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đánh giá'
                });
            }

            res.json({
                success: true,
                message: 'Xóa đánh giá thành công'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = feedbackController;
