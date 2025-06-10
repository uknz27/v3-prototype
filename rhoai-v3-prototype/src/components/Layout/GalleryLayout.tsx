import React from 'react';
import { Grid } from '@mui/material'; // Reverted to default Grid import
import type { GridProps } from '@mui/material'; // Import Grid props

interface GalleryLayoutProps {
  children: React.ReactNode;
  muiGridProps?: GridProps; // Allow passing additional Grid props if needed
}

export const GalleryLayout: React.FC<GalleryLayoutProps> = ({ children, muiGridProps }) => {
  return (
    <Grid container spacing={2} {...muiGridProps}>
      {children}
    </Grid>
  );
}; 