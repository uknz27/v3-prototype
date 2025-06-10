import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import PlaygroundPage from './pages/PlaygroundPage';
import { AppHeader } from './components/Layout/AppHeader';
import { AppDrawer, drawerWidth } from './components/Layout/AppDrawer';
import { FlyoverPanel } from './components/Layout/FlyoverPanel';
import { GetStartedPanel } from './components/Panels/GetStartedPanel';
import { ModelsPanel } from './components/Panels/ModelsPanel';
import { DataPanel } from './components/Panels/DataPanel';
import { ToolsPanel } from './components/Panels/ToolsPanel';
import { EvalsPanel } from './components/Panels/EvalsPanel';
import { DeploymentsPanel } from './components/Panels/DeploymentsPanel';
import './App.css'; // You can keep this for additional global styles if needed

const miniDrawerWidth = 60;

// Placeholder content for the flyover panels
const getFlyoverContent = (id: string): { content: React.ReactNode, width?: number } => {
  if (id === 'playground') {
    return { content: null };
  }
  if (id === 'get-started') {
    return { content: <GetStartedPanel />, width: 800 };
  }
  if (id === 'models') {
    return { content: <ModelsPanel />, width: 1000 };
  }
  if (id === 'data') {
    return { content: <DataPanel />, width: 1000 };
  }
  if (id === 'tools') {
    return { content: <ToolsPanel />, width: 1000 };
  }
  if (id === 'evals') {
    return { content: <EvalsPanel />, width: 1000 };
  }
  if (id === 'deployments') {
    return { content: <DeploymentsPanel />, width: 1200 };
  }
  return { content: <Typography sx={{p:2}}>Content for {id}</Typography> };
};

const App: React.FC = () => {
  const [flyoverOpen, setFlyoverOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>('playground');
  const [flyoverTitle, setFlyoverTitle] = useState('');
  const [flyoverContent, setFlyoverContent] = useState<React.ReactNode>(null);
  const [panelWidth, setPanelWidth] = useState<number | undefined>(undefined);

  const handleMenuItemClick = (id: string, text: string) => {
    const { content, width } = getFlyoverContent(id);
    if (content === null) {
      // Navigate to root if it's the playground link
      // This assumes you might want to keep the playground as a main page route
      // and close any open flyover.
      window.history.pushState({}, '', '/');
      setActiveItem('playground');
      setFlyoverOpen(false);
      return;
    }
    
    // If clicking the same item that is already open, close it.
    if (flyoverOpen && activeItem === id) {
      setFlyoverOpen(false);
      setActiveItem(null); // Deselect the item
    } else {
      setFlyoverContent(content);
      setFlyoverTitle(text);
      setPanelWidth(width); // Set the panel width
      setFlyoverOpen(true);
      setActiveItem(id);
    }
  };

  return (
    <Router>
      {/* Use a single flex container for the whole layout */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppHeader /> {/* No longer needs onMenuClick */}
        <AppDrawer onMenuItemClick={handleMenuItemClick} activeItem={activeItem} />
        <FlyoverPanel
          isOpen={flyoverOpen}
          onClose={() => {
            setFlyoverOpen(false);
            setActiveItem(null); // Deselect when closing
          }}
          content={flyoverContent}
          title={flyoverTitle}
          drawerWidth={drawerWidth}
          miniDrawerWidth={miniDrawerWidth}
          panelWidth={panelWidth}
        />
        
        {/* Main content area */}
        <Box 
          component="main" 
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Toolbar /> {/* Spacer to push content below the fixed AppBar */}
          <Routes>
            {/* All routes are removed, only PlaygroundPage is shown */}
            <Route path="*" element={<PlaygroundPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
