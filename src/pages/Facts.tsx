import { useState, useEffect } from 'react'
import { Lightbulb, BookOpen, TrendingUp, Award, Filter, RefreshCw } from 'lucide-react'
import { contentService } from '../services/contentService'
import { TornadoFact } from '../types'

const Facts = () => {
  const [facts, setFacts] = useState<TornadoFact[]>([])
  const [filteredFacts, setFilteredFacts] = useState<TornadoFact[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [randomFact, setRandomFact] = useState<TornadoFact | null>(null)

  const categories = [
    { id: 'all', name: 'All Facts', icon: BookOpen },
    { id: 'science', name: 'Science', icon: Lightbulb },
    { id: 'history', name: 'History', icon: BookOpen },
    { id: 'records', name: 'Records', icon: Award },
    { id: 'safety', name: 'Safety', icon: TrendingUp }
  ]

  useEffect(() => {
    const loadFacts = async () => {
      try {
        const factsData = await contentService.getFacts()
        setFacts(factsData)
        setFilteredFacts(factsData)
        setRandomFact(factsData[Math.floor(Math.random() * factsData.length)])
      } catch (error) {
        console.error('Error loading facts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFacts()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredFacts(facts)
    } else {
      const filtered = facts.filter(fact => fact.category === selectedCategory)
      setFilteredFacts(filtered)
    }
  }, [selectedCategory, facts])

  const getRandomFact = () => {
    const random = facts[Math.floor(Math.random() * facts.length)]
    setRandomFact(random)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'science':
        return '🔬'
      case 'history':
        return '📚'
      case 'records':
        return '🏆'
      case 'safety':
        return '🛡️'
      default:
        return '💡'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'science':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'history':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'records':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'safety':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tornado-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tornado Facts</h1>
        <p className="text-gray-600">Discover fascinating facts about tornadoes, their history, and scientific explanations</p>
      </div>

      {/* Random Fact of the Day */}
      {randomFact && (
        <div className="bg-gradient-to-r from-tornado-600 to-tornado-700 rounded-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Fact of the Day</h2>
            <button
              onClick={getRandomFact}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              New Fact
            </button>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-4xl">{getCategoryIcon(randomFact.category)}</span>
            <div>
              <p className="text-lg mb-2">{randomFact.fact}</p>
              {randomFact.source && (
                <p className="text-sm opacity-75">Source: {randomFact.source}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Filter by Category</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-tornado-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Facts Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {filteredFacts.map((fact) => (
          <div key={fact.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{getCategoryIcon(fact.category)}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(fact.category)}`}>
                    {fact.category}
                  </span>
                  {fact.source && (
                    <span className="text-xs text-gray-500">• {fact.source}</span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{fact.fact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFacts.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No facts found</h3>
          <p className="text-gray-600">Try selecting a different category or check back later for new facts.</p>
        </div>
      )}

      {/* Fact Categories Info */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Science</h3>
          <p className="text-gray-600 text-sm">
            Meteorological and scientific explanations about tornado formation and behavior
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">History</h3>
          <p className="text-gray-600 text-sm">
            Historical tornado events and their impact on communities and society
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Records</h3>
          <p className="text-gray-600 text-sm">
            Record-breaking tornadoes and extreme weather phenomena
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety</h3>
          <p className="text-gray-600 text-sm">
            Important safety information and survival statistics
          </p>
        </div>
      </div>

      {/* Interactive Quiz Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Your Knowledge</h2>
        <p className="text-gray-600 mb-6">
          How much do you know about tornadoes? Take our interactive quiz to test your knowledge!
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-tornado-600 mb-2">10</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-tornado-600 mb-2">5 min</div>
            <div className="text-sm text-gray-600">Average Time</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-tornado-600 mb-2">4</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="btn-primary">Start Quiz</button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-tornado-600 to-tornado-700 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Share Your Knowledge</h2>
        <p className="text-lg mb-6 opacity-90">
          Have an interesting tornado fact to share? We'd love to hear from you and add it to our collection!
        </p>
        <button className="bg-white text-tornado-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
          Submit a Fact
        </button>
      </div>
    </div>
  )
}

export default Facts 