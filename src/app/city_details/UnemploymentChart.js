// src/components/city/UnemploymentChart.jsx
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ChartContainer from "./ChartContainer";
import LineChartComponent from "./LineChart";
import { useUnemploymentRate } from "../../../lib/hooks/useCityData";
import { renderLoadingState, renderErrorState, createChartSeries, useChartDimensions } from "./ChartUtils";


export default function UnemploymentChart() {
    const params = useParams();
    const city = params.city ? params.city : ' -- ';

    const {
        loading: cityDataLoading,
        error: cityDataError,
        data: cityData,
    } = useUnemploymentRate(city);

    const {
        loading: nationalDataLoading,
        error: nationalDataError,
        data: nationalData,
    } = useUnemploymentRate('WHOLE COUNTRY');

    const [chartData, setChartData] = useState({
        years: [],
        cityRates: [],
        nationalRates: []
    });

    const chartContainerRef = useRef(null);
    const chartDimensions = useChartDimensions(chartContainerRef, [cityData, nationalData]);

    useEffect(() => {
        if (cityData && nationalData) {
            const cityTemp = cityData['unemploymentRate'];
            const nationalTemp = nationalData['unemploymentRate'];

            setChartData({
                years: cityTemp.map(i => i['timeframe']),
                cityRates: cityTemp.map(i => i['value']),
                nationalRates: nationalTemp.map(i => i['value'])
            });
        }
    }, [cityData, nationalData]);

    if (cityDataLoading || nationalDataLoading) {
        return renderLoadingState();
    }

    if (cityDataError || nationalDataError) {
        return renderErrorState();
    }

    const series = [
        createChartSeries({
            id: 'unemploymentData',
            data: chartData.cityRates,
            label: city,
            color: '#6254B5',
            showMark: true,
            valueFormatter: value => `${value}%`
        }),
        createChartSeries({
            id: 'nationalAvgData',
            data: chartData.nationalRates,
            label: 'national',
            color: '#a098d2',
            showMark: false,
            valueFormatter: value => `${value}%`
        })
    ];

    return (
        <ChartContainer title="Unemployment">
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