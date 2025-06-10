import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const evalResultsData = [
    { subject: 'Faithfulness', score: 0.9, fullMark: 1 },
    { subject: 'Answer Relevancy', score: 0.8, fullMark: 1 },
    { subject: 'Contextual Recall', score: 0.85, fullMark: 1 },
    { subject: 'Contextual Precision', score: 0.7, fullMark: 1 },
    { subject: 'Toxicity', score: 0.1, fullMark: 1 },
    { subject: 'Bias', score: 0.05, fullMark: 1 },
];

const summaryStats = {
    overallScore: 0.82,
    totalTokens: 1250,
    estimatedCost: 0.015,
};

export const EvalsView: React.FC = () => {
    return (
        <Box sx={{ p: 2, height: '100%', overflowY: 'auto', backgroundColor: 'grey.50' }}>
            <Grid container spacing={3}>
                {/* Summary Cards */}
                <Grid size={{xs: 12, md: 4}}>
                    <Card variant="outlined" sx={{ height: '100%', textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="overline" color="text.secondary">Overall Score</Typography>
                            <Typography variant="h4">{summaryStats.overallScore.toFixed(2)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, md: 4}}>
                    <Card variant="outlined" sx={{ height: '100%', textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="overline" color="text.secondary">Total Tokens</Typography>
                            <Typography variant="h4">{summaryStats.totalTokens}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{xs: 12, md: 4}}>
                    <Card variant="outlined" sx={{ height: '100%', textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="overline" color="text.secondary">Estimated Cost</Typography>
                            <Typography variant="h4">${summaryStats.estimatedCost.toFixed(3)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Radar Chart */}
                <Grid size={12}>
                     <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Run Evaluation Metrics</Typography>
                     <Paper variant="outlined" sx={{ height: 400, p: 2 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={evalResultsData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={30} domain={[0, 1]} />
                                <Radar name="Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Legend />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}; 