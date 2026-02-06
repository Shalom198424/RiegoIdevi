import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Droplets,
    Calendar,
    Plus,
    Tractor,
    Sprout
} from 'lucide-react';

export const ProducerPage = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const loadRequests = () => {
            const data = JSON.parse(localStorage.getItem('irrigation_requests') || '[]');
            setRequests(data);
        };

        loadRequests();
        window.addEventListener('storage', loadRequests);
        return () => window.removeEventListener('storage', loadRequests);
    }, []);

    return (
        <div className="max-w-xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Live Activity Section */}
            <section className="space-y-5">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white px-1 tracking-tight text-center">Actividad en Vivo</h2>

                <div className="bg-white dark:bg-[#080808] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-500 max-w-xl mx-auto">
                    {/* Header Image Part */}
                    <div className="relative h-56 w-full overflow-hidden">
                        <img
                            src="https://i.imgur.com/1KLPtl8.jpeg"
                            alt="Field"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-5 left-5">
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#4ade80] text-black rounded-full text-[11px] font-black tracking-widest shadow-lg">
                                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                                TURNO ACTIVO
                            </div>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-7 space-y-7">
                        <div className="space-y-1.5">
                            <p className="text-[11px] font-black text-[#4ade80] uppercase tracking-[0.2em]">TURNO 04 • LOTE NORTE</p>
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                                Riego en curso
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-black text-slate-300 dark:text-gray-600 uppercase tracking-widest">FINALIZACIÓN ESTIMADA</span>
                                <span className="text-sm font-black text-[#4ade80] tracking-tighter">FALTAN 02:45:00</span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-[#4ade80] rounded-full w-[60%] shadow-[0_0_20px_rgba(74,222,128,0.4)]" />
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/producer/request')}
                            className="w-full h-16 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all duration-300 bg-[#4ade80] text-black shadow-lg shadow-[#4ade80]/20 hover:bg-[#22c55e] active:scale-[0.98]"
                        >
                            <Plus size={20} strokeWidth={3} />
                            Solicitar Riego
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-5">
                <div className="bg-white dark:bg-[#080808] p-7 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm space-y-5">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Droplets size={24} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] leading-none">USO DE AGUA</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">12.4k <span className="text-[10px] text-slate-400 uppercase">L</span></p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#080808] p-7 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm space-y-5">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Calendar size={24} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] leading-none">PRÓXIMO TURNO</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">Mañana</p>
                    </div>
                </div>
            </div>

            {/* Recent Requests Section */}
            <section className="space-y-5">
                <div className="flex justify-between items-center px-1">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Solicitudes Recientes</h2>
                    <button className="text-[10px] font-black text-[#4ade80] dark:text-[#4ade80]/80 border border-[#4ade80]/30 px-3 py-2 rounded-lg hover:bg-[#4ade80]/10 transition-colors uppercase tracking-widest">Ver todas</button>
                </div>

                <div className="space-y-4">
                    {requests.length === 0 && (
                        <div className="text-center py-8 text-slate-400 text-sm font-medium bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/5">
                            No tienes solicitudes recientes
                        </div>
                    )}

                    {requests.map((req) => (
                        <div key={req.id} className="bg-white dark:bg-[#080808] p-5 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm flex items-center justify-between group hover:border-[#4ade80]/30 transition-all cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${req.status === 'APPROVED'
                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500'
                                    : 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-500'
                                    }`}>
                                    {req.parcelId === "1" ? <Tractor size={32} /> : <Sprout size={32} />}
                                </div>
                                <div className="space-y-1">
                                    <p className="font-black text-slate-900 dark:text-white text-xl leading-tight">{req.parcelName}</p>
                                    <p className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest leading-none mt-1.5">
                                        {req.date} • {req.duration}H
                                    </p>
                                </div>
                            </div>
                            <div className={`px-4 py-2 border rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${req.status === 'APPROVED'
                                ? 'border-[#4ade80]/30 text-[#4ade80]'
                                : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400'
                                }`}>
                                {req.status === 'APPROVED' ? 'APROBADO' : 'PENDIENTE'}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};
