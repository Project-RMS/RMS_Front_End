// ClosingOpeningreport.tsx
import React, { useState } from 'react';

interface SearchFormData {
    rawMaterial: string;
    category: string;
    fromDate: string;
    toDate: string;
}

const ClosingOpeningreport: React.FC = () => {
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [formData, setFormData] = useState<SearchFormData>({
        rawMaterial: '',
        category: '',
        fromDate: '',
        toDate: ''
    });
    const [searchResults, setSearchResults] = useState<any[]>([]); // For demo purposes
    const [isLoading, setIsLoading] = useState(false);

    const categories = ['Electronics', 'Clothing', 'Food', 'Furniture', 'Other'];

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Simulated API call for search
    const performSearch = async (data: SearchFormData) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockResults = [
                { id: 1, name: data.rawMaterial || 'Item', category: data.category || 'Any' },
                { id: 2, name: data.rawMaterial || 'Item', category: data.category || 'Any' },
            ];
            setSearchResults(mockResults);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search submission
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        await performSearch(formData);
    };

    // Handle show all
    const handleShowAll = async () => {
        setFormData({
            rawMaterial: '',
            category: '',
            fromDate: '',
            toDate: ''
        });
        await performSearch({
            rawMaterial: '',
            category: '',
            fromDate: '',
            toDate: ''
        });
    };

    // Export functions
    const exportToPDF = () => {
        console.log('Exporting to PDF:', searchResults);
        // Implement PDF export logic here (e.g., using jsPDF)
        alert('Exporting to PDF (demo)');
    };

    const exportToCSV = () => {
        const csvContent = searchResults.map(item => `${item.id},${item.name},${item.category}`).join('\n');
        console.log('Exporting to CSV:', csvContent);
        const blob = new Blob([`ID,Name,Category\n${csvContent}`], { type: 'text/csv' });
        downloadFile(blob, 'export.csv');
    };

    const exportToExcel = () => {
        console.log('Exporting to Excel:', searchResults);
        // Implement Excel export logic here (e.g., using SheetJS)
        alert('Exporting to Excel (demo)');
    };

    // Helper function to download file
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
        <div className="w-full p-4">
            {/* Top Bar with Export Dropdown */}
            <div className="bg-gray-100 rounded-lg shadow mb-4 w-full">
                <button
                    onClick={() => setIsExportOpen(!isExportOpen)}
                    className="w-full p-4 flex justify-between items-center text-gray-700 font-semibold hover:bg-gray-200 rounded-lg transition-colors"
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
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={exportToPDF}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                            >
                                Export as PDF
                            </button>
                            <button
                                onClick={exportToCSV}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                            >
                                Export as CSV
                            </button>
                            <button
                                onClick={exportToExcel}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                            >
                                Export as Excel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

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
                </div>

                <div className="mt-6 flex gap-4 justify-end">
                    <button
                        type="button"
                        onClick={handleShowAll}
                        disabled={isLoading}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                    >
                        Show All
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            {/* Results Display (for demo) */}
            {searchResults.length > 0 && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow w-full">
                    <h3 className="text-lg font-semibold mb-2">Results</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {searchResults.map(result => (
                            <div key={result.id} className="p-2 border rounded">
                                ID: {result.id} | Name: {result.name} | Category: {result.category}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClosingOpeningreport;