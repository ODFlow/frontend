"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useRef, useState, useEffect } from "react"

// City data (in a real app, this would come from an API)
const cityData = {
  oulu: {
    name: "Oulu",
    population: "331k",
    avgAge: "27 yr",
    safetyRating: "72 %",
    description: "Oulu is a vibrant city in northern Finland, known for its technology industry, innovative startups, and strong education sector, including the University of Oulu."
  },
  helsinki: {
    name: "Helsinki",
    population: "1.3M",
    avgAge: "41 yr",
    safetyRating: "85 %",
    description: "Helsinki is the capital of Finland and a vibrant coastal city known for design, technology, and a high quality of life."
  },
  tampere: {
    name: "Tampere",
    population: "252k", 
    avgAge: "36 yr",
    safetyRating: "80 %",
    description: "Tampere is the third-largest city in Finland, known for its industrial heritage, universities, and cultural scenes."
  }
}

// Unemployment data from 2015-2025
const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const unemploymentData = [8.4, 7.8, 6.9, 5.7, 5.2, 9.1, 8.3, 7.6, 6.8, 6.4, 6.1];

// Crime data for the same period (hovering between 1000-2000 cases)
const crimeData = [1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,];

function UnemploymentChart() {
  // Updated to show 2017-2025 as requested
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const unemploymentData = [6.9, 5.7, 5.2, 9.1, 8.3, 7.6, 6.8, 6.4, 6.1];
  
  // Crime data for the same period
  const crimeData = [1510, 1420, 1320, 1680, 1790, 1550, 1380, 1210, 1150];

  // Use a ref to measure container and resize chart accordingly
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 300, height: 200 });
  
  useEffect(() => {
    if (chartContainerRef.current) {
      const { width } = chartContainerRef.current.getBoundingClientRect();
      setChartDimensions({ width: width, height: 200 });
    }
  }, []);

  return (
    <Card className="bg-gray-900 p-6 rounded-lg text-[#D5D5D5]">
      <h2 className="text-2xl font-bold mb-6 text-[#D5D5D5]">Unemployment</h2>
      
      <div className="h-56 w-full relative">
        <LineChart
          xAxis={[{ 
            data: years,
            tickLabelStyle: {
              fill: '#D5D5D5',
              fontSize: 10,
            },
            labelStyle: {
              fill: '#D5D5D5',
            }
          }]}
          yAxis={[{
            min: 1,  // Starting from 1% as requested
            max: 10, // Max 10% as requested
            tickLabelStyle: {
              fill: '#D5D5D5',
              fontSize: 10,
            }
          }]}
          series={[
            {
              data: unemploymentData,
              label: 'Unemployment Rate (%)',
              color: '#9b59b6',
              curve: 'linear',
              showMark: true,
              area: true,
            }
          ]}
          width={chartDimensions.width}
          height={chartDimensions.height}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2,
            },
            '.MuiAreaElement-series-0': {
              fill: 'url(#purpleGradient)',
              opacity: 0.2,
            },
            '.MuiChartsAxis-tickLabel': {
              fill: '#D5D5D5'
            },
            '.MuiChartsAxis-label': {
              fill: '#D5D5D5'
            },
            '.MuiChartsLegend-label': {
              fill: '#D5D5D5'
            },
            backgroundColor: 'transparent',
          }}
          tooltip={{ 
            trigger: 'item',
            formatter: (params) => {
              return `Year: ${years[params.dataIndex]}\nUnemployment: ${params.value}%\nCrime cases: ${crimeData[params.dataIndex]}`
            }
          }}
          slotProps={{
            legend: { hidden: true }, // Hide legend to save space
          }}
        >
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9b59b6" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#9b59b6" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </LineChart>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-blue-400">2025 Projection</span>
        <button className="bg-gray-800 w-12 h-12 rounded-md flex items-center justify-center text-2xl text-[#D5D5D5]">
          i
        </button>
      </div>
    </Card>
  );
}

