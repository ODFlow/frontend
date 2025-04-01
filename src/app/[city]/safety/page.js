"use client"

import { useParams } from 'next/navigation';
import { Card } from "@/components/ui/card";

export default function SafetyDetailPage() {
  const params = useParams();
  const city = params.city;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#D5D5D5]">
        Safety Rating Details - {city.charAt(0).toUpperCase() + city.slice(1)}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5]">
          <h2 className="text-2xl font-bold mb-4">Overall Safety Score</h2>
          <div className="text-4xl font-bold mb-2">72%</div>
          <p className="text-sm opacity-80">Last updated: March 2024</p>
        </Card>

        <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5]">
          <h2 className="text-2xl font-bold mb-4">National Comparison</h2>
          <div className="text-4xl font-bold mb-2">+4%</div>
          <p className="text-sm opacity-80">Above national average</p>
        </Card>

        <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5] md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Safety Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-xl mb-2">Crime Rate</h3>
              <p className="text-3xl font-bold">Low</p>
              <p className="text-sm opacity-80">12 incidents per 1000 residents</p>
            </div>
            <div>
              <h3 className="text-xl mb-2">Emergency Response</h3>
              <p className="text-3xl font-bold">5.2 min</p>
              <p className="text-sm opacity-80">Average response time</p>
            </div>
            <div>
              <h3 className="text-xl mb-2">Public Trust</h3>
              <p className="text-3xl font-bold">High</p>
              <p className="text-sm opacity-80">89% satisfaction rate</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[var(--card-background)] p-6 rounded-lg text-[#D5D5D5] md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Year-over-Year Trends</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl mb-2">2024</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-2">2023</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '69%' }}></div>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-2">2022</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 