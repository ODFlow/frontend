// src/components/city/PopulationCard.jsx
import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Card } from "@/components/ui/card";
import GroupsIcon from '@mui/icons-material/Groups';
import ElevatorIcon from '@mui/icons-material/Elevator';
import { useDemographics } from "../../../lib/hooks/useCityData";
import { renderLoadingState, renderErrorState, createChartSeries, useChartDimensions } from "./ChartUtils";

export default function PopulationCard({ cityName }) {
    const theme = useTheme();
    const [averageAge, setAverageAge] = useState(0);
    const [population, setPopulation] = useState(0);

    const {
        loading: demographicsLoading,
        error: demographicsError,
        data: demographicsData
    } = useDemographics(cityName);

    useEffect(() => {
        if (demographicsData) {
            setPopulation(demographicsData['demographics'][0]['value']);
            setAverageAge(demographicsData['demographics'][6]['value']);
        }

    }, [demographicsLoading, demographicsError, demographicsData]);

    if (demographicsLoading) {
        return renderLoadingState();
    }

    if (demographicsError) {
        return renderErrorState();
    }

    return (
        <Card data-testid="data-card" className="population-card" style={{ background: theme.palette.background.paper }}>
            <div className="card-header">
                <h2 className="card-title">Population</h2>
            </div>

            <div className="stat-container">
                <div className="stat-icon">
                    <GroupsIcon sx={{ fontSize: '3em' }}/>
                </div>
                <div className="stat-value">
                    <span className="stat-number">{Math.round(population / 1000)}k</span>
                </div>
            </div>

            <div className="stat-container">
                <div className="stat-icon">
                    <ElevatorIcon sx={{ fontSize: '3em' }}/>
                </div>
                <div className="stat-value">
                    <span className="stat-number">{averageAge} years</span>
                </div>
            </div>


        </Card>
    );
}