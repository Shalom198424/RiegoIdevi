import {
    User as UserIcon,
    IdCard,
    Phone,
    Mail,
    BadgeCheck,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            {/* Profile Header Card */}
            <div className="relative overflow-hidden bg-white dark:bg-black rounded-[32px] border border-slate-100 dark:border-white/10 shadow-xl shadow-black/5">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-primary to-primary-dark opacity-10 dark:opacity-20" />

                <div className="relative px-8 pt-16 pb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 bg-slate-100 dark:bg-white/5 rounded-[40px] flex items-center justify-center border-4 border-white dark:border-black shadow-xl">
                                <UserIcon size={64} className="text-slate-400 dark:text-white/20" />
                            </div>
                            <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center border-4 border-white dark:border-black shadow-lg">
                                <BadgeCheck size={20} className="text-black" strokeWidth={3} />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary-700 dark:text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                                    ADMINISTRADOR
                                </span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-widest rounded-full">
                                    ID: #00001
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase">Emanuel Vela</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <section className="bg-white dark:bg-black p-8 rounded-[32px] border border-slate-100 dark:border-white/10 shadow-xl shadow-black/5">
                <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <IdCard size={18} className="text-blue-500" />
                    </div>
                    Datos Personales
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoItem icon={Mail} label="Email" value="emanuel.vela@idevi.gob.ar" />
                    <InfoItem icon={Phone} label="Teléfono" value="+54 2920 12-3456" />
                    <InfoItem icon={IdCard} label="Legajo" value="ADM-2024-001" />
                </div>
            </section>

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm"
            >
                <ArrowLeft size={16} />
                VOLVER ATRÁS
            </button>
        </div>
    );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 dark:text-white/20">
            <Icon size={18} />
        </div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-slate-800 dark:text-white font-bold">{value}</p>
        </div>
    </div>
);
