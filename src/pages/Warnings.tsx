import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
  Container,
} from '@mui/material'
import {
  Filter,
  Warning,
  AccessTime,
  LocationOn,
} from '@mui/icons-material'
import { weatherService } from '../services/weatherService'
import { TornadoWarning } from '../types'
import TornadoMap from '../components/TornadoMap'

const Warnings = () => {
  const [warnings, setWarnings] = useState<TornadoWarning[]>([])
  const [filteredWarnings, setFilteredWarnings] = useState<TornadoWarning[]>([])
  const [states, setStates] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedWarning, setSelectedWarning] = useState<TornadoWarning | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [warningsData, statesData] = await Promise.all([
          weatherService.getTornadoWarnings(),
          weatherService.getStates()
        ])
        setWarnings(warningsData)
        setFilteredWarnings(warningsData)
        setStates(statesData)
      } catch (error) {
        console.error('Error loading warnings:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (selectedState) {
      const filtered = warnings.filter(warning => warning.state === selectedState)
      setFilteredWarnings(filtered)
    } else {
      setFilteredWarnings(warnings)
    }
  }, [selectedState, warnings])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'error'
      case 'severe':
        return 'warning'
      case 'moderate':
        return 'info'
      case 'minor':
        return 'success'
      default:
        return 'default'
    }
  }

  const getWarningTypeIcon = (type: string) => {
    switch (type) {
      case 'tornado_warning':
        return '🌪️'
      case 'tornado_watch':
        return '⚠️'
      case 'severe_thunderstorm_warning':
        return '⚡'
      default:
        return '🌩️'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Tornado Warnings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track active tornado warnings and watches across the United States
          </Typography>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Filter sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Filter by State:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>State</InputLabel>
              <Select
                value={selectedState}
                label="State"
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <MenuItem value="">All States</MenuItem>
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary">
              {filteredWarnings.length} warning{filteredWarnings.length !== 1 ? 's' : ''} found
            </Typography>
          </Box>
        </Paper>

        <Grid container spacing={2}>
          {/* Map */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
              Interactive Map
            </Typography>
            <TornadoMap
              warnings={filteredWarnings}
              selectedWarning={selectedWarning}
              onWarningSelect={setSelectedWarning}
            />
          </Grid>

          {/* Warnings List */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
              Active Warnings
            </Typography>
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {filteredWarnings.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Warning sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                  <Typography color="text.secondary">
                    No active warnings found for the selected criteria.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {filteredWarnings.map((warning) => (
                    <Card
                      key={warning.id}
                      sx={{
                        cursor: 'pointer',
                        transition: 'box-shadow 0.2s',
                        '&:hover': {
                          boxShadow: 4,
                        },
                        ...(selectedWarning?.id === warning.id && {
                          border: 2,
                          borderColor: 'primary.main',
                        }),
                      }}
                      onClick={() => setSelectedWarning(warning)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h4" component="span">
                              {getWarningTypeIcon(warning.type)}
                            </Typography>
                            <Box>
                              <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                                {warning.title}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationOn sx={{ fontSize: 16 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {warning.state} - {warning.county}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Chip
                            label={warning.severity}
                            color={getSeverityColor(warning.severity) as any}
                            size="small"
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {warning.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTime sx={{ fontSize: 16 }} />
                            <Typography variant="caption" color="text.secondary">
                              Effective: {formatDate(warning.effective)}
                            </Typography>
                          </Box>
                          <Chip
                            label={warning.status}
                            color={warning.status === 'active' ? 'success' : 'default'}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Selected Warning Details */}
        {selectedWarning && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
              Warning Details
            </Typography>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Typography variant="h3" component="span">
                    {getWarningTypeIcon(selectedWarning.type)}
                  </Typography>
                  <Box>
                    <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold' }}>
                      {selectedWarning.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {selectedWarning.state} - {selectedWarning.county}
                    </Typography>
                  </Box>
                </Box>
                
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="h4" sx={{ mb: 1, fontWeight: 600 }}>
                      Description
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                      {selectedWarning.description}
                    </Typography>
                    
                    <Typography variant="h6" component="h4" sx={{ mb: 1, fontWeight: 600 }}>
                      Affected Areas
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedWarning.areas.map((area, index) => (
                        <Chip key={index} label={area} size="small" />
                      ))}
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" component="h4" sx={{ mb: 1, fontWeight: 600 }}>
                      Timing
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Effective:</strong> {formatDate(selectedWarning.effective)}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Expires:</strong> {formatDate(selectedWarning.expires)}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" component="h4" sx={{ mb: 1, fontWeight: 600 }}>
                      Details
                    </Typography>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Type:</strong> {selectedWarning.type.replace('_', ' ')}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Severity:</strong> {selectedWarning.severity}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> {selectedWarning.status}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Warnings 