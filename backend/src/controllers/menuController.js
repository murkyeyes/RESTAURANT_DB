const Menu = require('../models/menu');

const menuController = {
    // Lấy tất cả menu items
    getAllMenuItems: async (req, res, next) => {
        try {
            const items = await Menu.getAll();
            res.json({
                success: true,
                data: items
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy tất cả món ăn
    getAllDishes: async (req, res, next) => {
        try {
            const dishes = await Menu.getDishes();
            res.json({
                success: true,
                data: dishes
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy thông tin món ăn theo ID
    getMenuItemById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Menu.getById(id);
            
            if (!item) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy món ăn'
                });
            }

            res.json({
                success: true,
                data: item
            });
        } catch (error) {
            next(error);
        }
    },

    // Lấy món ăn với nguyên liệu
    getDishWithIngredients: async (req, res, next) => {
        try {
            const { id } = req.params;
            const dish = await Menu.getDishWithIngredients(id);
            
            if (dish.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy món ăn'
                });
            }

            res.json({
                success: true,
                data: dish
            });
        } catch (error) {
            next(error);
        }
    },

    // Tạo menu item mới
    createMenuItem: async (req, res, next) => {
        try {
            const result = await Menu.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Tạo món ăn thành công',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },

    // Cập nhật menu item
    updateMenuItem: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Menu.update(id, req.body);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy món ăn'
                });
            }

            res.json({
                success: true,
                message: 'Cập nhật món ăn thành công'
            });
        } catch (error) {
            next(error);
        }
    },

    // Xóa menu item
    deleteMenuItem: async (req, res, next) => {
        try {
            const { id } = req.params;
            const rowsAffected = await Menu.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy món ăn'
                });
            }

            res.json({
                success: true,
                message: 'Xóa món ăn thành công'
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = menuController;
