"use client"
import Link from 'next/link'
import { useParams } from "next/navigation"
import { useTheme } from '@mui/material/styles';
import { Card } from "@/components/ui/card"
import {pieArcLabelClasses, PieChart} from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import {useRef, useState, useEffect, useContext} from "react"
import '../page.css'
import GroupsIcon from '@mui/icons-material/Groups';
import StrollerIcon from '@mui/icons-material/Stroller';
import ApartmentIcon from '@mui/icons-material/Apartment';
import {alpha} from "@mui/system";
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';

import { useQuery } from "@apollo/client";
import { useEducation, useIncome, useDemographics, useUnemploymentRate } from "../../../lib/hooks/useCityData"


const cityData = {
  oulu: {
    name: "Oulu",
    population: "331k",
    avgAge: "27 yr",
    safetyRating: "72 %",
    nationalAvgSafety: "68 %",
    yearOverYearChange: "+3%",
    description: "Oulu is a vibrant city in northern Finland, known for its technology industry, innovative startups, and strong education sector, including the University of Oulu.",
    lastUpdated: "March 2024"
  },
  helsinki: {
    name: "Helsinki",
    population: "1.3M",
    avgAge: "41 yr",
    safetyRating: "85 %",
    nationalAvgSafety: "68 %",
    yearOverYearChange: "+1%",
    description: "Helsinki is the capital of Finland and a vibrant coastal city known for design, technology, and a high quality of life.",
    lastUpdated: "March 2024"
  },
  tampere: {
    name: "Tampere",
    population: "252k", 
    avgAge: "36 yr",
    safetyRating: "80 %",
    nationalAvgSafety: "68 %",
    yearOverYearChange: "+2%",
    description: "Tampere is the third-largest city in Finland, known for its industrial heritage, universities, and cultural scenes.",
    lastUpdated: "March 2024"
  }
}



