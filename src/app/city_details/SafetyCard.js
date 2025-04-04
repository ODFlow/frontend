import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Card } from "@/components/ui/card";
import { PieChart } from '@mui/x-charts/PieChart';
import { useSafetyRating } from "../../../lib/hooks/useCityData";
import { renderLoadingState, renderErrorState, createChartSeries, useChartDimensions } from "./ChartUtils";

export default function SafetyCard({ cityName }) {
    const theme = useTheme();
    const [safetyRating, setSafetyRating] = useState(0);

    const {
        loading: safetyRatingLoading,
        error: safetyRatingError,
        data: safetyRatingData
    } = useSafetyRating(cityName);

    useEffect(() => {
        if (safetyRatingData) {
            setSafetyRating(safetyRatingData['safetyRating']['value']);
        }
    }, [safetyRatingLoading, safetyRatingError, safetyRatingData]);

    if (safetyRatingLoading) {
        return renderLoadingState();
    }

    if (safetyRatingError) {
        return renderErrorState();
    }

    const getSafetyColor = (rating, theme) => {
        if (rating >= 80) return theme.palette.customValues.safetyRatingColors.excellent;
        if (rating >= 60) return theme.palette.customValues.safetyRatingColors.good;
        if (rating >= 40) return theme.palette.customValues.safetyRatingColors.average;
        return theme.palette.customValues.safetyRatingColors.poor;
    };

    const safetyColor = getSafetyColor(safetyRating, theme);

    // Prepare data for the PieChart
    const safetyData = [
        { id: 0, value: safetyRating, color: safetyColor },
        { id: 1, value: 100 - safetyRating, color: '#302D43' }
    ];

    return (
        <Card data-testid="data-card" className="safety-card" style={{ background: theme.palette.background.paper }}>
            <div className="card-header">
                <h2 className="card-title">Safety rating</h2>
                <span className="card-update-info">--</span>
            </div>
            <p className="national-average">National average: --</p>

            <div className="pie-chart-container">
                <PieChart
                    data-testid="safety-rating-chart"
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

                <div className="percentage-overlay">
                    <span className="percentage-text">{safetyRating}%</span>
                </div>
            </div>
        </Card>
    );
}