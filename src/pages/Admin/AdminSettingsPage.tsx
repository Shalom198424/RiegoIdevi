import { useState, useEffect } from 'react';
import { Shield, Bell, Database, Save, Loader2, CheckCircle2, AlertTriangle, Download, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

export const AdminSettingsPage = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form States
    const [settings, setSettings] = useState({
        flowThreshold: 85,
        autoApproveDDJJC: false,
        maintenanceMode: false,
        notificationEmails: true,
        backupFrequency: 'Daily'
    });

    useEffect(() => {
        const stored = localStorage.getItem('admin_settings');
        if (stored) setSettings(JSON.parse(stored));
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            localStorage.setItem('admin_settings', JSON.stringify(settings));
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1000);
    };

    const handleExportData = () => {
        const data = {
            ddjjc: JSON.parse(localStorage.getItem('ddjjc_submissions') || '[]'),
            requests: JSON.parse(localStorage.getItem('irrigation_requests') || '[]'),
            network: JSON.parse(localStorage.getItem('network_infrastructure') || '[]')
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `riegoflow_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
            <div className="flex justify-between items-end px-1">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Configuración</h1>
                    <p className="text-slate-500 dark:text-gray-500 font-medium">Panel de control del sistema y red</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={cn(
                        "h-12 px-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg",
                        showSuccess
                            ? "bg-emerald-500 text-white shadow-emerald-500/20"
                            : "bg-primary text-white shadow-primary/20 hover:scale-105 active:scale-95"
                    )}
                >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : showSuccess ? <CheckCircle2 size={18} /> : <Save size={18} />}
                    {isSaving ? 'Guardando...' : showSuccess ? 'Guardado' : 'Guardar Cambios'}
                </button>
            </div>

            <div className="space-y-6">
                {/* Sistema Section */}
                <SettingGroup title="Gestión de Red" icon={Shield}>
                    <div className="space-y-6 p-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Umbral Crítico de Caudal</label>
                                <span className="text-xs font-black text-primary">{settings.flowThreshold}%</span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="100"
                                value={settings.flowThreshold}
                                onChange={(e) => setSettings({ ...settings, flowThreshold: parseInt(e.target.value) })}
                                className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                <Info size={12} /> Se dispararán alertas automáticas al superar este valor de demanda.
                            </p>
                        </div>

                        <div className="flex items-center justify-between py-4 border-t border-slate-50 dark:border-white/5">
                            <div>
                                <p className="font-bold text-slate-800 dark:text-white text-sm">Aprobación Automática DDJJC</p>
                                <p className="text-xs text-slate-400 font-medium tracking-tight">Procesar declaraciones sin intervención humana</p>
                            </div>
                            <Switch
                                checked={settings.autoApproveDDJJC}
                                onChange={(val) => setSettings({ ...settings, autoApproveDDJJC: val })}
                            />
                        </div>

                        <div className="flex items-center justify-between py-4 border-t border-slate-50 dark:border-white/5">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-slate-800 dark:text-white text-sm">Modo Mantenimiento</p>
                                    {settings.maintenanceMode && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black rounded-full uppercase tracking-widest">Activo</span>}
                                </div>
                                <p className="text-xs text-slate-400 font-medium tracking-tight">Desactiva nuevas solicitudes de productores</p>
                            </div>
                            <Switch
                                checked={settings.maintenanceMode}
                                onChange={(val) => setSettings({ ...settings, maintenanceMode: val })}
                                variant="warning"
                            />
                        </div>
                    </div>
                </SettingGroup>

                {/* Notificaciones Section */}
                <SettingGroup title="Notificaciones" icon={Bell}>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-slate-800 dark:text-white text-sm">Alertas por Email</p>
                                <p className="text-xs text-slate-400 font-medium tracking-tight">Recibir copias de avisos críticos en el correo</p>
                            </div>
                            <Switch
                                checked={settings.notificationEmails}
                                onChange={(val) => setSettings({ ...settings, notificationEmails: val })}
                            />
                        </div>
                    </div>
                </SettingGroup>

                {/* Datos Section */}
                <SettingGroup title="Base de Datos" icon={Database}>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-slate-800 dark:text-white text-sm">Frecuencia de Respaldo</p>
                                <p className="text-xs text-slate-400 font-medium tracking-tight">Autoguardado de la base de datos local</p>
                            </div>
                            <select
                                value={settings.backupFrequency}
                                onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                                className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option>Diario</option>
                                <option>Semanal</option>
                                <option>Manual</option>
                            </select>
                        </div>

                        <button
                            onClick={handleExportData}
                            className="w-full h-14 bg-slate-900 dark:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all group"
                        >
                            <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                            Exportar Base de Datos Completa (JSON)
                        </button>

                        <div className="flex gap-2 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-2xl border border-amber-100 dark:border-amber-500/20">
                            <AlertTriangle className="text-amber-600 shrink-0" size={18} />
                            <p className="text-[10px] text-amber-700 dark:text-amber-400 font-bold leading-relaxed">
                                Los cambios en el umbral de caudal afectarán el cálculo de alertas en tiempo real para todos los administradores.
                            </p>
                        </div>
                    </div>
                </SettingGroup>
            </div>
        </div>
    );
};

const SettingGroup = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
    <div className="space-y-3">
        <div className="flex items-center gap-2 px-4">
            <Icon size={16} className="text-primary" />
            <h3 className="text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">{title}</h3>
        </div>
        <div className="bg-white dark:bg-[#080808] rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm">
            {children}
        </div>
    </div>
);

const Switch = ({ checked, onChange, variant = 'primary' }: { checked: boolean, onChange: (val: boolean) => void, variant?: 'primary' | 'warning' }) => (
    <button
        onClick={() => onChange(!checked)}
        className={cn(
            "w-12 h-6 rounded-full transition-all relative p-1",
            checked
                ? (variant === 'primary' ? "bg-primary" : "bg-amber-500")
                : "bg-slate-200 dark:bg-white/10"
        )}
    >
        <div className={cn(
            "w-4 h-4 bg-white rounded-full transition-all shadow-sm",
            checked ? "translate-x-6" : "translate-x-0"
        )} />
    </button>
);
