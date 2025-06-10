import React, { useState } from 'react';
import { Box, Paper, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CodeIcon from '@mui/icons-material/Code';
import { AgenticGraph } from '../Graph/AgenticGraph';
import { AgentCode } from '../Code/AgentCode';

interface LeftPanelProps {
    hoveredNode: string | null;
    onNodeEnter: (label: string) => void;
    onNodeLeave: () => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ hoveredNode, onNodeEnter, onNodeLeave }) => {
    const [view, setView] = useState('graph');

    const handleViewChange = (
        event: React.MouseEvent<HTMLElement>,
        newView: string,
    ) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    return (
        <Paper variant="outlined" sx={{ position: 'relative', height: '100%' }}>
            <Tooltip title="Toggle View" placement="top">
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={handleViewChange}
                    aria-label="View toggle"
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8, zIndex: 10, bgcolor: 'background.paper' }}
                >
                    <ToggleButton value="graph" aria-label="graph view">
                        <AccountTreeIcon />
                    </ToggleButton>
                    <ToggleButton value="code" aria-label="code view">
                        <CodeIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Tooltip>
            
            {view === 'graph' ? (
                <AgenticGraph 
                    hoveredNode={hoveredNode}
                    onNodeEnter={onNodeEnter}
                    onNodeLeave={onNodeLeave}
                />
            ) : (
                <AgentCode 
                    hoveredNode={hoveredNode}
                    onNodeEnter={onNodeEnter}
                    onNodeLeave={onNodeLeave}
                />
            )}
        </Paper>
    );
}; 