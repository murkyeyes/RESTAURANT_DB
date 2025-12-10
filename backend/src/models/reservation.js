const { getConnection, sql } = require('../config/database');

class Reservation {
    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT r.*, c.Full_Name as Customer_Name, c.Email, t.Type as Table_Type
                FROM table_reservation r
                LEFT JOIN customer c ON r.Customer_ID = c.Customer_ID
                LEFT JOIN restaurant_table t ON r.Table_ID = t.Table_ID
                ORDER BY r.Reservation_time DESC
            `);
        return result.recordset;
    }

    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT r.*, c.Full_Name as Customer_Name, c.Email, t.Type as Table_Type
                FROM table_reservation r
                LEFT JOIN customer c ON r.Customer_ID = c.Customer_ID
                LEFT JOIN restaurant_table t ON r.Table_ID = t.Table_ID
                WHERE r.Reservation_ID = @id
            `);
        return result.recordset[0];
    }

    static async create(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, data.Reservation_ID)
            .input('reservationTime', sql.DateTime, data.Reservation_time)
            .input('customerId', sql.Int, data.Customer_ID)
            .input('tableId', sql.Int, data.Table_ID)
            .input('status', sql.NVarChar, data.Status)
            .query(`
                INSERT INTO table_reservation (Reservation_ID, Reservation_time, Customer_ID, Table_ID, Status)
                VALUES (@id, @reservationTime, @customerId, @tableId, @status)
            `);
        return result.rowsAffected[0];
    }

    static async update(id, data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.NVarChar, data.Status)
            .query('UPDATE table_reservation SET Status = @status WHERE Reservation_ID = @id');
        return result.rowsAffected[0];
    }

    static async delete(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM table_reservation WHERE Reservation_ID = @id');
        return result.rowsAffected[0];
    }
}

module.exports = Reservation;
