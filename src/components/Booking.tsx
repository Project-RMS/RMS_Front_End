import React, { useState, useEffect } from 'react';
import { TableIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import * as XLSX from 'xlsx';

// Types and constants moved to separate sections
type TableArea = 'AC Premium' | 'Garden' | 'Bar';
type TableStatus = 'Available' | 'Occupied' | 'Running Table' | 'Printed Table' | 'Running KOT Table';

interface Table {
  id: string;
  number: number;
  area: TableArea;
  status: TableStatus;
  capacity: number;
  reservation?: {
    time: string;
    customerName: string;
    phone: string;
  };
}

interface BookingData extends Omit<Table, 'id' | 'status' | 'capacity'> {
  time: any;
  phone: any;
  customerName: any;
  date: string;
  numberOfGuests: number;
  specialRequests: string;
  advanceAmount: number;
  bookingSource: string;
  email: string;
}

const AREAS: TableArea[] = ['AC Premium', 'Garden', 'Bar'];
const STATUS_COLORS = {
  Available: 'bg-emerald-100 border-emerald-600',
  Occupied: 'bg-red-100 border-red-600',
  'Running Table': 'bg-blue-100 border-blue-600',
  'Printed Table': 'bg-purple-100 border-purple-600',
  'Running KOT Table': 'bg-amber-100 border-amber-600'
};

const initialTables: Table[] = [
  // AC Premium
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `ac${i + 1}`,
    number: i + 1,
    area: 'AC Premium' as TableArea,
    status: 'Available' as TableStatus,
    capacity: i % 2 === 0 ? 4 : 6
  })),
  // Garden
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `g${i + 1}`,
    number: i + 1,
    area: 'Garden' as TableArea,
    status: 'Available' as TableStatus,
    capacity: i % 2 === 0 ? 8 : 6
  })),
  // Bar
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `bar${i + 1}`,
    number: i + 1,
    area: 'Bar' as TableArea,
    status: 'Available' as TableStatus,
    capacity: 4
  }))
];

