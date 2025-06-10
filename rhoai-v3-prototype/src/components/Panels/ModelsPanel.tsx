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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    type SelectChangeEvent,
    useTheme,
    type Theme
} from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const modelsData = [
    { id: 1, name: 'meta-llama/Llama-2-7b-chat-hf', description: 'Llama 2 is a collection of pretrained and fine-tuned large language models (LLMs) from Meta.', downloads: '2.5M', stars: '12k', tags: ['Text Generation', 'Chat'] },
    { id: 2, name: 'tiiuae/falcon-7b-instruct', description: 'A 7B parameter causal decoder-only model built by TII and trained on 1,500B tokens of RefinedWeb.', downloads: '1.8M', stars: '8k', tags: ['Text Generation', 'Instruction'] },
    { id: 3, name: 'google/gemma-7b', description: 'Gemma is a family of lightweight, state-of-the-art open models built by Google DeepMind.', downloads: '1.2M', stars: '7.5k', tags: ['Text Generation'] },
    { id: 4, name: 'stabilityai/stable-diffusion-2-1', description: 'A latent text-to-image diffusion model capable of generating photo-realistic images given any text input.', downloads: '5M', stars: '25k', tags: ['Image Generation', 'Diffusion'] },
    { id: 5, name: 'openai/clip-vit-large-patch14', description: 'A model that can be used to score the similarity between an image and a text prompt.', downloads: '3M', stars: '15k', tags: ['Multimodal', 'Zero-Shot Classification'] },
    { id: 6, name: 'sentence-transformers/all-MiniLM-L6-v2', description: 'A sentence-transformers model: It maps sentences & paragraphs to a 384 dimensional dense vector space.', downloads: '10M', stars: '5k', tags: ['Sentence Similarity', 'Feature Extraction'] },
];

const allTags = [...new Set(modelsData.flatMap(m => m.tags))];

function getStyles(tag: string, selectedTags: readonly string[], theme: Theme) {
    return {
      fontWeight:
        selectedTags.indexOf(tag) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

export const ModelsPanel: React.FC = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagChange = (event: SelectChangeEvent<typeof selectedTags>) => {
        const { target: { value } } = event;
        setSelectedTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const filteredModels = useMemo(() => {
        return modelsData.filter(model => {
            const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || model.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => model.tags.includes(tag));
            return matchesSearch && matchesTags;
        });
    }, [searchTerm, selectedTags]);

    return (
        <Box>
            {/* Header and Controls */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>Model Hub</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Browse and select foundation models to add to your agent canvas.
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{xs: 12, md: 6}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Search models..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <FormControl fullWidth>
                            <InputLabel id="multiple-tags-label">Filter by Tags</InputLabel>
                            <Select
                                labelId="multiple-tags-label"
                                multiple
                                value={selectedTags}
                                onChange={handleTagChange}
                                input={<OutlinedInput label="Filter by Tags" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {allTags.map((tag) => (
                                    <MenuItem
                                        key={tag}
                                        value={tag}
                                        style={getStyles(tag, selectedTags, theme)}
                                    >
                                        {tag}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* Models Grid */}
            <Grid container spacing={2}>
                {filteredModels.map((model) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={model.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="div" sx={{ mb: 1, fontSize: '1rem' }}>
                                    {model.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {model.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                                    {model.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
                                </Box>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pt: 0}}>
                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', color: 'text.secondary' }}>
                                    <span style={{display: 'flex', alignItems: 'center'}}><StarOutlineIcon fontSize="small" sx={{mr: 0.5}} /> {model.stars}</span>
                                    <span style={{display: 'flex', alignItems: 'center'}}><FileDownloadOutlinedIcon fontSize="small" sx={{mr: 0.5}} /> {model.downloads}</span>
                                </Box>
                                <Button size="small" variant="outlined">
                                    Add to Canvas
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}; 