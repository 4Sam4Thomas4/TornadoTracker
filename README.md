# Tornado Tracker

A comprehensive portfolio application for tracking tornado warnings and providing educational content about tornadoes across the United States.

## 🌪️ Features

### Live Tornado Warnings

- Real-time tracking of active tornado warnings and watches
- Interactive map with warning locations and severity levels
- State-by-state filtering capabilities
- Detailed warning information including affected areas and timing

### Interactive Map

- Built with React Leaflet for smooth map interactions
- Color-coded warning areas based on severity
- Click-to-view detailed warning information
- Responsive design for all device sizes

### Safety Guidelines

- Comprehensive tornado safety information
- Before, during, and after tornado procedures
- Emergency contact information
- Emergency kit checklist
- Safe shelter location guidance

### Educational Content

- Latest tornado news and research updates
- Educational videos about tornado formation and safety
- Fascinating tornado facts and historical information
- Interactive quiz functionality

## 🚀 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom tornado theme
- **Mapping**: React Leaflet with OpenStreetMap tiles
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router DOM for navigation
- **Build Tool**: Vite for fast development and building

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/4Sam4Thomas4/TornadoTracker.git
cd TornadoTracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx     # Navigation component
│   └── TornadoMap.tsx # Interactive map component
├── pages/              # Page components
│   ├── Home.tsx       # Landing page
│   ├── Warnings.tsx   # Tornado warnings page
│   ├── Safety.tsx     # Safety guidelines page
│   ├── News.tsx       # News articles page
│   ├── Videos.tsx     # Educational videos page
│   └── Facts.tsx      # Tornado facts page
├── services/           # API and data services
│   ├── weatherService.ts    # Weather data service
│   └── contentService.ts    # Content data service
├── types/              # TypeScript type definitions
│   └── index.ts       # Application types
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Built with accessibility best practices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Color-coded Severity**: Visual indicators for warning severity levels
- **Interactive Elements**: Hover effects and smooth transitions

## 🔧 Configuration

The application uses mock data for demonstration purposes. In a production environment, you would:

1. Replace mock services with real weather API calls
2. Integrate with NOAA or National Weather Service APIs
3. Add real-time data updates
4. Implement user authentication and preferences

## 📊 Data Sources

Currently using mock data for:

- Tornado warnings and watches
- News articles
- Safety tips
- Educational videos
- Tornado facts

## 🚨 Safety Information

This application is designed for educational and informational purposes. In case of actual tornado warnings:

1. **Always follow official weather service instructions**
2. **Seek shelter immediately when warnings are issued**
3. **Use multiple sources for weather information**
4. **Have an emergency plan in place**

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome! Feel free to:

- Report bugs or issues
- Suggest new features
- Improve documentation
- Enhance the user experience

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- National Weather Service for weather data standards
- NOAA for meteorological information
- OpenStreetMap for mapping data
- The tornado research and storm chasing community

---

**Note**: This is a portfolio project demonstrating modern web development skills. For real-time weather information, please refer to official sources like the National Weather Service.
