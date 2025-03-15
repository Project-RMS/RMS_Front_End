import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Settings from './components/Settings';
import Staffing from './components/Staffing';
import Kitchen from './components/Kitchen';
import Order_1 from './components/orders/Order_1';
import TableArrange from './components/tables/TablesArrange';
import Operation from './components/Operation';
import KOT from './components/operations/KOT';
import PartialPayment from './components/orders/PartialPayment';
import InventorySidebar from './components/InventorySidebar';
import UnitsTable from './components/inventory/UnitsTable';
import RawMaterials from './components/inventory/RawMaterials';
import AddRawMaterial from './components/inventory/AddRawMaterial';
import { RawMaterial } from './components/inventory/type';
import React from 'react';
import ClosingStock from './components/inventory/ClosingStock';
import AddClosingStock from './components/inventory/AddClosingStock';
import ThirdPartySupplier from './components/inventory/ThirdPartySupplier';
import AddSupplier from './components/inventory/AddSupplier';
import PurchaseInvoice from './components/inventory/PurchaseInvoice';
import PurchaseRequest from './components/inventory/PurchaseRequest';
import PurchaseForm from './components/inventory/PurchaseForm';
import StockPurchase from './components/inventory/StockPurchase';
import AddPurchase from './components/inventory/AddPurchase';
import PurchaseReturn from './components/inventory/PurchaseReturn';
import AddPurchaseReturn from './components/inventory/AddPurchaseReturn';
import ConsumtionSales from './components/inventory/ConsumtionSales';
import AddSales from './components/inventory/AddSales';
import ConsumtionTransfer from './components/inventory/ConsumtionTransfer';
import AddTransfer from './components/inventory/AddTransfer';
import ConsumtionSalesReturn from './components/inventory/ConsumtionSalesReturn';
import AddSalesReturn from './components/inventory/AddSalesReturn';
import ConsumtionRequest from './components/inventory/ConsumtionRequest';
import AddRequest from './components/inventory/AddRequest';
import ConsumtionWastage from './components/inventory/Consumtionwastage';
import AddWastage from './components/inventory/AddWastage';
import ConsumptionExpire from './components/inventory/ConsumtionExpire';
import ConsumptionClosingStock from './components/inventory/ConsumptioClosingStock';
import AddConsumptionStock from './components/inventory/AddConsumptionStock';
import InternalReport from './components/inventory/reports/InternalReport';
import ConsumptionReport from './components/inventory/reports/ConsumptionReport';
import ClosingOpeningreport from './components/inventory/reports/ClosingOpeningreport';
import SupplierReport from './components/inventory/reports/SupplierReport';
import RawMaterialconversion from './components/inventory/RawMaterialconversion';
import AddMaterialConversion from './components/inventory/AddMaterialConversion';
import RecipeManagement from './components/inventory/recipes/RecipeManagement';
import AddRecipe from './components/inventory/recipes/AddRecipe';
import QuickRecipe from './components/inventory/recipes/QuickRecipe';
import AreaRecipe from './components/inventory/recipes/AreaRecipe';
import CopyRecipe from './components/inventory/recipes/CopyRecipe';
import { Dashboard } from './components/inventory/Dashboard';

