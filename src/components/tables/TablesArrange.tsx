






// import React, { useState, useEffect } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FaPrint, FaEye } from 'react-icons/fa';
// import jsPDF from 'jspdf';

// interface OrderItem {
//   name: string;
//   quantity: number;
//   price: number;
// }

// interface RestaurantTable {
//   id: number;
//   tableNumber: string;
//   section: string;
//   capacity: number;
//   status: 'available' | 'running' | 'printed' | 'paid' | 'runningKOT';
//   orderAmount?: number;
//   reservationTime?: string;
//   orderItems?: OrderItem[]; // Added to track items in the order
// }

// // Generate 20 tables per section with initial status 'available'
// const generateTables = (section: string, prefix: string): RestaurantTable[] => {
//   return Array.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     tableNumber: `${prefix}${index + 1}`,
//     section,
//     capacity: Math.floor(Math.random() * 6) + 2,
//     status: 'available' as const,
//     orderAmount: 0,
//     orderItems: [], // Initially empty
//   }));
// };

// const initialTables: RestaurantTable[] = [
//   ...generateTables('Ground Floor', 'G'),
//   ...generateTables('Basement', 'B'),
//   ...generateTables('Party Hall', 'H'),
// ];

// const TableArrange: React.FC = () => {
//   const [tables, setTables] = useState<RestaurantTable[]>(initialTables);
//   const [newTable, setNewTable] = useState<Omit<RestaurantTable, 'id'>>({
//     tableNumber: '',
//     section: '',
//     capacity: 0,
//     status: 'available',
//     orderAmount: 0,
//     orderItems: [],
//   });
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   const sections = [...new Set(tables.map(table => table.section))];

//   useEffect(() => {
//     const updatedTable = location.state?.updatedTable as RestaurantTable;
//     if (updatedTable) {
//       setTables(prevTables =>
//         prevTables.map(t =>
//           t.tableNumber === updatedTable.tableNumber ? updatedTable : t
//         )
//       );
//     }
//   }, [location.state]);

//   const handleAddTable = (e: React.FormEvent) => {
//     e.preventDefault();
//     const prefix = newTable.section === 'Ground Floor' ? 'G' : newTable.section === 'Basement' ? 'B' : 'H';
//     const existingTablesInSection = tables.filter(t => t.section === newTable.section);
//     const newNumber = existingTablesInSection.length + 1;
//     const tableToAdd: RestaurantTable = {
//       id: tables.length + 1,
//       tableNumber: `${prefix}${newNumber}`,
//       ...newTable,
//     };
//     setTables([...tables, tableToAdd]);
//     setNewTable({ tableNumber: '', section: '', capacity: 0, status: 'available', orderAmount: 0, orderItems: [] });
//   };

//   const handleStatusChange = (id: number, newStatus: RestaurantTable['status']) => {
//     setTables(tables.map(table =>
//       table.id === id
//         ? {
//             ...table,
//             status: newStatus,
//             orderAmount: newStatus === 'running' || newStatus === 'printed' || newStatus === 'paid' ? (table.orderAmount || 0) : 0,
//           }
//         : table
//     ));
//   };

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;
//     const newTables = Array.from(tables);
//     const [reorderedItem] = newTables.splice(result.source.index, 1);
//     newTables.splice(result.destination.index, 0, reorderedItem);
//     setTables(newTables);
//   };

//   const filteredTables = tables.filter(table =>
//     table.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     table.section.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleTableClick = (table: RestaurantTable) => {
//     navigate(`/orders/${table.tableNumber}`, { 
//       state: { 
//         tableNumber: table.tableNumber,
//         tableData: table,
//         returnPath: '/'
//       } 
//     });
//   };

//   const handlePrint = (table: RestaurantTable, e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (table.orderAmount && table.orderAmount > 0) {
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "pt",
//         format: [226, 400], // Small receipt size
//       });
//       const width = 226;
//       const margin = 15;
//       let yPos = margin;

//       // Header
//       doc.setFontSize(16);
//       doc.setFont("helvetica", "bold");
//       doc.text("Receipt", width / 2, yPos, { align: "center" });
//       yPos += 20;

