import React from 'react';
import { ResponsiveNetwork } from '@nivo/network';

// Define types for nodes and links with additional restaurant-specific details
interface Node {
    id: string;
    size: number; // Stock quantity in units
    color: string;
    cost?: number; // Cost per unit in dollars (optional for inventory items)
    category?: string; // Category (e.g., Meat, Beverage) for inventory items
    type: 'supplier' | 'inventory'; // Distinguish suppliers from inventory
}

interface Link {
    source: string;
    target: string;
    distance: number; // Visual distance between nodes
    weeklySupply?: number; // Weekly supply quantity in units (optional)
}

// Sample restaurant stock network data with more details
const stockNetworkData = {
    nodes: [
        // Suppliers (smaller nodes)
        { id: 'Supplier A - Meat Co.', size: 20, color: '#ef4444', type: 'supplier' }, // red-500
        { id: 'Supplier B - Seafood Ltd.', size: 15, color: '#f97316', type: 'supplier' }, // orange-500
        { id: 'Supplier C - Bev Dist.', size: 10, color: '#facc15', type: 'supplier' }, // yellow-400
        { id: 'Supplier D - Veggie Farm', size: 18, color: '#10b981', type: 'supplier' }, // emerald-500
        { id: 'Supplier E - Dairy Co.', size: 12, color: '#06b6d4', type: 'supplier' }, // cyan-500

        // Inventory Items (larger nodes with cost and category)
        { id: 'Beef', size: 120, color: '#22c55e', type: 'inventory', cost: 5.50, category: 'Meat' }, // green-500
        { id: 'Chicken', size: 80, color: '#14b8a6', type: 'inventory', cost: 4.20, category: 'Meat' }, // teal-500
        { id: 'Salmon', size: 50, color: '#3b82f6', type: 'inventory', cost: 8.90, category: 'Seafood' }, // blue-500
        { id: 'Shrimp', size: 30, color: '#60a5fa', type: 'inventory', cost: 12.00, category: 'Seafood' }, // blue-400
        { id: 'Tomatoes', size: 150, color: '#8b5cf6', type: 'inventory', cost: 1.20, category: 'Vegetables' }, // purple-500
        { id: 'Lettuce', size: 200, color: '#a78bfa', type: 'inventory', cost: 0.90, category: 'Vegetables' }, // purple-400
        { id: 'Cola', size: 180, color: '#ec4899', type: 'inventory', cost: 0.50, category: 'Beverages' }, // pink-500
        { id: 'Wine', size: 40, color: '#6b7280', type: 'inventory', cost: 15.00, category: 'Beverages' }, // gray-500
        { id: 'Milk', size: 90, color: '#06b6d4', type: 'inventory', cost: 2.10, category: 'Dairy' }, // cyan-500
        { id: 'Cheese', size: 60, color: '#0ea5e9', type: 'inventory', cost: 6.50, category: 'Dairy' }, // sky-500
    ],
    links: [
        // Supplier A - Meat Co. supplies meat products
        { source: 'Supplier A - Meat Co.', target: 'Beef', distance: 50, weeklySupply: 50 },
        { source: 'Supplier A - Meat Co.', target: 'Chicken', distance: 60, weeklySupply: 40 },

        // Supplier B - Seafood Ltd. supplies seafood
        { source: 'Supplier B - Seafood Ltd.', target: 'Salmon', distance: 40, weeklySupply: 20 },
        { source: 'Supplier B - Seafood Ltd.', target: 'Shrimp', distance: 45, weeklySupply: 15 },

        // Supplier C - Bev Dist. supplies beverages
        { source: 'Supplier C - Bev Dist.', target: 'Cola', distance: 50, weeklySupply: 100 },
        { source: 'Supplier C - Bev Dist.', target: 'Wine', distance: 30, weeklySupply: 20 },

        // Supplier D - Veggie Farm supplies vegetables
        { source: 'Supplier D - Veggie Farm', target: 'Tomatoes', distance: 60, weeklySupply: 80 },
        { source: 'Supplier D - Veggie Farm', target: 'Lettuce', distance: 70, weeklySupply: 120 },

        // Supplier E - Dairy Co. supplies dairy products
        { source: 'Supplier E - Dairy Co.', target: 'Milk', distance: 50, weeklySupply: 50 },
        { source: 'Supplier E - Dairy Co.', target: 'Cheese', distance: 55, weeklySupply: 30 },

        // Cross-supplier links (e.g., Supplier A also supplies some vegetables)
        { source: 'Supplier A - Meat Co.', target: 'Tomatoes', distance: 80, weeklySupply: 20 },
    ],
};

const CurrentStock: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Restaurant Stock Network (Suppliers to Inventory)
            </h2>
            <div className="h-[500px]">
                <ResponsiveNetwork
                    data={stockNetworkData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    linkDistance={(e) => e.distance} // Distance based on link data
                    centeringStrength={0.5} // Stronger centering for clarity
                    repulsingStrength={15} // Increased repulsion for better separation
                    nodeSize={(n) => n.size / 4} // Scale size for visual balance
                    activeNodeSize={(n) => n.size / 3} // Larger on hover/click
                    nodeColor={(n) => n.color}
                    nodeBorderWidth={2}
                    nodeBorderColor={{ from: 'color', modifiers: [['darker', 1]] }}
                    linkThickness={(l) => Math.max(1, (l.data.weeklySupply || 0) / 20)} // Thicker links for higher supply
                    linkColor="#d1d5db" // gray-300
                    motionStiffness={140}
                    motionDamping={18}
                    isInteractive={true}
                    tooltip={({ node }) => (
                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                            <p className="text-gray-800 font-semibold">{node.id}</p>
                            <p className="text-gray-600">Stock Quantity: {node.size} units</p>
                            {node.data.cost && (
                                <p className="text-gray-600">Cost per Unit: ${node.data.cost.toFixed(2)}</p>
                            )}
                            {node.data.category && (
                                <p className="text-gray-600">Category: {node.data.category}</p>
                            )}
                            <p className="text-gray-500 text-sm">
                                Type: {node.data.type === 'supplier' ? 'Supplier' : 'Inventory Item'}
                            </p>
                            <div
                                className="w-3 h-3 inline-block mt-1"
                                style={{ backgroundColor: node.color }}
                            />
                        </div>
                    )}
                    animate={true}
                />
            </div>
            <div className="mt-4 text-center text-gray-600 text-sm">
                <p>Hover over nodes for details | Larger nodes = higher stock quantity</p>
                <p>Suppliers (small) → Inventory (large) | Link thickness = weekly supply volume</p>
            </div>
            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-1"></div>
                    <span>Meat</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-1"></div>
                    <span>Seafood</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 mr-1"></div>
                    <span>Vegetables</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-pink-500 mr-1"></div>
                    <span>Beverages</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-cyan-500 mr-1"></div>
                    <span>Dairy</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 mr-1"></div>
                    <span>Suppliers</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentStock;