import { useState } from 'react';
import Map from '../components/Map';
import PropertyList from '../components/PropertyList';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState({});
  const [properties, setProperties] = useState([]);

  const handleSearch = async (params) => {
    setSearchParams(params);
    const response = await fetch('/api/properties', { method: 'POST', body: JSON.stringify(params) });
    const data = await response.json();
    setProperties(data);
  };

  return (
    <div>
      <h1>Property Search</h1>
      <SearchForm onSearch={handleSearch} />
      <Map properties={properties} searchParams={searchParams} />
      <PropertyList properties={properties} />
    </div>
  );
}