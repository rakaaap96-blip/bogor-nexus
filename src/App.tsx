import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import NeuralNetwork from './components/NeuralNetwork';
import System from './components/System';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'neural':
        return <NeuralNetwork />;
      case 'system':
        return <System />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      {/* Main Content Area dengan margin untuk sidebar */}
      <main className="flex-1 lg:ml-64 min-h-screen w-full lg:w-[calc(100%-16rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;