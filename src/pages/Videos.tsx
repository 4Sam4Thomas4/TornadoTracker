import { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia,
  Grid, 
  Chip, 
  Button,
  Stack,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  IconButton
} from '@mui/material'
import { 
  PlayArrow, 
  AccessTime, 
  OpenInNew, 
  FilterList,
  VideoLibrary,
  School,
  Security,
  History,
  Movie
} from '@mui/icons-material'
import { contentService } from '../services/contentService'
import { Video as VideoType } from '../types'

const Videos = () => {
  const [videos, setVideos] = useState<VideoType[]>([])
  const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All Videos', icon: VideoLibrary },
    { id: 'educational', name: 'Educational', icon: School },
    { id: 'safety', name: 'Safety', icon: Security },
    { id: 'footage', name: 'Historic Footage', icon: History },
    { id: 'documentary', name: 'Documentary', icon: Movie }
  ]

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videosData = await contentService.getVideos()
        setVideos(videosData)
        setFilteredVideos(videosData)
      } catch (error) {
        console.error('Error loading videos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVideos()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredVideos(videos)
    } else {
      const filtered = videos.filter(video => 
        video.title.toLowerCase().includes(selectedCategory) ||
        video.description.toLowerCase().includes(selectedCategory)
      )
      setFilteredVideos(filtered)
    }
  }, [selectedCategory, videos])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'educational':
        return 'primary'
      case 'safety':
        return 'success'
      case 'footage':
        return 'warning'
      case 'documentary':
        return 'secondary'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Tornado Videos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Educational videos, safety guides, and historic tornado footage
        </Typography>
      </Box>

      {/* Category Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <FilterList color="action" />
            <Typography variant="h6" component="h2">
              Filter by Category
            </Typography>
          </Box>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={(_, newValue) => newValue && setSelectedCategory(newValue)}
            aria-label="video categories"
            sx={{ flexWrap: 'wrap', gap: 1 }}
          >
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <ToggleButton key={category.id} value={category.id}>
                  <Icon sx={{ mr: 1 }} />
                  {category.name} ({videos.filter(video => 
                    category.id === 'all' ? true :
                    video.title.toLowerCase().includes(category.id) ||
                    video.description.toLowerCase().includes(category.id)
                  ).length})
                </ToggleButton>
              )
            })}
          </ToggleButtonGroup>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {filteredVideos.map((video) => (
          <Grid item xs={12} sm={6} lg={4} key={video.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={video.thumbnail}
                  alt={video.title}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 1 }
                  }}
                >
                  <Paper sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.9)' }}>
                    <PlayArrow color="primary" sx={{ fontSize: 32 }} />
                  </Paper>
                </Box>
                <Chip
                  label={video.duration}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.7)',
                    color: 'white'
                  }}
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ flexGrow: 1 }}>
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                  {video.description}
                </Typography>
                
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {video.duration}
                    </Typography>
                  </Box>
                  <Chip
                    label={video.source}
                    size="small"
                    color={getCategoryColor(video.source.toLowerCase()) as any}
                  />
                </Box>
                
                <Button
                  component="a"
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<OpenInNew />}
                  variant="outlined"
                  size="small"
                  fullWidth
                >
                  Watch Video
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredVideos.length === 0 && (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <VideoLibrary sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" component="h3" gutterBottom>
              No videos found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try selecting a different category or check back later for new content.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Featured Video Section */}
      {videos.length > 0 && (
        <Box mb={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Video
          </Typography>
          <Card>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={videos[0].thumbnail}
                    alt={videos[0].title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.9)' }}>
                      <PlayArrow color="primary" sx={{ fontSize: 48 }} />
                    </Paper>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {videos[0].title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                    {videos[0].description}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      {videos[0].source}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {videos[0].duration}
                    </Typography>
                  </Box>
                  <Button
                    component="a"
                    href={videos[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    startIcon={<PlayArrow />}
                    size="large"
                  >
                    Watch Featured Video
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Box>
      )}

      {/* Video Categories Info */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Educational Content
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Learn about tornado formation, meteorology, and weather patterns through expert-led educational videos.
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Meteorology" size="small" />
                <Chip label="Science" size="small" />
                <Chip label="Weather Patterns" size="small" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Safety & Preparedness
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Essential safety information and preparedness guides to help you stay safe during tornado events.
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Safety Tips" size="small" color="success" />
                <Chip label="Emergency Prep" size="small" color="success" />
                <Chip label="Shelter Info" size="small" color="success" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Videos 