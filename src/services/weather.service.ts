import type { GetWeatherForecastResponse } from '@/interfaces/GetWeatherForecast';

const API_KEY = import.meta.env.VITE_API_KEY as string;

export const getWeatherForecastByCity = async (
  city: string
): Promise<GetWeatherForecastResponse> => {
  const url = new URL(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  const data = (await fetch(url.toString()).then((res) =>
    res.json()
  )) as GetWeatherForecastResponse;

  return data;
};

export const getWeatherIconUrl = (icon: string): string =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;
