// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // Install framer-motion
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; // Install react-beautiful-dnd
// import { JSX } from "react/jsx-runtime";

// interface MenuItem {
//   id: string;
//   name: string;
//   price?: number;
//   category: string;
// }

// interface FavoriteCategory {
//   id: string;
//   name: string;
//   items: MenuItem[];
// }

// // Initial sample data
// const initialCategories: FavoriteCategory[] = [
//   {
//     id: "cat1",
//     name: "Drinks",
//     items: [
//       { id: "1", name: "Coffee", price: 3.99, category: "Drinks" },
//       { id: "2", name: "Tea", price: 2.99, category: "Drinks" },
//     ],
//   },
//   {
//     id: "cat2",
//     name: "Food",
//     items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ],
//   },
//   {
//     id: "cat3",
//     name: "Starters",
//     items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ],
//   },
//   {
//     id: "cat4",
//     name: "Pizza",
//     items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ],
//   },
//   {
//     id: "cat5",
//     name: "Soups",
//     items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ],
//   },
//   {
//     id: "cat6",
//     name: "Chicken Soup",
//     items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ],
//   },
//   {
//     id: "cat7",
//     name: "Indian Breads",
//     items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ],
//   },
//   {
//     id: "cat8",
//     name: "Roti",
//     items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ],
//   },
//   {
//     id: "cat9",
//     name: "South India",
//     items: [
//       { id: "3", name: "Sandwich", price: 6.99, category: "Food" },
//       { id: "4", name: "Salad", price: 5.99, category: "Food" },
//     ],
//   },
// ];

// const OrderManagement: React.FC = () => {
//   const [categories, setCategories] = useState<FavoriteCategory[]>(initialCategories);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [orderItems, setOrderItems] = useState<MenuItem[]>([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
//   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });

//   // Handle drag end for reordering items
//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;
//     const items = Array.from(orderItems);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setOrderItems(items);
//   };

//   // Add item to order
//   const addToOrder = (item: MenuItem) => {
//     setOrderItems((prev) => [...prev, { ...item, id: `${item.id}-${Date.now()}` }]);
//   };

//   // Remove item from order
//   const removeFromOrder = (id: string) => {
//     setOrderItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   // Add new category
//   const addCategory = () => {
//     if (!newCategoryName.trim()) return;
//     const newCategory: FavoriteCategory = {
//       id: `cat${Date.now()}`,
//       name: newCategoryName.trim(),
//       items: [],
//     };
//     setCategories((prev) => [...prev, newCategory]);
//     setNewCategoryName("");
//     setIsAddCategoryModalOpen(false);
//   };

//   // Add new item to a category
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

//   // Calculate total
//   const total = orderItems.reduce((sum, item) => sum + (item.price || 0), 0);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <motion.div
//         initial={{ width: 280 }}
//         animate={{ width: isSidebarOpen ? 280 : 60 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white shadow-lg overflow-hidden"
//       >
//         <div className="p-4 flex flex-col h-full">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}>Menu</h2>
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 rounded-full hover:bg-gray-200"
//             >
//               {isSidebarOpen ? "←" : "→"}
//             </button>
//           </div>

//           {isSidebarOpen && (
//             <>
//               <button
//                 className="w-full mb-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                 onClick={() => setIsAddCategoryModalOpen(true)}
//               >
//                 Add Category
//               </button>

//               <motion.div className="flex-1 overflow-y-auto">
//                 {categories.map((category) => (
//                   <div key={category.id} className="mb-4">
//                     <button
//                       className={`w-full text-left p-2 rounded-md ${
//                         activeCategory === category.id ? "bg-blue-100" : "hover:bg-gray-100"
//                       }`}
//                       onClick={() => setActiveCategory(category.id)}
//                     >
//                       <span className="font-semibold">{category.name}</span>
//                     </button>
//                     <AnimatePresence>
//                       {activeCategory === category.id && (
//                         <motion.div
//                           initial={{ height: 0 }}
//                           animate={{ height: "auto" }}
//                           exit={{ height: 0 }}
//                           className="mt-2"
//                         >
//                           {category.items.map((item) => (
//                             <button
//                               key={item.id}
//                               className="w-full text-left p-2 flex justify-between items-center hover:bg-gray-50"
//                               onClick={() => addToOrder(item)}
//                             >
//                               <span>{item.name}</span>
//                               {item.price && (
//                                 <span className="text-gray-500">${item.price.toFixed(2)}</span>
//                               )}
//                             </button>
//                           ))}
//                           <button
//                             className="w-full text-left p-2 text-blue-600 hover:bg-gray-50"
//                             onClick={() => {
//                               setNewItem({ ...newItem, category: category.name });
//                               setIsAddItemModalOpen(true);
//                             }}
//                           >
//                             + Add Item
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ))}
//               </motion.div>
//             </>
//           )}
//         </div>
//       </motion.div>

//       {/* Main Content - Order Area */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-4">Current Order</h1>

