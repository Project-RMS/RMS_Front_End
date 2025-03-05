


// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import jsPDF from "jspdf";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaPlus, FaChevronDown, FaChevronUp, FaUtensils, FaCoffee, FaPizzaSlice, FaBreadSlice, FaSoap, FaPrint } from "react-icons/fa";
// import { GiHamburger, GiTacos, GiChickenLeg } from "react-icons/gi";

// // Interfaces remain unchanged
// interface MenuItem {
//   id: string;
//   name: string;
//   price?: number;
//   category: string;
//   quantity?: number;
//   status?: 'pending' | 'in-progress' | 'ready';
// }

// interface FavoriteCategory {
//   id: string;
//   name: string;
//   items: MenuItem[];
//   icon?: JSX.Element;
// }

// interface OrderActionCache {
//   tableNumber: string;
//   action: string;
//   timestamp: number;
//   orderItems: MenuItem[];
//   total: number;
//   orderType: string;
// }

// interface KOT {
//   id: string;
//   tableNumber: string;
//   items: MenuItem[];
//   timestamp: string;
//   orderType: string;
//   total: number;
// }



// const initialCategories: FavoriteCategory[] = [
//   {
//     id: "cat1", name: "Drinks", icon: <FaCoffee size={16} />, items: [
//       { id: "1", name: "Coffee", price: 3.99, category: "Drinks" },
//       { id: "2", name: "Tea", price: 2.99, category: "Drinks" },
//     ]
//   },
//   {
//     id: "cat2", name: "Food", icon: <GiHamburger size={16} />, items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ]
//   },
//   {
//     id: "cat3", name: "Starters", icon: <FaUtensils size={16} />, items: [
//       { id: "5", name: "Spring Rolls", price: 4.99, category: "Starters" },
//       { id: "6", name: "Garlic Bread", price: 3.99, category: "Starters" },
//     ]
//   },
//   {
//     id: "cat4", name: "Pizza", icon: <FaPizzaSlice size={16} />, items: [
//       { id: "7", name: "Margherita", price: 9.99, category: "Pizza" },
//       { id: "8", name: "Pepperoni", price: 10.99, category: "Pizza" },
//     ]
//   },
//   {
//     id: "cat5", name: "Soups", icon: <FaSoap size={16} />, items: [
//       { id: "9", name: "Tomato Soup", price: 4.29, category: "Soups" },
//       { id: "10", name: "Chicken Noodle", price: 5.29, category: "Soups" },
//     ]
//   },
//   {
//     id: "cat6", name: "Chicken Soup", icon: <GiChickenLeg size={16} />, items: [
//       { id: "11", name: "Creamy Chicken", price: 5.49, category: "Chicken Soup" },
//       { id: "12", name: "Spicy Chicken", price: 5.99, category: "Chicken Soup" },
//     ]
//   },
//   {
//     id: "cat7", name: "Indian Breads", icon: <FaBreadSlice size={16} />, items: [
//       { id: "13", name: "Naan", price: 2.99, category: "Indian Breads" },
//       { id: "14", name: "Paratha", price: 3.49, category: "Indian Breads" },
//     ]
//   },
//   {
//     id: "cat8", name: "Roti", icon: <FaBreadSlice size={16} />, items: [
//       { id: "15", name: "Plain Roti", price: 2.49, category: "Roti" },
//       { id: "16", name: "Butter Roti", price: 2.79, category: "Roti" },
//     ]
//   },
//   {
//     id: "cat9", name: "South India", icon: <GiTacos size={16} />, items: [
//       { id: "17", name: "Dosa", price: 8.99, category: "South India" },
//       { id: "18", name: "Idli", price: 6.49, category: "South India" },
//     ]
//   },
// ];

// const Order_1: React.FC = () => {
//   // State declarations remain unchanged
//   const [categories, setCategories] = useState<FavoriteCategory[]>(initialCategories);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [orderItems, setOrderItems] = useState<MenuItem[]>([]);
//   const [kots, setKots] = useState<KOT[]>([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
//   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
//   const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });
//   const [paymentMethod, setPaymentMethod] = useState<string>("cash");
//   const [orderType, setOrderType] = useState<string>("dine-in");
//   const [discount, setDiscount] = useState<number>(0);
//   const [taxRate, setTaxRate] = useState<number>(0.1);
//   const [additionalActions, setAdditionalActions] = useState({
//     paid: false,
//     loyalty: false,
//     feedback: false,
//     sms: false,
//   });
//   const [tableNumber, setTableNumber] = useState<string>("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Logic remains unchanged (useEffect, loadOrderHistory, cacheOrderAction, etc.)
//   useEffect(() => {
//     if (location.state && location.state.tableNumber) {
//       setTableNumber(location.state.tableNumber);
//       setOrderType("dine-in");
//       if (location.state.viewMode && location.state.tableData) {
//         setOrderItems(location.state.tableData.orderItems || []);
//       } else if (location.state.tableData && location.state.tableData.orderItems) {
//         setOrderItems(location.state.tableData.orderItems);
//       }
//     }
//   }, [location.state]);

//   const loadOrderHistory = (tableNum: string) => {
//     try {
//       const cachedOrdersStr = localStorage.getItem('orderActionsCache');
//       if (cachedOrdersStr) {
//         const cachedOrders: OrderActionCache[] = JSON.parse(cachedOrdersStr);
//         const tableOrders = cachedOrders.filter(order => order.tableNumber === tableNum);
//         if (tableOrders.length > 0) {
//           const latestOrder = tableOrders.sort((a, b) => b.timestamp - a.timestamp)[0];
//           setOrderItems(latestOrder.orderItems);
//           setOrderType(latestOrder.orderType);
//         }
//       }
//     } catch (error) {
//       console.error("Error loading order history:", error);
//     }
//   };

//   const cacheOrderAction = (action: string, items: MenuItem[], total: number) => {
//     try {
//       const newAction: OrderActionCache = {
//         tableNumber,
//         action,
//         timestamp: Date.now(),
//         orderItems: items,
//         total,
//         orderType
//       };
//       const existingCacheStr = localStorage.getItem('orderActionsCache');
//       const existingCache: OrderActionCache[] = existingCacheStr ? JSON.parse(existingCacheStr) : [];
//       const updatedCache = [...existingCache, newAction];
//       const limitedCache = updatedCache.slice(-100);
//       localStorage.setItem('orderActionsCache', JSON.stringify(limitedCache));
//     } catch (error) {
//       console.error("Error caching order action:", error);
//     }
//   };

//   const addToOrder = (item: MenuItem) => {
//     const existingItem = orderItems.find((i) => i.name === item.name && i.category === item.category);
//     if (existingItem) {
//       setOrderItems((prev) =>
//         prev.map((i) =>
//           i.id === existingItem.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
//         )
//       );
//     } else {
//       setOrderItems((prev) => [
//         ...prev,
//         { ...item, id: `${item.id}-${Date.now()}`, quantity: 1, status: 'pending' },
//       ]);
//     }
//   };

//   const increaseQuantity = (id: string) => {
//     setOrderItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (id: string) => {
//     setOrderItems((prev) => {
//       const item = prev.find((i) => i.id === id);
//       if (item && (item.quantity || 1) > 1) {
//         return prev.map((i) =>
//           i.id === id ? { ...i, quantity: (item.quantity || 1) - 1 } : i
//         );
//       }
//       return prev.filter((i) => i.id !== id);
//     });
//   };

