const sql = require('mssql');
require('dotenv').config();

// SQL Server Authentication
const useWindowsAuth = !process.env.DB_USER || process.env.DB_USER === '';

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    connectionTimeout: 30000,
    requestTimeout: 30000
};

// authentication config
if (useWindowsAuth) {
    // Windows Authentication
    config.authentication = {
        type: 'ntlm',
        options: {
            domain: '',
            userName: '',
            password: ''
        }
    };
} else {
    // SQL Server Authentication
    config.user = process.env.DB_USER;
    config.password = process.env.DB_PASSWORD;
    config.authentication = {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    };
}

let pool = null;

const getConnection = async () => {
    try {
        if (pool) {
            return pool;
        }
        pool = await sql.connect(config);
        console.log('Kết nối database thành công!');
        return pool;
    } catch (error) {
        console.error('Lỗi kết nối database:', error);
        throw error;
    }
};

const closeConnection = async () => {
    try {
        if (pool) {
            await pool.close();
            pool = null;
            console.log('Đã đóng kết nối database');
        }
    } catch (error) {
        console.error('Lỗi khi đóng kết nối:', error);
    }
};

module.exports = {
    sql,
    getConnection,
    closeConnection
};