//       doc.setFontSize(10);
//       doc.setFont("helvetica", "normal");
//       doc.text("Tasty Bites Restaurant", width / 2, yPos, { align: "center" });
//       yPos += 10;
//       doc.text("123 Food Street, City", width / 2, yPos, { align: "center" });
//       yPos += 15;

//       doc.text(`Date: ${new Date().toLocaleString()}`, margin, yPos);
//       doc.text(`Table: ${table.tableNumber}`, width - margin, yPos, { align: "right" });
//       yPos += 15;

//       doc.setLineWidth(0.5);
//       doc.line(margin, yPos, width - margin, yPos);
//       yPos += 10;

//       // Items Header
//       doc.setFontSize(10);
//       doc.setFont("helvetica", "bold");
//       doc.text("Item", margin, yPos);
//       doc.text("Qty", width / 2 - 10, yPos, { align: "right" });
//       doc.text("Price", width - margin - 30, yPos, { align: "right" });
//       doc.text("Total", width - margin, yPos, { align: "right" });
//       yPos += 5;
//       doc.line(margin, yPos, width - margin, yPos);
//       yPos += 10;

//       // Sample Items (replace with actual table.orderItems if available)
//       const items = table.orderItems?.length
//         ? table.orderItems
//         : [
//             { name: "Pizza", quantity: 2, price: 10.00 },
//             { name: "Coke", quantity: 3, price: 2.50 },
//             { name: "Salad", quantity: 1, price: 5.00 },
//           ];

//       doc.setFont("helvetica", "normal");
//       items.forEach(item => {
//         const itemTotal = item.quantity * item.price;
//         doc.text(item.name.substring(0, 15), margin, yPos); // Truncate long names
//         doc.text(item.quantity.toString(), width / 2 - 10, yPos, { align: "right" });
//         doc.text(`$${item.price.toFixed(2)}`, width - margin - 30, yPos, { align: "right" });
//         doc.text(`$${itemTotal.toFixed(2)}`, width - margin, yPos, { align: "right" });
//         yPos += 15;
//       });

//       yPos += 5;
//       doc.line(margin, yPos, width - margin, yPos);
//       yPos += 10;

//       // Total Amount
//       doc.setFont("helvetica", "bold");
//       doc.text("Total Amount", margin, yPos);
//       doc.text(`$${table.orderAmount.toFixed(2)}`, width - margin, yPos, { align: "right" });
//       yPos += 15;

//       doc.setFont("helvetica", "normal");
//       doc.text("Thank you for dining with us!", width / 2, yPos, { align: "center" });

//       const filename = `Bill-Table${table.tableNumber}-${Date.now()}.pdf`;
//       doc.save(filename);

//       handleStatusChange(table.id, 'paid');
//     } else {
//       alert(`No bill to print for Table ${table.tableNumber}`);
//     }
//   };

//   const handleViewOrder = (table: RestaurantTable, e: React.MouseEvent) => {
//     e.stopPropagation();
//     navigate(`/orders`, { 
//       state: { 
//         tableNumber: table.tableNumber,
//         tableData: table,
//         returnPath: '/',
//         viewMode: true
//       } 
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">RMS Table Dashboard</h1>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Search Tables (e.g., G1, B2)..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-72 shadow-sm"
//           />
//           <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition shadow-md">Delivery</button>
//           <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition shadow-md">Pick Up</button>
//           <button
//             onClick={handleAddTable}
//             className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition shadow-md"
//           >
//             + Add Table
//           </button>
//         </div>
//       </div>

