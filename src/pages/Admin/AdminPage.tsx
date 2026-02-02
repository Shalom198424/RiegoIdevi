import { useState, useEffect } from 'react';
import {
    CheckCircle,
    Droplets,
    Calendar,
    TrendingUp,
    Map as MapIcon,
    ClipboardCheck,
    Clock,
    User,
    ArrowUpRight,
    X,
    FileText,
    Download
} from 'lucide-react';
import { generateDDJJCPdf } from '../../utils/DDJJCPdfGenerator';
import { dataService } from '../../services/dataService';
import type { DDJJCSubmission, IrrigationRequest } from '../../types';

export const AdminPage = () => {
    const [ddjjcs, setDdjjcs] = useState<DDJJCSubmission[]>([]);
    const [selectedDDJJC, setSelectedDDJJC] = useState<DDJJCSubmission | null>(null);
    const [irrigationRequests, setIrrigationRequests] = useState<IrrigationRequest[]>([]);

    useEffect(() => {
        const loadData = () => {
            setDdjjcs(dataService.getDDJJCSubmissions());
            setIrrigationRequests(dataService.getIrrigationRequests());
        };

        loadData();
        window.addEventListener('storage', loadData);
        return () => window.removeEventListener('storage', loadData);
    }, []);

    const handleApproveRequest = (id: string) => {
        dataService.updateIrrigationStatus(id, 'APPROVED');
    };

    const handleApproveDDJJC = (id: string) => {
        dataService.updateDDJJCStatus(id, 'APPROVED');
        if (selectedDDJJC && selectedDDJJC.id === id) {
            setSelectedDDJJC(null);
        }
    };

    const handleDownloadPDF = (ddjjc: DDJJCSubmission) => {
        generateDDJJCPdf(ddjjc);
    };

    const totalScheduledVolume = irrigationRequests
        .filter(r => r.status === 'APPROVED')
        .reduce((acc, curr) => {
            // Formula: Flow (L/s) * Duration (h) * 3600 (s/h) / 1000 (L/m3) = m3
            return acc + ((curr.flow * curr.duration * 3600) / 1000);
        }, 0);

    return (
        <div className="max-w-lg mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
            {/* DDJJC Recent Submissions */}
            {ddjjcs.filter(d => d.status === 'PENDING').length > 0 && (
                <section className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <ClipboardCheck className="text-primary w-5 h-5" />
                            </div>
                            <h2 className="text-[#131614] dark:text-white text-xl font-black tracking-tight">DDJJC Recibidas</h2>
                        </div>
                        <div className="px-3 py-1 bg-primary text-white rounded-full text-[10px] font-black tracking-widest animate-pulse">
                            NUEVO
                        </div>
                    </div>

                    <div className="space-y-4">
                        {ddjjcs.filter(d => d.status === 'PENDING').map((ddjjc) => (
                            <div key={ddjjc.id} className="bg-white dark:bg-[#080808] rounded-[2rem] border border-slate-100 dark:border-white/5 p-6 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                                            <User size={18} className="text-slate-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-800 dark:text-white">{ddjjc.producer}</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ddjjc.plot} • {ddjjc.canal}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                                        <Clock size={12} />
                                        {new Date(ddjjc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                                        <span className="text-xs font-bold text-slate-500">Periodo declarado</span>
                                        <span className="text-xs font-black text-slate-800 dark:text-white">{ddjjc.period}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                                        <span className="text-xs font-bold text-slate-500">Cultivos declarados</span>
                                        <span className="text-xs font-black text-primary">{ddjjc.crops.length} especies</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleApproveDDJJC(ddjjc.id)}
                                        className="flex-1 h-12 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        Aprobar DDJJC
                                    </button>
                                    <button
                                        onClick={() => setSelectedDDJJC(ddjjc)}
                                        className="h-12 w-12 bg-slate-900 dark:bg-black text-white rounded-xl flex items-center justify-center border border-white/10 hover:bg-slate-800 transition-all"
                                    >
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* DDJJC Detail Modal */}
            {selectedDDJJC && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="p-8 pb-0">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <FileText className="text-primary w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-black text-primary uppercase tracking-widest leading-none">REVISIÓN DE DOCUMENTO</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Declaración Jurada de Cultivos</h2>
                                    <p className="text-slate-500 font-medium">ID: {selectedDDJJC.id} • {selectedDDJJC.timestamp.split('T')[0]}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedDDJJC(null)}
                                    className="p-2 bg-slate-100 dark:bg-white/5 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Productor</label>
                                        <p className="font-bold text-slate-800 dark:text-white">{selectedDDJJC.producer}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Periodo</label>
                                        <p className="font-bold text-slate-800 dark:text-white">{selectedDDJJC.period}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parcela</label>
                                        <p className="font-bold text-slate-800 dark:text-white">{selectedDDJJC.plot}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Canal</label>
                                        <p className="font-bold text-[#19b366]">{selectedDDJJC.canal}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-3 uppercase tracking-wide">Cultivos Declarados</h4>
                                    <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-white/5">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                                                <tr>
                                                    <th className="px-4 py-3">Cultivo</th>
                                                    <th className="px-4 py-3">Sup (ha)</th>
                                                    <th className="px-4 py-3">Fechas</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                                {selectedDDJJC.crops.map((crop, i) => (
                                                    <tr key={i} className="bg-white dark:bg-[#1a1a1a]">
                                                        <td className="px-4 py-3 font-bold text-slate-700 dark:text-gray-300">{crop.cultivo}</td>
                                                        <td className="px-4 py-3 font-medium text-slate-600 dark:text-gray-400">{crop.superficieTotal}</td>
                                                        <td className="px-4 py-3 font-medium text-slate-600 dark:text-gray-400 text-xs">
                                                            {crop.desde} / {crop.hasta}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 dark:bg-black/20 mt-8 flex gap-4">
                            <button
                                onClick={() => handleDownloadPDF(selectedDDJJC)}
                                className="flex-1 h-14 bg-white dark:bg-white/5 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                            >
                                <Download size={18} />
                                Descargar PDF
                            </button>
                            <button
                                onClick={() => handleApproveDDJJC(selectedDDJJC.id)}
                                className="flex-[2] h-14 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/25 hover:bg-primary-600 transition-all flex items-center justify-center gap-2"
                            >
                                <CheckCircle size={18} />
                                Aprobar Declaración
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Outlook Section */}
            <section className="space-y-4">
                <div className="px-1">
                    <h2 className="text-[#131614] dark:text-white text-2xl font-black leading-tight tracking-tight">Pronóstico para Mañana</h2>
                    <p className="text-[#6b8074] dark:text-gray-500 text-sm font-medium">Demanda Proyectada vs. Disponibilidad</p>
                </div>

                <div className="bg-white dark:bg-[#080808] rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-7 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[#19b366] text-4xl font-black tracking-tighter">92%</span>
                                <span className="text-sm font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">Carga Máxima</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <TrendingUp size={16} className="text-[#19b366]" strokeWidth={3} />
                                <span className="text-xs font-black text-[#19b366]">+5% VS AYER</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2.5">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#19b366] shadow-[0_0_8px_rgba(25,179,102,0.6)]" />
                                <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest leading-none">DEMANDA</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest leading-none">OFERTA</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-44 flex items-end justify-between px-2 gap-4 relative">
                        <div className="absolute inset-0 flex flex-col justify-between py-1 opacity-5 pointer-events-none">
                            <div className="border-t border-slate-400 w-full" />
                            <div className="border-t border-slate-400 w-full" />
                            <div className="border-t border-slate-400 w-full" />
                        </div>

                        {[
                            { time: '06:00', supply: 80, demand: 50 },
                            { time: '12:00', supply: 70, demand: 65 },
                            { time: '18:00', supply: 85, demand: 40 },
                            { time: '00:00', supply: 85, demand: 60 }
                        ].map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                                <div className="w-full flex items-end gap-1.5 h-full">
                                    <div className="flex-1 bg-[#3b82f6] rounded-t-lg transition-all shadow-[0_-4px_12px_rgba(59,130,246,0.3)]" style={{ height: `${d.supply}%` }} />
                                    <div className="flex-1 bg-[#19b366] rounded-t-lg transition-all shadow-[0_-4px_12px_rgba(25,179,102,0.3)]" style={{ height: `${d.demand}%` }} />
                                </div>
                                <span className="text-[11px] font-black text-slate-400 dark:text-gray-500 tracking-tighter">{d.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Total Scheduled Volume Card */}
            <section className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-800 rounded-[2.5rem] p-8 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                            <Droplets size={32} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-blue-100 font-bold uppercase tracking-widest text-xs mb-1">Total Volumen Programado</p>
                            <h3 className="text-4xl font-black tracking-tight">{totalScheduledVolume.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m³</h3>
                            <div className="flex items-center gap-2 mt-2 text-blue-100/80 text-sm font-medium">
                                <CheckCircle size={14} />
                                <span>Calculado sobre {irrigationRequests.filter(r => r.status === 'APPROVED').length} turnos aprobados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pending Requests */}
            <section className="space-y-5">
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-[#131614] dark:text-white text-xl font-black tracking-tight">Solicitudes Pendientes</h3>
                    <div className="px-3 py-1.5 bg-[#19b366]/10 border border-[#19b366]/20 rounded-full">
                        <span className="text-[10px] font-black text-[#19b366] uppercase tracking-widest">{irrigationRequests.filter(r => r.status === 'PENDING').length} Activas</span>
                    </div>
                </div>

                <div className="space-y-6 pb-20">
                    {irrigationRequests.filter(r => r.status === 'PENDING').length === 0 && (
                        <div className="text-center py-10 text-slate-400 font-bold text-sm bg-white dark:bg-white/5 rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
                            No hay solicitudes pendientes.
                        </div>
                    )}

                    {irrigationRequests.filter(r => r.status === 'PENDING').map((req) => (
                        <div key={req.id} className="bg-white dark:bg-[#080808] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all group">
                            <div className="relative h-32 w-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5" />
                                <div className="absolute top-5 left-5 flex gap-2">
                                    <div className="px-3 py-1.5 bg-[#ef4444] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">PRIORIDAD ALTA</div>
                                    <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md text-white rounded-full text-[10px] font-black tracking-widest">#{req.id}</div>
                                </div>
                            </div>

                            <div className="p-7 space-y-6">
                                <div>
                                    <h4 className="text-[#131614] dark:text-white text-xl font-black leading-tight tracking-tight">{req.parcelName} • {req.producerId}</h4>
                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center gap-3">
                                            <Droplets size={18} className="text-[#19b366]" />
                                            <p className="text-sm font-bold text-slate-500 dark:text-gray-400">{req.flow} L/s • {req.duration} Horas</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar size={18} className="text-[#3b82f6]" />
                                            <p className="text-sm font-bold text-slate-500 dark:text-gray-400">{req.date}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleApproveRequest(req.id)}
                                        className="flex-[4] h-16 bg-[#4ade80] text-black rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-lg shadow-[#4ade80]/20 hover:bg-[#22c55e] transition-all active:scale-[0.98]"
                                    >
                                        <Calendar size={20} strokeWidth={3} />
                                        Aprobar y Programar
                                    </button>
                                    <button className="flex-1 h-16 bg-slate-900 dark:bg-black text-white rounded-2xl flex items-center justify-center border border-white/10 hover:bg-slate-800 transition-all active:scale-[0.95]">
                                        <MapIcon size={24} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
