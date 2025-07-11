import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  Container,
  Avatar,
  Grid,
} from '@mui/material'
import {
  Cloud,
  Shield,
  Newspaper,
  PlayArrow,
  Lightbulb,
  Map,
  Warning,
} from '@mui/icons-material'

const Home = () => {
  const features = [
    {
      title: 'Live Tornado Warnings',
      description: 'Track active tornado warnings and watches across the United States with real-time updates.',
      icon: Warning,
      path: '/warnings',
      color: '#f44336'
    },
    {
      title: 'Interactive Map',
      description: 'View tornado warnings on an interactive map with detailed information and safety alerts.',
      icon: Map,
      path: '/warnings',
      color: '#2196f3'
    },
    {
      title: 'Safety Guidelines',
      description: 'Learn essential tornado safety tips and emergency procedures to protect yourself and your family.',
      icon: Shield,
      path: '/safety',
      color: '#4caf50'
    },
    {
      title: 'Latest News',
      description: 'Stay informed with the latest tornado-related news, research, and weather updates.',
      icon: Newspaper,
      path: '/news',
      color: '#9c27b0'
    },
    {
      title: 'Educational Videos',
      description: 'Watch informative videos about tornado formation, safety, and storm chasing.',
      icon: PlayArrow,
      path: '/videos',
      color: '#ff9800'
    },
    {
      title: 'Tornado Facts',
      description: 'Discover fascinating facts about tornadoes, their history, and scientific explanations.',
      icon: Lightbulb,
      path: '/facts',
      color: '#ffc107'
    }
  ]

  const stats = [
    { value: '1,200+', label: 'Annual Tornadoes in US' },
    { value: '15 min', label: 'Average Warning Time' },
    { value: '50 states', label: 'Tornado Risk Areas' },
    { value: '24/7', label: 'Monitoring Available' },
  ]

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
            }}
          >
            <Cloud sx={{ fontSize: 40, color: 'white' }} />
          </Avatar>
        </Box>
        <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Tornado Tracker
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Your comprehensive resource for tornado warnings, safety information, and educational content. 
          Stay informed and stay safe with real-time tracking and expert guidance.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/warnings"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            View Active Warnings
          </Button>
          <Button
            component={Link}
            to="/safety"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Safety Guidelines
          </Button>
        </Box>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Grid item xs={12} md={6} lg={4} key={feature.title}>
              <Card
                component={Link}
                to={feature.path}
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'box-shadow 0.2s',
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: feature.color,
                        width: 48,
                        height: 48,
                      }}
                    >
                      <Icon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* Quick Stats */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
          Quick Facts
        </Typography>
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Call to Action */}
      <Paper
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
          color: 'white',
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Stay Safe, Stay Informed
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Don't wait for a tornado warning to prepare. Learn about tornado safety now and 
          make sure you have a plan in place for you and your family.
        </Typography>
        <Button
          component={Link}
          to="/safety"
          variant="contained"
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Learn Safety Guidelines
        </Button>
      </Paper>
    </Container>
  )
}

export default Home 