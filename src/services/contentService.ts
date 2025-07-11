import { NewsArticle, SafetyTip, Video, TornadoFact } from '../types'

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Record-Breaking Tornado Season Predicted for 2024',
    description: 'Meteorologists are forecasting an above-average tornado season with increased activity in the traditional Tornado Alley region.',
    url: '#',
    publishedAt: '2024-01-15T10:00:00Z',
    source: 'Weather Channel',
    imageUrl: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400'
  },
  {
    id: '2',
    title: 'New Tornado Detection Technology Saves Lives',
    description: 'Advanced radar systems and AI-powered prediction models are improving tornado warning times by up to 15 minutes.',
    url: '#',
    publishedAt: '2024-01-14T15:30:00Z',
    source: 'Science Daily',
    imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400'
  },
  {
    id: '3',
    title: 'Community Storm Shelters: A Growing Trend',
    description: 'More communities are investing in public storm shelters as tornado frequency increases across the United States.',
    url: '#',
    publishedAt: '2024-01-13T09:15:00Z',
    source: 'Emergency Management',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400'
  }
]

const mockSafetyTips: SafetyTip[] = [
  {
    id: '1',
    title: 'Before a Tornado',
    description: 'Have a plan and know where to take shelter. Keep emergency supplies ready including water, food, and a weather radio.',
    category: 'before',
    icon: '🏠'
  },
  {
    id: '2',
    title: 'During a Tornado',
    description: 'Go to the lowest level of your home, away from windows. Cover yourself with blankets or mattresses for protection.',
    category: 'during',
    icon: '🛡️'
  },
  {
    id: '3',
    title: 'After a Tornado',
    description: 'Check for injuries and damage. Avoid downed power lines and damaged buildings. Listen to local officials for guidance.',
    category: 'after',
    icon: '🚨'
  },
  {
    id: '4',
    title: 'Emergency Kit Essentials',
    description: 'Include water, non-perishable food, first aid supplies, flashlight, batteries, and important documents.',
    category: 'before',
    icon: '📦'
  },
  {
    id: '5',
    title: 'Stay Informed',
    description: 'Have multiple ways to receive weather alerts: weather radio, phone apps, and local news stations.',
    category: 'before',
    icon: '📻'
  },
  {
    id: '6',
    title: 'Safe Room Design',
    description: 'Consider building or retrofitting a safe room that meets FEMA standards for maximum protection.',
    category: 'before',
    icon: '🏗️'
  }
]

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Tornado Formation Process',
    description: 'Educational video explaining how tornadoes form and develop from supercell thunderstorms.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=300',
    duration: '5:23',
    source: 'National Weather Service'
  },
  {
    id: '2',
    title: 'Tornado Safety Guidelines',
    description: 'Comprehensive guide on what to do before, during, and after a tornado.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300',
    duration: '8:45',
    source: 'FEMA'
  },
  {
    id: '3',
    title: 'Historic Tornado Footage',
    description: 'Rare footage of some of the most powerful tornadoes ever recorded.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300',
    duration: '12:30',
    source: 'Storm Chasers'
  },
  {
    id: '4',
    title: 'Tornado Alley Documentary',
    description: 'Documentary exploring the history and science of tornadoes in the central United States.',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=300',
    duration: '45:12',
    source: 'Discovery Channel'
  }
]

const mockFacts: TornadoFact[] = [
  {
    id: '1',
    fact: 'The fastest wind speed ever recorded in a tornado was 302 mph (486 km/h) in the 1999 Bridge Creek-Moore tornado.',
    category: 'records',
    source: 'National Weather Service'
  },
  {
    id: '2',
    fact: 'Tornadoes can occur on every continent except Antarctica.',
    category: 'science',
    source: 'NOAA'
  },
  {
    id: '3',
    fact: 'The United States experiences about 1,200 tornadoes annually, more than any other country.',
    category: 'records',
    source: 'Storm Prediction Center'
  },
  {
    id: '4',
    fact: 'Tornadoes can form in various weather conditions, not just during severe thunderstorms.',
    category: 'science',
    source: 'American Meteorological Society'
  },
  {
    id: '5',
    fact: 'The deadliest tornado in U.S. history was the 1925 Tri-State Tornado, which killed 695 people.',
    category: 'history',
    source: 'National Weather Service'
  },
  {
    id: '6',
    fact: 'Tornadoes can last from a few seconds to over an hour, with most lasting 5-10 minutes.',
    category: 'science',
    source: 'NOAA'
  },
  {
    id: '7',
    fact: 'The Enhanced Fujita Scale (EF-Scale) rates tornadoes from EF0 to EF5 based on damage.',
    category: 'science',
    source: 'National Weather Service'
  },
  {
    id: '8',
    fact: 'Tornadoes can travel at speeds up to 70 mph (113 km/h) across the ground.',
    category: 'science',
    source: 'Storm Prediction Center'
  }
]

export const contentService = {
  async getNews(): Promise<NewsArticle[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockNews
  },

  async getSafetyTips(): Promise<SafetyTip[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockSafetyTips
  },

  async getVideos(): Promise<Video[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockVideos
  },

  async getFacts(): Promise<TornadoFact[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockFacts
  }
} 