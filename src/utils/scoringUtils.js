export function calculateSkiingScore(temperature, snowDepth, windSpeed) {
  let score = 0;

  // Temperature should be less than 5°C for skiing
  if (temperature < 5) {
    score += 5;
  }

  // Snow depth is important for skiing
  if (snowDepth > 30) {
    score += 3;
  } else if (snowDepth > 10) {
    score += 1;
  }

  // Low wind speed is ideal for skiing
  if (windSpeed < 20) {
    score += 2;
  }

  return score;
}

export function calculateSurfingScore(windSpeed, waveHeight) {
  let score = 0;

  // Surfing requires moderate to high wind
  if (windSpeed > 15) {
    score += 3;
  } else if (windSpeed > 5) {
    score += 2;
  }

  // Moderate wave height is needed
  if (waveHeight > 1.5) {
    score += 3;
  } else if (waveHeight > 0.5) {
    score += 2;
  }

  return score;
}

export function calculateOutdoorSightseeingScore(temperature, precipitation, windSpeed) {
  let score = 0;

  // Ideal temperature for outdoor sightseeing is between 15°C and 25°C
  if (temperature >= 15 && temperature <= 25) {
    score += 5;
  }

  // Low precipitation is preferred for sightseeing
  if (precipitation < 5) {
    score += 3;
  }

  // Low wind speed is favorable
  if (windSpeed < 20) {
    score += 2;
  }

  return score;
}

export function calculateIndoorSightseeingScore(temperature, precipitation) {
  let score = 0;

  // High score for indoor sightseeing when conditions are bad
  if (precipitation > 10 || temperature < 5 || temperature > 35) {
    score += 5;
  }

  return score;
}