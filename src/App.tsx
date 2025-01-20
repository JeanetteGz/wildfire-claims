import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';  // Add this import
import Navbar from './layouts/Navbar';
import Sidebar from './layouts/Sidebar';
import SetupPage from './pages/SetupPage';
import InventoryPage from './pages/InventoryPage';
import DocumentationPage from './pages/DocumentationPage';
import SubmissionPage from './pages/SubmissionPage';

export const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <div className="flex">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-1 ml-64 p-8 mt-16">
              <Routes>
                <Route path="/" element={<SetupPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />
                <Route path="/submission" element={<SubmissionPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;