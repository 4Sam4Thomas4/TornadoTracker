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
  TextField,
  Stack,
  Paper,
  Divider,
  Link
} from '@mui/material'
import { 
  Article, 
  CalendarToday, 
  OpenInNew, 
  AccessTime,
  Email,
  CheckCircle
} from '@mui/icons-material'
import { contentService } from '../services/contentService'
import { NewsArticle } from '../types'

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await contentService.getNews()
        setNews(newsData)
      } catch (error) {
        console.error('Error loading news:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
          Tornado News
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay informed with the latest tornado-related news, research, and weather updates
        </Typography>
      </Box>

      {/* Featured News */}
      {news.length > 0 && (
        <Box mb={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Latest News
          </Typography>
          <Grid container spacing={3}>
            {news.map((article) => (
              <Grid item xs={12} lg={6} key={article.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {article.imageUrl && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={article.imageUrl}
                      alt={article.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <CalendarToday fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(article.publishedAt)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        •
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {article.source}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" component="h3" gutterBottom sx={{ flexGrow: 1 }}>
                      {article.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                      {article.description}
                    </Typography>
                    
                    <Box mt="auto">
                      <Button
                        component={Link}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<OpenInNew />}
                        variant="outlined"
                        size="small"
                      >
                        Read Full Article
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* News Categories */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: 'primary.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Article color="primary" />
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Weather Updates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Latest forecasts and severe weather predictions from meteorologists
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: 'success.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <AccessTime color="success" />
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Research & Science
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scientific discoveries and advancements in tornado prediction technology
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: 'secondary.100',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <OpenInNew color="secondary" />
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Community Impact
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stories about how communities prepare for and respond to tornado events
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* News Sources */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Trusted News Sources
          </Typography>
          <Grid container spacing={2}>
            {[
              'National Weather Service',
              'NOAA',
              'Storm Prediction Center',
              'Weather Channel',
              'AccuWeather',
              'Weather Underground',
              'American Meteorological Society',
              'Emergency Management'
            ].map((source) => (
              <Grid item xs={12} sm={6} md={3} key={source}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        bgcolor: 'primary.main',
                        borderRadius: '50%'
                      }}
                    />
                    <Typography variant="body2" fontWeight="medium">
                      {source}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card sx={{ 
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: 'white',
        mb: 4
      }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Stay Updated
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Get the latest tornado news and safety updates delivered to your inbox
          </Typography>
          <Box maxWidth="md" mx="auto">
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{ 
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'transparent' },
                    '&.Mui-focused fieldset': { borderColor: 'transparent' }
                  }
                }}
              />
              <Button
                variant="contained"
                sx={{ 
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' }
                }}
                startIcon={<Email />}
              >
                Subscribe
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ opacity: 0.75 }}>
              We respect your privacy. Unsubscribe at any time.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Additional Resources
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Government Agencies
                </Typography>
                <Stack spacing={1}>
                  <Link href="https://www.weather.gov" target="_blank" rel="noopener noreferrer" display="flex" alignItems="center" gap={1}>
                    <CheckCircle fontSize="small" color="primary" />
                    National Weather Service
                  </Link>
                  <Link href="https://www.noaa.gov" target="_blank" rel="noopener noreferrer" display="flex" alignItems="center" gap={1}>
                    <CheckCircle fontSize="small" color="primary" />
                    NOAA
                  </Link>
                  <Link href="https://www.spc.noaa.gov" target="_blank" rel="noopener noreferrer" display="flex" alignItems="center" gap={1}>
                    <CheckCircle fontSize="small" color="primary" />
                    Storm Prediction Center
                  </Link>
                  <Link href="https://www.fema.gov" target="_blank" rel="noopener noreferrer" display="flex" alignItems="center" gap={1}>
                    <CheckCircle fontSize="small" color="primary" />
                    FEMA
                  </Link>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Weather Organizations
                </Typography>
                <Stack spacing={1}>
                  <Link href="https://www.ametsoc.org" target="_blank" rel="noopener noreferrer" display="flex" alignItems="center" gap={1}>
                    <CheckCircle fontSize="small" color="primary" />
                    American Meteorological Society
                  </Link>
                  <Link href="https://www.weather.com" target="_blank" rel="noopener noreferrer" display="flex" alignItems="center" gap={1}>
                    <CheckCircle fontSize="small" color="primary" />
                    The Weather Channel
                  </Link>
                  <Link href="https://www.accuweather.com" target="_blank" rel="noopener noreferrer" display="flex" alignItems="center" gap={1}>
                    <CheckCircle fontSize="small" color="primary" />
                    AccuWeather
                  </Link>
                  <Link href="https://www.wunderground.com" target="_blank" rel="noopener noreferrer" display="flex" alignItems="center" gap={1}>
                    <CheckCircle fontSize="small" color="primary" />
                    Weather Underground
                  </Link>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default News 