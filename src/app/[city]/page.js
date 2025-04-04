"use client"
import Link from 'next/link'
import { useParams } from "next/navigation"
import { useTheme } from '@mui/material/styles';
import { Card } from "@/components/ui/card"
import {PieChart} from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import {useRef, useState, useEffect} from "react"
import '../page.css'
import GroupsIcon from '@mui/icons-material/Groups';
import StrollerIcon from '@mui/icons-material/Stroller';
import ApartmentIcon from '@mui/icons-material/Apartment';

import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';


import {
  useTrafficAccidentsSum,
  useDemographics,
  useUnemploymentRate,
  useSafetyRating
} from "../../../lib/hooks/useCityData"
import PropTypes from "prop-types";





const ChartUtils = {
  renderLoadingState: (message = "Loading data...") => (
      <Card data-testid="data-card" className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5] flex flex-col h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-2">{message}</p>
        </div>
      </Card>
  ),

  renderErrorState: (message = "Unable to load data") => (
      <Card data-testid="data-card" className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5] flex flex-col h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-2">{message}</p>
          <p className="text-sm opacity-70">Please try again later</p>
        </div>
      </Card>
  ),

  createChartSeries: ({ id, data, label, color, showMark, valueFormatter }) => ({
    id,
    data,
    label,
    curve: 'natural',
    color,
    area: true,
    showMark,
    valueFormatter: valueFormatter || (value => `${value}`),
    highlightScope: { highlight: 'item' }
  }),

  useChartDimensions: (ref, dependencies = [], initialDimensions = { width: 300, height: 220 }) => {
    const [dimensions, setDimensions] = useState(initialDimensions);

    useEffect(() => {
      if (!ref.current) return;

      const updateDimensions = () => {
        if (ref.current) {
          const { width } = ref.current.getBoundingClientRect();
          setDimensions({ width, height: initialDimensions.height });
        }
      };

      updateDimensions();

      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }, [ref, initialDimensions.height, ...dependencies]);

    return dimensions;
  }
};


function ChartContainer({ title, children, updatedYear = "2025" }) {
  return (
      <Card data-testid="data-card" className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5] flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#D5D5D5]">{title}</h2>
          <span className="text-sm px-2 py-1 rounded">Updated: {updatedYear}</span>
        </div>
        {children}
        <div className="flex justify-center mt-4">
          <button
              className="bg-[#D5D5D5] w-14 h-14 rounded-md flex items-center justify-center"
              aria-label={`More information about ${title.toLowerCase()}`}
          >
            <span className="text-3xl font-semibold text-gray-900">i</span>
          </button>
        </div>
      </Card>
  );
}

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  updatedYear: PropTypes.string,
}





function LineChartComponent({ years, series, chartDimensions }) {
  return (
      <LineChart
          xAxis={[{
            data: years,
            tickLabelStyle: { fill: '#D5D5D5', fontSize: 10 },
            scaleType: 'band',
          }]}
          yAxis={[{
            tickLabelStyle: { fill: '#D5D5D5', fontSize: 10 },
          }]}
          series={series}
          width={chartDimensions.width}
          height={chartDimensions.height}
          margin={{ top: 20, bottom: 40, left: 40, right: 10 }}
          tooltip={{ trigger: 'item' }}
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
                fill: '#D5D5D5'
              }
            }
          }}
      />
  );
}


LineChartComponent.propTypes = {
  years: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])).isRequired,
  series: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    label: PropTypes.string.isRequired,
    curve: PropTypes.string,
    color: PropTypes.string,
    area: PropTypes.bool,
    showMark: PropTypes.bool,
    valueFormatter: PropTypes.func,
    highlightScope: PropTypes.object
  })).isRequired,
  chartDimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired
};





function UnemploymentChart() {
  const params = useParams();
  const city = params.city ? params.city : ' -- ';

  const {
    loading: cityDataLoading,
    error: cityDataError,
    data: cityData,
  } = useUnemploymentRate(city);

  const {
    loading: nationalDataLoading,
    error: nationalDataError,
    data: nationalData,
  } = useUnemploymentRate('WHOLE COUNTRY');

  const [chartData, setChartData] = useState({
    years: [],
    cityRates: [],
    nationalRates: []
  });

  const chartContainerRef = useRef(null);
  const chartDimensions = ChartUtils.useChartDimensions(chartContainerRef, [cityData, nationalData]);

  useEffect(() => {
    if (cityData && nationalData) {
      const cityTemp = cityData['unemploymentRate'];
      const nationalTemp = nationalData['unemploymentRate'];

      setChartData({
        years: cityTemp.map(i => i['timeframe']),
        cityRates: cityTemp.map(i => i['value']),
        nationalRates: nationalTemp.map(i => i['value'])
      });
    }
  }, [cityData, nationalData]);

  if (cityDataLoading || nationalDataLoading) {
    return ChartUtils.renderLoadingState("Loading unemployment data...");
  }

  if (cityDataError || nationalDataError) {
    return ChartUtils.renderErrorState("Unable to load unemployment data");
  }

  const series = [
    ChartUtils.createChartSeries({
      id: 'unemploymentData',
      data: chartData.cityRates,
      label: city,
      color: '#6254B5',
      showMark: true,
      valueFormatter: value => `${value}%`
    }),
    ChartUtils.createChartSeries({
      id: 'nationalAvgData',
      data: chartData.nationalRates,
      label: 'national',
      color: '#a098d2',
      showMark: false,
      valueFormatter: value => `${value}%`
    })
  ];

  return (
      <ChartContainer title="Unemployment">
        <div className="h-64 w-full relative" ref={chartContainerRef}>
          <LineChartComponent
              years={chartData.years}
              series={series}
              chartDimensions={chartDimensions}
          />
        </div>
      </ChartContainer>
  );
}

