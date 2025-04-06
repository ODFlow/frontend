// src/components/city/CityInfoCard.jsx
import { useTheme } from '@mui/material/styles';
import { Card } from "@/components/ui/card";
import {useLoading} from "@/app/city_details/LoadingContext";

export default function CityInfoCard({ cityName }) {
    const theme = useTheme();
    const {loading} = useLoading();

    return (
        <Card data-testid="data-card" className="city-card" style={{ background: theme.palette.background.paper }}>
            <h1 className="city-name">{cityName.toLocaleUpperCase()}</h1>
            <div className="city-info" style={{ fontFamily: loading ? "Flow Circular, system-ui" : "sans-serif" }}>
                Located amidst serene landscapes of lakes and forests,
                this city offers a peaceful and natural environment perfect for outdoor activities year-round.
                With a mix of modern infrastructure and traditional Finnish architecture,
                the city provides a harmonious balance of urban living and close connection to nature
            </div>
        </Card>
    );
}