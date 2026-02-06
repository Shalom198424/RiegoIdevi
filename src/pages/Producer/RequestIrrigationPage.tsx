import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Droplets,
    Calendar,
    Clock,
    MapPin,
    ChevronRight,
    CheckCircle2,
    ArrowLeft,
    AlertCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const RequestIrrigationPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Form State
    const [parcelId, setParcelId] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");
    const [flow, setFlow] = useState("");

    const [hasActiveTurn] = useState(() => {
        const requests = JSON.parse(localStorage.getItem('irrigation_requests') || '[]');
        const today = new Date().toISOString().split('T')[0];
        return requests.some((r: any) => r.date === today && r.status === 'APPROVED');
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const newRequest = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            producer: localStorage.getItem('userName') || "Juan Pérez", // Fallback name
            parcelId,
            parcelName: parcelId === "1" ? "Huerta Este" : parcelId === "2" ? "Pastura Oeste" : "Lote Norte",
            date,
            duration,
            flow,
            status: 'PENDING',
            timestamp: new Date().toISOString()
        };

        // Simular envío de solicitud
        setTimeout(() => {
            const existingRequests = JSON.parse(localStorage.getItem('irrigation_requests') || '[]');
            localStorage.setItem('irrigation_requests', JSON.stringify([newRequest, ...existingRequests]));

            // Disparar evento para que AdminPage se actualice
            window.dispatchEvent(new Event('storage'));

            setLoading(false);
            setSubmitted(true);

            // Redirigir después de 3 segundos
            setTimeout(() => {
                navigate('/producer');
            }, 3000);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50">
                    <CheckCircle2 size={48} className="text-black" strokeWidth={3} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white">Solicitud Enviada</h2>
                    <p className="text-slate-400 max-w-xs mx-auto">
                        Tu solicitud de turno ha sido recibida y está en cola para aprobación del administrador.
                    </p>
                </div>
                <div className="pt-8">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Volviendo al panel principal...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-slate-500 hover:text-primary transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-black dark:text-white tracking-tight">Nueva Solicitud</h1>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Solicitar Turno de Riego</p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Parcel Selection */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Seleccionar Parcela</label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                        <select
                            required
                            value={parcelId}
                            onChange={(e) => setParcelId(e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 h-16 pl-12 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none text-slate-800 dark:text-white font-bold"
                        >
                            <option value="">Elegir Parcela...</option>
                            <option value="1">Lote 14 - Huerta Este</option>
                            <option value="2">Lote 22 - Pastura Oeste</option>
                            <option value="3">Lote 05 - Lote Norte</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={16} />
                    </div>
                </div>

                {/* Date Selection */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Fecha Sugerida</label>
                    <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 h-16 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-800 dark:text-white font-bold"
                        />
                    </div>
                </div>

                {/* Duration & Time */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Duración (Horas)</label>
                        <div className="relative group">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="number"
                                required
                                min="1"
                                max="24"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Horas"
                                className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 h-16 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-800 dark:text-white font-bold placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest ml-1">Caudal Req. (L/s)</label>
                        <div className="relative group">
                            <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="number"
                                required
                                value={flow}
                                onChange={(e) => setFlow(e.target.value)}
                                placeholder="L/s"
                                className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 h-16 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-slate-800 dark:text-white font-bold placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="p-5 bg-blue-50 dark:bg-blue-500/5 rounded-[2rem] border border-blue-100 dark:border-blue-500/10 flex gap-4">
                    <AlertCircle className="text-blue-500 shrink-0" size={20} />
                    <p className="text-xs text-blue-800 dark:text-blue-300/80 leading-relaxed">
                        <span className="font-black uppercase tracking-widest block mb-1">Nota Importante</span>
                        Las solicitudes están sujetas a la disponibilidad del canal y al cronograma de turnado vigente para tu sector.
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || hasActiveTurn}
                    className={cn(
                        "w-full h-20 rounded-full font-black text-lg flex items-center justify-center gap-4 shadow-xl transition-all active:scale-[0.98]",
                        hasActiveTurn
                            ? "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed grayscale"
                            : "bg-primary text-black shadow-primary/20 hover:-translate-y-1 hover:bg-primary-dark"
                    )}
                >
                    {loading ? (
                        <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : hasActiveTurn ? (
                        <>
                            Riego en Curso
                            <AlertCircle size={24} />
                        </>
                    ) : (
                        <>
                            Confirmar Solicitud
                            <ChevronRight size={24} strokeWidth={3} />
                        </>
                    )}
                </button>

                {hasActiveTurn && (
                    <p className="text-center text-[10px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                        No puedes realizar una nueva solicitud mientras tengas un turno activo.
                    </p>
                )}
            </form>
        </div>
    );
};
