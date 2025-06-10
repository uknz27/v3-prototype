import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode; // Optional prop for action buttons/elements
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <Box sx={{ mb: 3 }}> {/* Moved mb to the outer Box to ensure Divider is part of the header block before margin */}
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2, // Added vertical padding
          // No direct bottom border here, will use a Divider below for full width
        }}
      >
        <Typography variant="h4" component="h1"> {/* Using h4 from our theme for page titles */}
          {title}
        </Typography>
        {actions && (
          <Stack direction="row" spacing={1}> {/* Stack for multiple actions */}
            {actions}
          </Stack>
        )}
      </Box>
      <Divider /> {/* Added a full-width Divider below the content, above the bottom margin */}
    </Box>
  );
}; 