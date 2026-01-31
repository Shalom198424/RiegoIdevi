import { useState } from 'react';
import {
    Clock,
    Droplets,
    Calendar,
    Timer,
    Search,
    ChevronRight,
    ArrowUpRight,
    TrendingUp,
    FileText,
    Download
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const HistoryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        { label: 'Total Horas Mes', value: '48.5h', icon: Timer, trend: '+12%', isUp: true, color: 'text-primary' },
        { label: 'Consumo Est.', value: '185 m³', icon: Droplets, trend: '-5%', isUp: false, color: 'text-blue-500' },
        { label: 'Solicitudes', value: '12 / 12', icon: FileText, trend: 'Ok', isUp: true, color: 'text-indigo-500' },
    ];

    const historyData = [
        { label: 'Sem 1', value: 12 },
        { label: 'Sem 2', value: 18 },
        { label: 'Sem 3', value: 8 },
        { label: 'Sem 4', value: 10 },
    ];

    const requests = [
        { id: '1', plot: 'Lote 42 - Sector A', hours: '6h', date: 'hoy, 14:30', status: 'En Progreso', badge: 'bg-primary text-white' },
        { id: '2', plot: 'Lote 15 - Sector B', hours: '4h', date: '28 Ene, 08:00', status: 'Completado', badge: 'bg-green-500/10 text-green-500' },
        { id: '3', plot: 'Lote 42 - Sector A', hours: '8h', date: '21 Ene, 10:00', status: 'Completado', badge: 'bg-green-500/10 text-green-500' },
        { id: '4', plot: 'Lote 08 - Sector C', hours: '5h', date: '15 Ene, 07:30', status: 'Cancelado', badge: 'bg-red-500/10 text-red-500' },
        { id: '5', plot: 'Lote 42 - Sector A', hours: '6h', date: '10 Ene, 16:00', status: 'Completado', badge: 'bg-green-500/10 text-green-500' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-32 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Clock className="text-primary w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Historial Personal</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Mi Registro de Riego</h1>
                    <p className="text-slate-500 dark:text-gray-500 font-medium text-xs tracking-widest uppercase">Seguimiento de turnos y consumo de recursos</p>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-black p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-sm group hover:shadow-xl hover:shadow-black/5 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-2xl bg-slate-50 dark:bg-white/5", stat.color)}>
                                <stat.icon size={20} strokeWidth={3} />
                            </div>
                            <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase tracking-widest", stat.isUp ? "text-green-500" : "text-red-500")}>
                                {stat.trend}
                                <TrendingUp size={12} className={cn(!stat.isUp && "rotate-180")} />
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</h4>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Consumption Graph */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-white/10 p-8 shadow-sm">
                        <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center justify-between">
                            Uso Semanal (Horas)
                            <Download size={16} className="text-slate-300 hover:text-primary cursor-pointer" />
                        </h3>

                        <div className="h-44 flex items-end justify-between gap-4 px-2">
                            {historyData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full">
                                    <div className="w-full flex items-end justify-center h-full relative">
                                        <div
                                            className="w-full max-w-[32px] bg-gradient-to-t from-primary/20 via-primary/80 to-primary rounded-t-xl transition-all duration-700 group-hover:scale-x-110 group-hover:shadow-[0_0_15px_rgba(25,179,102,0.2)]"
                                            style={{ height: `${(d.value / 20) * 100}% ` }}
                                        />
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-[9px] font-black opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                                            {d.value}h
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{d.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-primary dark:bg-primary/90 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <Droplets className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                        <h4 className="text-lg font-black uppercase tracking-tight mb-2">Resumen Operativo</h4>
                        <p className="text-xs font-medium text-white/80 leading-relaxed mb-6">
                            Has utilizado el 65% de tu cupo mensual estimado de agua. Tu frecuencia de riego es óptima.
                        </p>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-all">
                            Ver Análisis Completo
                            <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>

                {/* History List */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-white/10 overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-50 dark:border-white/5 flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Solicitudes Recientes</h3>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-3 h-3 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Buscar por lote..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="h-9 pl-9 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-bold outline-none group-focus-within:ring-2 ring-primary/20 transition-all w-48"
                                />
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50 dark:divide-white/5">
                            {requests.map((req) => (
                                <div key={req.id} className="p-6 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all cursor-pointer group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <h5 className="font-black text-slate-800 dark:text-white uppercase text-sm leading-tight mb-1">{req.plot}</h5>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.hours} • {req.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest", req.badge)}>
                                                {req.status}
                                            </span>
                                            <ChevronRight size={16} className="text-slate-200 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full h-14 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] flex items-center justify-center gap-3 text-[10px] font-black text-slate-400 hover:text-primary hover:border-primary/50 transition-all uppercase tracking-widest">
                        Cargar solicitudes anteriores
                    </button>
                </div>
            </div>
        </div>
    );
};
