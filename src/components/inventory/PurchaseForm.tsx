// import React, { useState } from "react";

// interface RawMaterial {
//     id: number;
//     name: string;
//     checked: boolean;
//     quantity: number;
//     unit: string;
//     price: number;
//     amount: number;
//     description: string;
//     isFavorite: boolean;
// }

// const PurchaseForm: React.FC = () => {
//     // Purchase Form State
//     const [type, setType] = useState<"supplier" | "kitchen">("supplier");
//     const [paymentType, setPaymentType] = useState<"unpaid" | "paid">("unpaid");
//     const [mrnNo, setMrnNo] = useState("");
//     const [kitchen, setKitchen] = useState("");
//     const [date, setDate] = useState("");
//     const [termsOfPayment, setTermsOfPayment] = useState("");
//     const [termsOfDelivery, setTermsOfDelivery] = useState("");

//     // Raw Material Form State
//     const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
//     const [newMaterial, setNewMaterial] = useState({
//         name: "",
//         quantity: 0,
//         unit: "",
//         price: 0,
//         description: "",
//     });

//     // Purchase Form Handlers
//     const handleDownload = () => alert("Downloading raw materials...");
//     const handleImport = () => alert("Importing raw materials...");

//     // Raw Material Handlers
//     const addNewMaterial = () => {
//         const material: RawMaterial = {
//             id: Date.now(),
//             name: newMaterial.name,
//             checked: false,
//             quantity: newMaterial.quantity,
//             unit: newMaterial.unit,
//             price: newMaterial.price,
//             amount: newMaterial.quantity * newMaterial.price,
//             description: newMaterial.description,
//             isFavorite: false,
//         };
//         setRawMaterials([...rawMaterials, material]);
//         setNewMaterial({ name: "", quantity: 0, unit: "", price: 0, description: "" });
//     };

//     const clearAll = () => setRawMaterials([]);
//     const toggleFavorite = (id: number) => {
//         setRawMaterials(
//             rawMaterials.map((item) =>
//                 item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
//             )
//         );
//     };
//     const removeMaterial = (id: number) => {
//         setRawMaterials(rawMaterials.filter((item) => item.id !== id));
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
            
//             <div className="max-w-6xl mx-auto space-y-10">
//                 {/* Purchase Form */}
//                 <div className="bg-white p-8 rounded-xl shadow-lg">
//                     <h2 className="text-2xl font-semibold text-gray-700 mb-6">Request for Purchase Details</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Type Radio */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
//                             <div className="flex space-x-6">
//                                 <label className="flex items-center">
//                                     <input
//                                         type="radio"
//                                         value="supplier"
//                                         checked={type === "supplier"}
//                                         onChange={() => setType("supplier")}
//                                         className="mr-2 h-4 w-4 text-blue-600"
//                                     />
//                                     Supplier
//                                 </label>
//                                 <label className="flex items-center">
//                                     <input
//                                         type="radio"
//                                         value="kitchen"
//                                         checked={type === "kitchen"}
//                                         onChange={() => setType("kitchen")}
//                                         className="mr-2 h-4 w-4 text-blue-600"
//                                     />
//                                     Kitchen
//                                 </label>
//                             </div>
//                         </div>

//                         {/* MRN No */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-2">MRN No</label>
//                             <input
//                                 type="text"
//                                 value={mrnNo}
//                                 onChange={(e) => setMrnNo(e.target.value)}
//                                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Kitchen */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-2">Kitchen</label>
//                             <input
//                                 type="text"
//                                 value={kitchen}
//                                 onChange={(e) => setKitchen(e.target.value)}
//                                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Date */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-2">Date</label>
//                             <input
//                                 type="date"
//                                 value={date}
//                                 onChange={(e) => setDate(e.target.value)}
//                                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Terms of Payment */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-2">Terms of Payment</label>
//                             <input
//                                 type="text"
//                                 value={termsOfPayment}
//                                 onChange={(e) => setTermsOfPayment(e.target.value)}
//                                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         {/* Terms of Delivery */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600 mb-2">Terms of Delivery</label>
//                             <input
//                                 type="text"
//                                 value={termsOfDelivery}
//                                 onChange={(e) => setTermsOfDelivery(e.target.value)}
//                                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="mt-8 flex space-x-6">
//                         <button
//                             onClick={handleDownload}
//                             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//                         >
//                             Download Raw Materials
//                         </button>
//                         <button
//                             onClick={handleImport}
//                             className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
//                         >
//                             Import Raw Materials
//                         </button>
//                     </div>