//   const removeFromOrder = (id: string) => {
//     setOrderItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const addCategory = () => {
//     if (!newCategoryName.trim()) return;
//     const newCategory: FavoriteCategory = {
//       id: `cat${Date.now()}`,
//       name: newCategoryName.trim(),
//       items: [],
//       icon: <FaUtensils size={20} />,
//     };
//     setCategories((prev) => [...prev, newCategory]);
//     setNewCategoryName("");
//     setIsAddCategoryModalOpen(false);
//   };

//   const addItem = () => {
//     if (!newItem.name.trim() || !newItem.category) return;
//     const price = parseFloat(newItem.price) || 0;
//     const newMenuItem: MenuItem = {
//       id: `${Date.now()}`,
//       name: newItem.name.trim(),
//       price: price > 0 ? price : undefined,
//       category: newItem.category,
//     };
//     setCategories((prev) =>
//       prev.map((cat) =>
//         cat.name === newItem.category
//           ? { ...cat, items: [...cat.items, newMenuItem] }
//           : cat
//       )
//     );
//     setNewItem({ name: "", price: "", category: "" });
//     setIsAddItemModalOpen(false);
//   };

//   const subtotal = orderItems.reduce(
//     (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
//     0
//   );
//   const tax = subtotal * taxRate;
//   const total = subtotal - discount + tax;

//   const generatePDF = (action: string) => {
//     const isKOT = action === "kot" || action === "kotprint";
//     const doc = new jsPDF({
//       orientation: "portrait",
//       unit: "pt",
//       format: [200, isKOT ? 180 + orderItems.length * 14 : 400 + orderItems.length * 14],
//     });
//     const width = 200;
//     const margin = 12;
//     let yPos = margin;

//     doc.setFontSize(14);
//     doc.setFont("helvetica", "bold");
//     const title = isKOT ? "Kitchen Order Ticket" : "Receipt";
//     doc.text(title, width / 2, yPos, { align: "center" });
//     yPos += 20;

//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");
//     doc.text("Tasty Bites Restaurant", width / 2, yPos, { align: "center" });
//     yPos += 10;
//     doc.text("123 Food Street, City", width / 2, yPos, { align: "center" });
//     yPos += 10;
//     doc.text("Phone: (123) 456-7890", width / 2, yPos, { align: "center" });
//     yPos += 14;

//     doc.text(`Order #: ${Date.now().toString().slice(-6)}`, margin, yPos);
//     yPos += 10;
//     doc.text(`Date: ${new Date().toLocaleString()}`, margin, yPos);
//     yPos += 10;
//     doc.text(`Type: ${orderType.toUpperCase()}`, margin, yPos);
//     if (orderType === "dine-in") {
//       doc.text(`Table: ${tableNumber || "N/A"}`, width - margin, yPos, { align: "right" });
//     }
//     yPos += 14;

//     doc.setLineWidth(0.5);
//     doc.setDrawColor(100);
//     doc.line(margin, yPos, width - margin, yPos);
//     yPos += 10;

//     doc.setFontSize(10);
//     doc.setFont("helvetica", "bold");
//     doc.text("Qty", margin, yPos);
//     doc.text("Description", margin + 25, yPos);
//     doc.text("Price", width - margin, yPos, { align: "right" });
//     yPos += 6;
//     doc.line(margin, yPos, width - margin, yPos);
//     yPos += 10;

//     doc.setFont("helvetica", "normal");
//     orderItems.forEach((item) => {
//       const itemName = `${item.name}`.substring(0, 14);
//       doc.text(`${item.quantity || 1}`, margin, yPos);
//       doc.text(itemName, margin + 25, yPos);
//       doc.text(`$${(item.price || 0).toFixed(2)}`, width - margin, yPos, { align: "right" });
//       yPos += 14;
//     });

//     if (isKOT) {
//       yPos += 6;
//       doc.line(margin, yPos, width - margin, yPos);
//       yPos += 14;
//       doc.text("For Kitchen Use Only", width / 2, yPos, { align: "center" });
//     } else {
//       yPos += 6;
//       doc.line(margin, yPos, width - margin, yPos);
//       yPos += 10;
//       doc.setFontSize(10);
//       doc.text("Subtotal", margin, yPos);
//       doc.text(`$${subtotal.toFixed(2)}`, width - margin, yPos, { align: "right" });
//       yPos += 10;
//       if (discount > 0) {
//         doc.text(`Discount`, margin, yPos);
//         doc.text(`-$${discount.toFixed(2)}`, width - margin, yPos, { align: "right" });
//         yPos += 10;
//       }
//       doc.text(`Tax (${(taxRate * 100).toFixed(0)}%)`, margin, yPos);
//       doc.text(`$${tax.toFixed(2)}`, width - margin, yPos, { align: "right" });
//       yPos += 14;

//       doc.setFontSize(12);
//       doc.setFont("helvetica", "bold");
//       doc.text("Total", margin, yPos);
//       doc.text(`$${total.toFixed(2)}`, width - margin, yPos, { align: "right" });
//       yPos += 20;

//       doc.setFontSize(10);
//       doc.setFont("helvetica", "normal");
//       doc.text(`Payment Method: ${paymentMethod}`, margin, yPos);
//       yPos += 10;

//       const selectedActions = Object.entries(additionalActions)
//         .filter(([_, value]) => value)
//         .map(([key]) => key);
//       if (selectedActions.length > 0) {
//         doc.text(`Notes: ${selectedActions.join(", ")}`, margin, yPos);
//         yPos += 10;
//       }

//       yPos += 6;
//       doc.line(margin, yPos, width - margin, yPos);
//       yPos += 14;
//       doc.text("Thank You!", width / 2, yPos, { align: "center" });
//       yPos += 10;
//       doc.text("www.tastybites.com", width / 2, yPos, { align: "center" });
//     }

//     const filename = `${isKOT ? "KOT" : "Receipt"}-${tableNumber || "NoTable"}-${Date.now()}.pdf`;
//     if (action !== "generateBill") {
//       doc.save(filename);
//     }

//     if (action === "saveprint" || action === "kotprint") {
//       console.log("Printing PDF:", filename);
//     }

//     if (action === "savebill" || action === "payment" || action === "generateBill" || action === "kot" || action === "kotprint" || action === "saveprint") {
//       const newStatus = action === "payment" ? "paid" :
//         action === "kot" ? "runningKOT" :
//           action === "kotprint" ? "printed" :
//             "printed";
//       navigate("/", {
//         state: {
//           updatedTable: {
//             tableNumber: tableNumber,
//             status: newStatus,
//             orderAmount: total,
//             orderItems: orderItems.map(item => ({
//               name: item.name,
//               quantity: item.quantity || 1,
//               price: item.price || 0,
//             })),
//           },
//         },
//       });
//     }
//   };

//   const handleGenerateBill = () => {
//     if (orderItems.length === 0) {
//       alert("No items in the order to generate a bill");
//       return;
//     }
//     setIsBillingModalOpen(true);
//   };

//   const handleConfirmBill = (action: string) => {
//     generatePDF(action);
//     setIsBillingModalOpen(false);
//   };

//   const handleOrderAction = (action: string) => {
//     if (orderItems.length === 0 && action !== "save") {
//       alert("No items in the order to process!");
//       return;
//     }

//     cacheOrderAction(action, orderItems, total);

