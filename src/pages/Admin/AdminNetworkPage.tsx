import { useState } from 'react';
import {
    Activity,
    MapPin,
    Droplets,
    AlertTriangle,
    ShieldCheck,
    Settings2,
    Search,
    ChevronRight,
    Gauge,
    Link,
    Wrench,
    Zap
} from 'lucide-react';
import { cn } from '../../utils/cn';

import { dataService } from '../../services/dataService';

export const AdminNetworkPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterZone, setFilterZone] = useState('Todas');

    const statsData = dataService.getNetworkStats();
    const networkStats = [
        { label: 'Caudal Entrante', value: statsData.totalFlow, icon: Droplets, color: 'text-blue-500', trend: 'Estable' },
        { label: 'Puntos de Control', value: statsData.activePoints, icon: MapPin, color: 'text-primary', trend: '+2 Online' },
        { label: 'Consumo Actual', value: statsData.currentConsumption, icon: Activity, color: 'text-indigo-500', trend: '+5% vs Ayer' },
        { label: 'Eficiencia', value: statsData.efficiency, icon: Zap, color: 'text-amber-500', trend: '+1.2%' },
    ];

    const infrastructure = dataService.getNetworkInfrastructure();

    const alerts = [
        { id: 'a1', type: 'maintenance', title: 'Mantenimiento preventivo', description: 'Limpieza de filtros en Sector B mañana a las 08:00', icon: Wrench, color: 'text-amber-500' },
        { id: 'a2', type: 'warning', title: 'Baja presión detectada', description: 'Punto de control 12 muestra valores inferiores al rango nominal', icon: AlertTriangle, color: 'text-red-500' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Activity className="text-primary w-6 h-6" />
                        </div>
                        <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Infraestructura</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Gestión Red Canal</h1>
                    <p className="text-slate-500 dark:text-gray-500 font-medium mt-1 uppercase text-xs tracking-widest">Monitoreo y control de puntos estratégicos</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm">
                        <Settings2 size={18} />
                        Configurar Red
                    </button>
                    <button className="flex items-center gap-2 px-6 h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/25">
                        <ShieldCheck size={18} />
                        Reporte de Estado
                    </button>
                </div>
            </div>

            {/* Network Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {networkStats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-black p-6 rounded-[2rem] border border-slate-100 dark:border-white/10 shadow-sm transition-all hover:shadow-xl hover:shadow-black/5 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-2xl bg-slate-50 dark:bg-white/5 group-hover:scale-110 transition-transform", stat.color)}>
                                <stat.icon size={20} strokeWidth={3} />
                            </div>
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{stat.trend}</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-none">{stat.value}</h4>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Infrastructure List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-white/10 overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Estado de la Red</h3>
                            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-xl">
                                <div className="relative group flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Buscar punto de control..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-11 w-full pl-11 pr-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <select
                                    value={filterZone}
                                    onChange={(e) => setFilterZone(e.target.value)}
                                    className="h-11 px-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all uppercase tracking-widest cursor-pointer"
                                >
                                    <option>Todas</option>
                                    <option>Norte</option>
                                    <option>Sur</option>
                                    <option>Centro</option>
                                    <option>Oeste</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto no-scrollbar">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-white/5">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre / Tipo</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Zona</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado / Salud</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Caudal / Presión</th>
                                        <th className="px-8 py-5"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                    {infrastructure
                                        .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterZone === 'Todas' || item.zone === filterZone))
                                        .map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-xl flex items-center justify-center text-slate-500 dark:text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                            <MapPin size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-800 dark:text-white uppercase leading-none mb-1">{item.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full">{item.zone}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <div className={cn(
                                                            "w-10 h-1 rounded-full",
                                                            item.health === 'good' ? "bg-green-500" :
                                                                item.health === 'warning' ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-700"
                                                        )} />
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                                            {item.health === 'good' ? 'Operativo' : item.health === 'warning' ? 'Revisión' : 'Standby'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <p className="text-sm font-black text-slate-800 dark:text-white leading-none mb-1">{item.status}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.pressure}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <ChevronRight size={18} className="text-slate-200 group-hover:text-primary transition-colors ml-auto" />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Alerts & Maintenance */}
                <div className="space-y-8">
                    <section className="bg-white dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-white/10 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Alertas Activas</h4>
                            <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg shadow-red-500/20">2</span>
                        </div>
                        <div className="space-y-4">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className={cn("p-2 rounded-xl bg-white dark:bg-white/10 shadow-sm", alert.color)}>
                                            <alert.icon size={18} />
                                        </div>
                                        <button className="text-slate-300 hover:text-primary transition-colors">
                                            <Link size={14} />
                                        </button>
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-black text-slate-800 dark:text-white uppercase leading-tight mb-1">{alert.title}</h5>
                                        <p className="text-xs font-medium text-slate-500 dark:text-gray-400 leading-relaxed">{alert.description}</p>
                                    </div>
                                    <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">Ver Detalles</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-primary/5 dark:bg-primary/10 rounded-[2.5rem] border border-primary/10 dark:border-primary/20 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white dark:bg-black rounded-2xl shadow-sm text-primary">
                                <Gauge size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase leading-none mb-1">Diagnóstico</h4>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Red Saludable</p>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            No se han detectado anomalías estructurales en el sistema central de canales. Todos los sensores reportan valores estables.
                        </p>
                        <button className="w-full h-12 bg-white dark:bg-black border border-primary/20 rounded-xl text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all shadow-sm">
                            Iniciar Escaneo Completo
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};