//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="orderItems">
//             {(provided: { droppableProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; innerRef: React.LegacyRef<HTMLDivElement> | undefined; placeholder: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className="bg-white rounded-lg shadow p-4 min-h-[200px]"
//               >
//                 {orderItems.length === 0 ? (
//                   <p className="text-gray-500 text-center">No items in order yet</p>
//                 ) : (
//                   orderItems.map((item, index) => (
//                     <Draggable key={item.id} draggableId={item.id} index={index}>
//                       {(provided: { innerRef: React.LegacyRef<HTMLDivElement> | undefined; draggableProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; dragHandleProps: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>; }) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="flex justify-between items-center p-3 mb-2 bg-gray-50 rounded-md"
//                         >
//                           <div>
//                             <span className="font-medium">{item.name}</span>
//                             <span className="block text-sm text-gray-500">{item.category}</span>
//                           </div>
//                           <div className="flex items-center gap-4">
//                             <span>${(item.price || 0).toFixed(2)}</span>
//                             <button
//                               onClick={() => removeFromOrder(item.id)}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               ×
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))
//                 )}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>

//         {/* Order Summary */}
//         {orderItems.length > 0 && (
//           <div className="mt-6 bg-white p-4 rounded-lg shadow">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold">Total:</span>
//               <span className="text-xl font-bold">${total.toFixed(2)}</span>
//             </div>
//             <button
//               className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
//               onClick={() => {
//                 alert("Order submitted!");
//                 setOrderItems([]);
//               }}
//             >
//               Submit Order
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Add Category Modal */}
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
//               className="bg-white p-6 rounded-lg shadow-lg w-96"
//             >
//               <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
//               <input
//                 type="text"
//                 value={newCategoryName}
//                 onChange={(e) => setNewCategoryName(e.target.value)}
//                 className="w-full p-2 border rounded-md mb-4"
//                 placeholder="Category Name"
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={addCategory}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                 >
//                   Add
//                 </button>
//                 <button
//                   onClick={() => setIsAddCategoryModalOpen(false)}
//                   className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Add Item Modal */}
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
//               className="bg-white p-6 rounded-lg shadow-lg w-96"
//             >
//               <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
//               <input
//                 type="text"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                 className="w-full p-2 border rounded-md mb-4"
//                 placeholder="Item Name"
//               />
//               <input
//                 type="number"
//                 value={newItem.price}
//                 onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                 className="w-full p-2 border rounded-md mb-4"
//                 placeholder="Price (optional)"
//                 step="0.01"
//               />
//               <select
//                 value={newItem.category}
//                 onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//                 className="w-full p-2 border rounded-md mb-4"
//               >
//                 <option value="">Select Category</option>
//                 {categories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>
//               <div className="flex gap-2">
//                 <button
//                   onClick={addItem}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//                 >
//                   Add
//                 </button>
//                 <button
//                   onClick={() => setIsAddItemModalOpen(false)}
//                   className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default OrderManagement;



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Install framer-motion
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"; // Install react-beautiful-dnd
import { JSX } from "react/jsx-runtime";

interface MenuItem {
  id: string;
  name: string;
  price?: number;
  category: string;
}

interface FavoriteCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

// Updated initial data with relevant items for each category
const initialCategories: FavoriteCategory[] = [
  {
    id: "cat1",
    name: "Drinks",
    items: [
      { id: "d1", name: "Coffee", price: 3.99, category: "Drinks" },
      { id: "d2", name: "Tea", price: 2.99, category: "Drinks" },
      { id: "d3", name: "Orange Juice", price: 3.49, category: "Drinks" },
    ],
  },
  {
    id: "cat2",
    name: "Food",
    items: [
      { id: "f1", name: "Burger", price: 7.99, category: "Food" },
      { id: "f2", name: "Pasta", price: 8.99, category: "Food" },
      { id: "f3", name: "Grilled Chicken", price: 9.49, category: "Food" },
    ],
  },
  {
    id: "cat3",
    name: "Starters",
    items: [
      { id: "s1", name: "Spring Rolls", price: 4.99, category: "Starters" },
      { id: "s2", name: "Chicken Wings", price: 6.49, category: "Starters" },
      { id: "s3", name: "Bruschetta", price: 5.29, category: "Starters" },
    ],
  },
  {
    id: "cat4",
    name: "Pizza",
    items: [
      { id: "p1", name: "Margherita Pizza", price: 9.99, category: "Pizza" },
      { id: "p2", name: "Pepperoni Pizza", price: 10.99, category: "Pizza" },
      { id: "p3", name: "Veggie Pizza", price: 9.49, category: "Pizza" },
    ],
  },
  {
    id: "cat5",
    name: "Soups",
    items: [
      { id: "sp1", name: "Tomato Soup", price: 4.49, category: "Soups" },
      { id: "sp2", name: "Minestrone", price: 4.99, category: "Soups" },
      { id: "sp3", name: "Cream of Mushroom", price: 5.29, category: "Soups" },
    ],
  },
  {
    id: "cat6",
    name: "Chicken Soup",
    items: [
      { id: "cs1", name: "Classic Chicken Soup", price: 5.49, category: "Chicken Soup" },
      { id: "cs2", name: "Spicy Chicken Soup", price: 5.99, category: "Chicken Soup" },
      { id: "cs3", name: "Lemon Chicken Soup", price: 5.79, category: "Chicken Soup" },
    ],
  },
  {
    id: "cat7",
    name: "Indian Breads",
    items: [
      { id: "ib1", name: "Naan", price: 2.49, category: "Indian Breads" },
      { id: "ib2", name: "Paratha", price: 2.99, category: "Indian Breads" },
      { id: "ib3", name: "Kulcha", price: 3.29, category: "Indian Breads" },
    ],
  },
  {
    id: "cat8",
    name: "Roti",
    items: [
      { id: "r1", name: "Plain Roti", price: 1.49, category: "Roti" },
      { id: "r2", name: "Butter Roti", price: 1.99, category: "Roti" },
      { id: "r3", name: "Garlic Roti", price: 2.29, category: "Roti" },
    ],
  },
  {
    id: "cat9",
    name: "South India",
    items: [
      { id: "si1", name: "Masala Dosa", price: 6.99, category: "South India" },
      { id: "si2", name: "Idli Sambhar", price: 5.49, category: "South India" },
      { id: "si3", name: "Uttapam", price: 6.29, category: "South India" },
    ],
  },
];

