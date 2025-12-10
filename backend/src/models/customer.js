const { getConnection, sql } = require('../config/database');

class Customer {
    static async getAll() {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT * FROM customer');
        return result.recordset;
    }

    static async getById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM customer WHERE Customer_ID = @id');
        return result.recordset[0];
    }

    static async getWithPhoneNumbers(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT c.*, p.PhoneNumber 
                FROM customer c
                LEFT JOIN phonenumber p ON c.Customer_ID = p.Customer_ID
                WHERE c.Customer_ID = @id
            `);
        return result.recordset;
    }

    static async create(data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, data.Customer_ID)
            .input('email', sql.NVarChar, data.Email)
            .input('fullName', sql.NVarChar, data.Full_Name)
            .query('INSERT INTO customer (Customer_ID, Email, Full_Name) VALUES (@id, @email, @fullName)');
        return result.rowsAffected[0];
    }

    static async update(id, data) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('email', sql.NVarChar, data.Email)
            .input('fullName', sql.NVarChar, data.Full_Name)
            .query('UPDATE customer SET Email = @email, Full_Name = @fullName WHERE Customer_ID = @id');
        return result.rowsAffected[0];
    }

    static async delete(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM customer WHERE Customer_ID = @id');
        return result.rowsAffected[0];
    }

    static async addPhoneNumber(customerId, phoneNumber) {
        const pool = await getConnection();
        const result = await pool.request()
            .input('customerId', sql.Int, customerId)
            .input('phoneNumber', sql.NVarChar, phoneNumber)
            .query('INSERT INTO phonenumber (Customer_ID, PhoneNumber) VALUES (@customerId, @phoneNumber)');
        return result.rowsAffected[0];
    }
}

module.exports = Customer;