//       {/* Status Legend */}
//       <div className="mt-4 flex flex-wrap gap-6 text-sm mb-8">
//         <span className="flex items-center gap-2"><span className="w-6 h-6 bg-gray-200 border-2 border-gray-400 rounded-md"></span> Available</span>
//         <span className="flex items-center gap-2"><span className="w-6 h-6 bg-blue-300 border-2 border-blue-500 rounded-md"></span> Running</span>
//         <span className="flex items-center gap-2"><span className="w-6 h-6 bg-green-300 border-2 border-green-500 rounded-md"></span> Printed</span>
//         <span className="flex items-center gap-2"><span className="w-6 h-6 bg-yellow-300 border-2 border-yellow-500 rounded-md"></span> Paid</span>
//         <span className="flex items-center gap-2"><span className="w-6 h-6 bg-orange-300 border-2 border-orange-500 rounded-md"></span> Running KOT</span>
//       </div>

//       {/* Table Sections */}
//       <div className="space-y-10">
//         {sections.map(section => (
//           <div key={section} className="w-full">
//             <h2 className="text-2xl font-semibold mb-4 bg-orange-100 p-3 rounded-lg text-orange-800 shadow-sm">{section}</h2>
//             <DragDropContext onDragEnd={onDragEnd}>
//               <Droppable droppableId={section} direction="horizontal">
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3 p-4 bg-white shadow-lg rounded-lg border border-orange-200"
//                   >
//                     {filteredTables
//                       .filter(table => table.section === section)
//                       .map((table, index) => (
//                         <Draggable key={table.id || ''} draggableId={(table.id || '').toString()} index={index}>
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`p-3 border-2 rounded-lg text-center cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-20 flex flex-col justify-between ${
//                                 table.status === 'available'
//                                   ? 'bg-gray-200 border-gray-400'
//                                   : table.status === 'running'
//                                   ? 'bg-blue-300 border-blue-500'
//                                   : table.status === 'printed'
//                                   ? 'bg-green-300 border-green-500'
//                                   : table.status === 'paid'
//                                   ? 'bg-yellow-300 border-yellow-500'
//                                   : 'bg-orange-300 border-orange-500'
//                               }`}
//                             >
//                               <div onClick={() => handleTableClick(table)}>
//                                 <span className="font-bold text-base text-gray-800">{table.tableNumber}</span>
//                                 {table.orderAmount !== undefined && table.orderAmount > 0 && (
//                                   <span className="text-xs block text-gray-700">₹{table.orderAmount.toFixed(2)}</span>
//                                 )}
//                               </div>
//                               <div className="flex justify-center gap-2">
//                                 {table.orderAmount && table.orderAmount > 0 && (
//                                   <>
//                                     <button
//                                       onClick={(e) => handlePrint(table, e)}
//                                       className="text-lg p-1 rounded-full text-green-700 hover:bg-green-200 hover:text-green-800 transition-colors duration-200"
//                                       title="Print Bill"
//                                     >
//                                       <FaPrint />
//                                     </button>
//                                     <button
//                                       onClick={(e) => handleViewOrder(table, e)}
//                                       className="text-lg p-1 rounded-full text-purple-700 hover:bg-purple-200 hover:text-purple-800 transition-colors duration-200"
//                                       title="View Order"
//                                     >
//                                       <FaEye />
//                                     </button>
//                                   </>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </DragDropContext>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TableArrange;




import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPrint, FaEye } from 'react-icons/fa';
import jsPDF from 'jspdf';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface RestaurantTable {
  id: number;
  tableNumber: string;
  section: string;
  capacity: number;
  status: 'available' | 'running' | 'printed' | 'paid' | 'runningKOT';
  orderAmount?: number;
  reservationTime?: string;
  orderItems?: OrderItem[];
}

const generateTables = (section: string, prefix: string): RestaurantTable[] => {
  return Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    tableNumber: `${prefix}${index + 1}`,
    section,
    capacity: Math.floor(Math.random() * 6) + 2,
    status: 'available' as const,
    orderAmount: 0,
    orderItems: [],
  }));
};

const initialTables: RestaurantTable[] = [
  ...generateTables('Ground Floor', 'G'),
  ...generateTables('Basement', 'B'),
  ...generateTables('Party Hall', 'H'),
];

