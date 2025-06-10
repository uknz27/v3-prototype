import React from 'react';
import { Drawer, Box, Typography, IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FlyoverPanelProps {
    isOpen: boolean;
    onClose: () => void;
    content: React.ReactNode;
    title: string;
    drawerWidth: number;
    miniDrawerWidth: number;
    panelWidth?: number; // Optional width for the panel
}

export const FlyoverPanel: React.FC<FlyoverPanelProps> = ({ 
    isOpen, 
    onClose, 
    content, 
    title,
    drawerWidth, 
    miniDrawerWidth,
    panelWidth 
}) => {
    const effectiveWidth = panelWidth || drawerWidth;
    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={isOpen}
            onClose={onClose}
            sx={{
                width: effectiveWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: effectiveWidth,
                    boxSizing: 'border-box',
                    ml: `${miniDrawerWidth}px`, // Offset by the mini-drawer's width
                },
            }}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <Toolbar />
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{title}</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{ p: 2, overflowY: 'auto' }}>
                {content}
            </Box>
        </Drawer>
    );
}; 