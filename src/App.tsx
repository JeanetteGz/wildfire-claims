import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './layouts/Navbar';
import Sidebar from './layouts/Sidebar';
import SetupPage from './pages/SetupPage';
import InventoryPage from './pages/InventoryPage';
import DocumentationPage from './pages/DocumentationPage';
import SubmissionPage from './pages/SubmissionPage';
import SettingsPage from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-8 mt-16 md:ml-64 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<SetupPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
              <Route path="/submission" element={<SubmissionPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
