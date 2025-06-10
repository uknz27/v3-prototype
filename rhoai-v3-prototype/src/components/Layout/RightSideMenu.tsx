import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import BiotechIcon from '@mui/icons-material/Biotech';
import RuleIcon from '@mui/icons-material/Rule';

const menuItems = [
    { text: 'Runs', icon: <PlaylistPlayIcon /> },
    { text: 'Experiments', icon: <BiotechIcon /> },
    { text: 'Evals', icon: <RuleIcon /> },
];

const menuWidth = 60;

export const RightSideMenu: React.FC = () => {
    return (
        <Box sx={{ width: menuWidth, height: '100%', borderLeft: '1px solid', borderColor: 'divider', boxSizing: 'border-box', p: 1 }}>
            <List sx={{p:0}}>
                {menuItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 1 }}>
                         <Tooltip title={item.text} placement="left">
                            <ListItemButton
                                selected={index === 0}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: 'center',
                                    px: 2.5,
                                    borderRadius: 2,
                                    bgcolor: 'background.paper',
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
        </Box>
    );
};