// Inventory Layout Component - This will render the sidebar and the content
const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <InventorySidebar />
      <div className=" flex-1 p-4 z-10  ">
        {children}
      </div>
    </div>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [materials, setMaterials] = React.useState<RawMaterial[]>([]);

  const handleAddMaterial = (material: RawMaterial) => {
    setMaterials(prev => [...prev, material]);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              {/* Non-inventory routes */}
              <Route path="/" element={<TableArrange />} />
              <Route path="/orders/:tableNumber" element={<Order_1 />} />
              <Route path="/orders" element={<Order_1 />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/staff" element={<Staffing />} />
              <Route path="/operation" element={<Operation />} />


              <Route path="/settings" element={<Settings />} />
              <Route path="/kot/:tableNumber" element={<Order_1 />} />
              <Route path="/bill/:tableNumber" element={<Order_1 />} />
              <Route path="/operations/kots" element={<KOT />} />
              <Route path="/partial-payment" element={<PartialPayment />} />
              <Route path="/components/" element={<Order_1 />} />
              
              {/* Inventory main route */}
              <Route path="/inventory" element={
                <InventoryLayout>
                  <Dashboard />
                </InventoryLayout>
              } />
              
              {/* Inventory sub-routes */}
              <Route path="/inventory/dashboard" element={
                <InventoryLayout>
                  <Dashboard />
                </InventoryLayout>
              } />
              <Route path="/inventory/units-table" element={
                <InventoryLayout>
                  <UnitsTable />
                </InventoryLayout>
              } />
              <Route path="/inventory/raw-materials" element={
                <InventoryLayout>
                  <RawMaterials />
                </InventoryLayout>
              } />
              <Route path="/inventory/closing-stock" element={
                <InventoryLayout>
                  <ClosingStock />
                </InventoryLayout>
              } />
              <Route path="/inventory/closing-stock/add-closing-stock" element={
                <InventoryLayout>
                  <AddClosingStock />
                </InventoryLayout>
              } />
              
              {/* Suppliers routes */}
              <Route path="/suppliers/third-party" element={
                <InventoryLayout>
                  <ThirdPartySupplier />
                </InventoryLayout>
              } />
              <Route path="/suppliers/third-party/add-supplier" element={
                <InventoryLayout>
                  <AddSupplier />
                </InventoryLayout>
              } />
              <Route path="/suppliers/purchase-invoice" element={
                <InventoryLayout>
                  <PurchaseInvoice />
                </InventoryLayout>
              } />
              
              {/* Purchase routes */}
              <Route path="/purchase/request" element={
                <InventoryLayout>
                  <PurchaseRequest />
                </InventoryLayout>
              } />
              <Route path="/purchase/request/add-purchase-request" element={
                <InventoryLayout>
                  <PurchaseForm />
                </InventoryLayout>
              } />
              <Route path="/purchase/request/stock" element={
                <InventoryLayout>
                  <StockPurchase />
                </InventoryLayout>
              } />
              <Route path="/purchase/request/stock/add" element={
                <InventoryLayout>
                  <AddPurchase />
                </InventoryLayout>
              } />
              <Route path="/purchase/return" element={
                <InventoryLayout>
                  <PurchaseReturn />
                </InventoryLayout>
              } />
              <Route path="/purchase/return/add" element={
                <InventoryLayout>
                  <AddPurchaseReturn />
                </InventoryLayout>
              } />
              
              {/* Consumption routes */}
              <Route path="/consumtion/sales" element={
                <InventoryLayout>
                  <ConsumtionSales />
                </InventoryLayout>
              } />
              <Route path="/consumtion/sales/add" element={
                <InventoryLayout>
                  <AddSales />
                </InventoryLayout>
              } />
              <Route path="/consumtion/transfer" element={
                <InventoryLayout>
                  <ConsumtionTransfer />
                </InventoryLayout>
              } />
              <Route path="/consumtion/transfer/add" element={
                <InventoryLayout>
                  <AddTransfer />
                </InventoryLayout>
              } />
              <Route path="/consumtion/sales-return" element={
                <InventoryLayout>
                  <ConsumtionSalesReturn />
                </InventoryLayout>
              } />
              <Route path="/consumtion/sales-return/add" element={
                <InventoryLayout>
                  <AddSalesReturn />
                </InventoryLayout>
              } />
              <Route path="/consumtion/request" element={
                <InventoryLayout>
                  <ConsumtionRequest />
                </InventoryLayout>
              } />
              <Route path="/consumtion/request/add" element={
                <InventoryLayout>
                  <AddRequest />
                </InventoryLayout>
              } />
              <Route path="/consumtion/wastage" element={
                <InventoryLayout>
                  <ConsumtionWastage />
                </InventoryLayout>
              } />
              <Route path="/consumtion/wastage/add" element={
                <InventoryLayout>
                  <AddWastage />
                </InventoryLayout>
              } />
              <Route path="/consumtion/expire" element={
                <InventoryLayout>
                  <ConsumptionExpire />
                </InventoryLayout>
              } />
              <Route path="/consumtion/closing-stock" element={
                <InventoryLayout>
                  <ConsumptionClosingStock />
                </InventoryLayout>
              } />
              <Route path="/consumtion/closing-stock/add" element={
                <InventoryLayout>
                  <AddConsumptionStock />
                </InventoryLayout>
              } />
              
              {/* Report routes */}
              <Route path="/report/internal-report" element={
                <InventoryLayout>
                  <InternalReport />
                </InventoryLayout>
              } />
              <Route path="/report/consumption-report" element={
                <InventoryLayout>
                  <ConsumptionReport />
                </InventoryLayout>
              } />
              <Route path="/report/closing-opening-report" element={
                <InventoryLayout>
                  <ClosingOpeningreport />
                </InventoryLayout>
              } />
              <Route path="/report/supplier-report" element={
                <InventoryLayout>
                  <SupplierReport />
                </InventoryLayout>
              } />
              <Route path="/report/purchase-report" element={
                <InventoryLayout>
                  <SupplierReport />
                </InventoryLayout>
              } />
              <Route path='/conversion/raw-material' element={<InventoryLayout> <RawMaterialconversion/> </InventoryLayout>} />
              <Route path='/conversion/raw-material/add' element={<InventoryLayout><AddMaterialConversion/></InventoryLayout>} />
              
              {/* Add raw material route */}
              <Route path="/add-raw-material" element={
                <InventoryLayout>
                  <AddRawMaterial onAdd={handleAddMaterial} />
                </InventoryLayout>
              } />


              <Route path='/recipes-management' element={<InventoryLayout><RecipeManagement /></InventoryLayout>} />
              <Route path='/recipes-management/add-recipe' element={<InventoryLayout><AddRecipe /></InventoryLayout>} />
              <Route path='/recipes-management/quick-recipe' element={<InventoryLayout><QuickRecipe /></InventoryLayout>} />
              <Route path='/recipes-management/area-recipe' element={<InventoryLayout><AreaRecipe /></InventoryLayout>} />
              <Route path='/recipes-management/copy-recipe' element={<InventoryLayout><CopyRecipe /></InventoryLayout>} />

            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;




// import { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import TopBar from './components/TopBar';
// import Settings from './components/Settings';
// import Staffing from './components/Staffing';
// import Kitchen from './components/Kitchen';
// import Order_1 from './components/orders/Order_1';
// import TableArrange from './components/tables/TablesArrange';
// import Operation from './components/Operation';
// import KOT from './components/operations/KOT';
// import PartialPayment from './components/orders/PartialPayment';
// import InventorySidebar from './components/InventorySidebar';
// import Dashboard from './components/inventory/Dashboard';
// import UnitsTable from './components/inventory/UnitsTable';
// import RawMaterials from './components/inventory/RawMaterials';
// import AddRawMaterial from './components/inventory/AddRawMaterial';
// import { RawMaterial } from './components/inventory/type';
// import React from 'react';
// import ClosingStock from './components/inventory/ClosingStock';
// import AddClosingStock from './components/inventory/AddClosingStock';
// import ThirdPartySupplier from './components/inventory/ThirdPartySupplier';
// import AddSupplier from './components/inventory/AddSupplier';
// import PurchaseInvoice from './components/inventory/PurchaseInvoice';
// import PurchaseRequest from './components/inventory/Purchaserequest';
// import PurchaseForm from './components/inventory/PurchaseForm';
// import StockPurchase from './components/inventory/StockPurchase';
// import AddPurchase from './components/inventory/AddPurchase';
// import PurchaseReturn from './components/inventory/PurchaseReturn';
// import AddPurchaseReturn from './components/inventory/AddPurchaseReturn';
// import ConsumtionSales from './components/inventory/ConsumtionSales';
// import AddSales from './components/inventory/AddSales';
// import ConsumtionTransfer from './components/inventory/ConsumtionTransfer';
// import AddTransfer from './components/inventory/AddTransfer';
// import ConsumtionSalesReturn from './components/inventory/ConsumtionSalesReturn';
// import AddSalesReturn from './components/inventory/AddSalesReturn';
// import ConsumtionRequest from './components/inventory/ConsumtionRequest';
// import AddRequest from './components/inventory/AddRequest';
// import ConsumtionWastage from './components/inventory/Consumtionwastage';
// import AddWastage from './components/inventory/AddWastage';
// import ConsumptionExpire from './components/inventory/ConsumtionExpire';
// import ConsumptionClosingStock from './components/inventory/ConsumptioClosingStock';
// import AddConsumptionStock from './components/inventory/AddConsumptionStock';
// import InternalReport from './components/inventory/reports/InternalReport';
// import ConsumptionReport from './components/inventory/reports/ConsumptionReport';
// import ClosingOpeningreport from './components/inventory/reports/ClosingOpeningreport';
// import SupplierReport from './components/inventory/reports/SupplierReport';
// import RawMaterialconversion from './components/inventory/RawMaterialconversion';
// import AddMaterialConversion from './components/inventory/AddMaterialConversion';
// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');

//   const handleNavigate = (page: string) => {
//     setCurrentPage(page);
//     setSidebarOpen(false);
//   };

//   const [materials, setMaterials] = React.useState<RawMaterial[]>([]);

//   const handleAddMaterial = (material: RawMaterial) => {
//     setMaterials(prev => [...prev, material]);
//   };


//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-50">
//         <Sidebar 
//           isOpen={sidebarOpen} 
//           onClose={() => setSidebarOpen(false)}
//           onToggle={() => setSidebarOpen(!sidebarOpen)}
//           onNavigate={handleNavigate}
//           currentPage={currentPage}
//         />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <TopBar onMenuClick={() => setSidebarOpen(true)} />
//           <main className="flex-1 overflow-y-auto p-4">
//             <Routes>
//               <Route path="/" element={<TableArrange />} />
//               <Route path="/orders/:tableNumber" element={<Order_1 />} />
//               <Route path="/orders" element={<Order_1 />} />
//               <Route path="/kitchen" element={<Kitchen />} />
//               <Route path="/staff" element={<Staffing />}/>
//               <Route path="/operation" element={<Operation />} />
//               <Route path="/inventory" element={<InventorySidebar />} />

//                  <Route path="/inventory/dashboard" element={<Dashboard />} />
//                  <Route path="/inventory/units-table" element={<UnitsTable />} />
//                  <Route path="/inventory/raw-materials" element={<RawMaterials />} />
//                   <Route path='/inventory/closing-stock' element={<ClosingStock />} />
//                   <Route path='/inventory/closing-stock/add-closing-stock' element={<AddClosingStock />} />
//                   <Route path='/suppliers/third-party' element={<ThirdPartySupplier />} />
//                   <Route path='/suppliers/third-party/add-supplier' element={<AddSupplier />} />
//                   <Route path='/suppliers/purchase-invoice' element={<PurchaseInvoice />} />
//                   <Route path='/purchase/request' element={<PurchaseRequest />} />
//                   <Route path='/purchase/request/add-purchase-request' element={<PurchaseForm />} />
//                   <Route path='/purchase/request/stock' element={<StockPurchase />} />
//                   <Route path='/purchase/request/stock/add' element={<AddPurchase />} />
//                   <Route path='/purchase/return' element={<PurchaseReturn />} />
//                   <Route path='/purchase/return/add' element={<AddPurchaseReturn />} />
//                   <Route path='/consumtion/sales' element={<ConsumtionSales />} />
//                   <Route path='/consumtion/sales/add' element={<AddSales />} />
//                   <Route path='/consumtion/transfer' element={<ConsumtionTransfer />} />
//                   <Route path='/consumtion/transfer/add' element={<AddTransfer />} />
//                   <Route path='/consumtion/sales-return' element={<ConsumtionSalesReturn />} />
//                   <Route path='/consumtion/sales-return/add' element={<AddSalesReturn />} />
//                   <Route path='/consumtion/request' element={<ConsumtionRequest />} />
//                   <Route path='/consumtion/request/add' element={<AddRequest />} />
//                   <Route path='/consumtion/wastage' element={<ConsumtionWastage />} />
//                   <Route path='/consumtion/wastage/add' element={<AddWastage />} />
//                   <Route path='/consumtion/expire' element={<ConsumptionExpire />} />
//                   <Route path='/consumtion/closing-stock' element={<ConsumptionClosingStock />} />
//                   <Route path='/consumtion/closing-stock/add' element={<AddConsumptionStock />} />
//                   <Route path='/report/internal-report' element={<InternalReport />} />
//                   <Route path='/report/consumption-report' element={<ConsumptionReport />} />
//                   <Route path='/report/closing-opening-report' element={<ClosingOpeningreport />} />
//                   <Route path='/report/supplier-report' element={<SupplierReport />} />
//                   <Route path='/report/purchase-report' element={<SupplierReport />} />
                  // <Route path='/conversion/raw-material' element={<RawMaterialconversion />} />
                  // <Route path='/conversion/raw-material/add' element={<AddMaterialConversion />} />
//                   <Route
//                     path="/add-raw-material"
//                     element={<AddRawMaterial onAdd={handleAddMaterial} />}
//                   />

                  
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/kot/:tableNumber" element={<Order_1 />} />
//               <Route path="/bill/:tableNumber" element={<Order_1 />} />
//               <Route path="/operations/kots" element={<KOT />} />
//               <Route path="/partial-payment" element={<PartialPayment />} />



//               <Route path="/components/" element={<Order_1 />} />



//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
