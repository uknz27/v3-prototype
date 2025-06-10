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

const datasetsData = [
    { id: 1, name: 'stanfordnlp/squad', description: 'The Stanford Question Answering Dataset (SQuAD) is a reading comprehension dataset.', downloads: '4.1M', stars: '2.1k', tags: ['Question Answering', 'Text'] },
    { id: 2, name: 'cifar10', description: 'The CIFAR-10 dataset consists of 60000 32x32 colour images in 10 classes, with 6000 images per class.', downloads: '8.2M', stars: '1.5k', tags: ['Image Classification'] },
    { id: 3, name: 'imdb', description: 'A large movie review dataset for binary sentiment classification.', downloads: '3.5M', stars: '1.8k', tags: ['Text Classification', 'Sentiment'] },
    { id: 4, name: 'glue', description: 'The General Language Understanding Evaluation (GLUE) benchmark is a collection of tools for evaluating models.', downloads: '2.2M', stars: '1.9k', tags: ['Benchmark', 'Natural Language Understanding'] },
    { id: 5, name: 'wikiann', description: 'A dataset for cross-lingual Named Entity Recognition in 282 languages.', downloads: '980k', stars: '950', tags: ['Token Classification', 'NER'] },
    { id: 6, name: 'mozilla-foundation/common_voice_11_0', description: 'Common Voice is a massive multi-language dataset of voices that anyone can use to train speech-enabled applications.', downloads: '1.1M', stars: '1.2k', tags: ['Speech Recognition', 'Audio'] },
];

const allTags = [...new Set(datasetsData.flatMap(d => d.tags))];

function getStyles(tag: string, selectedTags: readonly string[], theme: Theme) {
    return {
      fontWeight:
        selectedTags.indexOf(tag) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

export const DataPanel: React.FC = () => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagChange = (event: SelectChangeEvent<typeof selectedTags>) => {
        const { target: { value } } = event;
        setSelectedTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const filteredDatasets = useMemo(() => {
        return datasetsData.filter(dataset => {
            const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) || dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => dataset.tags.includes(tag));
            return matchesSearch && matchesTags;
        });
    }, [searchTerm, selectedTags]);

    return (
        <Box>
            {/* Header and Controls */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>Data Hub</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Browse and select datasets to add to your agent's context.
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{xs: 12, md: 6}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Search datasets..."
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

            {/* Datasets Grid */}
            <Grid container spacing={2}>
                {filteredDatasets.map((dataset) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dataset.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="div" sx={{ mb: 1, fontSize: '1rem' }}>
                                    {dataset.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {dataset.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                                    {dataset.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
                                </Box>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, pt: 0}}>
                                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', color: 'text.secondary' }}>
                                    <span style={{display: 'flex', alignItems: 'center'}}><StarOutlineIcon fontSize="small" sx={{mr: 0.5}} /> {dataset.stars}</span>
                                    <span style={{display: 'flex', alignItems: 'center'}}><FileDownloadOutlinedIcon fontSize="small" sx={{mr: 0.5}} /> {dataset.downloads}</span>
                                </Box>
                                <Button size="small" variant="outlined">
                                    Add to Context
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}; 