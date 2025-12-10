const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { getConnection, closeConnection } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const staffRoutes = require('./routes/staffRoutes');
const customerRoutes = require('./routes/customerRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tableRoutes = require('./routes/tableRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const billRoutes = require('./routes/billRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Restaurant Management System API',
        version: '1.0.0',
        endpoints: {
            staff: '/api/staff',
            customers: '/api/customers',
            menu: '/api/menu',
            orders: '/api/orders',
            tables: '/api/tables',
            reservations: '/api/reservations',
            bills: '/api/bills',
            feedback: '/api/feedback'
        }
    });
});

app.use('/api/staff', staffRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        // Test database connection
        await getConnection();
        
        app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
            console.log(`API documentation: http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.error('Không thể khởi động server:', error);
        process.exit(1);
    }
};

// Handle shutdown
process.on('SIGINT', async () => {
    console.log('\nĐang đóng server...');
    await closeConnection();
    process.exit(0);
});

startServer();

module.exports = app;
