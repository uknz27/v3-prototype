import React, { useState } from 'react';
import { Box, Typography, Paper, Popover, FormControl, InputLabel, Select, MenuItem, Slider, Stack } from '@mui/material';
import PolylineIcon from '@mui/icons-material/Polyline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TuneIcon from '@mui/icons-material/Tune';

const nodeIcons: { [key: string]: React.ReactElement } = {
  'User Input': <PlayArrowIcon fontSize="small" />,
  'Planner Agent': <SmartToyIcon fontSize="small" />,
  'Tool Agent': <BuildIcon fontSize="small" />,
  'Final Output': <CheckCircleIcon fontSize="small" />,
};

const agentNodes = ['Planner Agent', 'Tool Agent'];

const PopoverConfig: React.FC = () => {
    const [model, setModel] = useState('llama3-70b');
    const [temperature, setTemperature] = useState(0.7);
    const [topK, setTopK] = useState(40);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <TuneIcon sx={{ mr: 1 }} />
                Node Configuration
            </Typography>
            <Stack spacing={4}>
                <FormControl fullWidth>
                    <InputLabel id="model-select-label">Model</InputLabel>
                    <Select
                        labelId="model-select-label"
                        value={model}
                        label="Model"
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <MenuItem value="llama3-70b">Llama 3 70B</MenuItem>
                        <MenuItem value="llama3-8b">Llama 3 8B</MenuItem>
                        <MenuItem value="mistral-large">Mistral Large</MenuItem>
                        <MenuItem value="gemma-7b">Gemma 7B</MenuItem>
                    </Select>
                </FormControl>

                <Box>
                    <Typography gutterBottom>
                        Temperature: {temperature.toFixed(1)}
                    </Typography>
                    <Slider
                        value={temperature}
                        onChange={(_, newValue) => setTemperature(newValue as number)}
                        aria-labelledby="temperature-slider"
                        valueLabelDisplay="auto"
                        step={0.1}
                        min={0}
                        max={1}
                    />
                </Box>

                <Box>
                    <Typography gutterBottom>
                        Top-K: {topK}
                    </Typography>
                    <Slider
                        value={topK}
                        onChange={(_, newValue) => setTopK(newValue as number)}
                        aria-labelledby="top-k-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                    />
                </Box>
            </Stack>
        </Box>
    );
};

const GraphNode: React.FC<{ 
  label: string; 
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  isHovered: boolean;
}> = ({ label, onMouseEnter, onMouseLeave, onClick, isHovered }) => {
  return (
    <Paper 
      onMouseEnter={() => onMouseEnter(label)}
      onMouseLeave={onMouseLeave}
      onClick={agentNodes.includes(label) ? onClick : undefined}
      elevation={isHovered ? 6 : 3}
      sx={{
        p: 1.5,
        width: '250px',
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        borderRadius: '8px',
        cursor: agentNodes.includes(label) ? 'pointer' : 'default',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {nodeIcons[label]}
        <Typography variant="body2" sx={{ ml: 1, fontWeight: 'bold' }}>{label}</Typography>
      </Box>
    </Paper>
  );
};

const VerticalConnector: React.FC = () => (
  <Box sx={{ my: 1, color: 'grey.500' }}>
    <ArrowDownwardIcon />
  </Box>
);

interface AgenticGraphProps {
  hoveredNode: string | null;
  onNodeEnter: (label: string) => void;
  onNodeLeave: () => void;
}

export const AgenticGraph: React.FC<AgenticGraphProps> = ({ hoveredNode, onNodeEnter, onNodeLeave }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleNodeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'config-popover' : undefined;

  const nodes = [
    { id: 1, label: 'User Input' },
    { id: 2, label: 'Planner Agent' },
    { id: 3, label: 'Tool Agent' },
    { id: 4, label: 'Final Output' },
  ];

  return (
    <Paper 
      variant="outlined" 
      sx={{ p: 2 }}
    >
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <PolylineIcon sx={{ mr: 1 }} />
        Agent Execution Graph
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <GraphNode 
              label={node.label} 
              onMouseEnter={onNodeEnter}
              onMouseLeave={onNodeLeave}
              onClick={handleNodeClick}
              isHovered={hoveredNode === node.label}
            />
            {index < nodes.length - 1 && <VerticalConnector />}
          </React.Fragment>
        ))}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Box sx={{width: '300px'}}>
         <PopoverConfig />
        </Box>
      </Popover>
    </Paper>
  );
}; 