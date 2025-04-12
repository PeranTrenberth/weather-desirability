

export async function getWeatherData(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,windspeed_10m_max&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.text();
    console.error('Weather API error:', errorData);
    throw new Error('Weather data not available');
  }
  const data = await response.json();

  if (!data.daily || !data.daily.time) {
    console.error('Malformed weather data:', data);
    throw new Error('Incomplete weather data received');
  }

  return data;
}
const conditionIcons = {
  clear: '☀️ Clear',
  rainy: '🌧️ Rainy',
  snowy: '❄️ Snowy',
};

export function processWeatherData({ daily, latitude, longitude, location, isNearCoast, isNearMountains }) {
  const days = daily.time.length;
  let totalTemp = 0;
  const conditionsCount = { clear: 0, rainy: 0, snowy: 0 };

  const activities = {
    skiing: {
      overall_score: 0,
      daily_breakdown: []
    },
    surfing: {
      overall_score: 0,
      daily_breakdown: []
    },
    outdoor_sightseeing: {
      overall_score: 0,
      daily_breakdown: []
    },
    indoor_sightseeing: {
      overall_score: 0,
      daily_breakdown: []
    }
  };

  let totalScores = {
    skiing: 0,
    surfing: 0,
    outdoor_sightseeing: 0,
    indoor_sightseeing: 0
  };

  for (let i = 0; i < days; i++) {
    const tempMax = daily.temperature_2m_max[i];
    const tempMin = daily.temperature_2m_min[i];
    const avgTemp = (tempMax + tempMin) / 2;
    const wind = daily.windspeed_10m_max[i];
    const snow = daily.snowfall_sum[i];
    const precip = daily.precipitation_sum[i];
    const wave = daily.wave_height_max ? daily.wave_height_max[i] : 0;

    totalTemp += avgTemp;

    // Conditions summary (without cloud cover)
    if (snow > 4) conditionsCount.snowy++;
    else if (precip > 2) conditionsCount.rainy++;
    else conditionsCount.clear++;

    // Skiing score
    let skiScore = 0;
    if (isNearMountains && tempMax < 5 && snow > 4 && wind < 30) skiScore = 10;
    else if (!isNearMountains || snow < 4) skiScore = 0;
    totalScores.skiing += skiScore;
    activities.skiing.daily_breakdown.push({ date: daily.time[i], score: skiScore });

    // Surfing score
    let surfScore = 0;
    if (isNearCoast) {
      if (wave >= 1 && wave <= 3 && wind >= 15) surfScore = 10;
    }
    totalScores.surfing += surfScore;
    activities.surfing.daily_breakdown.push({ date: daily.time[i], score: surfScore });

    // Outdoor sightseeing score
    let outScore = 0;
    if (avgTemp >= 15 && avgTemp <= 28 && precip < 5 && wind < 20) outScore = 10;
    totalScores.outdoor_sightseeing += outScore;
    activities.outdoor_sightseeing.daily_breakdown.push({ date: daily.time[i], score: outScore });

    // Indoor sightseeing score
    let inScore = 0;
    if (precip > 2 || avgTemp < 10 || avgTemp > 23) inScore = 10;
    totalScores.indoor_sightseeing += inScore;
    activities.indoor_sightseeing.daily_breakdown.push({ date: daily.time[i], score: inScore });
  }

  const avgTemp = (totalTemp / days).toFixed(1);
  const mostCommonConditionKey = Object.entries(conditionsCount).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  const mostCommonCondition = conditionIcons[mostCommonConditionKey];

  const weatherSummary = {
    average_temperature: `${avgTemp}°C`,
    predominant_condition: mostCommonCondition
  };

  // Calculate average scores
  Object.keys(activities).forEach((key) => {
    activities[key].overall_score = parseFloat((totalScores[key] / days).toFixed(1));
  });

  return {
    weatherSummary,
    activities
  };
}