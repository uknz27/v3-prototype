import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { PageHeader } from '../components/Layout/PageHeader';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <Container maxWidth="lg">
      <PageHeader title={title} />
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body1">
          This page is a placeholder. Content will be added soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default PlaceholderPage; 