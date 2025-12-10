// File test kết nối database
require('dotenv').config();
const { getConnection, sql } = require('./src/config/database');

async function testConnection() {
    try {
        console.log('🔄 Đang kết nối đến SQL Server...');
        console.log('Server:', process.env.DB_SERVER);
        console.log('Database:', process.env.DB_NAME);
        console.log('User:', process.env.DB_USER);
        
        const pool = await getConnection();
        console.log('✅ Kết nối database thành công!\n');
        
        // Test query: Lấy danh sách bảng
        const result = await pool.request().query(`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_TYPE = 'BASE TABLE'
            ORDER BY TABLE_NAME
        `);
        
        console.log('📋 Danh sách tables trong database:');
        result.recordset.forEach((row, index) => {
            console.log(`${index + 1}. ${row.TABLE_NAME}`);
        });
        
        // Test query: Đếm số lượng records
        console.log('\n📊 Số lượng records trong mỗi table:');
        const tables = result.recordset.map(r => r.TABLE_NAME);
        
        for (const table of tables) {
            const countResult = await pool.request().query(`SELECT COUNT(*) as count FROM [${table}]`);
            console.log(`   ${table}: ${countResult.recordset[0].count} records`);
        }
        
        console.log('\n✨ Test hoàn tất!');
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Lỗi kết nối database:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('\n🔍 Kiểm tra lại:');
        console.error('1. SQL Server đang chạy?');
        console.error('2. Database "restaurantdb" đã được tạo?');
        console.error('3. Thông tin kết nối trong file .env đúng chưa?');
        process.exit(1);
    }
}

testConnection();
