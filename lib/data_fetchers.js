import axios from 'axios';
import Papa from 'papa-parse';

export async function fetchCrimeData() {
  const response = await axios.get('https://example.com/crime_data.csv');
  const parsedData = Papa.parse(response.data, { header: true });
  return parsedData.data.map(item => ({
    type: item.incident_type,
    date: item.date,
    location: { lon: parseFloat(item.longitude), lat: parseFloat(item.latitude) }
  }));
}