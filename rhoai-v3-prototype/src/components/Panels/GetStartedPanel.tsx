import React from 'react';
import { 
  Box,
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  Typography,
  Grid
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

export const GetStartedPanel: React.FC = () => {
  return (
    <Box>
        <Typography variant="h5" gutterBottom>Use-Case Gallery</Typography>
        <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
            Select a template to get started with a pre-built agent.
        </Typography>
        <Grid container spacing={2}>
            {useCaseTemplates.map((template) => (
                <Grid size={{ xs: 12, md: 6 }} key={template.id}>
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
                </Grid>
            ))}
             <Grid size={{ xs: 12, md: 6 }}>
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
            </Grid>
        </Grid>
    </Box>
  );
}; 