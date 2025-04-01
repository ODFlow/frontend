"use client";

import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useEducation,
  useIncome,
  useDemographics,
  useUnemploymentRate,
  useTrafficAccidents
} from "../../../../lib/hooks/useCityData";

export default function DetailedView() {
  const params = useParams();
  const city = params.city;

  // Fetch data using our hooks
  const { data: educationData, loading: educationLoading } = useEducation(city);
  const { data: incomeData, loading: incomeLoading } = useIncome(city);
  const { data: demographicsData, loading: demographicsLoading } = useDemographics(city);
  const { data: unemploymentData, loading: unemploymentLoading } = useUnemploymentRate(city);
  const { data: trafficData, loading: trafficLoading } = useTrafficAccidents(city);

  const isLoading = educationLoading || incomeLoading || demographicsLoading || 
                    unemploymentLoading || trafficLoading;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-8 flex items-center justify-between">
        <Link href={`/${city}`}>
          <Button variant="outline" className="text-[#D5D5D5]">
            ← Back to Overview
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-[#D5D5D5] capitalize">{city} Detailed Statistics</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D5D5D5]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Section */}
          <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5]">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="space-y-4">
              {educationData?.education?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.description}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Income Section */}
          <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5]">
            <h2 className="text-2xl font-bold mb-4">Income</h2>
            <div className="space-y-4">
              {incomeData?.income?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.description}</span>
                  <span className="font-semibold">{item.value}€</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Demographics Section */}
          <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5]">
            <h2 className="text-2xl font-bold mb-4">Demographics</h2>
            <div className="space-y-4">
              {demographicsData?.demographics?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.description}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Unemployment Section */}
          <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5]">
            <h2 className="text-2xl font-bold mb-4">Unemployment</h2>
            <div className="space-y-4">
              {unemploymentData?.unemployment_rate?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.timeframe}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Traffic Accidents Section */}
          <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5] col-span-full">
            <h2 className="text-2xl font-bold mb-4">Traffic Accidents</h2>
            <div className="space-y-4">
              {trafficData?.traffic_accidents?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.description} ({item.year})</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
} 