//                     {/* Payment Type Radio */}
//                     <div className="mt-6">
//                         <label className="block text-sm font-medium text-gray-600 mb-2">Payment Type</label>
//                         <div className="flex space-x-6">
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     value="unpaid"
//                                     checked={paymentType === "unpaid"}
//                                     onChange={() => setPaymentType("unpaid")}
//                                     className="mr-2 h-4 w-4 text-blue-600"
//                                 />
//                                 Unpaid
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     value="paid"
//                                     checked={paymentType === "paid"}
//                                     onChange={() => setPaymentType("paid")}
//                                     className="mr-2 h-4 w-4 text-blue-600"
//                                 />
//                                 Paid
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Raw Material Form */}
//                 <div className="bg-white p-8 rounded-xl shadow-lg">
//                     <h2 className="text-2xl font-semibold text-gray-700 mb-6">Raw Material Details</h2>

//                     {/* Top Buttons */}
//                     <div className="flex space-x-6 mb-6">
//                         <button
//                             onClick={addNewMaterial}
//                             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//                         >
//                             Add New
//                         </button>
//                         <button
//                             onClick={clearAll}
//                             className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
//                         >
//                             Clear All
//                         </button>
//                     </div>

//                     {/* Raw Material Input */}
//                     <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
//                         <input
//                             type="text"
//                             placeholder="Name"
//                             value={newMaterial.name}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
//                             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <input
//                             type="number"
//                             placeholder="Quantity"
//                             value={newMaterial.quantity}
//                             onChange={(e) =>
//                                 setNewMaterial({ ...newMaterial, quantity: Number(e.target.value) })
//                             }
//                             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Unit"
//                             value={newMaterial.unit}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
//                             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <input
//                             type="number"
//                             placeholder="Price"
//                             value={newMaterial.price}
//                             onChange={(e) =>
//                                 setNewMaterial({ ...newMaterial, price: Number(e.target.value) })
//                             }
//                             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Description"
//                             value={newMaterial.description}
//                             onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
//                             className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
//                         />
//                     </div>

//                     {/* Raw Material List */}
//                     <div className="space-y-4">
//                         {rawMaterials.map((material) => (
//                             <div
//                                 key={material.id}
//                                 className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center p-4 bg-gray-50 rounded-lg"
//                             >
//                                 <input
//                                     type="checkbox"
//                                     checked={material.checked}
//                                     onChange={() =>
//                                         setRawMaterials(
//                                             rawMaterials.map((item) =>
//                                                 item.id === material.id ? { ...item, checked: !item.checked } : item
//                                             )
//                                         )
//                                     }
//                                     className="h-4 w-4 text-blue-600"
//                                 />
//                                 <span className="text-gray-700">{material.name}</span>
//                                 <span className="text-gray-700">{material.quantity}</span>
//                                 <span className="text-gray-700">{material.unit}</span>
//                                 <span className="text-gray-700">${material.price}</span>
//                                 <span className="text-gray-700">${material.amount}</span>
//                                 <div className="flex space-x-2">
//                                     <button
//                                         onClick={() => toggleFavorite(material.id)}
//                                         className={`px-3 py-1 rounded-lg text-white ${material.isFavorite ? "bg-yellow-500" : "bg-gray-500"
//                                             } hover:bg-opacity-80 transition duration-200`}
//                                     >
//                                         {material.isFavorite ? "Unfavorite" : "Favorite"}
//                                     </button>
//                                     <button
//                                         onClick={() => removeMaterial(material.id)}
//                                         className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PurchaseForm;







import React, { useState, useEffect } from "react";
import { PlusIcon, TrashIcon, DownloadIcon, UploadIcon, StarIcon } from "lucide-react";

interface RawMaterial {
    id: number;
    name: string;
    checked: boolean;
    quantity: number;
    unit: string;
    price: number;
    amount: number;
    description: string;
    isFavorite: boolean;
}

// Form Values Types
interface PurchaseFormValues {
    type: "supplier" | "kitchen";
    paymentType: "unpaid" | "paid";
    mrnNo: string;
    kitchen: string;
    date: string;
    termsOfPayment: string;
    termsOfDelivery: string;
}

// Material Form Values
interface MaterialFormValues {
    name: string;
    quantity: number;
    unit: string;
    price: number;
    description: string;
}

