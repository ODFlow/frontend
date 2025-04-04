// src/utils/ChartUtils.js
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import CircularProgress from '@mui/material/CircularProgress';

export const renderLoadingState = () => (
    <Card data-testid="data-card" className="loading-card">
        <div className="loading-content">
            <CircularProgress />
        </div>
    </Card>
);

export const renderErrorState = (message = "Unable to load data") => (
    <Card data-testid="data-card" className="error-card">
        <div className="error-content">
            <p className="error-text">{message}</p>
            <p className="error-subtext">Please try again later</p>
        </div>
    </Card>
);

export const createChartSeries = ({ id, data, label, color, showMark, valueFormatter }) => ({
    id,
    data,
    label,
    curve: 'natural',
    color,
    area: true,
    showMark,
    valueFormatter: valueFormatter || (value => `${value}`),
    highlightScope: { highlight: 'item' }
});

export const useChartDimensions = (ref, dependencies = [], initialDimensions = { width: 300, height: 220 }) => {
    const [dimensions, setDimensions] = useState(initialDimensions);

    useEffect(() => {
        if (!ref.current) return;

        const updateDimensions = () => {
            if (ref.current) {
                const { width } = ref.current.getBoundingClientRect();
                setDimensions({ width, height: initialDimensions.height });
            }
        };

        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [ref, initialDimensions.height, ...dependencies]);

    return dimensions;
};