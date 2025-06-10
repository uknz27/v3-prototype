import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Chip,
    ToggleButtonGroup,
    ToggleButton,
    Paper,
    Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const mcpsData = [
    {
        id: 1,
        icon: <CodeIcon fontSize="small" />,
        name: 'Claude API',
        provider: 'Anthropic',
        tag: 'Llm',
        tagColor: 'primary' as const,
        description: 'Access Claude models via MCP for natural language understanding and generation.',
        availableModels: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku', 'claude-2.1'],
        visitLink: 'https://www.anthropic.com/claude'
    },
    {
        id: 2,
        icon: <StorageIcon fontSize="small" />,
        name: 'Cohere Embed',
        provider: 'Cohere',
        tag: 'Embedding',
        tagColor: 'secondary' as const,
        description: 'High-quality embeddings for semantic search, text analysis, and retrieval-augmented generation.',
        availableModels: ['embed-english-v3.0', 'embed-multilingual-v3.0'],
        visitLink: 'https://cohere.com/embeddings'
    },
    {
        id: 3,
        icon: <CodeIcon fontSize="small" />,
        name: 'Mistral MCP',
        provider: 'Mistral AI',
        tag: 'Llm',
        tagColor: 'primary' as const,
        description: 'Access Mistral\'s efficient and powerful language models through the Model Context Protocol.',
        availableModels: ['mistral-large', 'mistral-medium', 'mistral-small'],
        visitLink: 'https://mistral.ai'
    },
    {
        id: 4,
        icon: <SmartDisplayOutlinedIcon fontSize="small" />,
        name: 'Gemini API',
        provider: 'Google',
        tag: 'Multimodal',
        tagColor: 'success' as const,
        description: 'Google\'s multimodal AI models accessible via MCP for various use-cases.',
        availableModels: ['gemini-pro', 'gemini-pro-vision', 'gemini-ultra'],
        visitLink: 'https://deepmind.google/technologies/gemini/'
    },
    {
        id: 5,
        icon: <StorageIcon fontSize="small" />,
        name: 'Jina Embeddings',
        provider: 'Jina AI',
        tag: 'Embedding',
        tagColor: 'secondary' as const,
        description: 'State-of-the-art embedding models for various languages and domains, ready for MCP.',
        availableModels: ['jina-embeddings-v2-base-en', 'jina-embeddings-v2-small-en', 'jina-embeddings-v2-pro-en'],
        visitLink: 'https://jina.ai/embeddings/'
    },
    {
        id: 6,
        icon: <ImageOutlinedIcon fontSize="small" />,
        name: 'Stability AI',
        provider: 'Stability AI',
        tag: 'Multimodal',
        tagColor: 'success' as const,
        description: 'Access to cutting-edge image generation and multimodal models through MCP.',
        availableModels: ['stable-diffusion-xl', 'stable-diffusion-3', 'stable-video'],
        visitLink: 'https://stability.ai/'
    },
];

export const ToolsPanel: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('discover');
    const [filter, setFilter] = useState('All');

    const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: string | null) => {
        if (newView !== null) setView(newView);
    };

    const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
        if (newFilter !== null) setFilter(newFilter);
    };

    const filteredServers = useMemo(() => {
        return mcpsData.filter(server => {
            const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) || server.provider.toLowerCase().includes(searchTerm.toLowerCase()) || server.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'All' || server.tag === filter;
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, filter]);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography variant="h5" gutterBottom>MCP Server Registry</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Discover and register Model Context Protocol servers from various providers.
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>Register New Server</Button>
            </Box>

            <ToggleButtonGroup color="primary" value={view} exclusive onChange={handleViewChange} sx={{ mb: 3 }}>
                <ToggleButton value="discover">Discover Servers</ToggleButton>
                <ToggleButton value="registered">Registered Servers</ToggleButton>
            </ToggleButtonGroup>

            {/* Search and Filter */}
            <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Find MCP Servers</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Search for available MCP servers from popular providers
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 8 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by name, provider, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                         <Button variant="contained" fullWidth sx={{py: '16.5px'}}>Search</Button>
                    </Grid>
                    <Grid size={12}>
                        <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange} size="small">
                            <ToggleButton value="All">All</ToggleButton>
                            <ToggleButton value="Llm">LLM</ToggleButton>
                            <ToggleButton value="Embedding">Embedding</ToggleButton>
                            <ToggleButton value="Multimodal">Multimodal</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            </Paper>

            {/* MCP Servers Grid */}
            <Grid container spacing={3}>
                {filteredServers.map((server) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={server.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'grey.200', color: 'text.primary', mr: 2 }}>
                                    {server.icon}
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>{server.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{server.provider}</Typography>
                                </Box>
                                <Chip label={server.tag} color={server.tagColor} size="small" />
                            </Box>
                            <CardContent sx={{ flexGrow: 1, p: '0 !important', mb: 2 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
                                    {server.description}
                                </Typography>
                                <Typography variant="subtitle2" component="div" sx={{ mb: 1 }}>Available Models:</Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {server.availableModels.slice(0, 3).map(model => (
                                        <Chip key={model} label={model} size="small" variant="outlined" />
                                    ))}
                                    {server.availableModels.length > 3 && (
                                        <Chip label={`+${server.availableModels.length - 3} more`} size="small" variant="outlined" />
                                    )}
                                </Box>
                            </CardContent>
                            <CardActions sx={{ p: 0, display: 'flex', justifyContent: 'space-between' }}>
                                <Button size="small" startIcon={<LaunchIcon />} href={server.visitLink} target="_blank">Visit</Button>
                                <Button size="small" variant="contained" startIcon={<AddIcon />}>Register</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}; 