function TrafficAccidents() {
  const params = useParams();
  const city = params.city ? params.city : ' -- ';

  const {
    loading: cityDataLoading,
    error: cityDataError,
    data: cityData,
  } = useTrafficAccidentsSum(city);

  const [chartData, setChartData] = useState({
    years: [],
    cityRates: []
  });

  const chartContainerRef = useRef(null);
  const chartDimensions = ChartUtils.useChartDimensions(chartContainerRef, [cityData]);

  useEffect(() => {
    if (cityData) {
      const cityTemp = cityData['trafficAccidentsSum'];
      setChartData({
        years: cityTemp.map(i => i['timeframe']),
        cityRates: cityTemp.map(i => i['value'])
      });
    }
  }, [cityData]);

  if (cityDataLoading) {
    return ChartUtils.renderLoadingState();
  }

  if (cityDataError) {
    return ChartUtils.renderErrorState();
  }

  const series = [
    ChartUtils.createChartSeries({
      id: 'accidentsData',
      data: chartData.cityRates,
      label: city,
      color: '#6254B5',
      showMark: true
    })
  ];

  return (
      <ChartContainer title="Traffic accidents">
        <div className="h-64 w-full relative" ref={chartContainerRef}>
          <LineChartComponent
              years={chartData.years}
              series={series}
              chartDimensions={chartDimensions}
          />
        </div>
      </ChartContainer>
  );
}






export default function CityPage() {
    const theme = useTheme();
    const params = useParams();
    const cityNameParam = params?.city || '';

    const getSafetyColor = (rating, theme) => {

    if (rating >= 80) return theme.palette.customValues.safetyRatingColors.excellent;
    if (rating >= 60) return theme.palette.customValues.safetyRatingColors.good;
    if (rating >= 40) return theme.palette.customValues.safetyRatingColors.average;
    return theme.palette.customValues.safetyRatingColors.poor;
  }



    const { loading: demographicsLoading,
            error: demographicsError,
            data: demographicsData } = useDemographics(cityNameParam);

    const { loading: safetyRatingLoading,
            error: safetyRatingError,
            data: safetyRatingData } = useSafetyRating(cityNameParam);


    const [averageAge, setAverageAge] = useState(0);
    const [population, setPopulation] = useState(0);
    const [safetyRating, setSafetyRating] = useState(0);




    useEffect(() => {

    if (demographicsData) {
      setPopulation(demographicsData['demographics'][0]['value']);
      setAverageAge(demographicsData['demographics'][6]['value']);

    }

    if (safetyRatingData) {
      setSafetyRating(safetyRatingData['safetyRating']['value']);
    }




  }, [demographicsLoading, demographicsError, demographicsData,
      safetyRatingLoading, safetyRatingError, safetyRatingData,
    ]);




  const safetyColor = getSafetyColor(safetyRating, theme);
  
  // Prepare data for the PieChart
  const safetyData = [
    { id: 0, value: safetyRating, color: safetyColor },
    { id: 1, value: 100 - safetyRating, color: '#302D43' }
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
        <Link href="/" underline="hover"
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
            <span className="text-sm px-2 py-1 rounded">--</span>
          </div>
          <p className="text-sm opacity-70 mb-6">National average: --</p>
          
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
              <span className="text-3xl font-bold text-[#D5D5D5]"> {safetyRating}% </span>
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
          <h1 className="text-4xl font-bold mt-10 text-[#D5D5D5]">{cityNameParam}</h1>
          
          <div className="flex items-center gap-2">
            <ApartmentIcon sx = {{fontSize: '8em' }} />
          </div>
          <div className="w-full flex justify-center mt-4"/>


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
              <span style = {{fontSize: '2em', fontWeight: 'bold'}}> {population} </span>
            </div>
          </div>
          
          <div className="flex items-center mb-16 px-4">
            <div className="flex-shrink-0 w-16 flex justify-center">
              <StrollerIcon sx = {{fontSize: '3em'}}/>
            </div>
            <div className="flex-grow flex justify-center">
              <span style = {{fontSize: '2em', fontWeight: 'bold'}}> {averageAge} </span>
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
        <TrafficAccidents />

      </div>
      
      {/* Footer with data source information */}
      <footer className="p-4 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>Data sourced from Statistics Finland (Tilastokeskus) | Last updated: --</p>
        <p className="mt-1">© 2024 Finland Open Data Project</p>
      </footer>
    </div>
  )
} 