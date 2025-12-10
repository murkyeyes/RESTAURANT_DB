const { getConnection, sql } = require('../config/database');

class Bill {
    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT b.*, o.Order_ID, c.Full_Name as Customer_Name, m.Member_rank
                FROM bill b
                LEFT JOIN [order] o ON b.Order_ID = o.Order_ID
                LEFT JOIN customer c ON o.Customer_ID = c.Customer_ID
                LEFT JOIN membership m ON b.Member_ID = m.Member_ID
                ORDER BY b.Bill_time DESC
            `);
        return result.recordset;
    }

    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT b.*, o.Order_ID, c.Full_Name as Customer_Name, m.Member_rank
                FROM bill b
                LEFT JOIN [order] o ON b.Order_ID = o.Order_ID
                LEFT JOIN customer c ON o.Customer_ID = c.Customer_ID
                LEFT JOIN membership m ON b.Member_ID = m.Member_ID
                WHERE b.Bill_ID = @id
            `);
        return result.recordset[0];
    }

    static async create(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, data.Bill_ID)
            .input('orderId', sql.Int, data.Order_ID)
            .input('memberId', sql.Int, data.Member_ID || null)
            .input('billTime', sql.DateTime, data.Bill_time)
            .input('discount', sql.Decimal(5, 2), data.Discount || 0)
            .input('totalAmount', sql.Decimal(18, 2), data.Total_amount)
            .query(`
                INSERT INTO bill (Bill_ID, Order_ID, Member_ID, Bill_time, Discount, Total_amount)
                VALUES (@id, @orderId, @memberId, @billTime, @discount, @totalAmount)
            `);
        return result.rowsAffected[0];
    }

    static async delete(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM bill WHERE Bill_ID = @id');
        return result.rowsAffected[0];
    }
}

module.exports = Bill;
