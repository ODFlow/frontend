// src/components/common/LineChartComponent.jsx
import PropTypes from "prop-types";
import { LineChart } from '@mui/x-charts/LineChart';

export default function LineChartComponent({ years, series, chartDimensions }) {
    return (
        <LineChart
            xAxis={[{
                data: years,
                tickLabelStyle: { fill: '#D5D5D5', fontSize: 10 },
                scaleType: 'band',
            }]}
            yAxis={[{
                tickLabelStyle: { fill: '#D5D5D5', fontSize: 10 },
            }]}
            series={series}
            width={chartDimensions.width}
            height={chartDimensions.height}
            margin={{ top: 20, bottom: 40, left: 40, right: 10 }}
            tooltip={{ trigger: 'item' }}
            slotProps={{
                legend: {
                    hidden: false,
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0,
                    itemMarkWidth: 8,
                    itemMarkHeight: 8,
                    markGap: 10,
                    itemGap: 10,
                    labelStyle: {
                        fill: '#D5D5D5'
                    }
                }
            }}
        />
    );
}

LineChartComponent.propTypes = {
    years: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])).isRequired,
    series: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
        label: PropTypes.string.isRequired,
        curve: PropTypes.string,
        color: PropTypes.string,
        area: PropTypes.bool,
        showMark: PropTypes.bool,
        valueFormatter: PropTypes.func,
        highlightScope: PropTypes.object
    })).isRequired,
    chartDimensions: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    }).isRequired
};