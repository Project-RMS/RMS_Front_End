// AddMaterialConversion.tsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';

interface RawMaterial {
    id: number;
    material: string;
    quantity: number;
    unit: string;
    calculateFrom?: string;
}

interface FormData {
    conversionName: string;
    defaultQty: number;
    enableAutoConvert: boolean;
    description: string;
}

const AddMaterialConversion: React.FC = () => {
    // Form handling with react-hook-form
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            conversionName: '',
            defaultQty: 0,
            enableAutoConvert: false,
            description: ''
        }
    });

    // Material state
    const [fromMaterials, setFromMaterials] = useState<RawMaterial[]>([]);
    const [toMaterials, setToMaterials] = useState<RawMaterial[]>([]);

    // Unit options
    const unitOptions = ['kg', 'pcs', 'm', 'l'];

    // Add material handlers
    const addFromMaterial = () => {
        setFromMaterials(prev => [...prev, {
            id: Date.now(),
            material: '',
            quantity: 0,
            unit: unitOptions[0]
        }]);
    };

    const addToMaterial = () => {
        setToMaterials(prev => [...prev, {
            id: Date.now(),
            material: '',
            quantity: 0,
            unit: unitOptions[0],
            calculateFrom: ''
        }]);
    };

    // Update material handlers
    const updateMaterial = (
        id: number,
        field: keyof RawMaterial,
        value: string | number,
        setter: React.Dispatch<React.SetStateAction<RawMaterial[]>>
    ) => {
        setter(prev =>
            prev.map(material =>
                material.id === id ? { ...material, [field]: value } : material
            )
        );
    };

    // Delete material handlers
    const deleteFromMaterial = (id: number) => {
        setFromMaterials(prev => prev.filter(material => material.id !== id));
    };

    const deleteToMaterial = (id: number) => {
        setToMaterials(prev => prev.filter(material => material.id !== id));
    };

    // Form submission
    const onSubmit = (data: FormData) => {
        if (fromMaterials.length === 0 || toMaterials.length === 0) {
            alert('Please add at least one material to both "From" and "To" sections');
            return;
        }

        const conversionData = {
            ...data,
            fromMaterials,
            toMaterials
        };
        console.log('Saving conversion:', conversionData);
        // Add your API call here
    };

    // Reset everything
    const handleCancel = () => {
        reset();
        setFromMaterials([]);
        setToMaterials([]);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-8">
            {/* Header */}
            <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Conversion Details</h1>
                <p className="text-gray-600 mt-1">Configure your material conversion settings</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Conversion Info */}
                <div className="w-full bg-white rounded-lg shadow-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Conversion Name <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="conversionName"
                                control={control}
                                rules={{ required: 'Conversion name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className={`w-full border ${errors.conversionName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                                        placeholder="Enter conversion name"
                                    />
                                )}
                            />
                            {errors.conversionName && (
                                <p className="text-red-500 text-sm mt-1">{errors.conversionName.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Default Quantity <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="defaultQty"
                                control={control}
                                rules={{ required: 'Quantity is required', min: { value: 0, message: 'Quantity cannot be negative' } }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="number"
                                        className={`w-full border ${errors.defaultQty ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                                        placeholder="Enter quantity"
                                    />
                                )}
                            />
                            {errors.defaultQty && (
                                <p className="text-red-500 text-sm mt-1">{errors.defaultQty.message}</p>
                            )}
                        </div>
                        <div className="flex items-center pt-6">
                            <Controller
                                name="enableAutoConvert"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="checkbox"
                                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                            <label className="ml-2 text-sm font-medium text-gray-700">Enable Auto Convert</label>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="w-full bg-white rounded-lg shadow-lg p-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                rows={4}
                                placeholder="Enter description (optional)"
                            />
                        )}
                    />
                </div>

                {/* Material Sections */}
                <div className="w-full flex flex-col md:flex-row gap-8">
                    {/* From Raw Material */}
                    <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">From Raw Material</h2>
                            <button
                                type="button"
                                onClick={addFromMaterial}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                <FiPlus /> Add Material
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-sm font-medium text-gray-700">Raw Material</th>
                                        <th className="p-3 text-sm font-medium text-gray-700">Quantity</th>
                                        <th className="p-3 text-sm font-medium text-gray-700">Unit</th>
                                        <th className="p-3 text-sm font-medium text-gray-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fromMaterials.map(material => (
                                        <tr key={material.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={material.material}
                                                    onChange={(e) => updateMaterial(material.id, 'material', e.target.value, setFromMaterials)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Material name"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    value={material.quantity}
                                                    onChange={(e) => updateMaterial(material.id, 'quantity', parseFloat(e.target.value) || 0, setFromMaterials)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <select
                                                    value={material.unit}
                                                    onChange={(e) => updateMaterial(material.id, 'unit', e.target.value, setFromMaterials)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    {unitOptions.map(unit => (
                                                        <option key={unit} value={unit}>{unit}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    type="button"
                                                    onClick={() => deleteFromMaterial(material.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* To Raw Material */}
                    <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">To Raw Material</h2>
                            <button
                                type="button"
                                onClick={addToMaterial}
                                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                <FiPlus /> Add Material
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-sm font-medium text-gray-700">Raw Material</th>
                                        <th className="p-3 text-sm font-medium text-gray-700">Quantity</th>
                                        <th className="p-3 text-sm font-medium text-gray-700">Unit</th>
                                        <th className="p-3 text-sm font-medium text-gray-700">Calculate From</th>
                                        <th className="p-3 text-sm font-medium text-gray-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {toMaterials.map(material => (
                                        <tr key={material.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={material.material}
                                                    onChange={(e) => updateMaterial(material.id, 'material', e.target.value, setToMaterials)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="Material name"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="number"
                                                    value={material.quantity}
                                                    onChange={(e) => updateMaterial(material.id, 'quantity', parseFloat(e.target.value) || 0, setToMaterials)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <select
                                                    value={material.unit}
                                                    onChange={(e) => updateMaterial(material.id, 'unit', e.target.value, setToMaterials)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    {unitOptions.map(unit => (
                                                        <option key={unit} value={unit}>{unit}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-3">
                                                <input
                                                    type="text"
                                                    value={material.calculateFrom || ''}
                                                    onChange={(e) => updateMaterial(material.id, 'calculateFrom', e.target.value, setToMaterials)}
                                                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    placeholder="e.g., FromMaterial * 0.5"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    type="button"
                                                    onClick={() => deleteToMaterial(material.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Save Conversion
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddMaterialConversion;