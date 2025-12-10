const { getConnection, sql } = require('../config/database');

class Staff {
    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT * FROM staff');
        return result.recordset;
    }

    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM staff WHERE Staff_ID = @id');
        return result.recordset[0];
    }

    static async create(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, data.Staff_ID)
            .input('fullName', sql.NVarChar, data.Full_name)
            .input('position', sql.NVarChar, data.Position)
            .query('INSERT INTO staff (Staff_ID, Full_name, Position) VALUES (@id, @fullName, @position); SELECT SCOPE_IDENTITY() AS id');
        return result.recordset[0];
    }

    static async update(id, data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('fullName', sql.NVarChar, data.Full_name)
            .input('position', sql.NVarChar, data.Position)
            .query('UPDATE staff SET Full_name = @fullName, Position = @position WHERE Staff_ID = @id');
        return result.rowsAffected[0];
    }

    static async delete(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM staff WHERE Staff_ID = @id');
        return result.rowsAffected[0];
    }
}

module.exports = Staff;
