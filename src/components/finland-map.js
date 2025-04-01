"use client"

import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import axios from "axios"
import { useRouter } from "next/navigation"
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link'
import {useTheme} from "@mui/material/styles";


const DefaultIcon = new L.Icon({
  iconUrl: "/default_marker.png",
  iconSize: [20, 20],
  iconAnchor: [7, 7],
  popupAnchor: [0, -7],
})

const HoverIcon = new L.Icon({
  iconUrl: "/hover_marker.png",
  iconSize: [21, 21],
  iconAnchor: [7, 7],
  popupAnchor: [0, -7],
})



const cities = [
  { name: "Oulu", position: [65.0121, 25.4651], code: "KU564" },
  { name: "Helsinki", position: [60.1699, 24.9384], code: "KU091" },
  { name: "Tampere", position: [61.4978, 23.761], code: "KU837" },
]



export default function FinlandMap() {
  const theme = useTheme();
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
    router.push(`${city.name.toLowerCase()}`)
  }

  const loadingContent = () => {
    if (loading) {
      return <p> Loading... </p>
    }

    if (populationData[selectedCity.code]) {
      return (
          <div>
            <p>Population data loaded</p>
            <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(populationData[selectedCity.code], null, 2)}
                </pre>
          </div>
      )
    }

    return <p> No data </p>
  }



  return (
    <div style = {{backgroundColor: theme.palette.background.default}}
        className="flex flex-col md:flex-row h-screen text-white">
      <div className="w-full md:w-2/3 h-[70vh] md:h-screen relative">
        <MapContainer
          center={[63.5, 24]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {cities.map((city) => (
              <Marker
                  key={city.code}
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
                    className="mt-2 bg-[#6254B5] text-white px-3 py-1 rounded hover:bg-[#4e4390]"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>


      {/* Right panel with cities */}
      <div className="w-full md:w-1/3 p-4 space-y-4 overflow-y-auto">
        {cities.map((city) => (
          <button
            key={city.code}
            className="flex items-center w-full p-3 rounded-lg bg-[#1E1E1E] hover:bg-[#343434] transition-colors"
            onClick={() => handleCityClick(city)}
          >
            <div className="mr-[3%]">
             <HomeIcon sx = {{color: '#FFFFFF'}}/>
            </div>
            <span>{city.name}</span>
          </button>
        ))}


        {selectedCity && (
          <div className="mt-8 p-4 bg-[#1E1E1E] rounded-lg">
            <h2 className="text-xl font-bold mb-4">{selectedCity.name}</h2>
            {loadingContent()}
          </div>
        )}
      </div>

      <footer className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-8 bg-black bg-opacity-70">
        <Link href="/" className="hover:underline">
          About
        </Link>
        <Link href="/" className="hover:underline">
          Privacy policy
        </Link>
      </footer>
    </div>
  )
}

