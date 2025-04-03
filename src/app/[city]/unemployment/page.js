"use client"
import Link from 'next/link'
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useRef, useState, useEffect } from "react"
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function UnemploymentPage() {
  const params = useParams();
  const cityNameParam = params?.city || '';
  
  // Monthly unemployment data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const unemploymentRate2024 = [6.8, 6.7, 6.4, 6.2, 6.1, 6.0, null, null, null, null, null, null];
  const unemploymentRate2023 = [7.2, 7.1, 7.0, 6.9, 6.8, 6.7, 6.9, 6.8, 6.7, 6.8, 6.9, 6.8];
  
  // Unemployment by education level
  const educationLevels = ['Basic', 'Secondary', 'Bachelor', 'Master', 'Doctorate'];
  const unemploymentByEducation = [12.4, 8.2, 5.1, 3.8, 2.1];

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
        <h1 className="text-3xl font-bold mb-6">Unemployment Statistics - {cityNameParam}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Trends Chart */}
          <Card className="p-6 rounded-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Monthly Unemployment Rate</h2>
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
                  max: 10,
                  tickLabelStyle: {
                    fill: '#D5D5D5',
                  },
                }]}
                series={[
                  {
                    data: unemploymentRate2024,
                    label: '2024',
                    color: '#6254B5',
                  },
                  {
                    data: unemploymentRate2023,
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

          {/* Education Level Chart */}
          <Card className="p-6 rounded-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Unemployment by Education Level</h2>
            <BarChart
              xAxis={[{
                data: educationLevels,
                scaleType: 'band',
                tickLabelStyle: {
                  fill: '#D5D5D5',
                },
              }]}
              yAxis={[{
                min: 0,
                max: 15,
                tickLabelStyle: {
                  fill: '#D5D5D5',
                },
              }]}
              series={[{
                data: unemploymentByEducation,
                color: '#6254B5',
              }]}
              width={chartDimensions.width}
              height={chartDimensions.height}
              margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
            />
          </Card>

          {/* Key Statistics */}
          <Card className="p-6 rounded-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Key Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[var(--card-background)] rounded-lg">
                <h3 className="text-lg font-semibold">Current Rate</h3>
                <p className="text-2xl font-bold text-[#6254B5]">6.4%</p>
                <p className="text-sm text-green-400">-0.8% from 2023</p>
              </div>
              <div className="p-4 bg-[var(--card-background)] rounded-lg">
                <h3 className="text-lg font-semibold">Long-term</h3>
                <p className="text-2xl font-bold text-[#6254B5]">2.1%</p>
                <p className="text-sm text-green-400">-0.3% from 2023</p>
              </div>
              <div className="p-4 bg-[var(--card-background)] rounded-lg">
                <h3 className="text-lg font-semibold">Youth Rate</h3>
                <p className="text-2xl font-bold text-[#6254B5]">12.8%</p>
                <p className="text-sm text-red-400">+0.2% from 2023</p>
              </div>
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