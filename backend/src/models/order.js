const { getConnection, sql } = require('../config/database');

class Order {
    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT o.*, c.Full_Name as Customer_Name, s.Full_name as Staff_Name, t.Type as Table_Type
                FROM [order] o
                LEFT JOIN customer c ON o.Customer_ID = c.Customer_ID
                LEFT JOIN staff s ON o.Staff_ID = s.Staff_ID
                LEFT JOIN restaurant_table t ON o.Table_ID = t.Table_ID
                ORDER BY o.Order_time DESC
            `);
        return result.recordset;
    }

    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT o.*, c.Full_Name as Customer_Name, s.Full_name as Staff_Name
                FROM [order] o
                LEFT JOIN customer c ON o.Customer_ID = c.Customer_ID
                LEFT JOIN staff s ON o.Staff_ID = s.Staff_ID
                WHERE o.Order_ID = @id
            `);
        return result.recordset[0];
    }

    static async getOrderDetails(orderId) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('orderId', sql.Int, orderId)
            .query(`
                SELECT oi.*, m.Name as Dish_Name, m.Category
                FROM orderitem oi
                INNER JOIN dish d ON oi.Dish_ID = d.Dish_ID
                INNER JOIN menu_item m ON d.Dish_ID = m.Item_ID
                WHERE oi.Order_ID = @orderId
            `);
        return result.recordset;
    }

    static async create(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, data.Order_ID)
            .input('tableId', sql.Int, data.Table_ID)
            .input('customerId', sql.Int, data.Customer_ID)
            .input('staffId', sql.Int, data.Staff_ID)
            .input('orderTime', sql.DateTime, data.Order_time)
            .input('status', sql.NVarChar, data.Status)
            .input('totalPrice', sql.Decimal(18, 2), data.Total_price || 0)
            .query(`
                INSERT INTO [order] (Order_ID, Table_ID, Customer_ID, Staff_ID, Order_time, Status, Total_price) 
                VALUES (@id, @tableId, @customerId, @staffId, @orderTime, @status, @totalPrice)
            `);
        return result.rowsAffected[0];
    }

    static async addOrderItem(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('orderId', sql.Int, data.Order_ID)
            .input('dishId', sql.Int, data.Dish_ID)
            .input('quantity', sql.Int, data.Quantity)
            .input('unitPrice', sql.Decimal(18, 2), data.Unit_price)
            .input('status', sql.NVarChar, data.Status)
            .input('itemNote', sql.NVarChar, data.Item_note || null)
            .query(`
                INSERT INTO orderitem (Order_ID, Dish_ID, Quantity, Unit_price, Status, Item_note)
                VALUES (@orderId, @dishId, @quantity, @unitPrice, @status, @itemNote)
            `);
        return result.rowsAffected[0];
    }

    static async update(id, data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.NVarChar, data.Status)
            .input('totalPrice', sql.Decimal(18, 2), data.Total_price)
            .query('UPDATE [order] SET Status = @status, Total_price = @totalPrice WHERE Order_ID = @id');
        return result.rowsAffected[0];
    }

    static async delete(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM [order] WHERE Order_ID = @id');
        return result.rowsAffected[0];
    }
}

module.exports = Order;
