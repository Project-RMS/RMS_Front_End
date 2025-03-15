import React, { useState } from 'react';

// Import dashboard components alphabetically
import COGS from './dashboard/COGS';
import CurrentStock from './dashboard/CurrentStock';
import NewPurchase from './dashboard/NewPurachase'; // Typo corrected
import Wastage from './dashboard/Wastage';

// Sample data for key statistics and pending items (replace with real data as needed)
const keyStats = {
    totalPurchase: 6450, // $ (sum from NewPurchase data)
    totalWastage: 650,   // $ (sum from Wastage data)
    stockValue: 12340,   // $ (example stock value)
};

const pendingPurchases = [
    { id: 'PO-001', item: 'Beef', quantity: 50, supplier: 'Supplier A' },
    { id: 'PO-002', item: 'Soda', quantity: 100, supplier: 'Supplier C' },
];

const pendingPOApprovals = [
    { id: 'PO-003', item: 'Chicken', quantity: 30, supplier: 'Supplier B' },
];

export const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderChart = () => {
        switch (activeTab) {
            case 'cogs':
                return <COGS />;
            case 'currentStock':
                return <CurrentStock />;
            case 'newPurchase':
                return <NewPurchase />;
            case 'wastage':
                return <Wastage />;
            default:
                return (
                    <div className="text-center text-gray-600 py-10">
                        <p>Select a chart from the sidebar to view details</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 flex-shrink-0">
                <h1 className="text-2xl font-bold mb-8">Restaurant Dashboard</h1>
                <nav className="space-y-4">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${activeTab === 'overview' ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                        <span>Overview</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('cogs')}
                        className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${activeTab === 'cogs' ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>COGS</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('currentStock')}
                        className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${activeTab === 'currentStock' ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-10 6-10-6m10 13V3m-8 10h16" />
                        </svg>
                        <span>Current Stock</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('newPurchase')}
                        className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${activeTab === 'newPurchase' ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
                        </svg>
                        <span>New Purchase</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('wastage')}
                        className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${activeTab === 'wastage' ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M5 7h14m-2 0v13H7V7" />
                        </svg>
                        <span>Wastage</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                    {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>

                {/* Key Statistics Cards (Visible in Overview) */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                            <h3 className="text-lg font-semibold">Total Purchases</h3>
                            <p className="text-2xl font-bold">${keyStats.totalPurchase.toLocaleString()}</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-400 to-red-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                            <h3 className="text-lg font-semibold">Total Wastage</h3>
                            <p className="text-2xl font-bold">${keyStats.totalWastage.toLocaleString()}</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                            <h3 className="text-lg font-semibold">Stock Value</h3>
                            <p className="text-2xl font-bold">${keyStats.stockValue.toLocaleString()}</p>
                        </div>
                    </div>
                )}

                {/* Chart Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">{renderChart()}</div>

                {/* Pending Items Section (Visible in Overview) */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pending Purchases */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Pending Purchases
                            </h3>
                            {pendingPurchases.length === 0 ? (
                                <p className="text-gray-500">No pending purchases.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {pendingPurchases.map((purchase) => (
                                        <li key={purchase.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                            <div>
                                                <p className="font-medium text-gray-700">{purchase.item}</p>
                                                <p className="text-sm text-gray-500">{purchase.supplier}</p>
                                            </div>
                                            <span className="text-gray-800 font-semibold">{purchase.quantity} units</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Pending PO Approvals */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Pending PO Approvals
                            </h3>
                            {pendingPOApprovals.length === 0 ? (
                                <p className="text-gray-500">No pending approvals.</p>
                            ) : (
                                <ul className="space-y-4">
                                    {pendingPOApprovals.map((po) => (
                                        <li key={po.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                                            <div>
                                                <p className="font-medium text-gray-700">{po.item}</p>
                                                <p className="text-sm text-gray-500">{po.supplier}</p>
                                            </div>
                                            <span className="text-gray-800 font-semibold">{po.quantity} units</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};



