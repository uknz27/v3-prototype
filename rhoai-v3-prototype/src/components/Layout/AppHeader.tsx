import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppsIcon from '@mui/icons-material/Apps';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FolderIcon from '@mui/icons-material/Folder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// This width must match the miniDrawerWidth in AppDrawer.tsx
const miniDrawerWidth = 60;

const placeholderProjects = [
  'Project Alpha',
  'Project Beta',
  'Jupiter Notebook Experiments'
];

export const AppHeader: React.FC = () => {
  const [projectMenuAnchorEl, setProjectMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<string>(placeholderProjects[0]);

  const handleProjectMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProjectMenuAnchorEl(event.currentTarget);
  };

  const handleProjectMenuClose = () => {
    setProjectMenuAnchorEl(null);
  };

  const handleProjectSelect = (projectName: string) => {
    setSelectedProject(projectName);
    handleProjectMenuClose();
    // In a real app, this would trigger context changes or API calls
  };

  const projectMenuOpen = Boolean(projectMenuAnchorEl);

  return (
    <AppBar 
      position="fixed"
      sx={{
        width: `calc(100% - ${miniDrawerWidth}px)`, // Adjust width for drawer
        ml: `${miniDrawerWidth}px`, // Adjust margin for drawer
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Button
            color="inherit"
            onClick={handleProjectMenuOpen}
            endIcon={<ArrowDropDownIcon />}
            sx={{ textTransform: 'none', fontSize: 'inherit' }}
          >
            {selectedProject}
          </Button>
          <Menu
            anchorEl={projectMenuAnchorEl}
            open={projectMenuOpen}
            onClose={handleProjectMenuClose}
            MenuListProps={{
              'aria-labelledby': 'project-selector-button',
            }}
          >
            {placeholderProjects.map((project) => (
              <MenuItem key={project} onClick={() => handleProjectSelect(project)} selected={project === selectedProject}>
                <ListItemIcon>
                  <FolderIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={project} />
              </MenuItem>
            ))}
            <MenuItem onClick={() => { /* Logic for creating new project */ handleProjectMenuClose(); }}>
              <ListItemIcon>
                <AddCircleOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Create New Project..." />
            </MenuItem>
          </Menu>
        </Box>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RHOAI v3 Prototype
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <IconButton
            size="large"
            color="inherit"
            aria-label="notifications"
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="waffle menu"
          >
            <AppsIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="login"
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 