const Booking: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isBookingPanelOpen, setIsBookingPanelOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState<Omit<BookingData, 'area' | 'number'>>({
    customerName: '',
    phone: '',
    email: '',
    time: '',
    date: new Date().toISOString().split('T')[0],
    numberOfGuests: 1,
    specialRequests: '',
    advanceAmount: 0,
    bookingSource: 'Walk-in'
  });

  // Excel handling
  const [excelData, setExcelData] = useState<BookingData[]>([]);
  const excelFileName = 'table_bookings.xlsx';

  useEffect(() => {
    const savedData = localStorage.getItem(excelFileName);
    if (savedData) setExcelData(JSON.parse(savedData));
  }, []);

  const exportToExcel = (data: BookingData) => {
    const updatedData = [...excelData, data];
    const ws = XLSX.utils.json_to_sheet(updatedData.map((d, i) => ({
      '#': i + 1,
      'Table': d.number,
      'Area': d.area,
      'Customer': d.customerName,
      'Phone': d.phone,
      'Guests': d.numberOfGuests,
      'Time': d.time,
      'Date': d.date,
      'Advance': d.advanceAmount,
      'Source': d.bookingSource
    })));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bookings');
    XLSX.writeFile(wb, excelFileName);
    localStorage.setItem(excelFileName, JSON.stringify(updatedData));
  };

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    if (table.status === 'Available') setIsBookingPanelOpen(true);
  };

  const updateTableStatus = (tableId: string, status: TableStatus) => {
    setTables(tables.map(t => t.id === tableId ? { ...t, status } : t));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable) return;

    const bookingData: BookingData = {
      ...selectedTable,
      ...bookingForm,
      date: bookingForm.date,
      numberOfGuests: Math.min(bookingForm.numberOfGuests, selectedTable.capacity)
    };

    setTables(tables.map(t => 
      t.id === selectedTable.id ? { 
        ...t, 
        status: 'Occupied',
        reservation: {
          time: bookingForm.time,
          customerName: bookingForm.customerName,
          phone: bookingForm.phone
        }
      } : t
    ));

    exportToExcel(bookingData);
    resetForm();
  };

  const resetForm = () => {
    setBookingForm({
      customerName: '',
      phone: '',
      email: '',
      time: '',
      date: new Date().toISOString().split('T')[0],
      numberOfGuests: 1,
      specialRequests: '',
      advanceAmount: 0,
      bookingSource: 'Walk-in'
    });
    setIsBookingPanelOpen(false);
    setSelectedTable(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-full">
        {/* Table Grid Section */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <header className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-3">
                <TableIcon className="h-8 w-8 text-blue-600" />
                Restaurant Table Management
              </h1>
            </header>

            {/* Status Legend */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Table Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(STATUS_COLORS).map(([status, color]) => (
                  <div key={status} 
                    className={`${color} rounded-lg p-3 flex items-center justify-center text-sm font-medium transition-transform hover:scale-105`}>
                    {status}
                  </div>
                ))}
              </div>
            </div>

            {/* Table Sections */}
            {AREAS.map(area => (
              <Section key={area} title={area}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {tables.filter(t => t.area === area).map(table => (
                    <TableCard
                      key={table.id}
                      table={table}
                      onClick={() => handleTableClick(table)}
                      onStatusChange={updateTableStatus}
                      isSelected={selectedTable?.id === table.id}
                    />
                  ))}
                  <AddTableButton area={area} onAdd={() => {}} />
                </div>
              </Section>
            ))}
          </div>
        </div>

        {/* Booking Panel */}
        <AnimatePresence>
          {isBookingPanelOpen && selectedTable && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl border-l border-gray-200 z-50"
            >
              <BookingPanel
                table={selectedTable}
                form={bookingForm}
                onFormChange={setBookingForm}
                onSubmit={handleBookingSubmit}
                onClose={resetForm}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Sub-components
const StatusLegend: React.FC = () => (
  <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
    <h3 className="text-sm font-semibold mb-3 text-gray-600">TABLE STATUS</h3>
    <div className="flex flex-wrap gap-3">
      {Object.entries(STATUS_COLORS).map(([status, color]) => (
        <div key={status} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded ${color}`} />
          <span className="text-sm text-gray-700">{status}</span>
        </div>
      ))}
    </div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </section>
);

const TableCard: React.FC<{
  table: Table;
  onClick: () => void;
  onStatusChange: (id: string, status: TableStatus) => void;
  isSelected: boolean;
}> = ({ table, onClick, onStatusChange, isSelected }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden rounded-xl border-2 transition-all ${
      STATUS_COLORS[table.status]
    } ${
      isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
    } hover:shadow-lg`}
  >
    <div className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Table {table.number}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Capacity: {table.capacity} guests
          </p>
        </div>
        <select
          value={table.status}
          onChange={(e) => onStatusChange(table.id, e.target.value as TableStatus)}
          className="text-sm px-2 py-1 rounded-lg bg-white/80 backdrop-blur border border-gray-200 hover:bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.keys(STATUS_COLORS).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      {table.reservation && (
        <div className="mt-3 pt-3 border-t border-gray-200/50">
          <p className="text-sm font-medium text-gray-900 truncate">
            {table.reservation.customerName}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {table.reservation.time}
          </p>
        </div>
      )}
    </div>
    <div 
      className="absolute inset-0 cursor-pointer"
      onClick={onClick}
    />
  </motion.div>
);

const BookingPanel: React.FC<{
  table: Table;
  form: Omit<BookingData, 'area' | 'number'>;
  onFormChange: (data: Omit<BookingData, 'area' | 'number'>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}> = ({ table, form, onFormChange, onSubmit, onClose }) => (
  <div className="h-full flex flex-col bg-gray-50">
    <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Table {table.number}</h2>
        <p className="text-sm text-gray-600 mt-1">Capacity: {table.capacity} guests</p>
      </div>
      <button 
        onClick={onClose}
        className="rounded-full p-2 hover:bg-gray-100 transition-colors"
      >
        <XIcon className="h-6 w-6 text-gray-500" />
      </button>
    </div>

    <form onSubmit={onSubmit} className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Customer Name"
            value={form.customerName}
            onChange={(v) => onFormChange({ ...form, customerName: v })}
            required
            placeholder="Enter customer name"
          />
          <InputField
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(v) => onFormChange({ ...form, phone: v })}
            required
            placeholder="Enter phone number"
          />
        </div>

        <InputField
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => onFormChange({ ...form, email: v })}
          placeholder="Enter email address"
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Time"
            type="time"
            value={form.time}
            onChange={(v) => onFormChange({ ...form, time: v })}
            required
          />
          <InputField
            label="Date"
            type="date"
            value={form.date}
            onChange={(v) => onFormChange({ ...form, date: v })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Number of Guests"
            type="number"
            min="1"
            max={table.capacity}
            value={form.numberOfGuests.toString()}
            onChange={(v) => onFormChange({ ...form, numberOfGuests: parseInt(v) })}
          />
          <InputField
            label="Advance Amount"
            type="number"
            value={form.advanceAmount.toString()}
            onChange={(v) => onFormChange({ ...form, advanceAmount: parseInt(v) })}
          />
        </div>

        <SelectField
          label="Booking Source"
          options={['Walk-in', 'Phone', 'Online', 'Third-party']}
          value={form.bookingSource}
          onChange={(v) => onFormChange({ ...form, bookingSource: v })}
        />

        <TextAreaField
          label="Special Requests"
          value={form.specialRequests}
          onChange={(v) => onFormChange({ ...form, specialRequests: v })}
          placeholder="Enter any special requests or notes"
        />
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  </div>
);

// Utility components
const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>> = ({ label, value, onChange, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const TextAreaField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
    />
  </div>
);

const SelectField: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const AddTableButton: React.FC<{ area: TableArea; onAdd: () => void }> = ({ area, onAdd }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 flex flex-col items-center justify-center text-gray-500 hover:text-blue-600"
    onClick={onAdd}
  >
    <PlusIcon className="h-6 w-6 mb-1" />
    <span className="text-sm">Add Table</span>
  </motion.button>
);

export default Booking;