function UnemploymentChart() {
  const params = useParams();
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const unemploymentData = [6.9, 5.7, 5.2, 9.1, 8.3, 7.6, 6.8, 6.4, 6.1];
  const nationalAvgData = [7.4, 6.6, 6.1, 9.5, 8.9, 8.1, 7.5, 7.2, 6.9];
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 300, height: 220 });
  
  useEffect(() => {
    if (chartContainerRef.current) {
      const { width } = chartContainerRef.current.getBoundingClientRect();
      setChartDimensions({ width: width, height: 220 });
      
      // Add resize listener for responsiveness
      const handleResize = () => {
        if (chartContainerRef.current) {
          const { width } = chartContainerRef.current.getBoundingClientRect();
          setChartDimensions({ width: width, height: 220 });
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Card data-testid="data-card"  className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5] flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#D5D5D5]">Unemployment</h2>
        <span className="text-sm px-2 py-1 rounded">Updated: March 2024</span>
      </div>

      <div className="h-64 w-full relative" ref={chartContainerRef}>
        <LineChart
          xAxis={[{
            data: years,
            tickLabelStyle: {
              fill: '#D5D5D5',
              fontSize: 10,
            },
            scaleType: 'band',

          }]}
          yAxis={[{
            min: 1,  // Starting from 1% as requested
            max: 10, // Max 10% as requested
            tickLabelStyle: {
              fill: '#D5D5D5',
              fontSize: 10,
            },
          }]}
          series={[
            {
              id: 'unemploymentData',
              data: unemploymentData,
              label: 'City',
              curve: 'natural',
              color: '#6254B5',
              showMark: true,


              fill: alpha('#6254B5', 0.5),
              area: true,
              valueFormatter: (value) => `${value}%`,


            },
            {
              id: 'nationalAvgData',
              data: nationalAvgData,
              label: 'National Avg',
              color: '#a098d2',
              area: true,
              curve: 'natural',


              showMark: false,
              lineStyle: { strokeDasharray: '5 5' },
              valueFormatter: (value) => `${value}%`,
            }
          ]}
          width={chartDimensions.width}
          height={chartDimensions.height}
          margin={{ top: 20, bottom: 40, left: 40, right: 10 }}

          tooltip={{
            trigger: 'item',
          }}
          slotProps={{
            legend: {
              hidden: false,
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: 0,
              itemMarkWidth: 8,
              itemMarkHeight: 8,
              markGap: 10,
              itemGap: 10,
              labelStyle: {
                fill: '#D5D5D5',
              },


            }
          }}

          sx={{
                "& .MuiAreaElement-series-unemploymentData": {
                  fill: alpha('#6254B5', 0.5),
                },
                "& .MuiAreaElement-series-nationalAvgData": {
                  fill: alpha('#8176c3', 0.2),
                }
              }}
        >

        </LineChart>
      </div>


      
      <div className="flex justify-center mt-4">
        <Link href={`/${params.city}/detailed`}>
          <button 
            className="bg-[#D5D5D5] w-14 h-14 rounded-md flex items-center justify-center hover:bg-[#C5C5C5] transition-colors"
            aria-label="View detailed unemployment statistics"
          >
            <span className="text-3xl font-semibold text-gray-900">i</span>
          </button>
        </Link>
      </div>
    </Card>
  );
}

function TrafficAccidentsChart() {
  // Sample data for traffic accidents
  const categories = ['Cars', 'Pedestrians', 'Bicycles', 'Public Transport'];
  const accidentData = [45, 15, 28, 12];

  // Use a ref to measure container and resize chart accordingly
  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 300, height: 200 });
  
  useEffect(() => {
    if (chartContainerRef.current) {
      const { width } = chartContainerRef.current.getBoundingClientRect();
      setChartDimensions({ width: width, height: 200 });
      
      const handleResize = () => {
        if (chartContainerRef.current) {
          const { width } = chartContainerRef.current.getBoundingClientRect();
          setChartDimensions({ width: width, height: 200 });
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Card data-testid="data-card" className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5] flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#D5D5D5]">Traffic accidents</h2>

      </div>

      <div className="h-56 w-full relative" ref={chartContainerRef}>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: accidentData[0], label: categories[0], color: '#584ba2' },
                { id: 1, value: accidentData[1], label: categories[1], color: '#7165bc' },
                { id: 2, value: accidentData[2], label: categories[2], color: '#a098d2' },
                { id: 3, value: accidentData[3], label: categories[3], color: '#4e4390' },
              ],
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 0, additionalRadius: -10, color: 'gray' },
              arcLabel: (item) => `${item.value}%`,
              arcLabelMinAngle: 20,
              cx: chartDimensions.width / 2,
              cy: 100,



            }
          ]}
          width={chartDimensions.width}
          height={200}
          margin={{ top: 0, bottom: 50, left: 0, right: 0 }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              padding: { top: 20 },
              itemMarkWidth: 8,
              itemMarkHeight: 8,
              markGap: 5,
              itemGap: 15,
              labelStyle: {
                fill: '#FFFFFF',
              },


            }
          }}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
            },


          }}
        />
      </div>
      
      <div className="flex-grow"></div>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-sm text-blue-400">Annual Report</span>
          <div className="text-xs opacity-70 mt-1">Total incidents: 187</div>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button 
          className="bg-[#D5D5D5] w-14 h-14 rounded-md flex items-center justify-center"
          aria-label="More information about traffic accidents"
        >
          <span className="text-3xl font-semibold text-gray-900">i</span>
        </button>
      </div>
    </Card>
  );
}

