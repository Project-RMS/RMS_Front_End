import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaPlus, FaSave, FaTimes } from "react-icons/fa";

interface Unit {
    id: string;
    name: string;
    createdDate: string;
    modifiedDate: string;
}

const initialUnits: Unit[] = [
    { id: "1", name: "Kilogram", createdDate: "2025-03-01", modifiedDate: "2025-03-02" },
    { id: "2", name: "Liter", createdDate: "2025-03-02", modifiedDate: "2025-03-03" },
    { id: "3", name: "Piece", createdDate: "2025-03-03", modifiedDate: "2025-03-04" },
    { id: "4", name: "Gram", createdDate: "2025-03-01", modifiedDate: "2025-03-01" },
    { id: "5", name: "Milliliter", createdDate: "2025-03-02", modifiedDate: "2025-03-02" },
];

const UnitsTable: React.FC = () => {
    const [units, setUnits] = useState<Unit[]>(initialUnits);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [newUnitName, setNewUnitName] = useState<string>("");
    const [editUnit, setEditUnit] = useState<Unit | null>(null);
    const [viewUnit, setViewUnit] = useState<Unit | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 3;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const filteredUnits = units.filter((unit) =>
        unit.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
    const paginatedUnits = filteredUnits.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleAddUnit = () => {
        if (!newUnitName.trim() || units.some((u) => u.name === newUnitName)) {
            alert("Unit name cannot be empty or duplicate!");
            return;
        }
        const newUnit: Unit = {
            id: (units.length + 1).toString(),
            name: newUnitName,
            createdDate: new Date().toISOString().split("T")[0],
            modifiedDate: new Date().toISOString().split("T")[0],
        };
        setUnits([...units, newUnit]);
        setNewUnitName("");
        setIsAddModalOpen(false);
    };

    const handleEditUnit = () => {
        if (!editUnit || !editUnit.name.trim() || units.some((u) => u.id !== editUnit.id && u.name === editUnit.name)) {
            alert("Unit name cannot be empty or duplicate!");
            return;
        }
        setUnits(
            units.map((u) =>
                u.id === editUnit.id
                    ? { ...u, name: editUnit.name, modifiedDate: new Date().toISOString().split("T")[0] }
                    : u
            )
        );
        setEditUnit(null);
        setIsEditModalOpen(false);
    };

    const openEditModal = (unit: Unit) => {
        setEditUnit({ ...unit });
        setIsEditModalOpen(true);
    };

    const openViewModal = (unit: Unit) => {
        setViewUnit(unit);
        setIsViewModalOpen(true);
    };

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Units Management</h1>
                    <button
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition shadow-md"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <FaPlus /> Add Unit
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search units..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
                    />
                </div>

                {/* Table */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                                <th className="p-4 font-semibold rounded-tl-xl">Name</th>
                                <th className="p-4 font-semibold">Created Date</th>
                                <th className="p-4 font-semibold">Modified Date</th>
                                <th className="p-4 font-semibold rounded-tr-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUnits.length > 0 ? (
                                paginatedUnits.map((unit) => (
                                    <tr key={unit.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-4">{unit.name}</td>
                                        <td className="p-4">{unit.createdDate}</td>
                                        <td className="p-4">{unit.modifiedDate}</td>
                                        <td className="p-4 flex gap-4">
                                            <button
                                                onClick={() => openEditModal(unit)}
                                                className="text-indigo-600 hover:text-indigo-800 transition relative group"
                                                title="Edit"
                                            >
                                                <FaEdit size={20} />
                                                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">Edit</span>
                                            </button>
                                            <button
                                                onClick={() => openViewModal(unit)}
                                                className="text-teal-600 hover:text-teal-800 transition relative group"
                                                title="View"
                                            >
                                                <FaEye size={20} />
                                                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">View</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-6 text-center text-gray-500">
                                        No units found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Previous
                            </button>
                            <span className="text-gray-700 font-medium">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Unit Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Unit</h2>
                        <input
                            type="text"
                            placeholder="Unit Name"
                            value={newUnitName}
                            onChange={(e) => setNewUnitName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                <FaTimes /> Cancel
                            </button>
                            <button
                                onClick={handleAddUnit}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                <FaPlus /> Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Unit Modal */}
            {isEditModalOpen && editUnit && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Unit</h2>
                        <input
                            type="text"
                            placeholder="Unit Name"
                            value={editUnit.name}
                            onChange={(e) => setEditUnit({ ...editUnit, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                <FaTimes /> Cancel
                            </button>
                            <button
                                onClick={handleEditUnit}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                <FaSave /> Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Unit Modal */}
            {isViewModalOpen && viewUnit && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Unit Details</h2>
                        <div className="space-y-4 text-gray-700">
                            <p><strong>Name:</strong> {viewUnit.name}</p>
                            <p><strong>Created Date:</strong> {viewUnit.createdDate}</p>
                            <p><strong>Modified Date:</strong> {viewUnit.modifiedDate}</p>
                            <p><strong>ID:</strong> {viewUnit.id}</p>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                <FaTimes /> Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UnitsTable;