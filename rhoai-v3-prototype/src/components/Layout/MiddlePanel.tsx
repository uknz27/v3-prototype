import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { ChatWindow } from '../Chat/ChatWindow';
import { TracesView } from '../Playground/TracesView';
import { EvalsView } from '../Playground/EvalsView';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`middle-tabpanel-${index}`}
      aria-labelledby={`middle-tab-${index}`}
      {...other}
      style={{ height: 'calc(100% - 48px)' }}
    >
      {value === index && (
        <Box sx={{ p: 0, height: '100%' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const MiddlePanel: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="prompts and configuration tabs">
                    <Tab icon={<QuestionAnswerIcon />} iconPosition="start" label="Prompts" id="middle-tab-0" aria-controls="middle-tabpanel-0" sx={{minHeight: '48px'}} />
                    <Tab icon={<TimelineIcon />} iconPosition="start" label="Traces" id="middle-tab-1" aria-controls="middle-tabpanel-1" sx={{minHeight: '48px'}}/>
                    <Tab icon={<AssessmentOutlinedIcon />} iconPosition="start" label="Evals" id="middle-tab-2" aria-controls="middle-tabpanel-2" sx={{minHeight: '48px'}}/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ChatWindow />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TracesView />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <EvalsView />
            </TabPanel>
        </Paper>
    );
}; 