export default function CityPage() {
    const theme = useTheme();

    const getSafetyColor = (rating, theme) => {

    if (rating >= 80) return theme.palette.customValues.safetyRatingColors.excellent;
    if (rating >= 60) return theme.palette.customValues.safetyRatingColors.good;
    if (rating >= 40) return theme.palette.customValues.safetyRatingColors.average;
    return theme.palette.customValues.safetyRatingColors.poor;
  }





  const params = useParams();
  const cityNameParam = params?.city || '';
  

  const cityKey = typeof cityNameParam === 'string' ? cityNameParam.toLowerCase() : '';
  
  // Get city data or use default values
  const city = cityData[cityKey] || {
    name: cityNameParam || 'Unknown City',
    population: "Unknown",
    avgAge: "Unknown",
    safetyRating: "70 %",
    nationalAvgSafety: "68 %",
    yearOverYearChange: "0%",
    description: "No information available for this city.",
    lastUpdated: "Unknown"
  };

  // Extract the safety rating as a number (removing % sign if present)
  const safetyRatingValue = parseInt(city.safetyRating, 10) || 72;
  const safetyColor = getSafetyColor(safetyRatingValue, theme);
  
  // Prepare data for the PieChart
  const safetyData = [
    { id: 0, value: safetyRatingValue, color: safetyColor },
    { id: 1, value: 100 - safetyRatingValue, color: '#302D43' }
  ];

  return (
    <div className="min-h-screen bg-[var(--page-background)] text-[#D5D5D5]">
      {/* Header */}
      <header className="p-4 flex items-center gap-6 border-b border-gray-800 text-[#D5D5D5]">
        <Link href="/"
              data-testid="navigation-button"
              className="flex items-center gap-2 text-[#D5D5D5]">
          <HomeIcon />
          Home

        </Link>
        <Link href="/privacy-policy" underline="hover"
              data-testid="navigation-button"
              sx={{
                color: '#D5D5D5',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
              className="flex items-center gap-2 text-[#D5D5D5]">
          <LockIcon/>
          <span>Privacy policy</span>
        </Link>
        <div className="ml-auto relative">
          <input 
            type="search" 
            placeholder="Search" 
            className="bg-[var(--card-background)] text-[#D5D5D5] px-4 py-2 rounded-md pl-10 w-64"
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>
      </header>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        
        
        <Card data-testid="data-card" className="p-6 rounded-lg text-[#D5D5D5] flex flex-col h-full"
        style={{
          background: theme.palette.background.paper,
        }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#D5D5D5]">Safety rating</h2>
            <span className="text-sm px-2 py-1 rounded">{city.lastUpdated}</span>
          </div>
          <p className="text-sm opacity-70 mb-6">National average: {city.nationalAvgSafety}</p>
          
          <div className="flex justify-center items-center relative" style={{ height: "200px" }}>
            <PieChart
              series={[
                {
                  data: safetyData,
                  innerRadius: 80,
                  outerRadius: 100,
                  paddingAngle: 0,
                  cornerRadius: 4,
                  startAngle: -90,
                  endAngle: 90,
                  cx: 100,
                  cy: 100,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 80, additionalRadius: -2, color: 'gray' },
                }
              ]}

              width={200}
              height={200}

              slotProps={{
                legend: { hidden: true },

              }}
              sx={{
                filter: 'drop-shadow(0px 4px 6px rgba(106, 13, 173, 0.3))'
              }}
            />

            {/* Overlay the percentage text */}
            <div className="absolute flex flex-col items-center" style={{ textAlign: 'center' }}>
              <span className="text-3xl font-bold text-[#D5D5D5]"> {safetyRatingValue}% </span>
              {/*<span className="text-sm mt-1 text-green-400"> {city.yearOverYearChange} </span>*/}
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <button
              className="bg-[#D5D5D5] w-14 h-14 rounded-md flex items-center justify-center"
              aria-label="More information about safety rating"
            >
              <span className="text-3xl font-semibold text-gray-900">i</span>
            </button>
          </div>
        </Card>


        <Card data-testid="data-card" style={{background: theme.palette.background.paper}} className="p-6 rounded-lg flex flex-col items-center justify-between text-[#D5D5D5] md:row-span-2">
          <h1 className="text-4xl font-bold mt-10 text-[#D5D5D5]">{city.name}</h1>
          
          <div className="my-8 relative">
            <ApartmentIcon sx = {{fontSize: '8em' }} />
          </div>
          
          <p className="text-center text-sm mb-4 text-[#D5D5D5]">
            {city.description}
          </p>
          
          <div className="w-full flex justify-center mt-4">
            <Link href={`/city/${cityKey}/details`} className="text-blue-400 text-sm hover:underline">
              View detailed statistics →
            </Link>
          </div>
        </Card>


        {/* Population card */}
        <Card data-testid="data-card" style={{background: theme.palette.background.paper}} className="p-6 rounded-lg text-[#D5D5D5] flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#D5D5D5]">Population</h2>
          </div>
          

          <div className="flex items-center mb-16 px-4">
            <div className="flex-shrink-0 w-16 flex justify-center">
              <GroupsIcon sx = {{fontSize: '3em'}}/>
            </div>
            <div className="flex-grow flex justify-center">
              <span style = {{fontSize: '2em', fontWeight: 'bold'}}> {city.population} </span>
            </div>
          </div>
          
          <div className="flex items-center mb-16 px-4">
            <div className="flex-shrink-0 w-16 flex justify-center">
              <StrollerIcon sx = {{fontSize: '3em'}}/>
            </div>
            <div className="flex-grow flex justify-center">
              <span style = {{fontSize: '2em', fontWeight: 'bold'}}> {city.avgAge} </span>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <button 
              className="bg-[#D5D5D5] w-14 h-14 rounded-md flex items-center justify-center"
              aria-label="More information about population statistics"
            >
              <span className="text-3xl font-semibold text-gray-900">i</span>
            </button>
          </div>
        </Card>

        <UnemploymentChart />
        <TrafficAccidentsChart />

      </div>
      
      {/* Footer with data source information */}
      <footer className="p-4 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>Data sourced from Statistics Finland (Tilastokeskus) | Last updated: {city.lastUpdated}</p>
        <p className="mt-1">© 2024 Finland Open Data Project</p>
      </footer>
    </div>
  )
} 