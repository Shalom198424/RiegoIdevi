import { Sun, Cloud, CloudRain } from 'lucide-react';
import { useEffect, useState } from 'react';
import { weatherService } from '../../services/weatherService';
import type { WeatherInfo } from '../../types';

export const WeatherWidget = () => {
    const [weather, setWeather] = useState<WeatherInfo | null>(null);

    useEffect(() => {
        setWeather(weatherService.getWeather());
    }, []);

    if (!weather) return null;

    const Icon = weather.icon === 'sun' ? Sun : weather.icon === 'cloud' ? Cloud : CloudRain;

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/10 transition-all hover:bg-slate-100 dark:hover:bg-white/10 group cursor-default">
            <div className="text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform">
                <Icon size={16} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-[11px] font-black text-slate-900 dark:text-white">{weather.temp}°C</span>
                <span className="text-[8px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-tighter">Viedma</span>
            </div>
        </div>
    );
};
