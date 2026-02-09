import type { WeatherInfo } from '../types';

class WeatherService {
    private mockData: WeatherInfo = {
        temp: 24,
        condition: 'Sunny',
        description: 'Despejado',
        humidity: 45,
        windSpeed: 12,
        icon: 'sun',
        forecast: [
            { day: 'Lun', temp: 26, condition: 'Sunny' },
            { day: 'Mar', temp: 28, condition: 'Sunny' },
            { day: 'Mie', temp: 22, condition: 'Cloudy' },
            { day: 'Jue', temp: 21, condition: 'Rain' },
            { day: 'Vie', temp: 25, condition: 'Sunny' },
        ]
    };

    getWeather(): WeatherInfo {
        // In a real app, this would be an API call
        return this.mockData;
    }
}

export const weatherService = new WeatherService();