const PurchaseForm: React.FC = () => {
    // Purchase Form State
    const [formValues, setFormValues] = useState<PurchaseFormValues>({
        type: "supplier",
        paymentType: "unpaid",
        mrnNo: "",
        kitchen: "",
        date: new Date().toISOString().split('T')[0], // Default to today
        termsOfPayment: "",
        termsOfDelivery: ""
    });

    // Raw Material Form State
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
    const [newMaterial, setNewMaterial] = useState<MaterialFormValues>({
        name: "",
        quantity: 0,
        unit: "",
        price: 0,
        description: ""
    });

    // Total amount
    const [totalAmount, setTotalAmount] = useState<number>(0);

    // Calculate total whenever materials change
    useEffect(() => {
        const total = rawMaterials.reduce((sum, material) => sum + material.amount, 0);
        setTotalAmount(total);
    }, [rawMaterials]);

    // Handle Purchase Form Changes
    const handleFormChange = (field: keyof PurchaseFormValues, value: any) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    // Handle Material Form Changes
    const handleMaterialChange = (field: keyof MaterialFormValues, value: any) => {
        setNewMaterial(prev => ({ ...prev, [field]: value }));
    };

    // Purchase Form Handlers
    const handleDownload = () => alert("Downloading raw materials...");
    const handleImport = () => alert("Importing raw materials...");

    // Raw Material Handlers
    const addNewMaterial = () => {
        // Validate form
        if (!newMaterial.name || newMaterial.quantity <= 0 || !newMaterial.unit || newMaterial.price <= 0) {
            alert("Please fill all required fields with valid values");
            return;
        }

        const material: RawMaterial = {
            id: Date.now(),
            name: newMaterial.name,
            checked: false,
            quantity: newMaterial.quantity,
            unit: newMaterial.unit,
            price: newMaterial.price,
            amount: newMaterial.quantity * newMaterial.price,
            description: newMaterial.description,
            isFavorite: false,
        };
        setRawMaterials([...rawMaterials, material]);
        setNewMaterial({ name: "", quantity: 0, unit: "", price: 0, description: "" });
    };

    const clearAll = () => {
        if (rawMaterials.length > 0 && window.confirm("Are you sure you want to clear all materials?")) {
            setRawMaterials([]);
        }
    };

    const toggleFavorite = (id: number) => {
        setRawMaterials(
            rawMaterials.map((item) =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    const removeMaterial = (id: number) => {
        setRawMaterials(rawMaterials.filter((item) => item.id !== id));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to your backend
        console.log({ formValues, rawMaterials, totalAmount });
        alert("Purchase request submitted successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Purchase Request</h1>
                    <p className="text-gray-600">Create a new purchase request for raw materials</p>
                </div>

                {/* Purchase Form */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center border-b pb-3">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">1</span>
                        Request Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Type Radio */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Request Type</label>
                            <div className="flex space-x-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="supplier"
                                        checked={formValues.type === "supplier"}
                                        onChange={() => handleFormChange("type", "supplier")}
                                        className="mr-2 h-4 w-4 text-blue-600"
                                    />
                                    <span>Supplier</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        value="kitchen"
                                        checked={formValues.type === "kitchen"}
                                        onChange={() => handleFormChange("type", "kitchen")}
                                        className="mr-2 h-4 w-4 text-blue-600"
                                    />
                                    <span>Kitchen</span>
                                </label>
                            </div>
                        </div>

                        {/* MRN No */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">MRN No</label>
                            <input
                                type="text"
                                value={formValues.mrnNo}
                                onChange={(e) => handleFormChange("mrnNo", e.target.value)}
                                placeholder="Enter MRN number"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Kitchen */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Kitchen</label>
                            <input
                                type="text"
                                value={formValues.kitchen}
                                onChange={(e) => handleFormChange("kitchen", e.target.value)}
                                placeholder="Select kitchen"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                value={formValues.date}
                                onChange={(e) => handleFormChange("date", e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Terms of Payment */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Terms of Payment</label>
                            <input
                                type="text"
                                value={formValues.termsOfPayment}
                                onChange={(e) => handleFormChange("termsOfPayment", e.target.value)}
                                placeholder="e.g., Net 30, immediate payment"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Terms of Delivery */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Terms of Delivery</label>
                            <input
                                type="text"
                                value={formValues.termsOfDelivery}
                                onChange={(e) => handleFormChange("termsOfDelivery", e.target.value)}
                                placeholder="e.g., FOB, CIF, delivery date"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">
                        <button
                            type="button"
                            onClick={handleDownload}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
                        >
                            <DownloadIcon className="w-4 h-4 mr-2" /> Download Template
                        </button>
                        <button
                            type="button"
                            onClick={handleImport}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center"
                        >
                            <UploadIcon className="w-4 h-4 mr-2" /> Import Materials
                        </button>
                    </div>

                    {/* Payment Type Radio */}
                    <div className="mt-6 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                        <div className="flex space-x-6">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    value="unpaid"
                                    checked={formValues.paymentType === "unpaid"}
                                    onChange={() => handleFormChange("paymentType", "unpaid")}
                                    className="mr-2 h-4 w-4 text-blue-600"
                                />
                                <span>Unpaid</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    value="paid"
                                    checked={formValues.paymentType === "paid"}
                                    onChange={() => handleFormChange("paymentType", "paid")}
                                    className="mr-2 h-4 w-4 text-blue-600"
                                />
                                <span>Paid</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Raw Material Form */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center border-b pb-3">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">2</span>
                        Raw Material Details
                    </h2>

                    {/* Material Input Form */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                            <div className="md:col-span-1">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                                <input
                                    type="text"
                                    placeholder="Material name"
                                    value={newMaterial.name}
                                    onChange={(e) => handleMaterialChange("name", e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Quantity *</label>
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    value={newMaterial.quantity === 0 ? "" : newMaterial.quantity}
                                    onChange={(e) => handleMaterialChange("quantity", Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Unit *</label>
                                <input
                                    type="text"
                                    placeholder="e.g., kg, pcs"
                                    value={newMaterial.unit}
                                    onChange={(e) => handleMaterialChange("unit", e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Price ($) *</label>
                                <input
                                    type="number"
                                    placeholder="Unit price"
                                    value={newMaterial.price === 0 ? "" : newMaterial.price}
                                    onChange={(e) => handleMaterialChange("price", Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                <input
                                    type="text"
                                    placeholder="Brief description"
                                    value={newMaterial.description}
                                    onChange={(e) => handleMaterialChange("description", e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={addNewMaterial}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
                            >
                                <PlusIcon className="w-4 h-4 mr-2" /> Add Material
                            </button>
                        </div>
                    </div>

                    {/* Raw Material List Header */}
                    {rawMaterials.length > 0 && (
                        <div className="border-b pb-2 mb-2 hidden md:grid md:grid-cols-7 gap-4 text-sm font-medium text-gray-600">
                            <div></div>
                            <div>Name</div>
                            <div>Quantity</div>
                            <div>Unit</div>
                            <div>Price</div>
                            <div>Amount</div>
                            <div>Actions</div>
                        </div>
                    )}

                    {/* Raw Material List */}
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {rawMaterials.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No materials added. Add materials using the form above.
                            </div>
                        ) : (
                            rawMaterials.map((material) => (
                                <div
                                    key={material.id}
                                    className={`grid grid-cols-1 md:grid-cols-7 gap-4 items-center p-3 rounded-lg transition-colors duration-200 ${material.checked ? "bg-blue-50" : "bg-gray-50 hover:bg-gray-100"
                                        }`}
                                >
                                    <div className="flex md:block items-center justify-between md:justify-start">
                                        <input
                                            type="checkbox"
                                            checked={material.checked}
                                            onChange={() =>
                                                setRawMaterials(
                                                    rawMaterials.map((item) =>
                                                        item.id === material.id ? { ...item, checked: !item.checked } : item
                                                    )
                                                )
                                            }
                                            className="h-4 w-4 text-blue-600 rounded"
                                        />
                                        <span className="md:hidden font-medium">Material</span>
                                    </div>

                                    <div className="flex md:block items-center justify-between">
                                        <span className="md:hidden font-medium">Name:</span>
                                        <span className="font-medium md:font-normal">{material.name}</span>
                                    </div>

                                    <div className="flex md:block items-center justify-between">
                                        <span className="md:hidden font-medium">Quantity:</span>
                                        <span>{material.quantity}</span>
                                    </div>

                                    <div className="flex md:block items-center justify-between">
                                        <span className="md:hidden font-medium">Unit:</span>
                                        <span>{material.unit}</span>
                                    </div>

                                    <div className="flex md:block items-center justify-between">
                                        <span className="md:hidden font-medium">Price:</span>
                                        <span>${material.price.toFixed(2)}</span>
                                    </div>

                                    <div className="flex md:block items-center justify-between">
                                        <span className="md:hidden font-medium">Amount:</span>
                                        <span className="font-medium">${material.amount.toFixed(2)}</span>
                                    </div>

                                    <div className="flex space-x-2 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => toggleFavorite(material.id)}
                                            className="p-1 rounded-full text-gray-600 hover:bg-gray-200 transition"
                                            title={material.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                        >
                                            <StarIcon className={`w-5 h-5 ${material.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeMaterial(material.id)}
                                            className="p-1 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600 transition"
                                            title="Remove"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Total and Action Buttons */}
                    {rawMaterials.length > 0 && (
                        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                            <button
                                type="button"
                                onClick={clearAll}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 flex items-center"
                            >
                                <TrashIcon className="w-4 h-4 mr-2" /> Clear All
                            </button>

                            <div className="bg-gray-100 p-3 rounded-lg">
                                <span className="font-medium mr-2">Total Amount:</span>
                                <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Section */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                        >
                            Submit Purchase Request
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PurchaseForm;