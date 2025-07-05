# Weatherly 🌤️

**Weatherly** is a modern, user-friendly weather web app built with React. Instantly check the current weather, 5-day and hourly forecasts, air quality, and UV index for any city worldwide. Save your favorite locations, get fun weather facts, and enjoy a clean, responsive interface—perfect for daily planning and weather enthusiasts alike.

## Features
- 🌦️ Current weather for any city
- 📅 5-day forecast & hourly forecast
- 🌫️ Air Quality Index (AQI)
- 🌞 UV Index
- 💾 Save favorite locations
- 🎲 Fun weather facts & tips
- ⚡ Responsive, modern UI

## Demo
[Live on Netlify](https://weather-forecastwebsite.netlify.app/)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/NamraPatel17/weatherly-website.git
cd weatherly-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the project root:
```
REACT_APP_OPENWEATHER_API_KEY=your_openweathermap_api_key
```

### 4. Start the development server
```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

## Deployment

### Netlify
- Set the build command: `npm run build`
- Set the publish directory: `build`
- Add the environment variable `REACT_APP_OPENWEATHER_API_KEY` in Netlify dashboard

### GitHub Pages, Vercel, etc.
- Build with `npm run build` and follow your platform's static site deployment instructions.

## API & Credits
- [OpenWeatherMap API](https://openweathermap.org/api)
- [React](https://react.dev/)
- [Axios](https://axios-http.com/)

## License
MIT

---

*Made with ❤️ by [Namra Patel](https://github.com/NamraPatel17)*