//     switch (action) {
//       case "payment":
//         generatePDF(action);
//         setOrderItems([]);
//         setAdditionalActions({ paid: false, loyalty: false, feedback: false, sms: false });
//         setTableNumber("");
//         setOrderType("dine-in");
//         setDiscount(0);
//         break;
//       case "save":
//         alert("Order saved");
//         navigate("/", {
//           state: {
//             updatedTable: {
//               tableNumber: tableNumber,
//               status: 'running',
//               orderAmount: total,
//               orderItems: orderItems.map(item => ({
//                 name: item.name,
//                 quantity: item.quantity || 1,
//                 price: item.price || 0,
//               })),
//             },
//           },
//         });
//         break;
//       case "saveprint":
//         generatePDF(action);
//         break;
//       case "savebill":
//         generatePDF(action);
//         break;
//       case "kot":
//         generatePDF(action);
//         const newKOT: KOT = {
//           id: `kot-${Date.now()}`,
//           tableNumber,
//           items: orderItems.map(item => ({ ...item, status: 'pending' })),
//           timestamp: new Date().toLocaleString(),
//           orderType,
//           total,
//         };
//         setKots(prev => [...prev, newKOT]);
//         break;
//       case "kotprint":
//         generatePDF(action);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleCheckboxChange = (action: keyof typeof additionalActions) => {
//     setAdditionalActions((prev) => ({
//       ...prev,
//       [action]: !prev[action],
//     }));
//   };

//   const handleStatusChange = (kotId: string, itemId: string, newStatus: MenuItem['status']) => {
//     setKots(prevKots =>
//       prevKots.map(kot =>
//         kot.id === kotId
//           ? {
//             ...kot,
//             items: kot.items.map(item =>
//               item.id === itemId ? { ...item, status: newStatus } : item
//             ),
//           }
//           : kot
//       )
//     );
//   };

//   const handlePrintKOT = (kot: KOT) => {
//     console.log('Printing KOT:', {
//       Table: kot.tableNumber,
//       Items: kot.items.map(item => ({
//         Name: item.name,
//         Quantity: item.quantity,
//         Status: item.status,
//       })),
//       Total: `$${kot.total.toFixed(2)}`,
//       Timestamp: kot.timestamp,
//       OrderType: kot.orderType,
//     });
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 -mt-3">
//       {/* Sidebar (Categories) */}
//       <motion.div
//         initial={{ width: 280 }}
//         animate={{ width: isSidebarOpen ? 280 : 60 }}
//         transition={{ duration: 0.3 }}
//         className="bg-gradient-to-b from-[#194a7a] to-[#123558] text-white shadow-xl overflow-hidden"
//       >
//         <div className="p-4 flex flex-col h-full">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className={`text-xl font-bold tracking-wide ${!isSidebarOpen && "hidden"}`}>Menu Categories</h2>
//             <motion.button
//               whileHover={{ rotate: 90 }}
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 rounded-full bg-[#123558] hover:bg-[#0e2a46] transition-colors duration-200"
//             >
//               {isSidebarOpen ? "←" : "→"}
//             </motion.button>
//           </div>

//           {isSidebarOpen && (
//             <>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full mb-6 bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white py-2 rounded-lg shadow-md hover:from-[#e76f51] hover:to-[#d15e42] flex items-center justify-center gap-2 transition-all duration-300 text-base"
//                 onClick={() => setIsAddCategoryModalOpen(true)}
//               >
//                 <FaPlus size={14} /> Add Category
//               </motion.button>

//               <motion.div className="flex-1 overflow-y-auto">
//                 {categories.map((category) => (
//                   <motion.div
//                     key={category.id}
//                     className="mb-3"
//                     whileHover={{ scale: 1.03 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <button
//                       className={`w-full text-left p-3 rounded-lg flex justify-between items-center transition-all duration-300 ${activeCategory === category.id
//                         ? "bg-[#123558] text-white shadow-inner"
//                         : "hover:bg-[#0e2a46] text-gray-100"
//                         }`}
//                       onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
//                     >
//                       <div className="flex items-center gap-3">
//                         {category.icon && <span className="text-xl">{category.icon}</span>}
//                         <span className="font-semibold text-sm">{category.name}</span>
//                       </div>
//                       {activeCategory === category.id ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
//                     </button>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </>
//           )}
//         </div>
//       </motion.div>

//       {/* Right Panel - Category Items */}
//       <motion.div
//         initial={{ width: 0 }}
//         animate={{ width: activeCategory ? 320 : 0 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white shadow-lg overflow-hidden border-l border-[#194a7a]/20"
//       >
//         {activeCategory && (
//           <div className="p-4 flex flex-col h-full">
//             <h2 className="text-xl font-bold mb-4 text-[#194a7a] flex items-center gap-2">
//               {categories.find((cat) => cat.id === activeCategory)?.icon}
//               {categories.find((cat) => cat.id === activeCategory)?.name} Items
//             </h2>
//             <div className="flex-1 overflow-y-auto">
//               {categories
//                 .find((cat) => cat.id === activeCategory)
//                 ?.items.map((item) => (
//                   <motion.button
//                     key={item.id}
//                     className="w-full text-left p-4 flex justify-between items-center bg-[#194a7a]/10 mb-3 rounded-lg border border-[#194a7a]/20 hover:bg-[#194a7a]/20 transition-all duration-300"
//                     onClick={() => addToOrder(item)}
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                   >
//                     <div>
//                       <span className="text-[#194a7a] font-semibold text-base">{item.name}</span>
//                       <span className="block text-sm text-[#194a7a]/80">Freshly Made</span>
//                     </div>
//                     {item.price && (
//                       <span className="text-[#194a7a] font-bold text-base">${item.price.toFixed(2)}</span>
//                     )}
//                   </motion.button>
//                 ))}
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full mt-4 bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white py-2 rounded-lg hover:from-[#e76f51] hover:to-[#d15e42] flex items-center justify-center gap-2 shadow-md transition-all duration-300 text-base"
//               onClick={() => {
//                 setNewItem({
//                   ...newItem,
//                   category: categories.find((cat) => cat.id === activeCategory)?.name || "",
//                 });
//                 setIsAddItemModalOpen(true);
//               }}
//             >
//               <FaPlus size={14} /> Add Item
//             </motion.button>
//           </div>
//         )}
//       </motion.div>

//       {/* Main Content - Order Area and KOT Display */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <div className="bg-white p-4 shadow-lg flex justify-between items-center flex-wrap gap-2">
//           <div className="flex items-center gap-4">
//             <h2 className="text-xl font-bold text-[#194a7a]">
//               {tableNumber ? `Table ${tableNumber}` : "New Order"}
//             </h2>
//             <div className="flex gap-2">
//               {["dine-in", "delivery", "pick-up"].map((type) => (
//                 <label key={type} className="flex items-center text-sm">
//                   <input
//                     type="radio"
//                     name="orderType"
//                     value={type}
//                     checked={orderType === type}
//                     onChange={(e) => setOrderType(e.target.value)}
//                     className="mr-1 text-[#194a7a]"
//                   />
//                   <span className="text-sm text-gray-700">{type.replace("-", " ")}</span>
//                 </label>
//               ))}
//             </div>
//             {orderType === "dine-in" && (
//               <input
//                 type="text"
//                 value={tableNumber}
//                 onChange={(e) => setTableNumber(e.target.value)}
//                 className="p-2 border border-[#194a7a]/30 rounded-lg w-20 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-sm"
//                 placeholder="Table #"
//               />
//             )}
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleOrderAction("save")}
//               className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 shadow-md transition-all duration-200 text-sm"
//             >
//               Save
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleOrderAction("saveprint")}
//               className="bg-[#194a7a] text-white px-3 py-2 rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-sm"
//             >
//               Save & Print
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleOrderAction("savebill")}
//               className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 shadow-md transition-all duration-200 text-sm"
//             >
//               Save & Bill
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleOrderAction("kot")}
//               className="bg-[#f4a261] text-white px-3 py-2 rounded-lg hover:bg-[#e76f51] shadow-md transition-all duration-200 text-sm"
//             >
//               KOT
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleOrderAction("kotprint")}
//               className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 shadow-md transition-all duration-200 text-sm"
//             >
//               KOT & Print
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleGenerateBill}
//               className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 shadow-md transition-all duration-200 text-sm"
//             >
//               Generate Bill
//             </motion.button>
//           </div>
//         </div>

