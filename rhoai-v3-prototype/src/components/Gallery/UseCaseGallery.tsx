import React from 'react';
import { 
  Box,
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  Typography 
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Placeholder data for use-case templates
const useCaseTemplates = [
  {
    id: '1',
    title: 'Customer Service Chatbot',
    description: 'An AI-powered chatbot to handle customer inquiries and support.',
  },
  {
    id: '2',
    title: 'Content Summarization Tool',
    description: 'Automatically generate summaries of long-form text content.',
  },
  {
    id: '3',
    title: 'Image Generation Model',
    description: 'Create unique images from text descriptions using a GAN.',
  },
];

export const UseCaseGallery: React.FC = () => {
  const itemsToRender = [
    ...useCaseTemplates.map((template) => (
      <Box 
        key={template.id} 
        sx={{
          width: { xs: '100%', sm: '50%', md: 'calc(100% / 3)' },
        }}
      >
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="div">
              {template.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {template.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" endIcon={<ArrowForwardIcon />}>
              View Template
            </Button>
          </CardActions>
        </Card>
      </Box>
    )),
    <Box 
      key="quickstart-wizard" 
      sx={{
        width: { xs: '100%', sm: '50%', md: 'calc(100% / 3)' },
      }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} variant="outlined">
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div">
            5-min QuickStart Wizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Launch our guided wizard to set up your development sandbox in minutes. Includes a golden-path video and workspace setup.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" endIcon={<ArrowForwardIcon />}>
            Start QuickStart
          </Button>
        </CardActions>
      </Card>
    </Box>
  ];

  return <>{itemsToRender}</>;
}; 