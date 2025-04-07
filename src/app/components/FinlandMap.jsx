'use client';

import { useEffect, useRef } from 'react';

export default function FinlandMap({ cityMatches }) {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart;
    
    const initChart = async () => {
      const { Chart } = await import('chart.js/auto');
      const { ChoroplethController, ProjectionScale, ColorScale, GeoFeature } = await import('chartjs-chart-geo');
      
      Chart.register(ChoroplethController, ProjectionScale, ColorScale, GeoFeature);

      // Using Statistics Finland's WFS service for municipality-based statistical areas
      const response = await fetch('https://geo.stat.fi/geoserver/tilastointialueet/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=application/json&srsName=EPSG:4326');
      const finlandGeoData = await response.json();

      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        
        if (chart) {
          chart.destroy();
        }

        chart = new Chart(ctx, {
          type: 'choropleth',
          data: {
            labels: finlandGeoData.features.map(d => d.properties.nimi),
            datasets: [{
              label: 'Finland',
              outline: finlandGeoData.features[0],
              showOutline: true,
              data: finlandGeoData.features.map(d => ({
                feature: d,
                value: getCityScore(d.properties.nimi)
              })),
              backgroundColor: (context) => {
                const value = context.raw?.value || 0;
                return `rgba(30, 30, 30, ${value / 100})`;
              },
              borderColor: '#3A3A3A',
              borderWidth: 1,
            }]
          },
          options: {
            showOutline: true,
            showGraticule: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const value = context.raw?.value || 0;
                    const name = context.raw?.feature?.properties?.nimi || '';
                    return `${name}: ${value}% match`;
                  }
                }
              }
            },
            scales: {
              projection: {
                axis: 'x',
                projection: 'mercator',
                projectionOptions: {
                  center: [25, 64.5],
                  scale: 20000,
                  rotate: [-5, 0, 0]
                },
                bounds: {
                  padding: 0.2
                }
              },
              color: {
                axis: 'x',
                quantize: 5,
                legend: {
                  position: 'bottom-right',
                  align: 'bottom'
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
              }
            }
          }
        });
      }
    };

    initChart();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [cityMatches]);

  const getCityScore = (municipalityName) => {
    // Map municipality names to cities
    const cityMapping = {
      'Oulu': 'Oulu',
      'Tampere': 'Tampere',
      'Rovaniemi': 'Rovaniemi',
      'Kuopio': 'Kuopio',
      'Inari': 'Ivalo', // Ivalo is in Inari municipality
    };

    const cityName = cityMapping[municipalityName];
    const city = cityMatches.find(c => c.name.toLowerCase() === (cityName || '').toLowerCase());
    return city ? city.score : 0;
  };

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-6">
      <canvas ref={chartRef} className="w-full h-[500px]" />
    </div>
  );
} 