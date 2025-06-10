import React from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock chart data - in a real app, this would be fetched
const generateChartData = () => {
    const data = [];
    for (let i = 10; i >= 0; i--) {
        const time = new Date();
        time.setMinutes(time.getMinutes() - i * 5);
        data.push({
            time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            'Requests/min': Math.floor(Math.random() * (150 - 80) + 80),
            'Latency (p95)': Math.floor(Math.random() * (200 - 120) + 120),
        });
    }
    return data;
};

const chartData = generateChartData();

export const DeploymentDetails: React.FC<{ deployment: any; onBack: () => void }> = ({ deployment, onBack }) => {
    return (
        <Box>
            <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
                All Deployments
            </Button>
            
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5">{deployment.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Detailed view of the deployment's status and live metrics.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Overview</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{xs: 6, md: 3}}>
                                    <Typography variant="overline" color="text.secondary">Status</Typography>
                                    <Typography variant="body1">{deployment.status}</Typography>
                                </Grid>
                                <Grid size={{xs: 6, md: 3}}>
                                    <Typography variant="overline" color="text.secondary">Model ID</Typography>
                                    <Typography variant="body1">{deployment.model}</Typography>
                                </Grid>
                                <Grid size={{xs: 6, md: 3}}>
                                    <Typography variant="overline" color="text.secondary">Endpoint URL</Typography>
                                    <Typography variant="body1" sx={{wordBreak: 'break-all'}}>{`/v1/deployments/${deployment.id}`}</Typography>
                                </Grid>
                                <Grid size={{xs: 6, md: 3}}>
                                    <Typography variant="overline" color="text.secondary">Deployed At</Typography>
                                    <Typography variant="body1">{new Date(deployment.createdAt).toLocaleString()}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                
                <Grid size={12}>
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Live Metrics</Typography>
                     <Paper variant="outlined" sx={{ height: 350, p: 2 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis yAxisId="left" label={{ value: 'Requests/min', angle: -90, position: 'insideLeft' }} />
                                <YAxis yAxisId="right" orientation="right" label={{ value: 'Latency (ms)', angle: -90, position: 'insideRight' }} />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="Requests/min" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line yAxisId="right" type="monotone" dataKey="Latency (p95)" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
}; 