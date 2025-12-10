const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Lỗi validation',
            error: err.message
        });
    }

    if (err.name === 'RequestError') {
        return res.status(500).json({
            success: false,
            message: 'Lỗi database',
            error: err.message
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Lỗi server',
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

module.exports = errorHandler;
