import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { Icon } from 'leaflet'
import { Box, Paper } from '@mui/material'
import { TornadoWarning } from '../types'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface TornadoMapProps {
  warnings: TornadoWarning[]
  selectedWarning?: TornadoWarning | null
  onWarningSelect?: (warning: TornadoWarning) => void
}

const TornadoMap = ({ warnings, onWarningSelect }: TornadoMapProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return '#dc2626' // red-600
      case 'severe':
        return '#ea580c' // orange-600
      case 'moderate':
        return '#ca8a04' // yellow-600
      case 'minor':
        return '#16a34a' // green-600
      default:
        return '#6b7280' // gray-500
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

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: { xs: 300, md: 500 },
        minWidth: 0,
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1, width: '100%' }}>
        <MapContainer
          center={[39.8283, -98.5795]} // Center of US
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {warnings.map((warning) => {
            const centerLat = warning.coordinates.reduce((sum, coord) => sum + coord.lat, 0) / warning.coordinates.length
            const centerLng = warning.coordinates.reduce((sum, coord) => sum + coord.lng, 0) / warning.coordinates.length
            
            return (
              <div key={warning.id}>
                {/* Warning area polygon */}
                <Polygon
                  positions={warning.coordinates}
                  pathOptions={{
                    color: getSeverityColor(warning.severity),
                    fillColor: getSeverityColor(warning.severity),
                    fillOpacity: 0.3,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => onWarningSelect?.(warning)
                  }}
                />
                
                {/* Warning marker */}
                <Marker
                  position={[centerLat, centerLng]}
                  eventHandlers={{
                    click: () => onWarningSelect?.(warning)
                  }}
                >
                  <Popup>
                    <Box sx={{ p: 1, minWidth: 200 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box component="span" sx={{ fontSize: 24 }}>
                          {getWarningTypeIcon(warning.type)}
                        </Box>
                        <Box>
                          <Box
                            component="h3"
                            sx={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              margin: 0,
                            }}
                          >
                            {warning.title}
                          </Box>
                          <Box
                            component="p"
                            sx={{
                              fontSize: '0.75rem',
                              color: 'text.secondary',
                              margin: 0,
                            }}
                          >
                            {warning.state} - {warning.county}
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        component="p"
                        sx={{
                          fontSize: '0.75rem',
                          mb: 1,
                          margin: 0,
                        }}
                      >
                        {warning.description}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.75rem',
                          color: 'text.secondary',
                        }}
                      >
                        <span>Severity: {warning.severity}</span>
                        <span>Status: {warning.status}</span>
                      </Box>
                    </Box>
                  </Popup>
                </Marker>
              </div>
            )
          })}
        </MapContainer>
      </Box>
    </Paper>
  )
}

export default TornadoMap 