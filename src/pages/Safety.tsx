import { useState, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  Alert, 
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Paper,
  Stack
} from '@mui/material'
import { 
  Shield, 
  Warning, 
  Phone, 
  Radio, 
  Home, 
  DirectionsCar, 
  School,
  CheckCircle,
  Info
} from '@mui/icons-material'
import { contentService } from '../services/contentService'
import { SafetyTip } from '../types'

const Safety = () => {
  const [safetyTips, setSafetyTips] = useState<SafetyTip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSafetyTips = async () => {
      try {
        const tips = await contentService.getSafetyTips()
        setSafetyTips(tips)
      } catch (error) {
        console.error('Error loading safety tips:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSafetyTips()
  }, [])

  const getCategoryTips = (category: string) => {
    return safetyTips.filter(tip => tip.category === category)
  }

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', icon: Phone, color: 'error' },
    { name: 'National Weather Service', number: '1-800-621-3362', icon: Radio, color: 'primary' },
    { name: 'FEMA Helpline', number: '1-800-621-3362', icon: Shield, color: 'info' },
    { name: 'Red Cross', number: '1-800-RED-CROSS', icon: Warning, color: 'warning' }
  ]

  const emergencyKit = [
    'Water (1 gallon per person per day)',
    'Non-perishable food (3-day supply)',
    'First aid kit',
    'Flashlight with extra batteries',
    'Weather radio (NOAA)',
    'Whistle to signal for help',
    'Dust mask or cotton t-shirt',
    'Plastic sheeting and duct tape',
    'Wrench or pliers to turn off utilities',
    'Manual can opener',
    'Local maps',
    'Cell phone with chargers',
    'Important documents in waterproof container'
  ]

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
          Tornado Safety Guidelines
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Essential information to keep you and your family safe during tornado events
        </Typography>
      </Box>

      {/* Emergency Alert */}
      <Alert severity="error" sx={{ mb: 4 }}>
        <AlertTitle>Emergency Information</AlertTitle>
        If you are under a tornado warning, seek shelter immediately in a basement, storm cellar, 
        or interior room on the lowest floor. Stay away from windows and cover yourself with blankets or mattresses.
      </Alert>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={4}>
            {/* Before a Tornado */}
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <Home color="primary" />
                  <Typography variant="h5" component="h2">
                    Before a Tornado
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {getCategoryTips('before').map((tip) => (
                    <Grid item xs={12} md={6} key={tip.id}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Box display="flex" alignItems="flex-start" gap={2}>
                            <Box sx={{ fontSize: '2rem' }}>{tip.icon}</Box>
                            <Box>
                              <Typography variant="h6" component="h3" gutterBottom>
                                {tip.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {tip.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* During a Tornado */}
            <Card sx={{ borderColor: 'error.main' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <Warning color="error" />
                  <Typography variant="h5" component="h2">
                    During a Tornado
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {getCategoryTips('during').map((tip) => (
                    <Grid item xs={12} md={6} key={tip.id}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          height: '100%',
                          borderColor: 'error.light',
                          bgcolor: 'error.50'
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="flex-start" gap={2}>
                            <Box sx={{ fontSize: '2rem' }}>{tip.icon}</Box>
                            <Box>
                              <Typography variant="h6" component="h3" gutterBottom>
                                {tip.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {tip.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* After a Tornado */}
            <Card sx={{ borderColor: 'success.main' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <Shield color="success" />
                  <Typography variant="h5" component="h2">
                    After a Tornado
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {getCategoryTips('after').map((tip) => (
                    <Grid item xs={12} md={6} key={tip.id}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          height: '100%',
                          borderColor: 'success.light',
                          bgcolor: 'success.50'
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="flex-start" gap={2}>
                            <Box sx={{ fontSize: '2rem' }}>{tip.icon}</Box>
                            <Box>
                              <Typography variant="h6" component="h3" gutterBottom>
                                {tip.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {tip.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Emergency Contacts */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Emergency Contacts
                </Typography>
                <Stack spacing={2}>
                  {emergencyContacts.map((contact) => {
                    const Icon = contact.icon
                    return (
                      <Paper key={contact.name} variant="outlined" sx={{ p: 2 }}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Icon color={contact.color as any} />
                          <Box>
                            <Typography variant="subtitle2" fontWeight="medium">
                              {contact.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {contact.number}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    )
                  })}
                </Stack>
              </CardContent>
            </Card>

            {/* Emergency Kit */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Emergency Kit Checklist
                </Typography>
                <List dense>
                  {emergencyKit.map((item, index) => (
                    <ListItem key={index} dense>
                      <ListItemIcon>
                        <Checkbox size="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Shelter Locations */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Safe Shelter Locations
                </Typography>
                <Stack spacing={2}>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'success.50' }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Home color="success" />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          Home
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Basement or interior room
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'info.50' }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <School color="info" />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          Public Buildings
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Schools, libraries, community centers
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'warning.50' }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <DirectionsCar color="warning" />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          Vehicle (Last Resort)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Only if no shelter available
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Safety 