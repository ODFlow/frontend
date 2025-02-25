import sqlite3 from 'sqlite3';
import spatialite from 'sqlite3-spatialite';

const db = new sqlite3.Database(':memory:');

spatialite(db, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('SpatiaLite enabled');
  }
});

// Function to create tables and geometry columns
export function setupDatabase() {
  db.run(`
    CREATE TABLE properties (
      id INTEGER PRIMARY KEY,
      address TEXT,
      price REAL,
      size REAL,
      num_rooms INTEGER
    );
    SELECT AddGeometryColumn('properties', 'location', 4326, 'POINT', 'XY');
  `);
  // Create other tables: crime_incidents, cultural_events, transit_stops, transit_routes, users
}

export default db;