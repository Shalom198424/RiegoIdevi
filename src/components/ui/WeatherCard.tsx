import { Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react';
import { useState } from 'react';
import { weatherService } from '../../services/weatherService';

export const WeatherCard = () => {
    const [weather] = useState(() => weatherService.getWeather());

    if (!weather) return null;

    const MainIcon = weather.icon === 'sun' ? Sun : weather.icon === 'cloud' ? Cloud : CloudRain;

    return (
        <div className="bg-white dark:bg-[#080808] p-7 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm space-y-6">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] leading-none">CLIMA EN VIEDMA</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{weather.description}</h3>
                </div>
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                    <MainIcon size={24} strokeWidth={2.5} />
                </div>
            </div>

            <div className="flex items-end gap-4">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{weather.temp}°</span>
                <div className="flex flex-col pb-1">
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-gray-500">
                        <Droplets size={12} />
                        <span className="text-[10px] font-bold">{weather.humidity}% Hum.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-gray-500">
                        <Wind size={12} />
                        <span className="text-[10px] font-bold">{weather.windSpeed} km/h</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-50 dark:border-white/5">
                {weather.forecast.map((f, i) => {
                    const ForecastIcon = f.condition === 'Sunny' ? Sun : f.condition === 'Cloudy' ? Cloud : CloudRain;
                    return (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <span className="text-[9px] font-black text-slate-400 dark:text-gray-500 uppercase">{f.day}</span>
                            <ForecastIcon size={14} className={f.condition === 'Sunny' ? 'text-amber-500' : 'text-slate-400'} />
                            <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">{f.temp}°</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
