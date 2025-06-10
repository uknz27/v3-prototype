import React, { useState, useRef, useEffect } from 'react';
import { 
    Box, 
    TextField, 
    IconButton, 
    Paper, 
    List, 
    ListItem, 
    ListItemText, 
    Avatar,
    Typography,
    useTheme
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

interface Message {
    sender: 'user' | 'agent';
    text: string;
}

export const ChatWindow: React.FC = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'agent', text: "Hello! I'm Alpha Agent. How can I help you today?" }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (inputText.trim()) {
            const userMessage: Message = { sender: 'user', text: inputText.trim() };
            
            setMessages(prev => [...prev, userMessage]);
            setInputText('');

            setTimeout(() => {
                const agentResponse: Message = { sender: 'agent', text: `I have received your prompt: "${userMessage.text}". I am now processing it through the graph.` };
                setMessages(prev => [...prev, agentResponse]);
            }, 1000);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <Paper 
            variant="outlined" 
            sx={{ 
                border: 'none',
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                bgcolor: 'transparent'
            }}
        >
            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index}>
                            <Avatar 
                                sx={{ 
                                    bgcolor: msg.sender === 'user' ? 'primary.main' : 'secondary.main', 
                                    mr: 2 
                                }}
                            >
                                {msg.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                            </Avatar>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: msg.sender === 'user' ? theme.palette.grey[200] : theme.palette.grey[100],
                                    borderTopLeftRadius: msg.sender === 'user' ? 3 : 20,
                                    borderTopRightRadius: msg.sender === 'user' ? 20 : 3,
                                }}
                            >
                                <ListItemText 
                                    primary={msg.text} 
                                    primaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }} 
                                />
                            </Paper>
                        </ListItem>
                    ))}
                    <div ref={messagesEndRef} />
                </List>
            </Box>
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Prompt the agent..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        multiline
                        maxRows={5}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                '& fieldset': {
                                    borderColor: 'grey.300',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                    <IconButton color="primary" sx={{ ml: 1 }} onClick={handleSend} disabled={!inputText.trim()}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}; 