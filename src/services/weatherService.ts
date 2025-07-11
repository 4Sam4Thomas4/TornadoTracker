import axios from 'axios'
import { TornadoWarning, WeatherData } from '../types'

// Note: In a real application, you would use actual weather APIs
// For this portfolio project, we'll use mock data

const mockWarnings: TornadoWarning[] = [
  {
    id: '1',
    type: 'tornado_warning',
    status: 'active',
    title: 'Tornado Warning for Central Oklahoma',
    description: 'A tornado warning has been issued for central Oklahoma. Take shelter immediately.',
    severity: 'extreme',
    areas: ['Oklahoma County', 'Cleveland County'],
    coordinates: [
      { lat: 35.4676, lng: -97.5164 },
      { lat: 35.4676, lng: -97.4164 },
      { lat: 35.3676, lng: -97.4164 },
      { lat: 35.3676, lng: -97.5164 }
    ],
    effective: '2024-01-15T14:30:00Z',
    expires: '2024-01-15T15:30:00Z',
    state: 'OK',
    county: 'Oklahoma'
  },
  {
    id: '2',
    type: 'tornado_watch',
    status: 'active',
    title: 'Tornado Watch for Eastern Kansas',
    description: 'Conditions are favorable for tornado development in eastern Kansas.',
    severity: 'severe',
    areas: ['Johnson County', 'Wyandotte County'],
    coordinates: [
      { lat: 38.8858, lng: -94.8234 },
      { lat: 38.8858, lng: -94.7234 },
      { lat: 38.7858, lng: -94.7234 },
      { lat: 38.7858, lng: -94.8234 }
    ],
    effective: '2024-01-15T13:00:00Z',
    expires: '2024-01-15T18:00:00Z',
    state: 'KS',
    county: 'Johnson'
  },
  {
    id: '3',
    type: 'severe_thunderstorm_warning',
    status: 'active',
    title: 'Severe Thunderstorm Warning for Northern Texas',
    description: 'Severe thunderstorms with potential for tornado development.',
    severity: 'moderate',
    areas: ['Dallas County', 'Collin County'],
    coordinates: [
      { lat: 32.7767, lng: -96.7970 },
      { lat: 32.7767, lng: -96.6970 },
      { lat: 32.6767, lng: -96.6970 },
      { lat: 32.6767, lng: -96.7970 }
    ],
    effective: '2024-01-15T15:00:00Z',
    expires: '2024-01-15T16:00:00Z',
    state: 'TX',
    county: 'Dallas'
  }
]

export const weatherService = {
  async getTornadoWarnings(state?: string): Promise<TornadoWarning[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (state) {
      return mockWarnings.filter(warning => warning.state === state)
    }
    return mockWarnings
  },

  async getWeatherData(lat: number, lng: number): Promise<WeatherData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return {
      temperature: 72 + Math.random() * 20,
      humidity: 60 + Math.random() * 30,
      windSpeed: 10 + Math.random() * 30,
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      pressure: 29.5 + Math.random() * 2,
      visibility: 5 + Math.random() * 10
    }
  },

  async getStates(): Promise<string[]> {
    return [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ]
  }
} 