//         <div className="flex-1 p-6 overflow-y-auto bg-gray-200 flex flex-col gap-8">
//           {/* Current Order Section */}
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#194a7a]/20">
//             {orderItems.length === 0 ? (
//               <p className="p-6 text-gray-500 text-center text-base">No items in order yet</p>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-[#194a7a]/10">
//                     <tr>
//                       <th className="py-3 px-4 text-left text-sm font-semibold text-[#194a7a]">Item</th>
//                       <th className="py-3 px-4 text-center text-sm font-semibold text-[#194a7a]">Qty</th>
//                       <th className="py-3 px-4 text-right text-sm font-semibold text-[#194a7a]">Price</th>
//                       <th className="py-3 px-4 text-right text-sm font-semibold text-[#194a7a]">Total</th>
//                       <th className="py-3 px-4 text-right text-sm font-semibold text-[#194a7a]">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orderItems.map((item) => (
//                       <tr key={item.id} className="border-b border-[#194a7a]/20 hover:bg-[#194a7a]/5">
//                         <td className="py-3 px-4">
//                           <div>
//                             <span className="font-medium text-gray-800 text-base">{item.name}</span>
//                             <span className="block text-sm text-gray-600">{item.category}</span>
//                           </div>
//                         </td>
//                         <td className="py-3 px-4 text-center">
//                           <div className="flex items-center justify-center gap-2">
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={() => decreaseQuantity(item.id)}
//                               className="w-6 h-6 flex items-center justify-center bg-[#194a7a]/20 rounded-full hover:bg-[#194a7a]/30 text-[#194a7a] text-base"
//                             >
//                               -
//                             </motion.button>
//                             <span className="w-8 text-center text-gray-800 text-base">{item.quantity || 1}</span>
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={() => increaseQuantity(item.id)}
//                               className="w-6 h-6 flex items-center justify-center bg-[#194a7a]/20 rounded-full hover:bg-[#194a7a]/30 text-[#194a7a] text-base"
//                             >
//                               +
//                             </motion.button>
//                           </div>
//                         </td>
//                         <td className="py-3 px-4 text-right text-gray-600 text-base">${(item.price || 0).toFixed(2)}</td>
//                         <td className="py-3 px-4 text-right font-medium text-[#194a7a] text-base">
//                           ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
//                         </td>
//                         <td className="py-3 px-4 text-right">
//                           <motion.button
//                             whileHover={{ scale: 1.2, rotate: 90 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => removeFromOrder(item.id)}
//                             className="text-red-500 hover:text-red-700 text-base"
//                           >
//                             ×
//                           </motion.button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>

//           {/* Total and Payment Section */}
//           {orderItems.length > 0 && (
//             <div className="sticky bottom-0 bg-white p-4 rounded-t-lg shadow-lg border-t border-[#194a7a]/20">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="font-semibold text-lg text-[#194a7a]">Total:</span>
//                 <span className="text-xl font-bold text-green-600">${total.toFixed(2)}</span>
//               </div>

//               <div className="flex flex-wrap gap-4 mb-4">
//                 {["cash", "card", "due", "other", "part"].map((method) => (
//                   <label key={method} className="flex items-center text-sm">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value={method}
//                       checked={paymentMethod === method}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="mr-2 text-[#194a7a]"
//                     />
//                     <span className="text-sm text-gray-700">{method}</span>
//                   </label>
//                 ))}
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleOrderAction("payment")}
//                   className="ml-4 px-4 py-2 bg-[#194a7a] text-white rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-sm"
//                 >
//                   Process Payment
//                 </motion.button>
//               </div>

