// src/components/city/CityPage.jsx
"use client"
import { useParams } from "next/navigation"
import CityHeader from "../city_details/CityHeader";
import CityFooter from "../city_details/CityFooter";
import SafetyCard from "../city_details/SafetyCard";
import CityInfoCard from "../city_details/CityInfoCard";
import PopulationCard from "../city_details/PopulationCard";
import UnemploymentChart from "../city_details/UnemploymentChart";
import TrafficAccidentsChart from "../city_details/TrafficAccidentsChart";

import "./page.css";

export default function CityPage() {
  const params = useParams();
  const cityNameParam = params?.city || '';

  return (
      <div className="page-container">
        <CityHeader />

        <div className="content-grid">
          <SafetyCard cityName={cityNameParam} />
          <CityInfoCard cityName={cityNameParam} />
          <PopulationCard cityName={cityNameParam} />
          <UnemploymentChart />
          <TrafficAccidentsChart />
        </div>

        <CityFooter />
      </div>
  );
}