import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    Button,
    Chip,
    Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import { DeploymentDetails } from './DeploymentDetails';

const deploymentsData = [
    {
        id: 'prod-doc-summarizer',
        name: 'Production Doc Summarizer',
        status: 'Active',
        requestsPerMin: 120,
        latencyP95: '150ms',
        errorRate: '0.1%',
        model: 'mistral-large',
        createdAt: '2024-07-20T10:00:00Z',
    },
    {
        id: 'staging-support-agent',
        name: 'Staging Support Agent',
        status: 'Active',
        requestsPerMin: 15,
        latencyP95: '250ms',
        errorRate: '0.5%',
        model: 'claude-3-sonnet',
        createdAt: '2024-07-19T15:30:00Z',
    },
    {
        id: 'dev-code-generator',
        name: 'Dev Code Generator',
        status: 'Inactive',
        requestsPerMin: 0,
        latencyP95: 'N/A',
        errorRate: 'N/A',
        model: 'gemini-pro',
        createdAt: '2024-07-18T12:00:00Z',
    }
];


export const DeploymentsPanel: React.FC = () => {
    const [selectedDeploymentId, setSelectedDeploymentId] = useState<string | null>(null);

    const handleSelectDeployment = (id: string) => {
        setSelectedDeploymentId(id);
    };

    const handleBack = () => {
        setSelectedDeploymentId(null);
    }

    const selectedDeployment = deploymentsData.find(d => d.id === selectedDeploymentId);

    if (selectedDeployment) {
        return <DeploymentDetails deployment={selectedDeployment} onBack={handleBack} />;
    }

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" gutterBottom>Deployments</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Monitor and manage your deployed AI projects.
                    </Typography>
                </Box>
                 <Button variant="contained" startIcon={<AddIcon />}>New Deployment</Button>
            </Box>

            <Grid container spacing={2}>
                {deploymentsData.map((dep) => (
                    <Grid size={12} key={dep.id}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                p: 2, 
                                transition: 'box-shadow 0.3s',
                                '&:hover': {
                                    boxShadow: 3,
                                    cursor: 'pointer'
                                }
                            }}
                            onClick={() => handleSelectDeployment(dep.id)}
                        >
                             <Box sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                    <Chip
                                        icon={dep.status === 'Active' ? <CheckCircleIcon fontSize="small" /> : <ErrorIcon fontSize="small" />}
                                        label={dep.status}
                                        color={dep.status === 'Active' ? 'success' : 'default'}
                                        size="small"
                                        sx={{pl: '4px'}}
                                    />
                                    <Typography variant="h6">{dep.name}</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Model: <b>{dep.model}</b> | Deployed: {new Date(dep.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: {xs: 2, md: 4}, textAlign: 'center', mr: {xs: 1, md: 2} }}>
                                <Divider orientation="vertical" flexItem sx={{mx:1, display: {xs: 'none', md: 'block'}}}/>
                                <div>
                                    <Typography variant="h6" component="div">{dep.requestsPerMin}</Typography>
                                    <Typography variant="caption" color="text.secondary">Requests/min</Typography>
                                </div>
                                <Divider orientation="vertical" flexItem sx={{mx:1}} />
                                <div>
                                    <Typography variant="h6" component="div">{dep.latencyP95}</Typography>
                                    <Typography variant="caption" color="text.secondary">Latency P95</Typography>
                                </div>
                                 <Divider orientation="vertical" flexItem sx={{mx:1}} />
                                <div>
                                    <Typography variant="h6" component="div">{dep.errorRate}</Typography>
                                    <Typography variant="caption" color="text.secondary">Error Rate</Typography>
                                </div>
                            </Box>
                            <ArrowForwardIosIcon color="action" />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}; 