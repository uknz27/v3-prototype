import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Divider, 
  Button, 
  Stack, 
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Chip,
  Tabs,
  Tab
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import HistoryIcon from '@mui/icons-material/History';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import { LeftPanel } from '../components/Layout/LeftPanel';
import { MiddlePanel } from '../components/Layout/MiddlePanel';
import { RightSideMenu } from '../components/Layout/RightSideMenu';
import { ExperimentsView } from '../components/Playground/ExperimentsView';

const PlaygroundPage: React.FC = () => {
  const [kebabMenuAnchorEl, setKebabMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isKebabMenuOpen = Boolean(kebabMenuAnchorEl);

  const [versionMenuAnchorEl, setVersionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isVersionMenuOpen = Boolean(versionMenuAnchorEl);
  const [selectedVersion, setSelectedVersion] = useState(5);

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleKebabMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setKebabMenuAnchorEl(event.currentTarget);
  };

  const handleKebabMenuClose = () => {
    setKebabMenuAnchorEl(null);
  };

  const handleVersionMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setVersionMenuAnchorEl(event.currentTarget);
  };

  const handleVersionMenuClose = () => {
    setVersionMenuAnchorEl(null);
  };
  
  const handleVersionSelect = (version: number) => {
    setSelectedVersion(version);
    handleVersionMenuClose();
  };

  return (
    <Box>
      {/* Header section that spans full width */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 2 }}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Playground
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
            <Typography variant="h4" component="h1" sx={{ mb: 0 }}>
              Alpha Agent
            </Typography>
            <Chip 
              icon={<GitHubIcon />} 
              label="GitHub" 
              component="a" 
              href="https://github.com/your-org/your-repo" // Replace with your actual repo URL
              target="_blank"
              clickable 
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="outlined">Save</Button>
          <Button variant="contained">Run</Button>
          <Divider orientation="vertical" flexItem />
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={isKebabMenuOpen ? 'long-menu' : undefined}
            aria-expanded={isKebabMenuOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleKebabMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={kebabMenuAnchorEl}
            open={isKebabMenuOpen}
            onClose={handleKebabMenuClose}
          >
            <MenuItem onClick={handleKebabMenuClose}>Deploy</MenuItem>
            <MenuItem onClick={handleKebabMenuClose}>Export</MenuItem>
          </Menu>
        </Stack>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Build" />
          <Tab label="Experiment" />
        </Tabs>
      </Box>

      {currentTab === 0 && (
        <Box sx={{pt: 3}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Timeline:
                </Typography>
                <Button 
                  id="version-button"
                  variant="outlined"
                  aria-controls={isVersionMenuOpen ? 'version-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isVersionMenuOpen ? 'true' : undefined}
                  onClick={handleVersionMenuClick}
                  endIcon={<ArrowDropDownIcon />}
                >
                  Version {selectedVersion}
                </Button>
                <Menu
                  id="version-menu"
                  anchorEl={versionMenuAnchorEl}
                  open={isVersionMenuOpen}
                  onClose={handleVersionMenuClose}
                  MenuListProps={{
                    'aria-labelledby': 'version-button',
                  }}
                >
                  {[1, 2, 3, 4, 5].map((version) => (
                    <MenuItem key={version} onClick={() => handleVersionSelect(version)} selected={version === selectedVersion}>
                      Version {version}
                    </MenuItem>
                  ))}
                </Menu>
            </Box>
            <Stack direction="row" spacing={0.5}>
              <IconButton aria-label="undo" size="small">
                <UndoIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="redo" size="small">
                <RedoIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="history" size="small">
                <HistoryIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
          <Grid container spacing={3} sx={{height: '100%'}}>
            {/* Left Column */}
            <Grid size={{ xs: 12, md: 7 }}>
              <LeftPanel 
                hoveredNode={hoveredNode}
                onNodeEnter={setHoveredNode}
                onNodeLeave={() => setHoveredNode(null)}
              />
            </Grid>
            {/* Middle Column */}
            <Grid size={{ xs: 12, md: 5 }}>
              <MiddlePanel />
            </Grid>
          </Grid>
        </Box>
      )}
      
      {currentTab === 1 && (
        <Box sx={{pt: 3}}>
           <ExperimentsView />
        </Box>
      )}

    </Box>
  );
};

export default PlaygroundPage;
