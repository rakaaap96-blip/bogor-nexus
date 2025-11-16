import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BarChart3, Brain, Settings, Menu, X } from 'lucide-react';
import type { MenuItem } from '../types';

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'neural', label: 'Neural Network', icon: 'Brain' },
  { id: 'system', label: 'System', icon: 'Settings' }
];

const iconMap = {
  LayoutDashboard,
  BarChart3,
  Brain,
  Settings
};

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Logo - Proper heading structure */}
      <motion.div 
        className="flex items-center space-x-3 mb-8"
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center" aria-hidden="true">
          <Brain className="w-5 h-5 text-gray-900" />
        </div>
        <h1 className="text-xl font-bold text-cyan-400">BOGOR NEXUS</h1>
      </motion.div>

      {/* Navigation with proper ARIA */}
      <nav aria-label="Main navigation">
        <h2 className="sr-only">Main menu</h2>
        <div className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap];
            const isActive = activeMenu === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                    : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Navigate to ${item.label}`}
              >
                <IconComponent className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button - ACCESSIBLE */}
      <motion.button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-cyan-500/90 backdrop-blur-lg border border-cyan-400/50 rounded-full shadow-2xl shadow-cyan-500/25"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 240, 255, 1)" }}
        whileTap={{ scale: 0.9 }}
        aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileOpen}
        aria-controls="mobile-sidebar"
      >
        <AnimatePresence mode="wait">
          {isMobileOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-gray-900" aria-hidden="true" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Menu className="w-6 h-6 text-gray-900" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen z-30">
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-gray-900/95 backdrop-blur-xl border-r border-cyan-500/20 h-screen p-6"
          role="complementary"
          aria-label="Sidebar navigation"
        >
          {sidebarContent}
        </motion.div>
      </div>

      {/* Sidebar - Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden w-64 bg-gray-900/95 backdrop-blur-xl border-r border-cyan-500/20 h-screen p-6 fixed left-0 top-0 z-40"
            id="mobile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;