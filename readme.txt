# 🌤️ Weather-Based Destination Desirability Ranking App

A web application that helps users determine how desirable a city or town is for various outdoor and indoor activities based on the upcoming 7-day weather forecast.

## 🚀 Features

- Search for any city worldwide
- Weather forecast powered by [Open-Meteo API](https://open-meteo.com/)
- Activity scoring for:
  - **Skiing**
  - **Surfing**
  - **Outdoor Sightseeing**
  - **Indoor Sightseeing**
- Location-based suitability (e.g., no surfing score if city is inland)
- Color-coded and sortable activity results
- Weekly average temperature and predominant weather condition
- Responsive and user-friendly design

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: None (data fetched directly from Open-Meteo API)
- **Styling**: CSS
- **APIs**:
  - Open-Meteo Forecast API
  - Open-Meteo Geocoding API

1. **Clone the repository:**


   git clone https://github.com/PeranTrenberth/WeatherApp.git
   cd weather-desirability-app
Install dependencies:

bash
Copy
Edit
npm install
Start the app:

bash
Copy
Edit
npm start


🧠 Scoring Logic
Skiing
High score for:

Temperatures below 5°C

Snowfall > 4 inches

Nearby mountains

Surfing
High score for:

Moderate wind

Coastal proximity

Outdoor Sightseeing
Ideal range: 15–25°C, low wind, low precipitation

Indoor Sightseeing
High score when conditions are poor for outdoor activities

🗺️ Future Improvements
Show locations on a map

Update scoring of activities based on more criteria 

Add user accounts to save preferences

Include air quality and historical weather data

Compare multiple locations side-by-side