const { initializeDatabase, getDatabase } = require('../src/db/config');

// Setup before all tests
beforeAll(async () => {
    // Initialize test database
    process.env.NODE_ENV = 'test';
    await initializeDatabase();
});

// Clean up after each test
afterEach(async () => {
    const db = await getDatabase();
    // Clear test data using individual DELETE statements
    await db.run('DELETE FROM User_Requests');
    await db.run('DELETE FROM Crime_Rates');
    await db.run('DELETE FROM Road_Accidents');
    await db.run('DELETE FROM Unemployment_Rates');
    await db.run('DELETE FROM Population_Projections');
    await db.run('DELETE FROM Users');
    await db.run('DELETE FROM Cities');
}); 