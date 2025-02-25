//To handle real-time or near-real-time updates, set up a scheduled function in api/cron.js

import db from '../lib/db';
import { fetchCrimeData } from '../lib/data_fetchers';

export default async function handler(req, res) {
  try {
    const crimeData = await fetchCrimeData();
    crimeData.forEach((incident) => {
      db.run(`
        INSERT INTO crime_incidents (type, date, location) VALUES (?, ?, GeomFromText('POINT(? ?)', 4326));
      `, [incident.type, incident.date, incident.location.lon, incident.location.lat]);
    });
    res.status(200).send('Data updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating data');
  }
}