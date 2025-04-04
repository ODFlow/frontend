// src/components/city/TrafficAccidentsChart.jsx
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ChartContainer from "./ChartContainer";
import LineChartComponent from "./LineChart";
import { useTrafficAccidentsSum } from "../../../lib/hooks/useCityData";
import { renderLoadingState, renderErrorState, createChartSeries, useChartDimensions } from "./ChartUtils";

export default function TrafficAccidentsChart() {
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
    const chartDimensions = useChartDimensions(chartContainerRef, [cityData]);

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
        return renderLoadingState();
    }

    if (cityDataError) {
        return renderErrorState();
    }

    const series = [
        createChartSeries({
            id: 'accidentsData',
            data: chartData.cityRates,
            label: city,
            color: '#6254B5',
            showMark: true
        })
    ];

    return (

        <ChartContainer title="Traffic accidents">
            <div className="chart-wrapper" ref={chartContainerRef}>
                <LineChartComponent
                    years={chartData.years}
                    series={series}
                    chartDimensions={chartDimensions}
                />
            </div>
        </ChartContainer>
    );
}