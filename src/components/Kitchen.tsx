// src/Kitchen.tsx
import React, { useState, useEffect } from 'react';

// TypeScript Types
interface Ingredient {
    name: string;
    origin: string;
    season: string;
}

interface Dish {
    name: string;
    ingredients: Ingredient[];
    technique: string;
    season: string;
    image: string;
}

// Sample Data with Seasonal Twist
const seasonalDishes: Dish[] = [
    {
        name: 'Winter Root Roast',
        ingredients: [
            { name: 'Parsnip', origin: 'Local Farm', season: 'Winter' },
            { name: 'Chestnuts', origin: 'French Forests', season: 'Winter' },
        ],
        technique: 'Slow-roasted with herb infusion',
        season: 'Winter',
        image: 'https://via.placeholder.com/600x300?text=Winter+Kitchen',
    },
    {
        name: 'Summer Citrus Salad',
        ingredients: [
            { name: 'Blood Orange', origin: 'Sicily', season: 'Summer' },
            { name: 'Mint', origin: 'Backyard Garden', season: 'Summer' },
        ],
        technique: 'Fresh toss with zesty dressing',
        season: 'Summer',
        image: 'https://via.placeholder.com/600x300?text=Summer+Kitchen',
    },
];

// Seasonal Backgrounds
const seasonStyles = {
    Winter: 'bg-gradient-to-br from-blue-200 to-gray-300',
    Summer: 'bg-gradient-to-br from-yellow-100 to-orange-200',
};

const Kitchen: React.FC = () => {
    // State to track current season
    const [currentSeason, setCurrentSeason] = useState<'Winter' | 'Summer'>('Winter');

    // Simulate season change (could be based on date or user input)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSeason((prev) => (prev === 'Winter' ? 'Summer' : 'Winter'));
        }, 10000); // Switch every 10 seconds for demo
        return () => clearInterval(interval);
    }, []);

    // Filter dish based on season
    const currentDish = seasonalDishes.find((dish) => dish.season === currentSeason) || seasonalDishes[0];

    return (
        <div
            className={`min-h-screen flex flex-col items-center py-8 transition-all duration-1000 ${seasonStyles[currentSeason]
                }`}
        >
            {/* Header with Season Indicator */}
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 animate-fade-in">
                Seasonal Kitchen Spotlight: {currentSeason}
            </h1>

            {/* Kitchen Image with Overlay */}
            <div className="relative w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl mb-8">
                <img
                    src={currentDish.image}
                    alt={`${currentSeason} Dish`}
                    className="w-full h-72 object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-4 w-full">
                    <h2 className="text-2xl font-semibold text-white">{currentDish.name}</h2>
                    <p className="text-sm text-gray-200">{currentDish.technique}</p>
                </div>
            </div>

            {/* Ingredients Section */}
            <div className="max-w-2xl bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Seasonal Ingredients</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentDish.ingredients.map((ingredient, index) => (
                        <li
                            key={index}
                            className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-300"
                        >
                            <span className="font-medium text-gray-800">{ingredient.name}</span>
                            <p className="text-sm text-gray-600">Origin: {ingredient.origin}</p>
                            <p className="text-xs text-green-600">Best in {ingredient.season}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Decorative Seasonal Flair */}
            <div className="mt-8 flex space-x-6">
                {currentSeason === 'Winter' ? (
                    <>
                        <div className="w-12 h-12 bg-blue-300 rounded-full animate-bounce"></div>
                        <div className="w-12 h-12 bg-gray-200 rounded-full animate-bounce delay-200"></div>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 bg-yellow-300 rounded-full animate-spin"></div>
                        <div className="w-12 h-12 bg-orange-200 rounded-full animate-spin delay-300"></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Kitchen;