import type {
  GetWeatherForecastResponse,
  List,
} from '@/interfaces/GetWeatherForecast';

import { useState } from 'react';
import { getWeatherForecastByCity } from '@/services/weather.service';

export interface DailyWeather {
  day: string;
  min: number;
  max: number;
  icon: string;
  description: string;
}

export const useWeatherForecast = () => {
  const [lastUpdated, setLastUpdated] = useState('Aug 14 3:48pm');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState<GetWeatherForecastResponse>();
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[]>([]);
  const [hourlyWeather, setHourlyWeather] = useState<List[]>([]);

  const handleWeatherData = async (city: string) => {
    setIsRefreshing(true);

    const data = await getWeatherForecastByCity(city);
    setWeatherData(data);

    const nextWeek = getDailyForecast(data.list);
    setDailyWeather(nextWeek);

    setHourlyWeather(data.list.slice(0, 8));

    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    setLastUpdated(timeString);
    setIsRefreshing(false);
  };

  const getDailyForecast = (list: List[]) => {
    const grouped: Record<string, List[]> = {};

    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      if (!grouped[dayKey]) grouped[dayKey] = [];
      grouped[dayKey].push(item);
    });

    return Object.entries(grouped).map(([day, items]) => {
      const temps = items.map((i) => i.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);

      // Buscar bloque cercano a 12:00
      const midday = items.reduce((prev, curr) => {
        const hour = new Date(curr.dt * 1000).getHours();
        return Math.abs(hour - 12) <
          Math.abs(new Date(prev.dt * 1000).getHours() - 12)
          ? curr
          : prev;
      }, items[0]);

      return {
        day,
        min,
        max,
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
      };
    });
  };

  return {
    lastUpdated,
    isRefreshing,
    weatherData,
    hourlyWeather,
    dailyWeather,
    handleWeatherData,
  };
};
