# Color Weather App

> A responsive weather application built with Vue 3 that combines live weather data, location search, browser geolocation, hourly and 5-day forecasts, air quality information, and dynamic weather-based visuals in a single interface.

## Live Demo

🌐 **[colour-weather.web.app](https://colour-weather.web.app/)**

## Preview

![Color Weather App — Desktop Preview](./screenshots/Desktop.png)

## Overview

Color Weather App is a Vue 3 weather application designed to provide detailed weather information without overwhelming the user.

The interface dynamically adapts to the current weather condition and time of day, while the application handles location search, geolocation, API requests, loading states, network failures, and other common real-world situations.

It provides:

- Current weather conditions
- 8-hour forecast
- 5-day forecast
- Air quality information
- Sunrise and sunset
- Location search with autocomplete
- Browser-based current-location detection
- Dynamic weather backgrounds and icons
- Offline and network-state handling
- Responsive layouts for mobile, tablet, and desktop

## Features

### 🌤️ Current Weather

The main weather panel provides:

- Current temperature in °C
- Current weather condition
- Weather condition icon
- Current weekday and date
- Feels-like temperature
- Humidity
- Atmospheric pressure
- Visibility
- Wind speed

### 🕐 Hourly Forecast

View the next 8 available hourly forecast periods with:

- Forecast time
- Temperature
- Weather condition
- Dynamic weather icon

The forecast section is horizontally scrollable on smaller screens.

### 📅 5-Day Forecast

The 5-day forecast provides:

- Day name
- Date and month
- Daily average temperature
- Weather condition
- Weather icon
- Wind speed
- Rain probability

### 🌫️ Air Quality

The application also provides air-quality information including:

- Air Quality Index (AQI)
- Human-readable AQI classification
- Color-coded AQI presentation
- SO₂ concentration
- NO₂ concentration
- O₃ concentration
- Unit display controls

### 🌅 Sunrise & Sunset

Sunrise and sunset times are displayed using a 12-hour format for easier reading.

### 📍 Location Search

Find weather information for different locations using:

- Debounced autocomplete search
- OpenWeatherMap geocoding
- Up to 5 matching locations
- City, state/province, and country information
- Arrow-key navigation
- Enter-to-select interaction

The application also supports the browser's Geolocation API for detecting the user's current location.

### 🎥 Dynamic Weather Visuals

The application changes its visual presentation according to the weather and time of day.

- Weather-specific background videos
- Day/night variations
- Dynamic condition icons
- Locally stored visual assets

### 💾 Location Persistence

The last successfully selected location is stored in `localStorage`, allowing it to be restored when the application is opened again.

### ⚠️ Error & Network Handling

The application explicitly handles several failure states:

- Loading state
- API errors
- Invalid locations
- Geolocation permission denial
- Geolocation timeout
- Network disconnection
- Retry actions
- Last-known-location fallback
- User-friendly toast notifications

### 📱 Responsive Interface

The interface is designed for:

- Mobile
- Tablet
- Desktop
- Large desktop displays

The layout uses CSS Grid, Flexbox, responsive media queries, and fluid sizing to adapt across screen sizes.

### ♿ Accessibility

The interface includes several accessibility considerations:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- `aria-live` notifications
- Keyboard-controlled location selection

## Getting Started

### Prerequisites

Before running Color Weather App locally, make sure you have:

- Node.js installed
- npm installed
- Git installed

### Clone the repository

```bash
git clone <your-repository-url>
cd Color_Weather_App
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run serve
```

The development server will provide a local URL for the application.

### Build for production

```bash
npm run build
```

The production build is generated in the configured output directory.

## 🔑 API Key Configuration

Color Weather App uses OpenWeatherMap for weather, forecast, geocoding, and air-quality data.

### 1. Where to put your API key

Open `src/logic.js` and locate this line near the top:

```javascript
let Open_WeatherMap_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY_HERE';
```

Replace the placeholder with your own OpenWeatherMap API key.

All API calls in the project reference this single variable, so you only need to change it once.

> Do not commit a real API key to a public repository. The key in this file can be viewed by users because this is a frontend application.

### 2. How to get an API key

1. Go to [OpenWeatherMap](https://openweathermap.org/api).
2. Sign up for an account.
3. Log in and open the **API Keys** tab.
4. Copy your default key or generate a new one.
5. Paste it into `src/logic.js`.

New API keys may take some time to become active after they are generated.

## Technical Highlights

This project demonstrates practical Vue 3 frontend development through:

- Composition API
- `<script setup>`
- Reactive state with `ref` and `reactive`
- Lifecycle hooks
- REST API integration
- Multiple asynchronous requests
- `async/await`
- Debounced search
- Browser Geolocation API
- `localStorage`
- Online/offline network detection
- Dynamic imports
- Conditional rendering
- CSS transitions
- Responsive CSS
- Global error handling

## Technology Stack

- Vue 3
- JavaScript
- HTML5
- CSS3
- Vue CLI
- OpenWeatherMap APIs
- Browser Geolocation API
- LocalStorage

## Data Sources

Weather information is retrieved from **OpenWeatherMap**, using its:

- Geocoding API
- Current Weather API
- 5-Day / 3-Hour Forecast API
- Air Pollution API

The application combines the responses from these services to construct the weather dashboard and forecast views.

## Application Flow

```text
User
 │
 ├── Search Location
 │       └── Geocoding API
 │
 └── Use Current Location
         └── Browser Geolocation API
                 │
                 ▼
             Coordinates
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
     Weather  Forecast  Air Quality
        │        │        │
        └────────┼────────┘
                 ▼
          Processed State
                 │
                 ▼
          Vue Reactive UI
                 │
        ┌────────┼─────────┐
        ▼        ▼         ▼
     Current  Forecast   Dynamic
     Weather             Visuals
```

## Project Structure

```text
├── jsconfig.json
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── index.html
├── README.md
├── screenshots
│   └── Desktop.png
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── condtions
│   │   │   ├── cloudy.png
│   │   │   ├── cold.png
│   │   │   ├── Default_PartlyCloudy.png
│   │   │   ├── dust.png
│   │   │   ├── hmfs.png
│   │   │   ├── hurricane.png
│   │   │   ├── mostlyCloudy.png
│   │   │   ├── overcast.png
│   │   │   ├── partlySunny.png
│   │   │   ├── rainy.png
│   │   │   ├── sand.png
│   │   │   ├── snow.png
│   │   │   ├── storm.png
│   │   │   └── sunny.png
│   │   └── icons
│   │       ├── AirPressure.png
│   │       ├── airQualityIndex.png
│   │       ├── calendar.png
│   │       ├── feelsLike.png
│   │       ├── humidity.png
│   │       ├── location.png
│   │       ├── sunrise.png
│   │       ├── sunset.png
│   │       ├── visibility.png
│   │       ├── WindDirection.png
│   │       └── wind.png
│   ├── logic.js
│   ├── main.js
│   └── style.css
└── vue.config.cjs
```

## Progressive Web App

Color Weather App is designed to provide a responsive experience across mobile, tablet, and desktop devices.

The application handles network-state changes and can restore the last successfully selected location from `localStorage`.

## Data and Privacy Considerations

The application uses OpenWeatherMap APIs to retrieve weather, forecast, geocoding, and air-quality information.

The selected OpenWeatherMap API key is used by the frontend to make API requests. Because this is a client-side application, the key may be visible to users in the browser.

For a public production application, use a backend or server-side proxy to protect the API key.

## Links

- **Live Application:** [https://colour-weather.web.app/](https://colour-weather.web.app/)

![Screenshot from 2023-09-19 13-53-08](https://github.com/AR1Ablock/Beautiful_Weather_App/assets/78879680/490cb6a7-11cb-48c1-a288-3b7de2b18991)

![Screenshot from 2023-09-07 04-01-54](https://github.com/AR1Ablock/Beautiful_Weather_App/assets/78879680/138d4e33-9ef0-4023-9b6e-9ad2e8811a7c)

![Screenshot from 2023-09-07 04-00-20](https://github.com/AR1Ablock/Beautiful_Weather_App/assets/78879680/3ecc7912-f9c6-4fd0-96c0-e6809139cd30)

![Screenshot from 2023-09-19 13-53-08](https://github.com/AR1Ablock/Beautiful_Weather_App/assets/78879680/607ffb6f-7454-4ce5-ac32-3d2b76b43d7a)

![Screenshot from 2023-09-07 04-01-28](https://github.com/AR1Ablock/Beautiful_Weather_App/assets/78879680/62a20419-4c8f-4409-b6cd-e000fc7ad41b)

