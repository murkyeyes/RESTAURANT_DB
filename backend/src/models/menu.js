const { getConnection, sql } = require('../config/database');

class Menu {
    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT * FROM menu_item');
        return result.recordset;
    }

    static async getDishes() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT m.*, d.Dish_type, d.Prep_time
                FROM menu_item m
                INNER JOIN dish d ON m.Item_ID = d.Dish_ID
                WHERE m.Item_type = 'DISH'
            `);
        return result.recordset;
    }

    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM menu_item WHERE Item_ID = @id');
        return result.recordset[0];
    }

    static async getDishWithIngredients(dishId) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('dishId', sql.Int, dishId)
            .query(`
                SELECT m.*, d.Dish_type, d.Prep_time,
                       i.Ingredient_ID, im.Name as Ingredient_Name,
                       di.Quantity_used, di.Unit
                FROM menu_item m
                INNER JOIN dish d ON m.Item_ID = d.Dish_ID
                LEFT JOIN dish_ingredient di ON d.Dish_ID = di.Dish_ID
                LEFT JOIN ingredient i ON di.Ingredient_ID = i.Ingredient_ID
                LEFT JOIN menu_item im ON i.Ingredient_ID = im.Item_ID
                WHERE m.Item_ID = @dishId
            `);
        return result.recordset;
    }

    static async create(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, data.Item_ID)
            .input('name', sql.NVarChar, data.Name)
            .input('category', sql.NVarChar, data.Category)
            .input('price', sql.Decimal(18, 2), data.Price)
            .input('itemType', sql.NVarChar, data.Item_type)
            .query('INSERT INTO menu_item (Item_ID, Name, Category, Price, Item_type) VALUES (@id, @name, @category, @price, @itemType)');
        return result.rowsAffected[0];
    }

    static async update(id, data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, data.Name)
            .input('category', sql.NVarChar, data.Category)
            .input('price', sql.Decimal(18, 2), data.Price)
            .query('UPDATE menu_item SET Name = @name, Category = @category, Price = @price WHERE Item_ID = @id');
        return result.rowsAffected[0];
    }

    static async delete(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM menu_item WHERE Item_ID = @id');
        return result.rowsAffected[0];
    }
}

module.exports = Menu;
