"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

const DefaultIcon = new L.Icon({
	iconUrl: "/default_marker.png",
	iconSize: [20, 20],
	iconAnchor: [7, 7],
	popupAnchor: [0, -7],
});

const HoverIcon = new L.Icon({
	iconUrl: "/hover_marker.png",
	iconSize: [21, 21],
	iconAnchor: [7, 7],
	popupAnchor: [0, -7],
});

const cities = [
	{ name: "Oulu", position: [65.0121, 25.4651], code: "KU564" },
	{ name: "Helsinki", position: [60.1699, 24.9384], code: "KU091" },
	{ name: "Tampere", position: [61.4978, 23.761], code: "KU837" },
];

export default function FinlandMap() {
	const theme = useTheme();
	const router = useRouter();
	const [selectedCity, setSelectedCity] = useState(null);



	const handleCityClick = (city) => {
		setSelectedCity(city);
		router.push(`${city.name.toLowerCase()}`);
	};



	return (
		<div
			style={{ backgroundColor: theme.palette.background.default }}
			className="flex flex-col md:flex-row h-screen text-white"
		>
			<div className="w-full md:w-2/3 h-[70vh] md:h-screen relative">
				<MapContainer
					center={[63.5, 24]}
					zoom={6}
					style={{ height: "100%", width: "100%" }}
					zoomControl={true}
					attributionControl={false}
				>
					<TileLayer
						url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
					/>
					{cities.map((city) => (
						<Marker
							key={city.code}
							position={city.position}
							icon={DefaultIcon} // Set initial icon
							eventHandlers={{
								mouseover: (e) => {
									e.target.setIcon(HoverIcon);
								},
								mouseout: (e) => {
									e.target.setIcon(DefaultIcon);
								},
							}}
						>
							<Popup>
								<div className="text-center">
									<h3 className="font-bold">{city.name}</h3>
									<button
										onClick={() => handleCityClick(city)}
										className="mt-2 bg-[#6254B5] text-white px-3 py-1 rounded hover:bg-[#4e4390]"
									>
										View Details
									</button>
								</div>
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>

			{/* Right panel with cities */}
			<div className="w-full md:w-1/3 p-4 space-y-4 overflow-y-auto">
				{cities.map((city) => (
					<button
						key={city.code}
						className="flex items-center w-full p-3 rounded-lg bg-[#1E1E1E] hover:bg-[#343434] transition-colors"
						onClick={() => handleCityClick(city)}
					>
						<div className="mr-[3%]">
							<MapsHomeWorkIcon sx={{ color: "#FFFFFF" }} />
						</div>
						<span>{city.name}</span>
					</button>
				))}
			</div>

			<footer className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-8 bg-black bg-opacity-70">
				<Link href="/" className="hover:underline">
					About
				</Link>
				<Link href="/" className="hover:underline">
					Privacy policy
				</Link>
			</footer>
		</div>
	);
}