const OrderManagement: React.FC = () => {
  const [categories, setCategories] = useState<FavoriteCategory[]>(initialCategories);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<MenuItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });

  // Handle drag end for reordering items
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(orderItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setOrderItems(items);
  };

  // Add item to order
  const addToOrder = (item: MenuItem) => {
    setOrderItems((prev) => [...prev, { ...item, id: `${item.id}-${Date.now()}` }]);
  };

  // Remove item from order
  const removeFromOrder = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add new category
  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const newCategory: FavoriteCategory = {
      id: `cat${Date.now()}`,
      name: newCategoryName.trim(),
      items: [],
    };
    setCategories((prev) => [...prev, newCategory]);
    setNewCategoryName("");
    setIsAddCategoryModalOpen(false);
  };

  // Add new item to a category
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

  // Calculate total
  const total = orderItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ width: 280 }}
        animate={{ width: isSidebarOpen ? 280 : 60 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-lg overflow-hidden"
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}>Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              {isSidebarOpen ? "←" : "→"}
            </button>
          </div>

          {isSidebarOpen && (
            <>
              <button
                className="w-full mb-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsAddCategoryModalOpen(true)}
              >
                Add Category
              </button>

              <motion.div className="flex-1 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category.id} className="mb-4">
                    <button
                      className={`w-full text-left p-2 rounded-md ${
                        activeCategory === category.id ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span className="font-semibold">{category.name}</span>
                    </button>
                    <AnimatePresence>
                      {activeCategory === category.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="mt-2"
                        >
                          {category.items.map((item) => (
                            <button
                              key={item.id}
                              className="w-full text-left p-2 flex justify-between items-center hover:bg-gray-50"
                              onClick={() => addToOrder(item)}
                            >
                              <span>{item.name}</span>
                              {item.price && (
                                <span className="text-gray-500">${item.price.toFixed(2)}</span>
                              )}
                            </button>
                          ))}
                          <button
                            className="w-full text-left p-2 text-blue-600 hover:bg-gray-50"
                            onClick={() => {
                              setNewItem({ ...newItem, category: category.name });
                              setIsAddItemModalOpen(true);
                            }}
                          >
                            + Add Item
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Main Content - Order Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Current Order</h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="orderItems">
            {(provided: {
              droppableProps: JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLDivElement> &
                React.HTMLAttributes<HTMLDivElement>;
              innerRef: React.LegacyRef<HTMLDivElement> | undefined;
              placeholder:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-white rounded-lg shadow p-4 min-h-[200px]"
              >
                {orderItems.length === 0 ? (
                  <p className="text-gray-500 text-center">No items in order yet</p>
                ) : (
                  orderItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided: {
                        innerRef: React.LegacyRef<HTMLDivElement> | undefined;
                        draggableProps: JSX.IntrinsicAttributes &
                          React.ClassAttributes<HTMLDivElement> &
                          React.HTMLAttributes<HTMLDivElement>;
                        dragHandleProps: JSX.IntrinsicAttributes &
                          React.ClassAttributes<HTMLDivElement> &
                          React.HTMLAttributes<HTMLDivElement>;
                      }) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex justify-between items-center p-3 mb-2 bg-gray-50 rounded-md"
                        >
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="block text-sm text-gray-500">{item.category}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span>${(item.price || 0).toFixed(2)}</span>
                            <button
                              onClick={() => removeFromOrder(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Order Summary */}
        {orderItems.length > 0 && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              onClick={() => {
                alert("Order submitted!");
                setOrderItems([]);
              }}
            >
              Submit Order
            </button>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
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
              className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
                placeholder="Category Name"
              />
              <div className="flex gap-2">
                <button
                  onClick={addCategory}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddCategoryModalOpen(false)}
                  className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Item Modal */}
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
              className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
              <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full p-2 border rounded-md mb-4"
                placeholder="Item Name"
              />
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="w-full p-2 border rounded-md mb-4"
                placeholder="Price (optional)"
                step="0.01"
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full p-2 border rounded-md mb-4"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={addItem}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManagement;




