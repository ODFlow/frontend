const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { initializeDatabase } = require('./db/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging

// Import routes
const cityRoutes = require('./routes/cities');

// Use routes
app.use('/api/cities', cityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// Only start the server if this file is run directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    
    async function startServer() {
        try {
            // Initialize database
            await initializeDatabase();
            console.log('Database initialized successfully');

            // Start server
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    }
    
    startServer();
}

module.exports = app; // Export for testing 