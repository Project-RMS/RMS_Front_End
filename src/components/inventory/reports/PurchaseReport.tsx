// PurchaseReport.tsx
import React, { useState } from 'react';

interface ReportFormData {
    rawMaterial: string;
    category: string;
    purchaseType: string;
    fromDate: string;
    toDate: string;
}

interface ReportResult {
    id: number;
    rawMaterial: string;
    category: string;
    purchaseType: string;
    date: string;
    amount: number;
}

const PurchaseReport: React.FC = () => {
    // State management
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [formData, setFormData] = useState<ReportFormData>({
        rawMaterial: '',
        category: '',
        purchaseType: '',
        fromDate: '',
        toDate: ''
    });
    const [reportResults, setReportResults] = useState<ReportResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sample data for dropdowns
    const categories = ['Electronics', 'Clothing', 'Food', 'Furniture', 'Raw Materials'];
    const purchaseTypes = ['Direct', 'Credit', 'Advance', 'Returns'];

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Simulated API call for report
    const fetchReport = async (data: ReportFormData): Promise<ReportResult[]> => {
        setIsLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockResults: ReportResult[] = Array.from({ length: 5 }, (_, i) => ({
                id: i + 1,
                rawMaterial: data.rawMaterial || `Material ${i + 1}`,
                category: data.category || categories[Math.floor(Math.random() * categories.length)],
                purchaseType: data.purchaseType || purchaseTypes[Math.floor(Math.random() * purchaseTypes.length)],
                date: new Date(
                    new Date(data.fromDate || Date.now()).getTime() + i * 86400000
                ).toISOString().split('T')[0],
                amount: Math.floor(Math.random() * 1000) + 100
            }));

            return mockResults;
        } catch (err) {
            setError('Failed to fetch report data');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        const results = await fetchReport(formData);
        setReportResults(results);
    };

    // Handle show all
    const handleShowAll = async () => {
        const resetData = {
            rawMaterial: '',
            category: '',
            purchaseType: '',
            fromDate: '',
            toDate: ''
        };
        setFormData(resetData);
        const results = await fetchReport(resetData);
        setReportResults(results);
    };

    // Export functions
    const exportToPDF = () => {
        if (reportResults.length === 0) {
            alert('No data to export');
            return;
        }
        console.log('Exporting to PDF:', reportResults);
        alert('PDF export functionality would be implemented here');
    };

    const exportToCSV = () => {
        if (reportResults.length === 0) {
            alert('No data to export');
            return;
        }
        const headers = 'ID,Raw Material,Category,Purchase Type,Date,Amount\n';
        const csvContent = reportResults
            .map(item => `${item.id},${item.rawMaterial},${item.category},${item.purchaseType},${item.date},${item.amount}`)
            .join('\n');
        const blob = new Blob([headers + csvContent], { type: 'text/csv' });
        downloadFile(blob, 'purchase_report.csv');
    };

    const exportToExcel = () => {
        if (reportResults.length === 0) {
            alert('No data to export');
            return;
        }
        console.log('Exporting to Excel:', reportResults);
        alert('Excel export functionality would be implemented here');
    };

    // File download helper
    const downloadFile = (blob: Blob, fileName: string) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            {/* Export Section */}
            <div className="bg-white border-b border-gray-200">
                <button
                    onClick={() => setIsExportOpen(!isExportOpen)}
                    className="w-full py-4 px-6 flex justify-between items-center text-gray-800 font-semibold hover:bg-gray-100 transition-colors"
                >
                    <span>Export Options</span>
                    <svg
                        className={`w-5 h-5 transform transition-transform ${isExportOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isExportOpen && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex gap-4">
                            <button
                                onClick={exportToPDF}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                PDF
                            </button>
                            <button
                                onClick={exportToCSV}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                CSV
                            </button>
                            <button
                                onClick={exportToExcel}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                            >
                                Excel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Filter Section */}
            <div className="bg-white py-6 px-6">
                <form onSubmit={handleSearch} className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                        {/* Raw Material */}
                        <div className="flex flex-col">
                            <label htmlFor="rawMaterial" className="text-sm font-medium text-gray-700 mb-1">
                                Raw Material
                            </label>
                            <input
                                type="text"
                                id="rawMaterial"
                                name="rawMaterial"
                                value={formData.rawMaterial}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter raw material"
                            />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col">
                            <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Purchase Type */}
                        <div className="flex flex-col">
                            <label htmlFor="purchaseType" className="text-sm font-medium text-gray-700 mb-1">
                                Purchase Type
                            </label>
                            <select
                                id="purchaseType"
                                name="purchaseType"
                                value={formData.purchaseType}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Types</option>
                                {purchaseTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* From Date */}
                        <div className="flex flex-col">
                            <label htmlFor="fromDate" className="text-sm font-medium text-gray-700 mb-1">
                                From Date
                            </label>
                            <input
                                type="date"
                                id="fromDate"
                                name="fromDate"
                                value={formData.fromDate}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* To Date */}
                        <div className="flex flex-col">
                            <label htmlFor="toDate" className="text-sm font-medium text-gray-700 mb-1">
                                To Date
                            </label>
                            <input
                                type="date"
                                id="toDate"
                                name="toDate"
                                value={formData.toDate}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex items-end gap-4">
                            <button
                                type="button"
                                onClick={handleShowAll}
                                disabled={isLoading}
                                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Show All
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Searching...' : 'Search'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Results Section */}
            <div className="bg-white px-6 py-4">
                {error && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {reportResults.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 border-b font-semibold text-gray-700">ID</th>
                                    <th className="p-3 border-b font-semibold text-gray-700">Raw Material</th>
                                    <th className="p-3 border-b font-semibold text-gray-700">Category</th>
                                    <th className="p-3 border-b font-semibold text-gray-700">Purchase Type</th>
                                    <th className="p-3 border-b font-semibold text-gray-700">Date</th>
                                    <th className="p-3 border-b font-semibold text-gray-700">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportResults.map((result) => (
                                    <tr key={result.id} className="hover:bg-gray-50">
                                        <td className="p-3 border-b text-gray-600">{result.id}</td>
                                        <td className="p-3 border-b text-gray-600">{result.rawMaterial}</td>
                                        <td className="p-3 border-b text-gray-600">{result.category}</td>
                                        <td className="p-3 border-b text-gray-600">{result.purchaseType}</td>
                                        <td className="p-3 border-b text-gray-600">{result.date}</td>
                                        <td className="p-3 border-b text-gray-600">${result.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {reportResults.length === 0 && !isLoading && !error && (
                    <div className="text-center py-8 text-gray-500">
                        No results to display. Please search or show all records.
                    </div>
                )}

                {isLoading && (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="ml-2 text-gray-600">Loading...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseReport;