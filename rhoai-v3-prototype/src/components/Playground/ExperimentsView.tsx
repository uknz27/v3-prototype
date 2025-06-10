import React, { useState, useMemo } from 'react';
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
    Checkbox,
    Toolbar,
    Button,
    Chip,
    Tooltip
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import { ComparisonView } from './ComparisonView';

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

const mockRunsData: Run[] = [
    // Prompt 1
    { id: 'run-001', prompt: "What is the capital of France?", output: "Paris is the capital of France. It is known for its art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.", version: 5, timestamp: '2024-07-22 14:30:15', tokens: 1250, cost: 0.015, faithfulness: 0.9, answer_relevancy: 0.8, status: 'Completed' },
    { id: 'run-002', prompt: "What is the capital of France?", output: "The capital of France is Paris.", version: 4, timestamp: '2024-07-22 11:05:42', tokens: 1100, cost: 0.012, faithfulness: 0.95, answer_relevancy: 0.82, status: 'Completed' },
    // Prompt 2
    { id: 'run-003', prompt: "Summarize the following text: The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.", output: "The Eiffel Tower, a wrought-iron tower in Paris, is named after its designer, Gustave Eiffel.", version: 5, timestamp: '2024-07-21 18:20:01', tokens: 1300, cost: 0.016, faithfulness: 0.8, answer_relevancy: 0.75, status: 'Completed' },
    { id: 'run-004', prompt: "Summarize the following text: The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.", output: "The Eiffel Tower is a tower in Paris named after Gustave Eiffel.", version: 4, timestamp: '2024-07-21 10:15:33', tokens: 950, cost: 0.009, faithfulness: 0.88, answer_relevancy: 0.85, status: 'Completed' },
    // Prompt 3
    { id: 'run-005', prompt: "Who wrote 'To Kill a Mockingbird'?", output: "Harper Lee wrote 'To Kill a Mockingbird'. The book was published in 1960 and was an immediate success.", version: 5, timestamp: '2024-07-20 16:45:19', tokens: 500, cost: 0.005, faithfulness: 0.9, answer_relevancy: 0.9, status: 'Completed' },
    { id: 'run-006', prompt: "Who wrote 'To Kill a Mockingbird'?", output: "'To Kill a Mockingbird' was written by Harper Lee.", version: 4, timestamp: '2024-07-20 16:40:19', tokens: 480, cost: 0.004, faithfulness: 0.92, answer_relevancy: 0.91, status: 'Completed' },
    // A failed run for variety
    { id: 'run-007', prompt: "Who wrote 'To Kill a Mockingbird'?", output: "", version: 3, timestamp: '2024-07-20 16:35:19', tokens: 100, cost: 0.001, faithfulness: null, answer_relevancy: null, status: 'Failed' },
];

const headCells = [
  { id: 'id', label: 'Run ID' },
  { id: 'prompt', label: 'Prompt' },
  { id: 'version', label: 'Version' },
  { id: 'timestamp', label: 'Timestamp' },
  { id: 'status', label: 'Status' },
  { id: 'faithfulness', label: 'Faithfulness' },
  { id: 'answer_relevancy', label: 'Answer Relevancy' },
  { id: 'tokens', label: 'Total Tokens' },
  { id: 'cost', label: 'Est. Cost ($)' },
];

const EnhancedTableToolbar = (props: { numSelected: number, onCompare: () => void }) => {
    const { numSelected, onCompare } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Run History
                </Typography>
            )}

            {numSelected > 1 ? (
                <Tooltip title="Compare selected runs">
                    <Button variant="contained" startIcon={<ScienceOutlinedIcon />} onClick={onCompare}>
                        Compare
                    </Button>
                </Tooltip>
            ) : (
                 <Button variant="contained" startIcon={<ScienceOutlinedIcon />} disabled>
                    Compare
                </Button>
            )}
        </Toolbar>
    );
};


export const ExperimentsView: React.FC = () => {
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [isComparing, setIsComparing] = useState(false);

    const handleCompare = () => {
        setIsComparing(true);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = mockRunsData.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    
    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    if (isComparing) {
        const selectedRuns = mockRunsData.filter(run => selected.includes(run.id));
        return <ComparisonView 
            runs={selectedRuns} 
            onBack={() => {
                setIsComparing(false);
                setSelected([]);
            }} 
        />;
    }

    return (
        <Paper sx={{ width: '100%', mb: 2 }} variant="outlined">
            <EnhancedTableToolbar numSelected={selected.length} onCompare={handleCompare} />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selected.length > 0 && selected.length < mockRunsData.length}
                                    checked={mockRunsData.length > 0 && selected.length === mockRunsData.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all runs' }}
                                />
                            </TableCell>
                            {headCells.map((headCell) => (
                                <TableCell key={headCell.id}>
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockRunsData.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </TableCell>
                                    <TableCell component="th" id={labelId} scope="row">{row.id}</TableCell>
                                    <TableCell>
                                        <Tooltip title={row.prompt}>
                                            <span>{row.prompt.length > 40 ? `${row.prompt.substring(0, 40)}...` : row.prompt}</span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>V{row.version}</TableCell>
                                    <TableCell>{row.timestamp}</TableCell>
                                    <TableCell>
                                        <Chip label={row.status} color={row.status === 'Completed' ? 'success' : 'error'} size="small"/>
                                    </TableCell>
                                    <TableCell>{row.faithfulness ?? 'N/A'}</TableCell>
                                    <TableCell>{row.answer_relevancy ?? 'N/A'}</TableCell>
                                    <TableCell>{row.tokens}</TableCell>
                                    <TableCell>{row.cost?.toFixed(4) ?? 'N/A'}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}; 