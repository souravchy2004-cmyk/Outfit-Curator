import { WeatherCondition } from '../../types';

export interface WeatherData {
  city: string;
  tempCelsius: number;
  condition: WeatherCondition;
  humidityPercent: number;
  description: string;
  tip: string;
}

export async function fetchCurrentWeather(city = 'Mumbai'): Promise<WeatherData> {
  // Mock weather service abstraction
  return {
    city,
    tempCelsius: 28,
    condition: 'Sunny',
    humidityPercent: 65,
    description: 'Sunny & Pleasant',
    tip: 'Perfect weather for breathable cotton tops and light layers!'
  };
}
