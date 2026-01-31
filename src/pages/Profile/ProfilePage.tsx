import {
    User as UserIcon,
    IdCard,
    Phone,
    Mail,
    MapPin,
    Maximize,
    Droplets,
    Sprout,
    BadgeCheck,
    Calendar,
    Settings,
    ArrowLeft,
    Home,
    Waves,
    LayoutGrid,
    CircleDot,
    FileText
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userName = localStorage.getItem('userName') || 'Productor';
    const userRole = localStorage.getItem('userRole') || 'PRODUCER';
    const isAdmin = userRole === 'ADMIN' || location.pathname.startsWith('/admin');

    const stats = [
        { label: 'Hectáreas', value: '12.5', icon: Maximize, color: 'text-blue-500' },
        { label: 'Turnos Hoy', value: '1', icon: Calendar, color: 'text-primary' },
        { label: 'Consumo m³', value: '1,240', icon: Droplets, color: 'text-cyan-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                                    {isAdmin ? 'ADMINISTRADOR' : 'PRODUCTOR ACTIVO'}
                                </span>
                                <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-widest rounded-full">
                                    ID: #43829
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase">{userName}</h1>
                        </div>

                        {!isAdmin && (
                            <div className="flex gap-3">
                                <button className="h-12 px-6 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center gap-2">
                                    <Settings size={18} />
                                    <span className="hidden sm:inline">Configurar</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                {!isAdmin && (
                    <div className="grid grid-cols-3 border-t border-slate-100 dark:border-white/5">
                        {stats.map((stat, i) => (
                            <div key={i} className={cn(
                                "p-6 text-center flex flex-col items-center gap-2",
                                i < stats.length - 1 && "border-r border-slate-100 dark:border-white/5"
                            )}>
                                <stat.icon size={20} className={stat.color} />
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-lg font-black text-slate-800 dark:text-white leading-none">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={cn(
                "grid grid-cols-1 gap-8",
                !isAdmin && "lg:grid-cols-2"
            )}>
                {/* Personal Information */}
                <section className="bg-white dark:bg-black p-8 rounded-[32px] border border-slate-100 dark:border-white/10 shadow-xl shadow-black/5">
                    <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center">
                            <IdCard size={18} className="text-blue-500" />
                        </div>
                        Datos Personales
                    </h3>

                    <div className="space-y-6">
                        <InfoItem icon={Mail} label="Email" value="sandra.vela@ejemplo.com" />
                        <InfoItem icon={Phone} label="Teléfono" value="+54 2920 45-6789" />
                        <InfoItem icon={IdCard} label="DNI / CUIT" value="27-32.481.592-4" />
                    </div>
                </section>

                {/* Farm & Irrigation */}
                {!isAdmin && (
                    <section className="bg-white dark:bg-black p-8 rounded-[32px] border border-slate-100 dark:border-white/10 shadow-xl shadow-black/5">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Sprout size={18} className="text-primary" />
                            </div>
                            Datos de Explotación
                        </h3>

                        <div className="space-y-6">
                            <InfoItem icon={Home} label="Nombre de Chacra/Establecimiento" value="Los Frutales I" />
                            <InfoItem icon={MapPin} label="Zona/Seccion" value="Zona 1 - Sección C" />
                            <InfoItem icon={Waves} label="Canal de Servicio" value="Canal Principal" />
                            <InfoItem icon={LayoutGrid} label="Parcela" value="14B" />
                            <InfoItem icon={CircleDot} label="Toma" value="Toma 3" />
                            <InfoItem icon={Droplets} label="Superficie Regable" value="12.5 Has" />
                            <InfoItem icon={FileText} label="Superficie Catastral" value="15.0 Has" />
                        </div>
                    </section>
                )}
            </div>

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
