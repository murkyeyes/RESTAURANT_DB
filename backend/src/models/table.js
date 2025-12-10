const { getConnection, sql } = require('../config/database');

class Table {
    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT t.*, s.Full_name as Staff_Name
                FROM restaurant_table t
                LEFT JOIN staff s ON t.Staff_ID = s.Staff_ID
            `);
        return result.recordset;
    }

    static async getAvailable() {
        const pool = await getConnection();
        const result = await pool.request()
            .query(`
                SELECT t.*, s.Full_name as Staff_Name
                FROM restaurant_table t
                LEFT JOIN staff s ON t.Staff_ID = s.Staff_ID
                WHERE t.Status = N'Trong'
            `);
        return result.recordset;
    }

    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM restaurant_table WHERE Table_ID = @id');
        return result.recordset[0];
    }

    static async create(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, data.Table_ID)
            .input('type', sql.NVarChar, data.Type)
            .input('status', sql.NVarChar, data.Status)
            .input('staffId', sql.Int, data.Staff_ID)
            .query('INSERT INTO restaurant_table (Table_ID, Type, Status, Staff_ID) VALUES (@id, @type, @status, @staffId)');
        return result.rowsAffected[0];
    }

    static async update(id, data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('type', sql.NVarChar, data.Type)
            .input('status', sql.NVarChar, data.Status)
            .input('staffId', sql.Int, data.Staff_ID)
            .query('UPDATE restaurant_table SET Type = @type, Status = @status, Staff_ID = @staffId WHERE Table_ID = @id');
        return result.rowsAffected[0];
    }

    static async updateStatus(id, status) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.NVarChar, status)
            .query('UPDATE restaurant_table SET Status = @status WHERE Table_ID = @id');
        return result.rowsAffected[0];
    }

    static async delete(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM restaurant_table WHERE Table_ID = @id');
        return result.rowsAffected[0];
    }
}

module.exports = Table;
