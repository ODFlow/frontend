"use client"

import { useParams } from 'next/navigation';
import { Card } from "@/components/ui/card";
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SafetyDetailPage() {
  const params = useParams();
  const city = params.city;

  // Sample data for charts
  const crimeData = {
    years: [2019, 2020, 2021, 2022, 2023],
    values: [45, 42, 38, 35, 32],
    comparison: [48, 46, 44, 42, 40]
  };

  const emergencyResponseData = {
    categories: ['< 5 min', '5-10 min', '10-15 min', '> 15 min'],
    values: [45, 30, 15, 10]
  };

  return (
    <div className="min-h-screen bg-[#1C1B23]">
      {/* Header */}
      <div className="bg-[#28272F] border-b border-[#383743]">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href={`/${city}`}
            className="inline-flex items-center text-[#D5D5D5] hover:text-white"
          >
            <ArrowBackIcon className="mr-2" />
            Back to {city.charAt(0).toUpperCase() + city.slice(1)}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#D5D5D5] mb-2">
            Safety Overview
          </h1>
          <p className="text-[#8F8F8F]">
            Comprehensive safety analysis and statistics for {city.charAt(0).toUpperCase() + city.slice(1)}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Crime Rate Trend */}
            <Card className="bg-[#28272F] border border-[#383743] p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-[#D5D5D5] mb-6">Crime Rate Trend</h2>
              <div className="h-[300px]">
                <LineChart
                  series={[
                    {
                      data: crimeData.values,
                      label: 'City Crime Rate',
                      color: '#6254B5',
                    },
                    {
                      data: crimeData.comparison,
                      label: 'National Average',
                      color: '#4A4A4A',
                      dashPattern: [5, 5],
                    }
                  ]}
                  xAxis={[{
                    data: crimeData.years,
                    scaleType: 'band',
                    tickLabelStyle: { fill: '#8F8F8F' }
                  }]}
                  yAxis={[{
                    tickLabelStyle: { fill: '#8F8F8F' }
                  }]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                  sx={{
                    '.MuiLineElement-root': {
                      strokeWidth: 2,
                    },
                  }}
                />
              </div>
            </Card>

            {/* Emergency Response Times */}
            <Card className="bg-[#28272F] border border-[#383743] p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-[#D5D5D5] mb-6">Emergency Response Times</h2>
              <div className="h-[300px]">
                <BarChart
                  series={[
                    {
                      data: emergencyResponseData.values,
                      color: '#6254B5',
                    }
                  ]}
                  xAxis={[{
                    data: emergencyResponseData.categories,
                    scaleType: 'band',
                    tickLabelStyle: { fill: '#8F8F8F' }
                  }]}
                  yAxis={[{
                    tickLabelStyle: { fill: '#8F8F8F' }
                  }]}
                  height={300}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Safety Score */}
            <Card className="bg-[#28272F] border border-[#383743] p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-[#D5D5D5] mb-4">Safety Score</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#6254B5]">92</span>
                <span className="text-[#8F8F8F]">/ 100</span>
              </div>
              <p className="text-[#8F8F8F] mt-2">Very Safe</p>
            </Card>

            {/* Key Statistics */}
            <Card className="bg-[#28272F] border border-[#383743] p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-[#D5D5D5] mb-4">Key Statistics</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-[#8F8F8F] mb-1">Crime Rate</p>
                  <p className="text-[#D5D5D5] font-semibold">32 per 1,000 residents</p>
                </div>
                <div>
                  <p className="text-[#8F8F8F] mb-1">Avg. Emergency Response</p>
                  <p className="text-[#D5D5D5] font-semibold">4.8 minutes</p>
                </div>
                <div>
                  <p className="text-[#8F8F8F] mb-1">Police Stations</p>
                  <p className="text-[#D5D5D5] font-semibold">12 locations</p>
                </div>
              </div>
            </Card>

            {/* Year-over-Year Change */}
            <Card className="bg-[#28272F] border border-[#383743] p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-[#D5D5D5] mb-4">Year-over-Year Change</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#4CAF50]">+2.3%</span>
              </div>
              <p className="text-[#8F8F8F] mt-2">Improvement in safety score</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 