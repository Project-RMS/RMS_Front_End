// // SupplierForm.tsx
// import React, { useState, FormEvent } from 'react';

// interface SupplierFormData {
//     name: string;
//     company: string;
//     email: string;
//     phone: string;
//     address: string;
//     state: string;
//     city: string;
//     gstNo: string;
//     fssaiNo: string;
//     type: 'both' | 'purchase' | 'sale';
//     tcsPercentage: number;
// }

// const states = [
//     'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
//     'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'
//     // Add more states as needed
// ];

// const cities = {
//     'Alabama': ['Birmingham', 'Montgomery', 'Mobile'],
//     'Alaska': ['Anchorage', 'Fairbanks', 'Juneau'],
//     // Add more cities for each state
// };

// const AddSupplier: React.FC = () => {
//     const [formData, setFormData] = useState<SupplierFormData>({
//         name: '',
//         company: '',
//         email: '',
//         phone: '',
//         address: '',
//         state: '',
//         city: '',
//         gstNo: '',
//         fssaiNo: '',
//         type: 'both',
//         tcsPercentage: 0,
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e: FormEvent) => {
//         e.preventDefault();
//         console.log('Form submitted:', formData);
//         // Add your form submission logic here
//     };

//     const handleCancel = () => {
//         setFormData({
//             name: '',
//             company: '',
//             email: '',
//             phone: '',
//             address: '',
//             state: '',
//             city: '',
//             gstNo: '',
//             fssaiNo: '',
//             type: 'both',
//             tcsPercentage: 0,
//         });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Supplier</h2>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* Basic Information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
//                             <input
//                                 type="text"
//                                 name="company"
//                                 value={formData.company}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     {/* Contact Information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                     </div>

//                     {/* Address */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                         <textarea
//                             name="address"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             rows={3}
//                             required
//                         />
//                     </div>

//                     {/* State and City */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
//                             <select
//                                 name="state"
//                                 value={formData.state}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             >
//                                 <option value="">Select State</option>
//                                 {states.map(state => (
//                                     <option key={state} value={state}>{state}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                             <select
//                                 name="city"
//                                 value={formData.city}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                                 disabled={!formData.state}
//                             >
//                                 <option value="">Select City</option>
//                                 {formData.state && cities[formData.state as keyof typeof cities]?.map(city => (
//                                     <option key={city} value={city}>{city}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* GST and FSSAI */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
//                             <input
//                                 type="text"
//                                 name="gstNo"
//                                 value={formData.gstNo}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">FSSAI Number</label>
//                             <input
//                                 type="text"
//                                 name="fssaiNo"
//                                 value={formData.fssaiNo}
//                                 onChange={handleInputChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Type Radio Buttons */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                         <div className="flex space-x-6">
//                             {['both', 'purchase', 'sale'].map(type => (
//                                 <label key={type} className="flex items-center">
//                                     <input
//                                         type="radio"
//                                         name="type"
//                                         value={type}
//                                         checked={formData.type === type}
//                                         onChange={handleInputChange}
//                                         className="mr-2 focus:ring-blue-500"
//                                     />
//                                     <span className="capitalize">{type}</span>
//                                 </label>
//                             ))}
//                         </div>
//                     </div>

//                     {/* TCS Percentage */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">TCS %</label>
//                         <input
//                             type="number"
//                             name="tcsPercentage"
//                             value={formData.tcsPercentage}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             min="0"
//                             step="0.1"
//                         />
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex justify-end space-x-4">
//                         <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                         >
//                             Save Changes
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddSupplier;



// SupplierForm.tsx
import React, { useState, FormEvent } from 'react';

interface SupplierFormData {
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    state: string;
    city: string;
    gstNo: string;
    fssaiNo: string;
    type: 'both' | 'purchase' | 'sale';
    tcsPercentage: number;
}

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const citiesByState: { [key: string]: string[] } = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat'],
    'Assam': ['Guwahati', 'Silchar', 'Dibrugarh'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur'],
    'Goa': ['Panaji', 'Margao', 'Vasco da Gama'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
    'Haryana': ['Gurugram', 'Faridabad', 'Chandigarh'],
    'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala'],
    // Add more cities for remaining states as needed
};

const AddSupplier: React.FC = () => {
    const [formData, setFormData] = useState<SupplierFormData>({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        state: '',
        city: '',
        gstNo: '',
        fssaiNo: '',
        type: 'both',
        tcsPercentage: 0,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'state' ? { ...prev, state: value, city: '' } : { ...prev, [name]: value }
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            company: '',
            email: '',
            phone: '',
            address: '',
            state: '',
            city: '',
            gstNo: '',
            fssaiNo: '',
            type: 'both',
            tcsPercentage: 0,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl transform transition-all hover:shadow-3xl">
                <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
                    Add Supplier Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                                placeholder="Enter supplier name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                                placeholder="Enter company name"
                                required
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                                placeholder="example@domain.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                                placeholder="+91 123-456-7890"
                                required
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                            rows={4}
                            placeholder="Enter full address"
                            required
                        />
                    </div>

                    {/* State and City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                                required
                            >
                                <option value="">Select State</option>
                                {indianStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                                required
                                disabled={!formData.state}
                            >
                                <option value="">Select City</option>
                                {formData.state && citiesByState[formData.state]?.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* GST and FSSAI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                            <input
                                type="text"
                                name="gstNo"
                                value={formData.gstNo}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                                placeholder="Enter GST number"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">FSSAI Number</label>
                            <input
                                type="text"
                                name="fssaiNo"
                                value={formData.fssaiNo}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                                placeholder="Enter FSSAI number"
                            />
                        </div>
                    </div>

                    {/* Type Radio Buttons */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Supplier Type</label>
                        <div className="flex space-x-6">
                            {['both', 'purchase', 'sale'].map(type => (
                                <label key={type} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="type"
                                        value={type}
                                        checked={formData.type === type}
                                        onChange={handleInputChange}
                                        className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                    />
                                    <span className="text-gray-700 capitalize">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* TCS Percentage */}
                    <div className="max-w-xs">
                        <label className="block text-sm font-medium text-gray-700 mb-2">TCS Percentage (%)</label>
                        <input
                            type="number"
                            name="tcsPercentage"
                            value={formData.tcsPercentage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-gray-50"
                            min="0"
                            step="0.1"
                            placeholder="0.0"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all transform hover:scale-105 font-medium"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSupplier;