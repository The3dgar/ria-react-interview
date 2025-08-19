import type { DailyWeather } from '@/hook/useWeatherForecast';
import { Card } from '../ui/card';
import { getWeatherIconUrl } from '@/services/weather.service';

interface Props {
  dailyWeather: DailyWeather[];
}

export const NextWeek = ({ dailyWeather }: Props) => {
  return (
    <Card className='p-6 bg-white/20 backdrop-blur-sm'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-white'>Next 5 days</h2>
      </div>
      <div className='space-y-4'>
        {dailyWeather.map((day, index) => (
          <div
            key={index}
            className='flex items-center justify-between py-4 border-b border-border last:border-b-0'>
            <div className='flex items-center gap-4'>
               <img src={getWeatherIconUrl(day.icon)} />
              <div>
                <div className='font-semibold text-white'>
                  {day.day}
                </div>
                <div className='first-letter:capitalize text-white text-sm'>
                  {day.description}
                </div>
              </div>
            </div>
            <div className='text-right'>
              <div className='font-bold text-white'>
                {Math.round(day.min)}° - {Math.round(day.max)}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