export default function CityPage() {
  const params = useParams();
  const cityNameParam = params?.cityName || '';
  
  // Safely access the cityName and convert to lowercase
  const cityKey = typeof cityNameParam === 'string' ? cityNameParam.toLowerCase() : '';
  
  // Get city data or use default values
  const city = cityData[cityKey] || {
    name: cityNameParam || 'Unknown City',
    population: "Unknown",
    avgAge: "Unknown",
    safetyRating: "72 %",
    description: "No information available for this city."
  }

  // Extract the safety rating as a number (removing % sign if present)
  const safetyRatingValue = parseInt(city.safetyRating, 10) || 72;
  
  // Prepare data for the PieChart
  const safetyData = [
    { id: 0, value: safetyRatingValue, color: '#6a0dad' },       // Purple for safety rating
    { id: 1, value: 100 - safetyRatingValue, color: '#333333' }  // Dark gray for remainder
  ];

  return (
    <div className="min-h-screen bg-black text-[#D5D5D5]">
      {/* Header */}
      <header className="p-4 flex items-center gap-6 border-b border-gray-800 text-[#D5D5D5]">
        <Link href="/" className="flex items-center gap-2 text-[#D5D5D5]">
          <span className="text-2xl">🏠</span> 
          <span>Home</span>
        </Link>
        <Link href="/privacy-policy" className="flex items-center gap-2 text-[#D5D5D5]">
          <span className="text-2xl">🔒</span>
          <span>Privacy policy</span>
        </Link>
        <div className="ml-auto relative">
          <input 
            type="search" 
            placeholder="Search" 
            className="bg-gray-900 text-[#D5D5D5] px-4 py-2 rounded-md pl-10 w-64"
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>
      </header>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Safety rating card with MUI Chart */}
        <Card className="bg-gray-900 p-6 rounded-lg text-[#D5D5D5]">
          <h2 className="text-2xl font-bold mb-1 text-[#D5D5D5]">Safety rating</h2>
          
          <div className="flex justify-center items-center relative" style={{ height: "200px" }}>
            <PieChart
              series={[
                {
                  data: safetyData,
                  innerRadius: 60,
                  outerRadius: 80,
                  paddingAngle: 0,
                  cornerRadius: 4,
                  startAngle: -90,
                  endAngle: 90,
                  cx: 100,
                  cy: 100,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 60, additionalRadius: -2, color: 'gray' },
                }
              ]}
              width={200}
              height={200}
              slotProps={{
                legend: { hidden: true }
              }}
            />
            
            {/* Overlay the percentage text */}
            <div className="absolute" style={{ textAlign: 'center' }}>
              <span className="text-3xl font-bold text-[#D5D5D5]">{safetyRatingValue}%</span>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button className="bg-gray-800 w-12 h-12 rounded-md flex items-center justify-center text-2xl text-[#D5D5D5]">
              i
            </button>
          </div>
        </Card>

        {/* City info card */}
        <Card className="bg-gray-900 p-6 rounded-lg flex flex-col items-center justify-between text-[#D5D5D5]">
          <h1 className="text-4xl font-bold mt-10 text-[#D5D5D5]">{city.name}</h1>
          
          <div className="my-8">
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="10" width="40" height="60" fill="white" />
              <rect x="10" y="40" width="40" height="40" fill="white" />
            </svg>
          </div>
          
          <p className="text-center text-sm mb-4 text-[#D5D5D5]">
            {city.description}
          </p>
        </Card>

        {/* Population card */}
        <Card className="bg-gray-900 p-6 rounded-lg text-[#D5D5D5]">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#D5D5D5]">Population</h2>
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-4xl">👥</div>
            <div className="text-4xl font-bold text-[#D5D5D5]">{city.population}</div>
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-4xl">🚶</div>
            <div className="text-4xl font-bold text-[#D5D5D5]">{city.avgAge}</div>
          </div>
          
          <div className="flex justify-center">
            <button className="bg-gray-800 w-12 h-12 rounded-md flex items-center justify-center text-2xl text-[#D5D5D5]">
              i
            </button>
          </div>
        </Card>

        {/* Unemployment chart */}
        <UnemploymentChart />

        {/* Empty space for layout balance */}
        <div></div>

        {/* Traffic accidents chart */}
        <Card className="bg-gray-900 p-6 rounded-lg text-[#D5D5D5]">
          <h2 className="text-2xl font-bold mb-6 text-[#D5D5D5]">Traffic accidents</h2>
          
          <div className="h-56 bg-gradient-to-t from-purple-900 to-transparent rounded relative mb-4">
            {/* This would be a chart in a real implementation */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-[#D5D5D5] px-2">
              <span>Technology</span>
              <span>Energy</span>
              <span>Tech</span>
            </div>
          </div>
           
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-400">2022</span>
            <button className="bg-gray-800 w-12 h-12 rounded-md flex items-center justify-center text-2xl text-[#D5D5D5]">
              i
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
} 