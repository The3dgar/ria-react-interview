import { useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

import { NextHours } from './components/forecast/NextHours';
import { NextWeek } from './components/forecast/NextWeek';
import { useWeatherForecast } from './hook/useWeatherForecast';

const cities = ['Rio de Janeiro', 'Beijing', 'Los Angeles', 'Santiago'];

const App = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');

  const {
    dailyWeather,
    hourlyWeather,
    isRefreshing,
    lastUpdated,
    weatherData,
    handleWeatherData,
  } = useWeatherForecast();

  const handleSearch = () => {
    setSelectedCity(searchValue.trim());
    handleWeatherData(searchValue.trim());
    setSearchValue('');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-800 to-blue-500 p-6'>
      <div className='max-w-6xl mx-auto h-full'>
        <header className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-white'>Ria - Super Weather</h1>

          <div className='flex items-center gap-4'>
            {selectedCity && (
              <Button
                onClick={() => handleWeatherData(selectedCity)}
                disabled={isRefreshing}
                variant='secondary'
                size='sm'
                className='bg-white/20 text-white hover:bg-white/30 border-white/30'>
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                />
                Refresh
              </Button>
            )}

            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                placeholder='Search for a city and press enter...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className='pl-10 w-80 bg-white/90 backdrop-blur-sm'
                onKeyUp={(e) => {
                  if (e.key === 'Enter' && searchValue.trim()) {
                    handleSearch();
                  }
                }}
              />
            </div>
          </div>
        </header>

        <div className='flex gap-2 mb-8'>
          {cities.map((city) => (
            <Button
              key={city}
              variant={selectedCity === city ? 'default' : 'secondary'}
              onClick={() => {
                setSelectedCity(city);
                handleWeatherData(city);
              }}
              className={`px-6 py-3 text-sm font-medium ${
                selectedCity === city
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}>
              {city}
            </Button>
          ))}
        </div>

        {selectedCity && weatherData ? (
          <>
            <NextHours hourlyWeather={hourlyWeather} />

            <NextWeek dailyWeather={dailyWeather} />

            <footer className='text-center mt-8 text-white/70 text-sm'>
              Last updated at {lastUpdated}
            </footer>
          </>
        ) : (
          <Card className='bg-white/10 border-none text-center text-white mb-5'>
            <p>Choose a city to fetch weather data...</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;
