import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    IdCard,
    Phone,
    Mail,
    MapPin,
    Droplets,
    Sprout,
    Hash,
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    Home,
    Waves,
    FileText,
    LayoutGrid,
    CircleDot
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const fullName = formData.get('fullName')?.toString();

        setLoading(true);
        setTimeout(() => {
            if (fullName) {
                localStorage.setItem('userName', fullName);
                localStorage.setItem('userRole', 'PRODUCER');
            }
            setLoading(false);
            setStep(4); // Success step
            setTimeout(() => navigate('/producer'), 2000);
        }, 1500);
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-black text-white font-display flex flex-col p-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={() => step === 4 ? navigate('/') : prevStep()}
                    className="p-2 bg-white/5 rounded-full border border-white/10 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-black tracking-widest uppercase">Registro</h1>
                    <div className="flex gap-1.5 mt-2">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1 transition-all duration-300 rounded-full",
                                    step === i ? "w-6 bg-primary" : "w-2 bg-white/10"
                                )}
                            />
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="p-2 bg-white/5 rounded-full border border-white/10 text-slate-400"
                >
                    <Home size={20} />
                </button>
            </div>

            <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
                {step < 4 ? (
                    <form onSubmit={handleRegister} className="flex-1 flex flex-col gap-8">

                        {/* Step 1: Personal Data */}
                        <div className={cn("space-y-6 animate-in slide-in-from-right-4 duration-300", step !== 1 && "hidden")}>
                            <section>
                                <h2 className="text-2xl font-black mb-1">Información Personal</h2>
                                <p className="text-slate-400 text-sm">Cuéntanos sobre ti para crear tu perfil.</p>
                            </section>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="fullName"
                                        required={step === 1}
                                        placeholder="Nombre Completo"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="dni"
                                        required={step === 1}
                                        placeholder="DNI / CUIT"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="phone"
                                        type="tel"
                                        required={step === 1}
                                        placeholder="Teléfono de Contacto"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="email"
                                        type="email"
                                        required={step === 1}
                                        placeholder="Correo Electrónico"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Farm Data */}
                        <div className={cn("space-y-6 animate-in slide-in-from-right-4 duration-300", step !== 2 && "hidden")}>
                            <section>
                                <h2 className="text-2xl font-black mb-1">Tu Explotación</h2>
                                <p className="text-slate-400 text-sm">Detalles sobre tu unidad productiva.</p>
                            </section>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="farmName"
                                        required={step === 2}
                                        placeholder="Nombre de la Chacra / Establecimiento"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="zoneSection"
                                        required={step === 2}
                                        placeholder="Zona / Sección"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <Waves className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="serviceCanal"
                                        required={step === 2}
                                        placeholder="Canal de Servicio"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="parcel"
                                        required={step === 2}
                                        placeholder="Parcela"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <CircleDot className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="intake"
                                        required={step === 2}
                                        placeholder="Toma"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="irrigatedSurface"
                                        type="number"
                                        required={step === 2}
                                        step="0.01"
                                        placeholder="Superficie Regable (Has)"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                                <div className="relative group">
                                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="cadastralSurface"
                                        type="number"
                                        required={step === 2}
                                        step="0.01"
                                        placeholder="Superficie Catastral (Has)"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Irrigation Data */}
                        <div className={cn("space-y-6 animate-in slide-in-from-right-4 duration-300", step !== 3 && "hidden")}>
                            <section>
                                <h2 className="text-2xl font-black mb-1">Configuración de Riego</h2>
                                <p className="text-slate-400 text-sm">Información técnica para los turnos.</p>
                            </section>

                            <div className="space-y-4">
                                <div className="relative group">
                                    <Sprout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <select
                                        name="crop"
                                        required={step === 3}
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none text-slate-300"
                                    >
                                        <option value="" disabled>Cultivo Principal</option>
                                        <option value="frutales">Frutales (Pera/Manzana)</option>
                                        <option value="cereales">Cereales (Maíz/Trigo)</option>
                                        <option value="pasturas">Pasturas (Alfalfares)</option>
                                        <option value="horticola">Hortícola</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 rotate-90" size={16} />
                                </div>
                                <div className="relative group">
                                    <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <select
                                        name="method"
                                        required={step === 3}
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none text-slate-300"
                                    >
                                        <option value="" disabled>Método de Riego</option>
                                        <option value="surco">Gravedad / Surco</option>
                                        <option value="goteo">Goteo (Tecnificado)</option>
                                        <option value="aspersion">Aspersión</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 rotate-90" size={16} />
                                </div>
                                <div className="relative group">
                                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        name="waterRights"
                                        required={step === 3}
                                        placeholder="N° de Derecho de Agua / Padrón"
                                        className="w-full bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-auto pt-8 flex gap-4">
                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 h-14 bg-white text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5"
                                >
                                    Siguiente
                                    <ChevronRight size={20} strokeWidth={3} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 h-14 bg-primary text-black rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-dark transition-all active:scale-95 shadow-xl shadow-primary/20 disabled:opacity-50"
                                >
                                    {loading ? 'Procesando...' : 'Finalizar Registro'}
                                    {!loading && <CheckCircle2 size={20} strokeWidth={3} />}
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    /* Success Screen */
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50">
                            <CheckCircle2 size={48} className="text-black" strokeWidth={3} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">¡Registro Exitoso!</h2>
                            <p className="text-slate-400">Tu perfil de productor está siendo validado. <br /> Te avisaremos por SMS en breve.</p>
                        </div>
                        <div className="pt-8">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Redirigiendo al inicio...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Glass decoration */}
            <div className="fixed bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent -z-10 blur-3xl opacity-50 pointer-events-none" />
        </div>
    );
};
