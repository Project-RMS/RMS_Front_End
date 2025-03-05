import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };



  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<TableArrange />} />
              <Route path="/orders/:tableNumber" element={<Order_1 />} />
              <Route path="/orders" element={<Order_1 />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/staff" element={<Staffing />}/>
              <Route path="/operation" element={<Operation />} />
              <Route path="/inventory" element={<InventorySidebar />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/kot/:tableNumber" element={<Order_1 />} />
              <Route path="/bill/:tableNumber" element={<Order_1 />} />
              <Route path="/operations/kots" element={<KOT />} />
              <Route path="/partial-payment" element={<PartialPayment />} />



              <Route path="/components/" element={<Order_1 />} />



            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;