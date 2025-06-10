import React, { useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// TODO: Move to a shared types file
interface Run {
    id: string;
    version: number;
    timestamp: string;
    tokens: number;
    cost: number | null;
    faithfulness: number | null;
    answer_relevancy: number | null;
    status: 'Completed' | 'Failed';
    prompt: string;
    output: string;
}

interface ComparisonViewProps {
    runs: Run[];
    onBack: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ runs, onBack }) => {
    const comparisonData = useMemo(() => {
        const prompts = [...new Set(runs.map(run => run.prompt))];
        const versions = [...new Set(runs.map(run => run.version))].sort((a, b) => b - a);
        
        const runsByPromptVersion = new Map<string, Run>();
        runs.forEach(run => {
            const key = `${run.prompt}-${run.version}`;
            runsByPromptVersion.set(key, run);
        });

        return { prompts, versions, runsByPromptVersion };
    }, [runs]);

    const { prompts, versions, runsByPromptVersion } = comparisonData;

    return (
        <Paper sx={{ width: '100%', mb: 2, p: 2 }} variant="outlined">
            <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
                Back to Runs
            </Button>
            <Typography variant="h6" gutterBottom>
                Run Comparison
            </Typography>
            <TableContainer>
                <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: 0 }}>Prompt</TableCell>
                            {versions.map(version => (
                                <TableCell key={version} align="center" sx={{ fontWeight: 'bold', border: 0 }}>
                                    Version {version}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prompts.map(prompt => (
                            <TableRow key={prompt}>
                                <TableCell component="th" scope="row" sx={{ verticalAlign: 'top', width: '25%', border: 0 }}>
                                    <Typography variant="body2">{prompt}</Typography>
                                </TableCell>
                                {versions.map(version => {
                                    const run = runsByPromptVersion.get(`${prompt}-${version}`);
                                    return (
                                        <TableCell key={version} sx={{ verticalAlign: 'top', border: 0, p: 0.5 }}>
                                            {run ? (
                                                <Card variant="outlined" sx={{height: '100%'}}>
                                                    <CardContent>
                                                        <Typography variant="body2" gutterBottom sx={{ 
                                                            display: '-webkit-box',
                                                            '-webkit-line-clamp': '5',
                                                            '-webkit-box-orient': 'vertical',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            minHeight: '80px'
                                                        }}>
                                                            {run.output}
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant="caption">Faithfulness:</Typography>
                                                            <Typography variant="caption">{run.faithfulness ?? 'N/A'}</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant="caption">Answer Relevancy:</Typography>
                                                            <Typography variant="caption">{run.answer_relevancy ?? 'N/A'}</Typography>
                                                        </Box>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant="caption">Tokens:</Typography>
                                                            <Typography variant="caption">{run.tokens}</Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <Typography variant="caption">Cost:</Typography>
                                                            <Typography variant="caption">${run.cost?.toFixed(4) ?? 'N/A'}</Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            ) : (
                                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                                                    <Typography variant="caption" color="text.secondary" align="center">
                                                        No data
                                                    </Typography>
                                                </Box>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}; 