"use client"

import { useState } from "react"
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import axios from "axios"
import { useRouter } from "next/navigation"

// Fix for default marker icons in Leaflet with Next.js
// We're using a workaround since we don't have the actual marker files
const DefaultIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div style="background-color: white; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #333;"></div>`,
  iconSize: [15, 15],
  iconAnchor: [7, 7],
  popupAnchor: [0, -7],
})

L.Marker.prototype.options.icon = DefaultIcon

// Simplified Finland GeoJSON data embedded directly in the component
const finlandGeoJSONData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Northern Finland",
        id: "north",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [24, 66],
            [28, 66],
            [28, 70],
            [24, 70],
            [24, 66],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Central Finland",
        id: "central",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [24, 63],
            [28, 63],
            [28, 66],
            [24, 66],
            [24, 63],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Southern Finland",
        id: "south",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [24, 60],
            [28, 60],
            [28, 63],
            [24, 63],
            [24, 60],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Western Finland",
        id: "west",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [21, 60],
            [24, 60],
            [24, 66],
            [21, 66],
            [21, 60],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Eastern Finland",
        id: "east",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [28, 60],
            [31, 60],
            [31, 66],
            [28, 66],
            [28, 60],
          ],
        ],
      },
    },
  ],
}

const cities = [
  { name: "Oulu", position: [65.0121, 25.4651], code: "KU564" },
  { name: "Helsinki", position: [60.1699, 24.9384], code: "KU091" },
  { name: "Tampere", position: [61.4978, 23.761], code: "KU837" },
]

export default function FinlandMap() {
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState(null)
  const [populationData, setPopulationData] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchCityData = async (cityCode) => {
    setLoading(true)
    const url = "https://pxdata.stat.fi:443/PxWeb/api/v1/en/StatFin/tyokay/statfin_tyokay_pxt_115b.px"

    const jsonq = {
      query: [
        {
          code: "Alue",
          selection: {
            filter: "item",
            values: [cityCode],
          },
        },
        {
          code: "Pääasiallinen toiminta",
          selection: {
            filter: "item",
            values: ["SSS"],
          },
        },
        {
          code: "Sukupuoli",
          selection: {
            filter: "item",
            values: ["1", "2"],
          },
        },
        {
          code: "Ikä",
          selection: {
            filter: "item",
            values: ["0-17", "18-64", "65-"],
          },
        },
        {
          code: "Vuosi",
          selection: {
            filter: "item",
            values: ["2023"],
          },
        },
      ],
      response: {
        format: "json-stat2",
      },
    }

    try {
      const response = await axios.post(url, jsonq)
      setPopulationData((prev) => ({
        ...prev,
        [cityCode]: response.data,
      }))
    } catch (error) {
      console.error("Error fetching population data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCityClick = (city) => {
    setSelectedCity(city)
    if (!populationData[city.code]) {
      fetchCityData(city.code)
    }
    router.push(`/city/${city.name.toLowerCase()}`)
  }

  const getColor = (feature) => {
    // Assign different shades of purple based on region id
    const regionColors = {
      north: "#6a0dad", // dark purple
      central: "#9370db", // medium purple
      south: "#d8bfd8", // light purple
      west: "#8a2be2", // blue violet
      east: "#ba55d3", // medium orchid
    }

    return regionColors[feature.properties.id] || "#9370db" // default to medium purple
  }

  const style = (feature) => {
    return {
      //fillColor: getColor(feature),
      fillColor: 'tranparent',
      weight: 3,
      opacity: 1,
      color: 'ffffff',
      fillOpacity: 0,
      dashArray: '',
      strokeOpacity: 1    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white">
      <div className="w-full md:w-2/3 h-[70vh] md:h-screen relative">
        <MapContainer
          center={[64.5, 26]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {cities.map((city, index) => (
              <Marker
                  key={index}
                  position={city.position}
                  icon={DefaultIcon} // Set initial icon
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.setIcon(HoverIcon)

                    },
                    mouseout: (e) => {
                      e.target.setIcon(DefaultIcon)
                    },
                  }}
              >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold">{city.name}</h3>
                  <button 
                    onClick={() => handleCityClick(city)} 
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="w-full md:w-1/3 p-4 space-y-4 overflow-y-auto">
        {cities.map((city, index) => (
          <button
            key={index}
            className="flex items-center w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            onClick={() => handleCityClick(city)}
          >
            <div className="mr-[3%]">
             <HomeIcon sx = {{color: '#FFFFFF'}}/>
            </div>
            <span>{city.name}</span>
          </button>
        ))}
        <button className="flex items-center w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
          <span className="mr-3">🏠</span>
          <span>...</span>
        </button>

        {selectedCity && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{selectedCity.name}</h2>
            {loading ? (
              <p>Loading data...</p>
            ) : populationData[selectedCity.code] ? (
              <div>
                <p>Population data loaded</p>
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(populationData[selectedCity.code], null, 2)}
                </pre>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        )}
      </div>

      <footer className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-8 bg-black bg-opacity-70">
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Privacy policy
        </a>
      </footer>
    </div>
  )
}

