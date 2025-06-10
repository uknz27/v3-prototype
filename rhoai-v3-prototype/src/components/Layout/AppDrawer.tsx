import React from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, Box, Toolbar, Divider, Tooltip
} from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom'; We no longer need this

// Icons for navigation items
import ScienceIcon from '@mui/icons-material/Science';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import HubIcon from '@mui/icons-material/Hub';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const drawerWidth = 240; // Full width when expanded
const miniDrawerWidth = 60; // Width when collapsed

const section1 = [
  { id: 'playground', text: 'Playground', icon: <ScienceIcon /> },
  { id: 'get-started', text: 'Get Started', icon: <PlayCircleOutlineIcon /> }, 
];

const section2 = [
  { id: 'models', text: 'Models', icon: <HubIcon /> },
  { id: 'data', text: 'Data', icon: <StorageIcon /> },
  { id: 'tools', text: 'Tools', icon: <BuildIcon /> },
  { id: 'evals', text: 'Evals', icon: <FactCheckIcon /> },
];

const section3 = [
  { id: 'deployments', text: 'Deployments', icon: <RocketLaunchIcon /> },
];

const section4 = [
  { id: 'settings', text: 'Settings', icon: <SettingsIcon /> },
  { id: 'help', text: 'Help', icon: <HelpOutlineIcon /> },
];

const navSections = [section1, section2, section3, section4];

interface AppDrawerProps {
  onMenuItemClick: (id: string, text: string) => void;
  activeItem: string | null;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({ onMenuItemClick, activeItem }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: miniDrawerWidth,
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.modal + 1,
        '& .MuiDrawer-paper': {
          width: miniDrawerWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar /> {/* Spacer for AppBar */}
      <Box>
        {navSections.map((section, index) => (
          <React.Fragment key={index}>
            <Divider />
            <List>
              {section.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                  <Tooltip title={item.text} placement="right">
                    <ListItemButton
                      onClick={() => onMenuItemClick(item.id, item.text)}
                      selected={activeItem === item.id}
                      sx={{
                        minHeight: 48,
                        justifyContent: 'center',
                        px: 2.5,
                        mx: 1,
                        my: 0.5,
                        borderRadius: 2,
                        '&.Mui-selected': {
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            }
                        },
                        '&.Mui-selected .MuiListItemIcon-root': {
                            color: 'primary.contrastText',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
}; 