const TableArrange: React.FC = () => {
  const [tables, setTables] = useState<RestaurantTable[]>(initialTables);
  const [newTable, setNewTable] = useState<Omit<RestaurantTable, 'id'>>({
    tableNumber: '',
    section: '',
    capacity: 0,
    status: 'available',
    orderAmount: 0,
    orderItems: [],
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [...new Set(tables.map(table => table.section))];

  useEffect(() => {
    const updatedTable = location.state?.updatedTable as RestaurantTable;
    if (updatedTable) {
      setTables(prevTables =>
        prevTables.map(t =>
          t.tableNumber === updatedTable.tableNumber ? updatedTable : t
        )
      );
    }
  }, [location.state]);

  const handleAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = newTable.section === 'Ground Floor' ? 'G' : newTable.section === 'Basement' ? 'B' : 'H';
    const existingTablesInSection = tables.filter(t => t.section === newTable.section);
    const newNumber = existingTablesInSection.length + 1;
    const tableToAdd: RestaurantTable = {
      id: tables.length + 1,
      tableNumber: `${prefix}${newNumber}`,
      ...newTable,
    };
    setTables([...tables, tableToAdd]);
    setNewTable({ tableNumber: '', section: '', capacity: 0, status: 'available', orderAmount: 0, orderItems: [] });
  };

  const handleStatusChange = (id: number, newStatus: RestaurantTable['status']) => {
    setTables(tables.map(table =>
      table.id === id
        ? {
          ...table,
          status: newStatus,
          orderAmount: newStatus === 'running' || newStatus === 'printed' || newStatus === 'paid' ? (table.orderAmount || 0) : 0,
        }
        : table
    ));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newTables = Array.from(tables);
    const [reorderedItem] = newTables.splice(result.source.index, 1);
    newTables.splice(result.destination.index, 0, reorderedItem);
    setTables(newTables);
  };

  const filteredTables = tables.filter(table =>
    table.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTableClick = (table: RestaurantTable) => {
    navigate(`/orders/${table.tableNumber}`, {
      state: {
        tableNumber: table.tableNumber,
        tableData: table,
        returnPath: '/'
      }
    });
  };

  const handlePrint = (table: RestaurantTable, e: React.MouseEvent) => {
    e.stopPropagation();
    if (table.orderAmount && table.orderAmount > 0) {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [180, 320], // Reduced receipt size
      });
      const width = 180;
      const margin = 10;
      let yPos = margin;

      // Header
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Receipt", width / 2, yPos, { align: "center" });
      yPos += 15;

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Tasty Bites Restaurant", width / 2, yPos, { align: "center" });
      yPos += 8;
      doc.text("123 Food Street, City", width / 2, yPos, { align: "center" });
      yPos += 12;

      doc.text(`Date: ${new Date().toLocaleString()}`, margin, yPos);
      doc.text(`Table: ${table.tableNumber}`, width - margin, yPos, { align: "right" });
      yPos += 12;

      doc.setLineWidth(0.4);
      doc.line(margin, yPos, width - margin, yPos);
      yPos += 8;

      // Items Header
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("Item", margin, yPos);
      doc.text("Qty", width / 2 - 8, yPos, { align: "right" });
      doc.text("Price", width - margin - 25, yPos, { align: "right" });
      doc.text("Total", width - margin, yPos, { align: "right" });
      yPos += 4;
      doc.line(margin, yPos, width - margin, yPos);
      yPos += 8;

      const items = table.orderItems?.length
        ? table.orderItems
        : [
          { name: "Pizza", quantity: 2, price: 10.00 },
          { name: "Coke", quantity: 3, price: 2.50 },
          { name: "Salad", quantity: 1, price: 5.00 },
        ];

      doc.setFont("helvetica", "normal");
      items.forEach(item => {
        const itemTotal = item.quantity * item.price;
        doc.text(item.name.substring(0, 12), margin, yPos); // Reduced truncation
        doc.text(item.quantity.toString(), width / 2 - 8, yPos, { align: "right" });
        doc.text(`$${item.price.toFixed(2)}`, width - margin - 25, yPos, { align: "right" });
        doc.text(`$${itemTotal.toFixed(2)}`, width - margin, yPos, { align: "right" });
        yPos += 12; // Reduced spacing
      });

      yPos += 4;
      doc.line(margin, yPos, width - margin, yPos);
      yPos += 8;

      doc.setFont("helvetica", "bold");
      doc.text("Total Amount", margin, yPos);
      doc.text(`$${table.orderAmount.toFixed(2)}`, width - margin, yPos, { align: "right" });
      yPos += 12;

      doc.setFont("helvetica", "normal");
      doc.text("Thank you!", width / 2, yPos, { align: "center" });

      const filename = `Bill-Table${table.tableNumber}-${Date.now()}.pdf`;
      doc.save(filename);

      handleStatusChange(table.id, 'paid');
    } else {
      alert(`No bill to print for Table ${table.tableNumber}`);
    }
  };

  const handleViewOrder = (table: RestaurantTable, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/orders`, {
      state: {
        tableNumber: table.tableNumber,
        tableData: table,
        returnPath: '/',
        viewMode: true
      }
    });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">RMS Table Dashboard</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search Tables (e.g., G1, B2)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 w-60 shadow-sm text-sm"
          />
          <button className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700 transition shadow-sm text-sm">Delivery</button>
          <button className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700 transition shadow-sm text-sm">Pick Up</button>
          <button
            onClick={handleAddTable}
            className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700 transition shadow-sm text-sm"
          >
            + Add Table
          </button>
        </div>
      </div>

      {/* Status Legend */}
      <div className="mt-3 flex flex-wrap gap-4 text-xs mb-6">
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-gray-200 border-2 border-gray-400 rounded-md"></span> Available</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-blue-300 border-2 border-blue-500 rounded-md"></span> Running</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-300 border-2 border-green-500 rounded-md"></span> Printed</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-300 border-2 border-yellow-500 rounded-md"></span> Paid</span>
        <span className="flex items-center gap-1"><span className="w-4 h-4 bg-orange-300 border-2 border-orange-500 rounded-md"></span> Running KOT</span>
      </div>

      {/* Table Sections */}
      <div className="space-y-8">
        {sections.map(section => (
          <div key={section} className="w-full">
            <h2 className="text-xl font-semibold mb-3 bg-orange-100 p-2 rounded-md text-orange-800 shadow-sm">{section}</h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={section} direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-12 gap-2 p-3 bg-white shadow-md rounded-md border border-orange-200"
                  >
                    {filteredTables
                      .filter(table => table.section === section)
                      .map((table, index) => (
                        <Draggable key={table.id || ''} draggableId={(table.id || '').toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-2 border-2 rounded-md text-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-16 flex flex-col justify-between ${table.status === 'available'
                                  ? 'bg-gray-200 border-gray-400'
                                  : table.status === 'running'
                                    ? 'bg-blue-300 border-blue-500'
                                    : table.status === 'printed'
                                      ? 'bg-green-300 border-green-500'
                                      : table.status === 'paid'
                                        ? 'bg-yellow-300 border-yellow-500'
                                        : 'bg-orange-300 border-orange-500'
                                }`}
                            >
                              <div onClick={() => handleTableClick(table)}>
                                <span className="font-bold text-sm text-gray-800">{table.tableNumber}</span>
                                {table.orderAmount !== undefined && table.orderAmount > 0 && (
                                  <span className="text-xs block text-gray-700">₹{table.orderAmount.toFixed(2)}</span>
                                )}
                              </div>
                              <div className="flex justify-center gap-1">
                                {table.orderAmount && table.orderAmount > 0 && (
                                  <>
                                    <button
                                      onClick={(e) => handlePrint(table, e)}
                                      className="text-lg p-1 rounded-full text-green-700 hover:bg-green-200 hover:text-green-800 transition-colors duration-200"
                                      title="Print Bill"
                                    >
                                      <FaPrint size={18} />
                                    </button>
                                    <button
                                      onClick={(e) => handleViewOrder(table, e)}
                                      className="text-lg p-1 rounded-full text-purple-700 hover:bg-purple-200 hover:text-purple-800 transition-colors duration-200"
                                      title="View Order"
                                    >
                                      <FaEye size={18} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableArrange;