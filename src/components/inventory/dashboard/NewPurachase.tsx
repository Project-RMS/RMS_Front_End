import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// Define the type for our restaurant purchase data
interface PurchaseData {
    category: string;
    amount: number;
    color: string;
}

// Sample restaurant purchase data
const purchaseData: PurchaseData[] = [
    { category: 'Food', amount: 1200, color: 'rgba(255, 99, 132, 0.6)' },
    { category: 'Drinks', amount: 800, color: 'rgba(54, 162, 235, 0.6)' },
    { category: 'Desserts', amount: 450, color: 'rgba(255, 206, 86, 0.6)' },
    { category: 'Snacks', amount: 300, color: 'rgba(75, 192, 192, 0.6)' },
    { category: 'Others', amount: 150, color: 'rgba(153, 102, 255, 0.6)' },
];

// Chart data configuration
const chartData = {
    labels: purchaseData.map(item => item.category),
    datasets: [
        {
            label: 'Restaurant Purchases ($)',
            data: purchaseData.map(item => item.amount),
            backgroundColor: purchaseData.map(item => item.color),
            borderColor: purchaseData.map(item => item.color.replace('0.6', '1')),
            borderWidth: 1,
        },
    ],
};

// Chart options configuration
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                color: '#1f2937', // Tailwind gray-800
                font: {
                    size: 14,
                },
            },
        },
        title: {
            display: true,
            text: 'Restaurant Purchase Distribution',
            color: '#1f2937', // Tailwind gray-800
            font: {
                size: 20,
            },
        },
        tooltip: {
            callbacks: {
                label: (context: any) => {
                    const value = context.parsed.r;
                    return `${context.label}: $${value}`;
                },
            },
        },
    },
    scales: {
        r: {
            ticks: {
                color: '#4b5563', // Tailwind gray-600
                backdropColor: 'rgba(255, 255, 255, 0.8)',
            },
            grid: {
                color: '#e5e7eb', // Tailwind gray-200
            },
            pointLabels: {
                color: '#4b5563', // Tailwind gray-600
            },
        },
    },
};

const NewPurachase: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <PolarArea data={chartData} options={options} />
        </div>
    );
};

export default NewPurachase;