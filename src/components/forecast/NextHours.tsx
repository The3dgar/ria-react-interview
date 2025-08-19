import type { List } from '@/interfaces/GetWeatherForecast';
import { Card } from '../ui/card';
import { getWeatherIconUrl } from '@/services/weather.service';

interface Props {
  hourlyWeather: List[];
}

export const NextHours = ({ hourlyWeather }: Props) => {
  return (
    <Card className='mb-8 p-6 bg-white/20 backdrop-blur-sm'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-white'>Next hours</h2>
      </div>
      <div className='grid-cols-4 gap-6 flex overflow-auto'>
        {hourlyWeather.map((hour, index) => (
          <div key={index} className='text-center'>
            <div className='text-2xl font-bold text-white mb-2'>
              {Math.round(hour.main.temp)}°
            </div>
            <div className='text-sm text-primary mb-4'>
              {Math.round(hour.pop * 100)}%
            </div>
            <div className='flex justify-center mb-4'>
              <img src={getWeatherIconUrl(hour.weather[0].icon)} />
            </div>
            <div className='text-sm text-white'>
              {' '}
              {new Date(hour.dt * 1000).toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
