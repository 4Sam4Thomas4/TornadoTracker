export interface TornadoWarning {
  id: string
  type: 'tornado_warning' | 'tornado_watch' | 'severe_thunderstorm_warning'
  status: 'active' | 'expired'
  title: string
  description: string
  severity: 'extreme' | 'severe' | 'moderate' | 'minor'
  areas: string[]
  coordinates: {
    lat: number
    lng: number
  }[]
  effective: string
  expires: string
  state: string
  county: string
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  url: string
  publishedAt: string
  source: string
  imageUrl?: string
}

export interface SafetyTip {
  id: string
  title: string
  description: string
  category: 'before' | 'during' | 'after'
  icon: string
}

export interface Video {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  duration: string
  source: string
}

export interface TornadoFact {
  id: string
  fact: string
  category: 'science' | 'history' | 'records' | 'safety'
  source?: string
}

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: string
  pressure: number
  visibility: number
} 