//               <div className="flex flex-wrap gap-4">
//                 {[
//                   { label: "It's Paid", key: "paid" },
//                   { label: "Loyalty", key: "loyalty" },
//                   { label: "Send Feedback SMS", key: "feedback" },
//                 ].map(({ label, key }) => (
//                   <label key={key} className="flex items-center text-sm">
//                     <input
//                       type="checkbox"
//                       checked={additionalActions[key as keyof typeof additionalActions]}
//                       onChange={() => handleCheckboxChange(key as keyof typeof additionalActions)}
//                       className="mr-2 text-[#194a7a]"
//                     />
//                     <span className="text-sm text-gray-700">{label}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* KOT Display Section */}
//           {kots.length > 0 && (
//             <div className="mt-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kitchen Order Tickets (KOTs)</h2>
//               {/* Legends */}
//               <div className="mb-6 flex flex-wrap gap-6 text-sm">
//                 <div className="flex items-center gap-2">
//                   <span className="w-5 h-5 bg-[#f4a261] border-2 border-[#e76f51] rounded-full" />
//                   <span>Pending</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="w-5 h-5 bg-[#194a7a]/30 border-2 border-[#194a7a] rounded-full" />
//                   <span>In Progress</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="w-5 h-5 bg-green-300 border-2 border-green-500 rounded-full" />
//                   <span>Ready</span>
//                 </div>
//               </div>
//               {/* KOT Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {kots.map(kot => (
//                   <div
//                     key={kot.id}
//                     className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col"
//                   >
//                     <div className="flex justify-between items-center mb-4">
//                       <h3 className="text-xl font-semibold text-gray-800">Table {kot.tableNumber}</h3>
//                       <button
//                         onClick={() => handlePrintKOT(kot)}
//                         className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
//                         title="Print KOT"
//                       >
//                         <FaPrint size={20} />
//                       </button>
//                     </div>
//                     <div className="text-sm text-gray-600 mb-3">
//                       <p>{kot.timestamp}</p>
//                       <p>Type: {kot.orderType}</p>
//                     </div>
//                     <div className="flex-1 overflow-y-auto max-h-56">
//                       {kot.items.map(item => (
//                         <div
//                           key={item.id}
//                           className={`p-3 mb-3 rounded-md ${item.status === 'pending'
//                             ? 'bg-[#f4a261]/20 border-[#e76f51]/50'
//                             : item.status === 'in-progress'
//                               ? 'bg-[#194a7a]/10 border-[#194a7a]/50'
//                               : 'bg-green-50 border-green-200'
//                             } border`}
//                         >
//                           <div className="flex justify-between items-center">
//                             <div>
//                               <p className="font-medium text-gray-800 text-base">{item.name}</p>
//                               <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                             </div>
//                             <div className="flex gap-3">
//                               {item.status === 'pending' && (
//                                 <button
//                                   onClick={() => handleStatusChange(kot.id, item.id, 'in-progress')}
//                                   className="text-[#194a7a] hover:text-[#123558] text-sm"
//                                 >
//                                   Start
//                                 </button>
//                               )}
//                               {item.status === 'in-progress' && (
//                                 <button
//                                   onClick={() => handleStatusChange(kot.id, item.id, 'ready')}
//                                   className="text-green-500 hover:text-green-700 text-sm"
//                                 >
//                                   Ready
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="mt-4 border-t pt-3 text-right">
//                       <p className="text-xl font-semibold text-gray-800">Total: ${kot.total.toFixed(2)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       <AnimatePresence>
//         {isAddCategoryModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="bg-white p-6 rounded-lg shadow-xl w-96 border border-[#194a7a]/20"
//             >
//               <h2 className="text-xl font-semibold mb-4 text-[#194a7a]">Add New Category</h2>
//               <input
//                 type="text"
//                 value={newCategoryName}
//                 onChange={(e) => setNewCategoryName(e.target.value)}
//                 className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
//                 placeholder="Category Name"
//               />
//               <div className="flex gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={addCategory}
//                   className="flex-1 bg-[#194a7a] text-white py-2 rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-base"
//                 >
//                   Add
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsAddCategoryModalOpen(false)}
//                   className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 shadow-md transition-all duration-200 text-base"
//                 >
//                   Cancel
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {isAddItemModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="bg-white p-6 rounded-lg shadow-xl w-96 border border-[#194a7a]/20"
//             >
//               <h2 className="text-xl font-semibold mb-4 text-[#194a7a]">Add New Item</h2>
//               <input
//                 type="text"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                 className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
//                 placeholder="Item Name"
//               />
//               <input
//                 type="number"
//                 value={newItem.price}
//                 onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                 className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
//                 placeholder="Price (optional)"
//                 step="0.01"
//               />
//               <select
//                 value={newItem.category}
//                 onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//                 className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//               <div className="flex gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={addItem}
//                   className="flex-1 bg-[#194a7a] text-white py-2 rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-base"
//                 >
//                   Add
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsAddItemModalOpen(false)}
//                   className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 shadow-md transition-all duration-200 text-base"
//                 >
//                   Cancel
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {isBillingModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="bg-white p-6 rounded-lg shadow-xl w-96 border border-[#194a7a]/20"
//             >
//               <h2 className="text-xl font-semibold mb-4 text-[#194a7a]">Finalize Bill</h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between text-base">
//                   <span className="text-gray-700">Subtotal:</span>
//                   <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center text-base">
//                   <span className="text-gray-700">Discount:</span>
//                   <input
//                     type="number"
//                     value={discount}
//                     onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
//                     className="w-20 p-2 border border-[#194a7a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
//                     placeholder="0.00"
//                     step="0.01"
//                   />
//                 </div>
//                 <div className="flex justify-between items-center text-base">
//                   <span className="text-gray-700">Tax Rate (%):</span>
//                   <input
//                     type="number"
//                     value={taxRate * 100}
//                     onChange={(e) => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0) / 100)}
//                     className="w-20 p-2 border border-[#194a7a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
//                     placeholder="10"
//                     step="1"
//                   />
//                 </div>
//                 <div className="flex justify-between text-base">
//                   <span className="text-gray-700">Tax:</span>
//                   <span className="text-gray-800">${tax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-[#194a7a] text-base">
//                   <span>Total:</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>
//               <div className="flex gap-3 mt-6">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleConfirmBill("generateBill")}
//                   className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 shadow-md transition-all duration-200 text-base"
//                 >
//                   Generate Bill
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsBillingModalOpen(false)}
//                   className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 shadow-md transition-all duration-200 text-base"
//                 >
//                   Cancel
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Order_1;





import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaChevronDown, FaChevronUp, FaUtensils, FaCoffee, FaPizzaSlice, FaBreadSlice, FaSoap, FaPrint } from "react-icons/fa";
import { GiHamburger, GiTacos, GiChickenLeg } from "react-icons/gi";

import { initialCategories } from './Information'

// Interfaces
interface MenuItem {
  id: string;
  name: string;
  price?: number;
  category: string;
  quantity?: number;
  status?: 'pending' | 'in-progress' | 'ready';
}

interface FavoriteCategory {
  id: string;
  name: string;
  items: MenuItem[];
  icon?: JSX.Element;
}

interface OrderActionCache {
  tableNumber: string;
  action: string;
  timestamp: number;
  orderItems: MenuItem[];
  total: number;
  orderType: string;
}

interface KOT {
  id: string;
  tableNumber: string;
  items: MenuItem[];
  timestamp: string;
  orderType: string;
  total: number;
}

interface OtherPayment {
  type: string;
  amount: number;
}


