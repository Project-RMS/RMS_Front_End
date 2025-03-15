// src/components/RawMaterialAnalysis.tsx
import React from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar';
import { ResponsiveLine, Serie } from '@nivo/line';
import { Box, Typography, Paper, Grid } from '@mui/material';

// Types
interface MaterialItem {
    name: string;
    stock: number; // in kg
    usage: number; // daily usage in kg
    category: string;
}

interface ChartData {
    barData: BarDatum[];
    lineData: Serie[];
}

// Static restaurant data
const rawMaterials: MaterialItem[] = [
    { name: 'Tomatoes', stock: 80, usage: 15, category: 'Vegetables' },
    { name: 'Onions', stock: 60, usage: 12, category: 'Vegetables' },
    { name: 'Potatoes', stock: 50, usage: 10, category: 'Vegetables' },
    { name: 'Chicken', stock: 70, usage: 20, category: 'Meat' },
    { name: 'Beef', stock: 60, usage: 15, category: 'Meat' },
    { name: 'Pork', stock: 30, usage: 8, category: 'Meat' },
    { name: 'Milk', stock: 50, usage: 12, category: 'Dairy' },
    { name: 'Cheese', stock: 40, usage: 8, category: 'Dairy' },
    { name: 'Rice', stock: 60, usage: 15, category: 'Grains' },
    { name: 'Flour', stock: 50, usage: 12, category: 'Grains' },
    { name: 'Water', stock: 40, usage: 20, category: 'Beverages' },
    { name: 'Soda', stock: 30, usage: 15, category: 'Beverages' },
];

// Process data for charts
const processChartData = (): ChartData => {
    // Bar chart data
    const barData: BarDatum[] = rawMaterials.map(item => ({
        material: item.name,
        Stock: item.stock,
        Usage: item.usage,
        category: item.category,
    }));

    // Line chart data (simulating weekly usage trend)
    const categories = [...new Set(rawMaterials.map(item => item.category))];
    const lineData: Serie[] = categories.map(category => ({
        id: category,
        data: Array.from({ length: 7 }, (_, i) => {
            const categoryItems = rawMaterials.filter(item => item.category === category);
            const totalUsage = categoryItems.reduce((sum, item) => sum + item.usage, 0);
            return {
                x: `Day ${i + 1}`,
                y: totalUsage * (1 + Math.random() * 0.2 - 0.1), // Slight variation
            };
        }),
    }));

    return { barData, lineData };
};

const RawMaterialAnalysis: React.FC = () => {
    const { barData, lineData } = processChartData();

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, bgcolor: '#f5f5f5' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Restaurant Material Analysis
            </Typography>

            <Grid container spacing={4}>
                {/* Bar Chart - Stock vs Usage */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 500, borderRadius: 2 }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Stock vs Daily Usage (kg)
                        </Typography>
                        <Box sx={{ height: 'calc(100% - 40px)' }}>
                            <ResponsiveBar
                                data={barData}
                                keys={['Stock', 'Usage']}
                                indexBy="material"
                                margin={{ top: 20, right: 130, bottom: 100, left: 60 }}
                                padding={0.3}
                                valueScale={{ type: 'linear' }}
                                indexScale={{ type: 'band', round: true }}
                                colors={{ scheme: 'set2' }}
                                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: -45,
                                    legend: 'Materials',
                                    legendPosition: 'middle',
                                    legendOffset: 70,
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Quantity (kg)',
                                    legendPosition: 'middle',
                                    legendOffset: -40,
                                }}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                                legends={[
                                    {
                                        dataFrom: 'keys',
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 120,
                                        translateY: 0,
                                        itemsSpacing: 2,
                                        itemWidth: 100,
                                        itemHeight: 20,
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 0.85,
                                        symbolSize: 20,
                                    },
                                ]}
                                animate={true}
                                motionConfig="gentle"
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Line Chart - Weekly Usage Trend */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 500, borderRadius: 2 }}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Weekly Usage Trend by Category (kg)
                        </Typography>
                        <Box sx={{ height: 'calc(100% - 40px)' }}>
                            <ResponsiveLine
                                data={lineData}
                                margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
                                xScale={{ type: 'point' }}
                                yScale={{
                                    type: 'linear',
                                    min: 'auto',
                                    max: 'auto',
                                    stacked: false,
                                }}
                                yFormat=" >-.2f"
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Days',
                                    legendOffset: 36,
                                    legendPosition: 'middle',
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Usage (kg)',
                                    legendPosition: 'middle',
                                    legendOffset: -40,
                                }}
                                pointSize={10}
                                pointColor={{ theme: 'background' }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: 'serieColor' }}
                                pointLabelYOffset={-12}
                                useMesh={true}
                                colors={{ scheme: 'category10' }}
                                legends={[
                                    {
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 100,
                                        translateY: 0,
                                        itemsSpacing: 0,
                                        itemDirection: 'left-to-right',
                                        itemWidth: 80,
                                        itemHeight: 20,
                                        itemOpacity: 0.75,
                                        symbolSize: 12,
                                        symbolShape: 'circle',
                                    },
                                ]}
                                animate={true}
                                motionConfig="default"
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Summary */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    Total Materials: {rawMaterials.length} | Categories: {new Set(rawMaterials.map(m => m.category)).size}
                </Typography>
            </Box>
        </Box>
    );
};

export default RawMaterialAnalysis;