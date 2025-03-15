import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

// Define the type for COGS data (flattened for bar chart)
interface COGSBarData {
    category: string; // e.g., "Food - Meat"
    value: number; // Worth of stock consumed in dollars
    color: string; // Custom color
    parentCategory: string; // e.g., "Food"
}

// Define the raw hierarchical COGS data
interface COGSData {
    name: string;
    value?: number;
    children?: COGSData[];
    color?: string;
}

// Sample restaurant COGS data
const cogsData: COGSData = {
    name: 'COGS',
    children: [
        {
            name: 'Food',
            children: [
                { name: 'Meat', value: 2500, color: '#ef4444' },
                { name: 'Vegetables', value: 1200, color: '#f97316' },
                { name: 'Seafood', value: 1800, color: '#facc15' },
                { name: 'Dairy', value: 900, color: '#22c55e' },
            ],
        },
        {
            name: 'Beverages',
            children: [
                { name: 'Soft Drinks', value: 600, color: '#14b8a6' },
                { name: 'Alcohol', value: 1500, color: '#3b82f6' },
                { name: 'Coffee/Tea', value: 400, color: '#8b5cf6' },
            ],
        },
        {
            name: 'Desserts',
            children: [
                { name: 'Cakes', value: 700, color: '#ec4899' },
                { name: 'Ice Cream', value: 500, color: '#f43f5e' },
            ],
        },
        {
            name: 'Others',
            children: [
                { name: 'Condiments', value: 300, color: '#6b7280' },
                { name: 'Packaging', value: 200, color: '#9ca3af' },
            ],
        },
    ],
};

// Flatten the hierarchical data for the bar chart and calculate totals
const flattenCOGSData = (data: COGSData): { barData: COGSBarData[]; total: number } => {
    if (!data.children) return { barData: [], total: 0 };

    const barData: COGSBarData[] = [];
    let total = 0;

    data.children.forEach(category => {
        if (category.children) {
            category.children.forEach(subcategory => {
                barData.push({
                    category: `${category.name} - ${subcategory.name}`,
                    value: subcategory.value || 0,
                    color: subcategory.color || '#8884d8',
                    parentCategory: category.name,
                });
                total += subcategory.value || 0;
            });
        }
    });

    return { barData, total };
};

const { barData, total: totalCOGS } = flattenCOGSData(cogsData);

const COGS: React.FC = () => {
    // Check if data is valid before rendering
    if (!barData || barData.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-600">
                <p>No COGS data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Restaurant COGS - Stock Consumption Worth
                </h2>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Total COGS</p>
                    <p className="text-lg font-semibold text-green-600">
                        ${totalCOGS.toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="h-[500px]">
                <ResponsiveBar
                    data={barData}
                    keys={['value']} // Single key for bar values
                    indexBy="category" // X-axis uses category names
                    margin={{ top: 50, right: 130, bottom: 100, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={(bar) => bar.data.color} // Use custom colors from data
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45, // Rotate labels for better fit
                        legend: 'Categories & Subcategories',
                        legendPosition: 'middle',
                        legendOffset: 80,
                        tickTextColor: '#4b5563', // gray-600
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Value ($)',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        tickTextColor: '#4b5563', // gray-600
                        format: (v) => `$${v.toLocaleString()}`, // Format Y-axis with $
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    labelFormat={(v) => `$${v.toLocaleString()}`} // Format bar labels
                    legends={[
                        {
                            data: barData.map(item => ({
                                id: item.parentCategory,
                                label: item.parentCategory,
                                color: item.color,
                            })),
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemTextColor: '#4b5563', // gray-600
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            symbolShape: 'square',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#1f2937', // gray-800
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                            dataFrom: 'keys'
                        },
                    ]}
                    tooltip={({ id, value, indexValue, color }) => (
                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                            <p className="text-gray-800 font-semibold">{indexValue}</p>
                            <p className="text-gray-600">Value: ${value.toLocaleString()}</p>
                            <p className="text-gray-500 text-sm">
                                Category: {barData.find(item => item.category === indexValue)?.parentCategory}
                            </p>
                            <p className="text-gray-500 text-sm">
                                Percentage: {((value / totalCOGS) * 100).toFixed(1)}%
                            </p>
                            <div
                                className="w-3 h-3 inline-block mt-1"
                                style={{ backgroundColor: color }}
                            />
                        </div>
                    )}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </div>
            <div className="mt-4 text-center text-gray-600 text-sm">
                <p>Hover over bars for detailed values and percentages</p>
                <p className="text-xs">Bars are colored by subcategory</p>
            </div>
        </div>
    );
};

export default COGS;