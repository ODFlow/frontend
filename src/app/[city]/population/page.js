"use client"
import Link from 'next/link'
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useRef, useState, useEffect } from "react"
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PopulationPage() {
  const params = useParams();
  const cityNameParam = params?.city || '';
  
  // Age distribution data
  const ageGroups = ['0-14', '15-24', '25-44', '45-64', '65+'];
  const populationByAge = [15.3, 12.1, 28.4, 24.2, 20.0];
  
  // Gender distribution data
  const genderData = [
    { id: 0, value: 49.2, label: 'Male', color: '#584ba2' },
    { id: 1, value: 50.8, label: 'Female', color: '#7165bc' },
  ];

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
        <h1 className="text-3xl font-bold mb-6">Population Statistics - {cityNameParam}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Distribution Chart */}
          <Card className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Age Distribution</h2>
            <div ref={chartContainerRef}>
              <BarChart
                xAxis={[{
                  data: ageGroups,
                  scaleType: 'band',
                  tickLabelStyle: {
                    fill: '#D5D5D5',
                  },
                }]}
                yAxis={[{
                  tickLabelStyle: {
                    fill: '#D5D5D5',
                  },
                }]}
                series={[{
                  data: populationByAge,
                  color: '#6254B5',
                }]}
                width={chartDimensions.width}
                height={chartDimensions.height}
                margin={{ top: 20, bottom: 30, left: 40, right: 10 }}
              />
            </div>
          </Card>

          {/* Gender Distribution Chart */}
          <Card className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Gender Distribution</h2>
            <PieChart
              series={[{
                data: genderData,
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
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'middle' },
                  padding: { top: 20 },
                  labelStyle: {
                    fill: '#D5D5D5',
                  },
                },
              }}
            />
          </Card>

          {/* Population Trends */}
          <Card className="p-6 rounded-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Historical Population Growth</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Year</th>
                    <th className="text-left p-2">Population</th>
                    <th className="text-left p-2">Growth Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">2024</td>
                    <td className="p-2">331,000</td>
                    <td className="p-2 text-green-400">+1.2%</td>
                  </tr>
                  <tr>
                    <td className="p-2">2023</td>
                    <td className="p-2">327,000</td>
                    <td className="p-2 text-green-400">+1.1%</td>
                  </tr>
                  <tr>
                    <td className="p-2">2022</td>
                    <td className="p-2">323,000</td>
                    <td className="p-2 text-green-400">+0.9%</td>
                  </tr>
                </tbody>
              </table>
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