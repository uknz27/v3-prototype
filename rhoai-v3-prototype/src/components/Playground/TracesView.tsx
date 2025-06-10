import React from 'react';
import {
    Box,
    Typography,
    Paper
} from '@mui/material';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot
} from '@mui/lab';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const traceEvents = [
    {
        time: '14:21:01.123',
        type: 'Agent Start',
        icon: <PlayCircleOutlineIcon />,
        color: 'grey' as const,
        details: 'Agentic system initiated with user prompt.'
    },
    {
        time: '14:21:01.345',
        type: 'Tool Call',
        icon: <BuildOutlinedIcon />,
        color: 'primary' as const,
        details: {
            tool: 'file_search',
            params: { query: 'MiddlePanel.tsx' }
        }
    },
    {
        time: '14:21:01.567',
        type: 'Tool Output',
        icon: <BuildOutlinedIcon />,
        color: 'primary' as const,
        details: 'Found 1 file: src/components/Playground/MiddlePanel.tsx'
    },
    {
        time: '14:21:01.890',
        type: 'LLM Request',
        icon: <PsychologyOutlinedIcon />,
        color: 'secondary' as const,
        details: 'Sent prompt to model `claude-3-sonnet` to determine next step.'
    },
    {
        time: '14:21:02.500',
        type: 'LLM Response',
        icon: <PsychologyOutlinedIcon />,
        color: 'secondary' as const,
        details: 'LLM decided to read the file `MiddlePanel.tsx`.'
    },
     {
        time: '14:21:02.650',
        type: 'Tool Call',
        icon: <BuildOutlinedIcon />,
        color: 'primary' as const,
        details: {
            tool: 'read_file',
            params: { target_file: 'src/components/Playground/MiddlePanel.tsx' }
        }
    },
    {
        time: '14:21:02.800',
        type: 'Tool Output',
        icon: <BuildOutlinedIcon />,
        color: 'primary' as const,
        details: 'Successfully read file content (150 lines).'
    },
    {
        time: '14:21:03.100',
        type: 'Agent End',
        icon: <CheckCircleOutlineIcon />,
        color: 'success' as const,
        details: 'Agent finished execution run successfully.'
    }
];

export const TracesView: React.FC = () => {
    return (
        <Timeline position="right" sx={{py:0, px:2}}>
            {traceEvents.map((event, index) => (
                <TimelineItem key={index} sx={{ '&:before': { content: 'none' } }}>
                     <TimelineSeparator>
                        <TimelineDot color={event.color} variant="outlined">
                            {event.icon}
                        </TimelineDot>
                        {index < traceEvents.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant="h6" component="span">{event.type}</Typography>
                                <Typography variant="caption" color="text.secondary">{event.time}</Typography>
                            </Box>
                            
                            {typeof event.details === 'string' ? (
                                <Typography variant="body2" sx={{mt:1}}>{event.details}</Typography>
                            ) : (
                                <Paper variant="outlined" sx={{ p: 1.5, mt: 1, backgroundColor: 'grey.50' }}>
                                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.8rem' }}>
                                        <code>
                                            {JSON.stringify(event.details, null, 2)}
                                        </code>
                                    </pre>
                                </Paper>
                            )}
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    );
}; 