import { useState, useEffect } from 'react';
import {
    ClipboardCheck,
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    FileText,
    Download,
    Eye
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface CropEntry {
    lote: string;
    superficieTotal: string;
    superficieParcial: string;
    cultivo: string;
    desde: string;
    hasta: string;
}

interface DDJJCSubmission {
    id: string;
    producer: string;
    period: string;
    crops: CropEntry[];
    timestamp: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    plot: string;
    canal: string;
}

export const AdminDDJJCPage = () => {
    const [submissions, setSubmissions] = useState<DDJJCSubmission[]>([]);
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState<DDJJCSubmission | null>(null);

    useEffect(() => {
        const loadSubmissions = () => {
            const data = JSON.parse(localStorage.getItem('ddjjc_submissions') || '[]');
            setSubmissions(data);
        };
        loadSubmissions();
        window.addEventListener('storage', loadSubmissions);
        return () => window.removeEventListener('storage', loadSubmissions);
    }, []);

    const filteredSubmissions = submissions.filter(sub => {
        const matchesFilter = filter === 'ALL' || sub.status === filter;
        const matchesSearch = sub.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.plot.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const updateStatus = (id: string, status: 'APPROVED' | 'REJECTED' | 'PENDING') => {
        const updated = submissions.map(sub =>
            sub.id === id ? { ...sub, status } : sub
        );
        localStorage.setItem('ddjjc_submissions', JSON.stringify(updated));
        setSubmissions(updated);
        window.dispatchEvent(new Event('storage'));
        if (selectedSubmission?.id === id) {
            setSelectedSubmission({ ...selectedSubmission, status });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ClipboardCheck className="text-primary w-6 h-6" />
                        </div>
                        <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Administración</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight text-uppercase">Gestión de DDJJC</h1>
                    <p className="text-slate-500 dark:text-gray-400 font-medium mt-1 uppercase text-xs tracking-widest">Revisión y aprobación de declaraciones juradas</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar productor o parcela..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-11 pr-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/50 outline-none transition-all w-64"
                        />
                    </div>
                    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
                        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                    filter === f
                                        ? "bg-white dark:bg-primary text-primary dark:text-black shadow-sm"
                                        : "text-slate-500 hover:text-primary"
                                )}
                            >
                                {f === 'ALL' ? 'TODAS' : f === 'PENDING' ? 'PENDIENTES' : f === 'APPROVED' ? 'OK' : 'RECH'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Submissions List */}
                <div className="lg:col-span-2 space-y-4">
                    {filteredSubmissions.length > 0 ? (
                        filteredSubmissions.map((sub) => (
                            <div
                                key={sub.id}
                                onClick={() => setSelectedSubmission(sub)}
                                className={cn(
                                    "group cursor-pointer bg-white dark:bg-black p-6 rounded-[2rem] border transition-all hover:shadow-xl hover:shadow-black/5 flex items-center justify-between",
                                    selectedSubmission?.id === sub.id
                                        ? "border-primary shadow-lg ring-1 ring-primary/20"
                                        : "border-slate-100 dark:border-white/10"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-slate-50 dark:border-white/5",
                                        sub.status === 'APPROVED' ? "bg-green-500/10 text-green-500" :
                                            sub.status === 'REJECTED' ? "bg-red-500/10 text-red-500" :
                                                "bg-amber-500/10 text-amber-500"
                                    )}>
                                        {sub.status === 'APPROVED' ? <CheckCircle2 size={20} /> :
                                            sub.status === 'REJECTED' ? <XCircle size={20} /> :
                                                <Clock size={20} />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">ID #{sub.id}</span>
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none bg-primary/10 px-2 py-0.5 rounded-full">{sub.period}</span>
                                        </div>
                                        <h4 className="text-lg font-black text-slate-800 dark:text-white uppercase leading-tight">{sub.producer}</h4>
                                        <p className="text-xs font-bold text-slate-500 dark:text-white/40 uppercase tracking-wide mt-0.5">Parcela: {sub.plot} • {sub.canal}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recibido</p>
                                        <p className="text-xs font-bold text-slate-800 dark:text-white uppercase">{new Date(sub.timestamp).toLocaleDateString()}</p>
                                    </div>
                                    <ChevronRight className={cn(
                                        "w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1",
                                        selectedSubmission?.id === sub.id && "text-primary"
                                    )} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center glass-effect rounded-[3rem] border border-slate-100 dark:border-white/10">
                            <FileText className="w-12 h-12 text-slate-200 dark:text-white/10 mx-auto mb-4" />
                            <p className="text-slate-400 dark:text-white/20 font-bold uppercase tracking-widest">No hay declaraciones para mostrar</p>
                        </div>
                    )}
                </div>

                {/* Submission Detail Sidebar */}
                <div className="lg:col-span-1">
                    {selectedSubmission ? (
                        <div className="sticky top-28 bg-white dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-white/10 overflow-hidden shadow-2xl animate-in slide-in-from-right-4 duration-500">
                            <div className="bg-slate-50 dark:bg-white/5 p-8 border-b border-slate-100 dark:border-white/10">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm",
                                        selectedSubmission.status === 'APPROVED' ? "bg-green-500 text-white" :
                                            selectedSubmission.status === 'REJECTED' ? "bg-red-500 text-white" :
                                                "bg-amber-500 text-white"
                                    )}>
                                        {selectedSubmission.status === 'PENDING' ? 'Pendiente' :
                                            selectedSubmission.status === 'APPROVED' ? 'Aprobada' : 'Rechazada'}
                                    </span>
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                        <Download size={20} />
                                    </button>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase leading-tight">{selectedSubmission.producer}</h3>
                                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">{selectedSubmission.period} • {new Date(selectedSubmission.timestamp).toLocaleTimeString()}</p>
                            </div>

                            <div className="p-8 space-y-8">
                                <section>
                                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Detalle de Lotes</h5>
                                    <div className="space-y-4">
                                        {selectedSubmission.crops.map((crop, i) => (
                                            <div key={i} className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
                                                <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center font-black text-xs">
                                                    {crop.lote}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-black text-slate-800 dark:text-white uppercase">{crop.cultivo}</p>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{crop.superficieTotal} Has • {crop.desde} / {crop.hasta}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className="pt-4 flex gap-3">
                                    {selectedSubmission.status === 'PENDING' && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(selectedSubmission.id, 'APPROVED')}
                                                className="flex-1 h-14 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                <CheckCircle2 size={18} />
                                                Aprobar
                                            </button>
                                            <button
                                                onClick={() => updateStatus(selectedSubmission.id, 'REJECTED')}
                                                className="h-14 w-14 bg-red-500 text-white rounded-2xl shadow-lg shadow-red-500/20 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                <XCircle size={22} />
                                            </button>
                                        </>
                                    )}
                                    {selectedSubmission.status !== 'PENDING' && (
                                        <button
                                            onClick={() => updateStatus(selectedSubmission.id, 'PENDING')}
                                            className="flex-1 h-14 border-2 border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                        >
                                            Revertir a Pendiente
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                            <Eye size={40} className="mb-4 opacity-20" />
                            <p className="text-xs font-black uppercase tracking-widest leading-relaxed">Selecciona una declaración para ver los detalles y gestionarla</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