const Order_1: React.FC = () => {
  const [categories, setCategories] = useState<FavoriteCategory[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<MenuItem[]>([]);
  const [kots, setKots] = useState<KOT[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [isOtherPaymentModalOpen, setIsOtherPaymentModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [orderType, setOrderType] = useState<string>("dine-in");
  const [discount, setDiscount] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(0.1);
  const [additionalActions, setAdditionalActions] = useState({
    paid: false,
    loyalty: false,
    feedback: false,
    sms: false,
  });
  const [tableNumber, setTableNumber] = useState<string>("");
  const [otherPayment, setOtherPayment] = useState<OtherPayment>({
    type: '',
    amount: 0,
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.tableNumber) {
      setTableNumber(location.state.tableNumber);
      setOrderType("dine-in");
      if (location.state.viewMode && location.state.tableData) {
        setOrderItems(location.state.tableData.orderItems || []);
      } else if (location.state.tableData && location.state.tableData.orderItems) {
        setOrderItems(location.state.tableData.orderItems);
      }
    }
  }, [location.state]);

  const loadOrderHistory = (tableNum: string) => {
    try {
      const cachedOrdersStr = localStorage.getItem('orderActionsCache');
      if (cachedOrdersStr) {
        const cachedOrders: OrderActionCache[] = JSON.parse(cachedOrdersStr);
        const tableOrders = cachedOrders.filter(order => order.tableNumber === tableNum);
        if (tableOrders.length > 0) {
          const latestOrder = tableOrders.sort((a, b) => b.timestamp - a.timestamp)[0];
          setOrderItems(latestOrder.orderItems);
          setOrderType(latestOrder.orderType);
        }
      }
    } catch (error) {
      console.error("Error loading order history:", error);
    }
  };

  const cacheOrderAction = (action: string, items: MenuItem[], total: number) => {
    try {
      const newAction: OrderActionCache = {
        tableNumber,
        action,
        timestamp: Date.now(),
        orderItems: items,
        total,
        orderType
      };
      const existingCacheStr = localStorage.getItem('orderActionsCache');
      const existingCache: OrderActionCache[] = existingCacheStr ? JSON.parse(existingCacheStr) : [];
      const updatedCache = [...existingCache, newAction];
      const limitedCache = updatedCache.slice(-100);
      localStorage.setItem('orderActionsCache', JSON.stringify(limitedCache));
    } catch (error) {
      console.error("Error caching order action:", error);
    }
  };

  const addToOrder = (item: MenuItem) => {
    const existingItem = orderItems.find((i) => i.name === item.name && i.category === item.category);
    if (existingItem) {
      setOrderItems((prev) =>
        prev.map((i) =>
          i.id === existingItem.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        )
      );
    } else {
      setOrderItems((prev) => [
        ...prev,
        { ...item, id: `${item.id}-${Date.now()}`, quantity: 1, status: 'pending' },
      ]);
    }
  };

  const increaseQuantity = (id: string) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setOrderItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item && (item.quantity || 1) > 1) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: (item.quantity || 1) - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const removeFromOrder = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: FavoriteCategory = {
      id: `cat${Date.now()}`,
      name: newCategoryName.trim(),
      items: [],
      icon: <FaUtensils size={20} />,
    };
    setCategories((prev) => [...prev, newCategory]);
    setNewCategoryName("");
    setIsAddCategoryModalOpen(false);
  };

  const addItem = () => {
    if (!newItem.name.trim() || !newItem.category) return;
    const price = parseFloat(newItem.price) || 0;
    const newMenuItem: MenuItem = {
      id: `${Date.now()}`,
      name: newItem.name.trim(),
      price: price > 0 ? price : undefined,
      category: newItem.category,
    };
    setCategories((prev) =>
      prev.map((cat) =>
        cat.name === newItem.category
          ? { ...cat, items: [...cat.items, newMenuItem] }
          : cat
      )
    );
    setNewItem({ name: "", price: "", category: "" });
    setIsAddItemModalOpen(false);
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal - discount + tax;

  const generatePDF = (action: string) => {
    const isKOT = action === "kot" || action === "kotprint";
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [200, isKOT ? 180 + orderItems.length * 14 : 400 + orderItems.length * 14],
    });
    const width = 200;
    const margin = 12;
    let yPos = margin;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const title = isKOT ? "Kitchen Order Ticket" : "Receipt";
    doc.text(title, width / 2, yPos, { align: "center" });
    yPos += 20;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Tasty Bites Restaurant", width / 2, yPos, { align: "center" });
    yPos += 10;
    doc.text("123 Food Street, City", width / 2, yPos, { align: "center" });
    yPos += 10;
    doc.text("Phone: (123) 456-7890", width / 2, yPos, { align: "center" });
    yPos += 14;

    doc.text(`Order #: ${Date.now().toString().slice(-6)}`, margin, yPos);
    yPos += 10;
    doc.text(`Date: ${new Date().toLocaleString()}`, margin, yPos);
    yPos += 10;
    doc.text(`Type: ${orderType.toUpperCase()}`, margin, yPos);
    if (orderType === "dine-in") {
      doc.text(`Table: ${tableNumber || "N/A"}`, width - margin, yPos, { align: "right" });
    }
    yPos += 14;

    doc.setLineWidth(0.5);
    doc.setDrawColor(100);
    doc.line(margin, yPos, width - margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Qty", margin, yPos);
    doc.text("Description", margin + 25, yPos);
    doc.text("Price", width - margin, yPos, { align: "right" });
    yPos += 6;
    doc.line(margin, yPos, width - margin, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    orderItems.forEach((item) => {
      const itemName = `${item.name}`.substring(0, 14);
      doc.text(`${item.quantity || 1}`, margin, yPos);
      doc.text(itemName, margin + 25, yPos);
      doc.text(`$${(item.price || 0).toFixed(2)}`, width - margin, yPos, { align: "right" });
      yPos += 14;
    });

    if (isKOT) {
      yPos += 6;
      doc.line(margin, yPos, width - margin, yPos);
      yPos += 14;
      doc.text("For Kitchen Use Only", width / 2, yPos, { align: "center" });
    } else {
      yPos += 6;
      doc.line(margin, yPos, width - margin, yPos);
      yPos += 10;
      doc.setFontSize(10);
      doc.text("Subtotal", margin, yPos);
      doc.text(`$${subtotal.toFixed(2)}`, width - margin, yPos, { align: "right" });
      yPos += 10;
      if (discount > 0) {
        doc.text(`Discount`, margin, yPos);
        doc.text(`-$${discount.toFixed(2)}`, width - margin, yPos, { align: "right" });
        yPos += 10;
      }
      doc.text(`Tax (${(taxRate * 100).toFixed(0)}%)`, margin, yPos);
      doc.text(`$${tax.toFixed(2)}`, width - margin, yPos, { align: "right" });
      yPos += 14;

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Total", margin, yPos);
      doc.text(`$${total.toFixed(2)}`, width - margin, yPos, { align: "right" });
      yPos += 20;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      let paymentDisplay = paymentMethod;
      if (paymentMethod.startsWith("other") && otherPayment.type && otherPayment.amount > 0) {
        paymentDisplay = `${otherPayment.type}: $${otherPayment.amount.toFixed(2)}`;
      }
      doc.text(`Payment Method: ${paymentDisplay}`, margin, yPos);
      yPos += 10;

      const selectedActions = Object.entries(additionalActions)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      if (selectedActions.length > 0) {
        doc.text(`Notes: ${selectedActions.join(", ")}`, margin, yPos);
        yPos += 10;
      }

      yPos += 6;
      doc.line(margin, yPos, width - margin, yPos);
      yPos += 14;
      doc.text("Thank You!", width / 2, yPos, { align: "center" });
      yPos += 10;
      doc.text("www.tastybites.com", width / 2, yPos, { align: "center" });
    }

    const filename = `${isKOT ? "KOT" : "Receipt"}-${tableNumber || "NoTable"}-${Date.now()}.pdf`;
    if (action !== "generateBill") {
      doc.save(filename);
    }

    if (action === "saveprint" || action === "kotprint") {
      console.log("Printing PDF:", filename);
    }

    if (action === "savebill" || action === "payment" || action === "generateBill" || action === "kot" || action === "kotprint" || action === "saveprint") {
      const newStatus = action === "payment" ? "paid" :
        action === "kot" ? "runningKOT" :
          action === "kotprint" ? "printed" :
            "printed";
      navigate("/", {
        state: {
          updatedTable: {
            tableNumber: tableNumber,
            status: newStatus,
            orderAmount: total,
            orderItems: orderItems.map(item => ({
              name: item.name,
              quantity: item.quantity || 1,
              price: item.price || 0,
            })),
          },
        },
      });
    }
  };

  const handleGenerateBill = () => {
    if (orderItems.length === 0) {
      alert("No items in the order to generate a bill");
      return;
    }
    setIsBillingModalOpen(true);
  };

  const handleConfirmBill = (action: string) => {
    generatePDF(action);
    setIsBillingModalOpen(false);
  };

  const handleOrderAction = (action: string) => {
    if (orderItems.length === 0 && action !== "save") {
      alert("No items in the order to process!");
      return;
    }

    cacheOrderAction(action, orderItems, total);

    switch (action) {
      case "payment":
        generatePDF(action);
        setOrderItems([]);
        setAdditionalActions({ paid: false, loyalty: false, feedback: false, sms: false });
        setTableNumber("");
        setOrderType("dine-in");
        setDiscount(0);
        setOtherPayment({ type: '', amount: 0 });
        break;
      case "save":
        alert("Order saved");
        navigate("/", {
          state: {
            updatedTable: {
              tableNumber: tableNumber,
              status: 'running',
              orderAmount: total,
              orderItems: orderItems.map(item => ({
                name: item.name,
                quantity: item.quantity || 1,
                price: item.price || 0,
              })),
            },
          },
        });
        break;
      case "saveprint":
        generatePDF(action);
        break;
      case "savebill":
        generatePDF(action);
        break;
      case "kot":
        generatePDF(action);
        const newKOT: KOT = {
          id: `kot-${Date.now()}`,
          tableNumber,
          items: orderItems.map(item => ({ ...item, status: 'pending' })),
          timestamp: new Date().toLocaleString(),
          orderType,
          total,
        };
        setKots(prev => [...prev, newKOT]);
        break;
      case "kotprint":
        generatePDF(action);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (action: keyof typeof additionalActions) => {
    setAdditionalActions((prev) => ({
      ...prev,
      [action]: !prev[action],
    }));
  };

  const handleStatusChange = (kotId: string, itemId: string, newStatus: MenuItem['status']) => {
    setKots(prevKots =>
      prevKots.map(kot =>
        kot.id === kotId
          ? {
            ...kot,
            items: kot.items.map(item =>
              item.id === itemId ? { ...item, status: newStatus } : item
            ),
          }
          : kot
      )
    );
  };

  const handlePrintKOT = (kot: KOT) => {
    console.log('Printing KOT:', {
      Table: kot.tableNumber,
      Items: kot.items.map(item => ({
        Name: item.name,
        Quantity: item.quantity,
        Status: item.status,
      })),
      Total: `$${kot.total.toFixed(2)}`,
      Timestamp: kot.timestamp,
      OrderType: kot.orderType,
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 -mt-3">
      {/* Sidebar (Categories) */}
      <motion.div
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 60 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-b from-[#194a7a] to-[#123558] text-white shadow-xl overflow-hidden"
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold tracking-wide ${!isSidebarOpen && "hidden"}`}>Menu Categories</h2>
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-full bg-[#123558] hover:bg-[#0e2a46] transition-colors duration-200"
            >
              {isSidebarOpen ? "←" : "→"}
            </motion.button>
          </div>

          {isSidebarOpen && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mb-6 bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white py-2 rounded-lg shadow-md hover:from-[#e76f51] hover:to-[#d15e42] flex items-center justify-center gap-2 transition-all duration-300 text-base"
                onClick={() => setIsAddCategoryModalOpen(true)}
              >
                <FaPlus size={14} /> Add Category
              </motion.button>

              <motion.div className="flex-1 overflow-y-auto">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    className="mb-3"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      className={`w-full text-left p-3 rounded-lg flex justify-between items-center transition-all duration-300 ${activeCategory === category.id
                        ? "bg-[#123558] text-white shadow-inner"
                        : "hover:bg-[#0e2a46] text-gray-100"
                        }`}
                      onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                    >
                      <div className="flex items-center gap-3">
                        {category.icon && <span className="text-xl">{category.icon}</span>}
                        <span className="font-semibold text-sm">{category.name}</span>
                      </div>
                      {activeCategory === category.id ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Right Panel - Category Items */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: activeCategory ? 320 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-lg overflow-hidden border-l border-[#194a7a]/20"
      >
        {activeCategory && (
          <div className="p-4 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-[#194a7a] flex items-center gap-2">
              {categories.find((cat) => cat.id === activeCategory)?.icon}
              {categories.find((cat) => cat.id === activeCategory)?.name} Items
            </h2>
            <div className="flex-1 overflow-y-auto">
              {categories
                .find((cat) => cat.id === activeCategory)
                ?.items.map((item) => (
                  <motion.button
                    key={item.id}
                    className="w-full text-left p-4 flex justify-between items-center bg-[#194a7a]/10 mb-3 rounded-lg border border-[#194a7a]/20 hover:bg-[#194a7a]/20 transition-all duration-300"
                    onClick={() => addToOrder(item)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div>
                      <span className="text-[#194a7a] font-semibold text-base">{item.name}</span>
                      <span className="block text-sm text-[#194a7a]/80">Freshly Made</span>
                    </div>
                    {item.price && (
                      <span className="text-[#194a7a] font-bold text-base">${item.price.toFixed(2)}</span>
                    )}
                  </motion.button>
                ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 bg-gradient-to-r from-[#f4a261] to-[#e76f51] text-white py-2 rounded-lg hover:from-[#e76f51] hover:to-[#d15e42] flex items-center justify-center gap-2 shadow-md transition-all duration-300 text-base"
              onClick={() => {
                setNewItem({
                  ...newItem,
                  category: categories.find((cat) => cat.id === activeCategory)?.name || "",
                });
                setIsAddItemModalOpen(true);
              }}
            >
              <FaPlus size={14} /> Add Item
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Main Content - Order Area and KOT Display */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white p-4 shadow-lg flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-[#194a7a]">
              {tableNumber ? `Table ${tableNumber}` : "New Order"}
            </h2>
            <div className="flex gap-2">
              {["dine-in", "delivery", "pick-up"].map((type) => (
                <label key={type} className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="orderType"
                    value={type}
                    checked={orderType === type}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="mr-1 text-[#194a7a]"
                  />
                  <span className="text-sm text-gray-700">{type.replace("-", " ")}</span>
                </label>
              ))}
            </div>
            {orderType === "dine-in" && (
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="p-2 border border-[#194a7a]/30 rounded-lg w-20 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-sm"
                placeholder="Table #"
              />
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOrderAction("save")}
              className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 shadow-md transition-all duration-200 text-sm"
            >
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOrderAction("saveprint")}
              className="bg-[#194a7a] text-white px-3 py-2 rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-sm"
            >
              Save & Print
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOrderAction("savebill")}
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 shadow-md transition-all duration-200 text-sm"
            >
              Save & Bill
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOrderAction("kot")}
              className="bg-[#f4a261] text-white px-3 py-2 rounded-lg hover:bg-[#e76f51] shadow-md transition-all duration-200 text-sm"
            >
              KOT
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOrderAction("kotprint")}
              className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 shadow-md transition-all duration-200 text-sm"
            >
              KOT & Print
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateBill}
              className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 shadow-md transition-all duration-200 text-sm"
            >
              Generate Bill
            </motion.button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-gray-200 flex flex-col gap-8">
          {/* Current Order Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#194a7a]/20">
            {orderItems.length === 0 ? (
              <p className="p-6 text-gray-500 text-center text-base">No items in order yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#194a7a]/10">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-[#194a7a]">Item</th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-[#194a7a]">Qty</th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-[#194a7a]">Price</th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-[#194a7a]">Total</th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-[#194a7a]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id} className="border-b border-[#194a7a]/20 hover:bg-[#194a7a]/5">
                        <td className="py-3 px-4">
                          <div>
                            <span className="font-medium text-gray-800 text-base">{item.name}</span>
                            <span className="block text-sm text-gray-600">{item.category}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-6 h-6 flex items-center justify-center bg-[#194a7a]/20 rounded-full hover:bg-[#194a7a]/30 text-[#194a7a] text-base"
                            >
                              -
                            </motion.button>
                            <span className="w-8 text-center text-gray-800 text-base">{item.quantity || 1}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => increaseQuantity(item.id)}
                              className="w-6 h-6 flex items-center justify-center bg-[#194a7a]/20 rounded-full hover:bg-[#194a7a]/30 text-[#194a7a] text-base"
                            >
                              +
                            </motion.button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-gray-600 text-base">${(item.price || 0).toFixed(2)}</td>
                        <td className="py-3 px-4 text-right font-medium text-[#194a7a] text-base">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <motion.button
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromOrder(item.id)}
                            className="text-red-500 hover:text-red-700 text-base"
                          >
                            ×
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Total and Payment Section */}
          {orderItems.length > 0 && (
            <div className="sticky bottom-0 bg-white p-4 rounded-t-lg shadow-lg border-t border-[#194a7a]/20">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg text-[#194a7a]">Total:</span>
                <span className="text-xl font-bold text-green-600">${total.toFixed(2)}</span>
              </div>

              {/* <div className="flex flex-wrap gap-4 mb-4">
                {["cash", "card", "due", "other", "part"].map((method) => (
                  <label key={method} className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        if (e.target.value === "other") {
                          setIsOtherPaymentModalOpen(true);
                        } else {
                          setIsOtherPaymentModalOpen(false);
                          setOtherPayment({ type: '', amount: 0 });
                        }
                      }}
                      className="mr-2 text-[#194a7a]"
                    />
                    <span className="text-sm text-gray-700">{method}</span>
                  </label>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOrderAction("payment")}
                  className="ml-4 px-4 py-2 bg-[#194a7a] text-white rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-sm"
                >
                  Process Payment
                </motion.button>
              </div> */}

              {/* // In Order_1.tsx (modify the payment method radio button section) */}
              <div className="flex flex-wrap gap-4 mb-4">
                {["cash", "card", "due", "other", "part"].map((method) => (
                  <label key={method} className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => {
                        setPaymentMethod(e.target.value);
                        if (e.target.value === "other") {
                          setIsOtherPaymentModalOpen(true);
                        } else if (e.target.value === "part") {
                          // Navigate to PartialPayment page with order details
                          navigate("/partial-payment", {
                            state: {
                              orderItems,
                              subtotal,
                              tax,
                              discount,
                              total,
                              tableNumber,
                              orderType,
                            },
                          });
                        } else {
                          setIsOtherPaymentModalOpen(false);
                          setOtherPayment({ type: "", amount: 0 });
                        }
                      }}
                      className="mr-2 text-[#194a7a]"
                    />
                    <span className="text-sm text-gray-700">{method}</span>
                  </label>
                ))}
                {/* Rest of the code remains the same */}
              </div>




              <div className="flex flex-wrap gap-4">
                {[
                  { label: "It's Paid", key: "paid" },
                  { label: "Loyalty", key: "loyalty" },
                  { label: "Send Feedback SMS", key: "feedback" },
                ].map(({ label, key }) => (
                  <label key={key} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={additionalActions[key as keyof typeof additionalActions]}
                      onChange={() => handleCheckboxChange(key as keyof typeof additionalActions)}
                      className="mr-2 text-[#194a7a]"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* KOT Display Section */}
          {kots.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kitchen Order Tickets (KOTs)</h2>
              <div className="mb-6 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#f4a261] border-2 border-[#e76f51] rounded-full" />
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#194a7a]/30 border-2 border-[#194a7a] rounded-full" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-green-300 border-2 border-green-500 rounded-full" />
                  <span>Ready</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {kots.map(kot => (
                  <div
                    key={kot.id}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">Table {kot.tableNumber}</h3>
                      <button
                        onClick={() => handlePrintKOT(kot)}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Print KOT"
                      >
                        <FaPrint size={20} />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <p>{kot.timestamp}</p>
                      <p>Type: {kot.orderType}</p>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-56">
                      {kot.items.map(item => (
                        <div
                          key={item.id}
                          className={`p-3 mb-3 rounded-md ${item.status === 'pending'
                            ? 'bg-[#f4a261]/20 border-[#e76f51]/50'
                            : item.status === 'in-progress'
                              ? 'bg-[#194a7a]/10 border-[#194a7a]/50'
                              : 'bg-green-50 border-green-200'
                            } border`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800 text-base">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <div className="flex gap-3">
                              {item.status === 'pending' && (
                                <button
                                  onClick={() => handleStatusChange(kot.id, item.id, 'in-progress')}
                                  className="text-[#194a7a] hover:text-[#123558] text-sm"
                                >
                                  Start
                                </button>
                              )}
                              {item.status === 'in-progress' && (
                                <button
                                  onClick={() => handleStatusChange(kot.id, item.id, 'ready')}
                                  className="text-green-500 hover:text-green-700 text-sm"
                                >
                                  Ready
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 border-t pt-3 text-right">
                      <p className="text-xl font-semibold text-gray-800">Total: ${kot.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isAddCategoryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-xl w-96 border border-[#194a7a]/20"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#194a7a]">Add New Category</h2>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
                placeholder="Category Name"
              />
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addCategory}
                  className="flex-1 bg-[#194a7a] text-white py-2 rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-base"
                >
                  Add
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddCategoryModalOpen(false)}
                  className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 shadow-md transition-all duration-200 text-base"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddItemModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-xl w-96 border border-[#194a7a]/20"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#194a7a]">Add New Item</h2>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
                placeholder="Item Name"
              />
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
                placeholder="Price (optional)"
                step="0.01"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addItem}
                  className="flex-1 bg-[#194a7a] text-white py-2 rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-base"
                >
                  Add
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 shadow-md transition-all duration-200 text-base"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBillingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-xl w-96 border border-[#194a7a]/20"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#194a7a]">Finalize Bill</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-base">
                  <span className="text-gray-700">Discount:</span>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-20 p-2 border border-[#194a7a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                <div className="flex justify-between items-center text-base">
                  <span className="text-gray-700">Tax Rate (%):</span>
                  <input
                    type="number"
                    value={taxRate * 100}
                    onChange={(e) => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0) / 100)}
                    className="w-20 p-2 border border-[#194a7a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
                    placeholder="10"
                    step="1"
                  />
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Tax:</span>
                  <span className="text-gray-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-[#194a7a] text-base">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConfirmBill("generateBill")}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 shadow-md transition-all duration-200 text-base"
                >
                  Generate Bill
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBillingModalOpen(false)}
                  className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 shadow-md transition-all duration-200 text-base"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOtherPaymentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-xl w-96 border border-[#194a7a]/20"
            >
              <h2 className="text-xl font-semibold mb-4 text-[#194a7a]">Other Payment Method</h2>
              <div className="space-y-4">
                <select
                  value={otherPayment.type}
                  onChange={(e) => setOtherPayment({ ...otherPayment, type: e.target.value })}
                  className="w-full p-2 border border-[#194a7a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
                >
                  <option value="">Select Payment Type</option>
                  <option value="upi">UPI</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                  <option value="wallet">Digital Wallet</option>
                  
                </select>

                <input
                  type="number"
                  value={otherPayment.amount || ''}
                  onChange={(e) => setOtherPayment({
                    ...otherPayment,
                    amount: Math.max(0, parseFloat(e.target.value) || 0)
                  })}
                  className="w-full p-2 border border-[#194a7a]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#194a7a] bg-[#f4a261]/10 text-base"
                  placeholder="Enter Amount"
                  step="0.01"
                />

                <div className="text-sm text-gray-600">
                  Total Due: ${total.toFixed(2)}
                  {otherPayment.amount > 0 && (
                    <span className="block">
                      Remaining: ${(total - otherPayment.amount).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (!otherPayment.type || otherPayment.amount <= 0) {
                      alert("Please select a payment type and enter a valid amount");
                      return;
                    }
                    setPaymentMethod(`other (${otherPayment.type})`);
                    setIsOtherPaymentModalOpen(false);
                  }}
                  className="flex-1 bg-[#194a7a] text-white py-2 rounded-lg hover:bg-[#123558] shadow-md transition-all duration-200 text-base"
                >
                  Yes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setPaymentMethod("cash");
                    setOtherPayment({ type: '', amount: 0 });
                    setIsOtherPaymentModalOpen(false);
                  }}
                  className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 shadow-md transition-all duration-200 text-base"
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Order_1;