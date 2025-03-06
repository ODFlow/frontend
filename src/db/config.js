const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let db = null;

async function getDatabase() {
    if (db) return db;
    
    // Use different database file for testing
    const dbPath = process.env.NODE_ENV === 'test' 
        ? ':memory:' // Use in-memory database for testing
        : path.resolve(__dirname, '../../database.sqlite');
    
    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });
    
    return db;
}

async function initializeDatabase() {
    const database = await getDatabase();
    
    // Create tables
    await database.exec(`
        CREATE TABLE IF NOT EXISTS Cities (
            city_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            region TEXT,
            last_updated DATETIME
        );

        CREATE TABLE IF NOT EXISTS Crime_Rates (
            crime_id INTEGER PRIMARY KEY AUTOINCREMENT,
            city_id INTEGER,
            year INTEGER,
            total_thefts INTEGER,
            total_robberies INTEGER,
            damage_to_properties INTEGER,
            total_murders INTEGER,
            total_assaults INTEGER,
            total_sexual_offences INTEGER,
            total_narcotic_offences INTEGER,
            updated_at DATETIME,
            FOREIGN KEY (city_id) REFERENCES Cities(city_id)
        );

        CREATE TABLE IF NOT EXISTS Road_Accidents (
            accident_id INTEGER PRIMARY KEY AUTOINCREMENT,
            city_id INTEGER,
            year INTEGER,
            traffic_accidents_with_injuries INTEGER,
            updated_at DATETIME,
            FOREIGN KEY (city_id) REFERENCES Cities(city_id)
        );

        CREATE TABLE IF NOT EXISTS Unemployment_Rates (
            unemployment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            city_id INTEGER,
            year INTEGER,
            unemployment_rate REAL,
            updated_at DATETIME,
            FOREIGN KEY (city_id) REFERENCES Cities(city_id)
        );

        CREATE TABLE IF NOT EXISTS Population_Projections (
            projection_id INTEGER PRIMARY KEY AUTOINCREMENT,
            city_id INTEGER,
            year INTEGER,
            males INTEGER,
            females INTEGER,
            total INTEGER,
            average_age REAL,
            updated_at DATETIME,
            FOREIGN KEY (city_id) REFERENCES Cities(city_id)
        );

        CREATE TABLE IF NOT EXISTS Users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            user_type TEXT CHECK(user_type IN ('individual', 'business')),
            company_name TEXT,
            created_at DATETIME
        );

        CREATE TABLE IF NOT EXISTS User_Requests (
            request_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            city_id INTEGER,
            data_type TEXT,
            request_time DATETIME,
            status TEXT,
            FOREIGN KEY (user_id) REFERENCES Users(user_id),
            FOREIGN KEY (city_id) REFERENCES Cities(city_id)
        );
    `);
    
    return database;
}

module.exports = {
    getDatabase,
    initializeDatabase
}; 