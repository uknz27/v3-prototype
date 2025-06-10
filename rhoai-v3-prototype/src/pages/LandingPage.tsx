import React from 'react';
import { Container, Box } from '@mui/material';
import { UseCaseGallery } from '../components/Gallery/UseCaseGallery';
import { GalleryLayout } from '../components/Layout/GalleryLayout';
import { PageHeader } from '../components/Layout/PageHeader';

const LandingPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader title="Get Started" />

      <GalleryLayout>
        <UseCaseGallery />
      </GalleryLayout>
    </Container>
  );
};

export default LandingPage; 