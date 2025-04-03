"use client"
import Link from 'next/link'
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useRef, useState, useEffect } from "react"
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TrafficAccidentsPage() {
  const params = useParams();
  const cityNameParam = params?.city || '';
  
  // Accident type distribution
  const accidentTypes = [
    { id: 0, value: 45, label: 'Cars', color: '#584ba2' },
    { id: 1, value: 15, label: 'Pedestrians', color: '#7165bc' },
    { id: 2, value: 28, label: 'Bicycles', color: '#a098d2' },
    { id: 3, value: 12, label: 'Public Transport', color: '#4e4390' },
  ];

  // Monthly accident data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const accidents2024 = [15, 14, 12, 11, 13, 16, null, null, null, null, null, null];
  const accidents2023 = [18, 16, 15, 14, 16, 19, 22, 20, 17, 15, 14, 16];

  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });

  useEffect(() => {
    if (chartContainerRef.current) {
      const { width } = chartContainerRef.current.getBoundingClientRect();
      setChartDimensions({ width: width, height: 300 });
      
      const handleResize = () => {
        if (chartContainerRef.current) {
          const { width } = chartContainerRef.current.getBoundingClientRect();
          setChartDimensions({ width: width, height: 300 });
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--page-background)] text-[#D5D5D5]">
      {/* Header */}
      <header className="p-4 flex items-center gap-6 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <HomeIcon />
          Home
        </Link>
        <Link href="/privacy-policy" className="flex items-center gap-2">
          <LockIcon />
          Privacy policy
        </Link>
        <Link href={`/${cityNameParam}`} className="flex items-center gap-2">
          <ArrowBackIcon />
          Back to City
        </Link>
      </header>

      {/* Main content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Traffic Accident Statistics - {cityNameParam}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accident Type Distribution */}
          <Card className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Accident Type Distribution</h2>
            <PieChart
              series={[{
                data: accidentTypes,
                innerRadius: 60,
                paddingAngle: 2,
                cornerRadius: 4,
                highlightScope: { faded: 'global', highlighted: 'item' },
                arcLabel: (item) => `${item.value}%`,
              }]}
              width={400}
              height={300}
              slotProps={{
                legend: {
                  direction: 'column',
                  position: { vertical: 'middle', horizontal: 'right' },
                  padding: { left: 20 },
                  labelStyle: {
                    fill: '#D5D5D5',
                  },
                },
              }}
            />
          </Card>

          {/* Key Statistics */}
          <Card className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Key Statistics</h2>
            <div className="space-y-6">
              <div className="p-4 bg-[var(--card-background)] rounded-lg">
                <h3 className="text-lg font-semibold">Total Accidents (2024)</h3>
                <p className="text-2xl font-bold text-[#6254B5]">81</p>
                <p className="text-sm text-green-400">-15% from 2023</p>
              </div>
              <div className="p-4 bg-[var(--card-background)] rounded-lg">
                <h3 className="text-lg font-semibold">Severe Accidents</h3>
                <p className="text-2xl font-bold text-[#6254B5]">12</p>
                <p className="text-sm text-green-400">-25% from 2023</p>
              </div>
              <div className="p-4 bg-[var(--card-background)] rounded-lg">
                <h3 className="text-lg font-semibold">Average Response Time</h3>
                <p className="text-2xl font-bold text-[#6254B5]">8.2 min</p>
                <p className="text-sm text-green-400">-0.8 min from 2023</p>
              </div>
            </div>
          </Card>

          {/* Monthly Trends */}
          <Card className="p-6 rounded-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Monthly Accident Trends</h2>
            <div ref={chartContainerRef}>
              <LineChart
                xAxis={[{
                  data: months,
                  scaleType: 'band',
                  tickLabelStyle: {
                    fill: '#D5D5D5',
                  },
                }]}
                yAxis={[{
                  min: 0,
                  max: 25,
                  tickLabelStyle: {
                    fill: '#D5D5D5',
                  },
                }]}
                series={[
                  {
                    data: accidents2024,
                    label: '2024',
                    color: '#6254B5',
                  },
                  {
                    data: accidents2023,
                    label: '2023',
                    color: '#a098d2',
                  },
                ]}
                width={chartDimensions.width}
                height={chartDimensions.height}
                margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: { top: 20 },
                    labelStyle: {
                      fill: '#D5D5D5',
                    },
                  },
                }}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-800 text-center text-sm text-gray-500 mt-8">
        <p>Data sourced from Statistics Finland (Tilastokeskus) | Last updated: March 2024</p>
        <p className="mt-1">© 2024 Finland Open Data Project</p>
      </footer>
    </div>
  )
} 