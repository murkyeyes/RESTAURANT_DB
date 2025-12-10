const { getConnection, sql } = require('../config/database');

class Feedback {
    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT f.*, c.Full_Name as Customer_Name, b.Bill_ID
                FROM feedback f
                LEFT JOIN customer c ON f.Customer_ID = c.Customer_ID
                LEFT JOIN bill b ON f.Bill_ID = b.Bill_ID
                ORDER BY f.Feedback_date DESC
            `);
        return result.recordset;
    }

    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT f.*, c.Full_Name as Customer_Name
                FROM feedback f
                LEFT JOIN customer c ON f.Customer_ID = c.Customer_ID
                WHERE f.Feedback_ID = @id
            `);
        return result.recordset[0];
    }

    static async getDishFeedback(feedbackId) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('feedbackId', sql.Int, feedbackId)
            .query(`
                SELECT df.*, m.Name as Dish_Name
                FROM dish_feedback df
                INNER JOIN dish d ON df.Dish_ID = d.Dish_ID
                INNER JOIN menu_item m ON d.Dish_ID = m.Item_ID
                WHERE df.Feedback_ID = @feedbackId
            `);
        return result.recordset;
    }

    static async getStaffFeedback(feedbackId) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('feedbackId', sql.Int, feedbackId)
            .query(`
                SELECT sf.*, s.Full_name as Staff_Name
                FROM staff_feedback sf
                INNER JOIN staff s ON sf.Staff_ID = s.Staff_ID
                WHERE sf.Feedback_ID = @feedbackId
            `);
        return result.recordset;
    }

    static async create(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, data.Feedback_ID)
            .input('billId', sql.Int, data.Bill_ID)
            .input('customerId', sql.Int, data.Customer_ID)
            .input('feedbackDate', sql.DateTime, data.Feedback_date)
            .input('comment', sql.NVarChar, data.Comment || null)
            .input('rating', sql.Int, data.Rating)
            .query(`
                INSERT INTO feedback (Feedback_ID, Bill_ID, Customer_ID, Feedback_date, Comment, Rating)
                VALUES (@id, @billId, @customerId, @feedbackDate, @comment, @rating)
            `);
        return result.rowsAffected[0];
    }

    static async delete(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM feedback WHERE Feedback_ID = @id');
        return result.rowsAffected[0];
    }
}

module.exports = Feedback;
