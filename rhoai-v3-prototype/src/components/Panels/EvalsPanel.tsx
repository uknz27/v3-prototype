import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Divider
} from '@mui/material';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const ragEvals = [
    {
        name: 'Faithfulness',
        description: 'Measures if the generated answer is factually consistent with the provided context.',
        icon: <FactCheckOutlinedIcon />
    },
    {
        name: 'Answer Relevancy',
        description: 'Assesses how well the answer addresses the user\'s question.',
        icon: <CheckCircleOutlineOutlinedIcon />
    },
    {
        name: 'Contextual Recall',
        description: 'Evaluates if the retrieved context contains all the information needed to answer.',
        icon: <HelpOutlineOutlinedIcon />
    },
     {
        name: 'Contextual Precision',
        description: 'Measures how much of the retrieved context is relevant to the question.',
        icon: <CheckCircleOutlineOutlinedIcon />
    },
];

const qualityEvals = [
    {
        name: 'Toxicity',
        description: 'Detects offensive, harmful, or inappropriate language in the response.',
        icon: <GppGoodOutlinedIcon />
    },
    {
        name: 'Bias',
        description: 'Evaluates for political, gender, social, and other types of biases.',
        icon: <GppGoodOutlinedIcon />
    },
    {
        name: 'Summarization Quality',
        description: 'Checks if a summary is factually aligned and includes key information.',
        icon: <FactCheckOutlinedIcon />
    },
    {
        name: 'Helpfulness',
        description: 'Assesses whether the response is useful and satisfies the user\'s intent.',
        icon: <HelpOutlineOutlinedIcon />
    }
];

const renderEvalCard = (evalItem: {name: string, description: string, icon: React.ReactNode}) => (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={evalItem.name}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    {evalItem.icon}
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                        {evalItem.name}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {evalItem.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Configure Eval</Button>
            </CardActions>
        </Card>
    </Grid>
);


export const EvalsPanel: React.FC = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>Evaluation Hub</Typography>
                <Typography variant="body2" color="text.secondary">
                    Select and configure evaluations to measure the performance and quality of your agent.
                </Typography>
            </Box>

            {/* RAG Evals */}
            <Typography variant="h6" gutterBottom>RAG & Contextual Evals</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Measure the performance of your Retrieval-Augmented Generation pipeline.
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {ragEvals.map(renderEvalCard)}
            </Grid>

            <Divider sx={{ my: 4 }}><Chip label="QUALITY" /></Divider>

            {/* Response Quality Evals */}
            <Typography variant="h6" gutterBottom>Response Quality & Safety Evals</Typography>
             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Assess the quality, safety, and helpfulness of the final generated response.
            </Typography>
            <Grid container spacing={2}>
                {qualityEvals.map(renderEvalCard)}
            </Grid>
        </Box>
    );
}; 