// src/components/common/ChartContainer.jsx
import PropTypes from "prop-types";
import { Card } from "@/components/ui/card";

export default function ChartContainer({ title, children, updatedYear = "2025" }) {
    return (
        <Card data-testid="data-card" className="chart-container">
            <div className="chart-header">
                <h2 className="chart-title">{title}</h2>
                <span className="chart-update-info">Updated: {updatedYear}</span>
            </div>
            {children}

        </Card>
    );
}

ChartContainer.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    updatedYear: PropTypes.string,
};