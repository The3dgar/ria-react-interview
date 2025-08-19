export interface GetWeatherForecastResponse {
  cod:     string;
  message: number;
  cnt:     number;
  list:    List[];
  city:    City;
}

export interface City {
  id:         number;
  name:       string;
  coord:      Coord;
  country:    string;
  population: number;
  timezone:   number;
  sunrise:    number;
  sunset:     number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface List {
  dt:         number;
  main:       MainClass;
  weather:    Weather[];
  clouds:     Clouds;
  wind:       Wind;
  visibility: number;
  pop:        number;
  rain?:      Rain;
  sys:        Sys;
  dt_txt:     Date;
}

export interface Clouds {
  all: number;
}

export interface MainClass {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  sea_level:  number;
  grnd_level: number;
  humidity:   number;
  temp_kf:    number;
}

export interface Rain {
  "3h": number;
}

export interface Sys {
  pod: Pod;
}

export type Pod = "d" | "n";

export interface Weather {
  id:          number;
  main:        MainEnum;
  description: Description;
  icon:        string;
}

export type Description =
  | "broken clouds"
  | "clear sky"
  | "few clouds"
  | "light rain"
  | "overcast clouds"
  | "scattered clouds";

export type MainEnum = "Clear" | "Clouds" | "Rain";

export interface Wind {
  speed: number;
  deg:   number;
  gust:  number;
}
