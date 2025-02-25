import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Settings from './components/Settings';
import Booking from './components/Booking';
import Staffing from './components/Staffing';
// import Orders from './components/Orders';
import Kitchen from './components/Kitchen';
import Order_1 from './components/orders/Order_1';

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
              <Route path="/" element={<Booking />} />
              <Route path="/orders" element={<Order_1 />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/staff" element={<Staffing />}/>
              <Route path="/settings" element={<Settings />} />
              <Route path="/booking" element={
                <Booking 
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                  onToggle={() => setSidebarOpen(!sidebarOpen)}
                  onNavigate={handleNavigate}
                  currentPage={currentPage}
                />
              } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;