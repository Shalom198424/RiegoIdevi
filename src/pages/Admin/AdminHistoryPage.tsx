import { useState } from 'react';
import {
    History,
    Droplets,
    Users,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    ChevronRight,
    Zap,
    Scale
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const AdminHistoryPage = () => {
    const [historyView, setHistoryView] = useState<'dia' | 'mes' | 'anio'>('dia');
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        { label: 'Consumo Total', value: '2,610 m³', icon: Droplets, trend: '+12%', isUp: true, color: 'text-blue-500' },
        { label: 'Usuarios Activos', value: '142', icon: Users, trend: '+5%', isUp: true, color: 'text-primary' },
        { label: 'Eficiencia Red', value: '94.2%', icon: Zap, trend: '-0.5%', isUp: false, color: 'text-amber-500' },
        { label: 'Total Demandado', value: '3,100 m³', icon: Scale, trend: '+8%', isUp: true, color: 'text-indigo-500' },
    ];

    const historyData = {
        dia: [
            { label: 'Lun', value: 45 },
            { label: 'Mar', value: 52 },
            { label: 'Mie', value: 38 },
            { label: 'Jue', value: 65 },
            { label: 'Vie', value: 48 },
            { label: 'Sab', value: 30 },
            { label: 'Dom', value: 25 }
        ],
        mes: [
            { label: 'Ene', value: 75 },
            { label: 'Feb', value: 62 },
            { label: 'Mar', value: 88 },
            { label: 'Abr', value: 45 },
            { label: 'May', value: 30 },
            { label: 'Jun', value: 25 }
        ],
        anio: [
            { label: '2021', value: 450 },
            { label: '2022', value: 520 },
            { label: '2023', value: 610 },
            { label: '2024', value: 480 },
            { label: '2025', value: 550 }
        ]
    };

    const recentLogs = [
        { id: '1', producer: 'Juan Pérez', action: 'Solicitud aprobada', volume: '12 m³', time: 'hace 2 horas', status: 'OK' },
        { id: '2', producer: 'María García', action: 'Turno reprogramado', volume: '8 m³', time: 'hace 5 horas', status: 'MOD' },
        { id: '3', producer: 'Carlos López', action: 'Declaración jurada', volume: '-', time: 'hace 1 día', status: 'NEW' },
        { id: '4', producer: 'Roberto Sosa', action: 'Solicitud rechazada', volume: '5 m³', time: 'hace 1 día', status: 'ERR' },
        { id: '5', producer: 'Elena Martínez', action: 'Apertura de válvula', volume: '22 m³', time: 'hace 2 días', status: 'OK' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <History className="text-primary w-6 h-6" />
                        </div>
                        <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Estadísticas</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">Historial de Consumo</h1>
                    <p className="text-slate-500 dark:text-gray-400 font-medium mt-1 uppercase text-xs tracking-widest">Análisis de distribución y demanda del recurso</p>
                </div>

                <button className="flex items-center gap-2 px-6 h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm">
                    <Download size={18} strokeWidth={3} />
                    Exportar Reporte
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-black p-6 rounded-[2rem] border border-slate-100 dark:border-white/10 transition-all hover:shadow-xl hover:shadow-black/5 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-2xl bg-slate-50 dark:bg-white/5 group-hover:scale-110 transition-transform", stat.color)}>
                                <stat.icon size={20} strokeWidth={3} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                                stat.isUp ? "text-green-500" : "text-red-500"
                            )}>
                                {stat.isUp ? <ArrowUpRight size={14} strokeWidth={4} /> : <ArrowDownRight size={14} strokeWidth={4} />}
                                {stat.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-none">{stat.value}</h4>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Consumption Chart */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="bg-white dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-white/10 p-8 shadow-sm space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                                    {historyView === 'dia' ? '303' : historyView === 'mes' ? '325' : '2,610'}
                                </span>
                                <span className="text-xs font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest leading-none">Volumen m³</span>
                            </div>

                            <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-2xl gap-1 w-full sm:w-auto">
                                {(['dia', 'mes', 'anio'] as const).map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setHistoryView(v)}
                                        className={cn(
                                            "flex-1 sm:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                            historyView === v
                                                ? "bg-white dark:bg-primary text-slate-900 dark:text-black shadow-sm"
                                                : "text-slate-400 dark:text-gray-600 hover:text-slate-600 dark:hover:text-gray-400"
                                        )}
                                    >
                                        {v === 'dia' ? 'Día' : v === 'mes' ? 'Mes' : 'Año'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="h-64 flex items-end justify-between px-2 gap-3 md:gap-6 lg:gap-8">
                            {historyData[historyView].map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full group">
                                    <div className="w-full flex items-end justify-center h-full relative">
                                        <div
                                            className={cn(
                                                "w-full max-w-[40px] rounded-t-2xl transition-all duration-700 relative",
                                                "bg-gradient-to-t from-primary/20 via-primary/60 to-primary",
                                                "group-hover:scale-x-110 shadow-[0_0_20px_rgba(25,179,102,0.15)]"
                                            )}
                                            style={{
                                                height: `${(d.value / Math.max(...historyData[historyView].map(x => x.value))) * 100}% `
                                            }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl pointer-events-none whitespace-nowrap">
                                                {d.value} m³
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] md:text-xs font-black text-slate-400 dark:text-gray-600 uppercase tracking-tighter">{d.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Log */}
                <div className="xl:col-span-1 flex flex-col">
                    <div className="flex-1 bg-white dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-white/10 overflow-hidden shadow-sm flex flex-col">
                        <div className="p-8 border-b border-slate-100 dark:border-white/5">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Registro de Operaciones</h3>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Filtrar por productor..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="h-11 w-full pl-11 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[400px] xl:max-h-none no-scrollbar">
                            {recentLogs.map((log) => (
                                <div key={log.id} className="p-6 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            log.status === 'OK' ? "bg-green-500" :
                                                log.status === 'MOD' ? "bg-amber-500" :
                                                    log.status === 'ERR' ? "bg-red-500" : "bg-primary"
                                        )} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h5 className="text-sm font-black text-slate-800 dark:text-white uppercase truncate">{log.producer}</h5>
                                                <span className="text-[10px] font-black text-primary uppercase">{log.volume}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{log.action}</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase mt-1">{log.time}</p>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-200 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-slate-50/50 dark:bg-white/5">
                            <button className="w-full h-12 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">
                                <History size={14} />
                                Ver todo el historial
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
