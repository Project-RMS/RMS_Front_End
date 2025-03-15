import React from 'react';
import { ResponsivePie } from '@nivo/pie';

// Define the type for wastage and consumption data
interface WastageData {
    id: string;
    label: string;
    value: number;
    color: string;
}

// Sample restaurant wastage and consumption data (in dollars or units)
const wastageData: WastageData[] = [
    { id: 'food_wastage', label: 'Food Wastage', value: 450, color: '#ef4444' }, // red-500
    { id: 'beverage_wastage', label: 'Beverage Wastage', value: 200, color: '#f97316' }, // orange-500
    { id: 'food_consumption', label: 'Food Consumption', value: 3200, color: '#22c55e' }, // green-500
    { id: 'beverage_consumption', label: 'Beverage Consumption', value: 1800, color: '#3b82f6' }, // blue-500
];

const Wastage: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Restaurant Wastage vs Consumption
            </h2>
            <div className="h-96">
                <ResponsivePie
                    data={wastageData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5} // Donut-style pie chart
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ datum: 'data.color' }} // Use colors from data
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#1f2937" // gray-800
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#4b5563', // gray-600
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#1f2937', // gray-800
                                    },
                                },
                            ],
                        },
                    ]}
                    tooltip={({ datum }) => (
                        <div className="bg-white p-2 rounded-md shadow-md border border-gray-200">
                            <strong className="text-gray-800">{datum.label}</strong>
                            <p className="text-gray-600">Value: ${datum.value.toLocaleString()}</p>
                        </div>
                    )}
                />
            </div>
            <div className="mt-4 text-center text-gray-600 text-sm">
                Hover over slices for detailed values
            </div>
        </div>
    );
};

export default Wastage;