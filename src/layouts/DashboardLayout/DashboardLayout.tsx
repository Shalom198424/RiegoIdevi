import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Droplets,
    LayoutDashboard,
    History,
    LogOut,
    Menu,
    X,
    Settings,
    User,
    Calendar,
    Sun,
    Moon,
    ClipboardCheck,
    Bell
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { dataService } from '../../services/dataService';
import type { AppNotification } from '../../types';

export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored === 'dark';
        return document.documentElement.classList.contains('dark');
    });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const isAdmin = location.pathname.startsWith('/admin');

    const producerLinks = [
        { label: 'Solicitar Riego', icon: LayoutDashboard, href: '/producer' },
        { label: 'Declaración DDJJC', icon: ClipboardCheck, href: '/producer/ddjjc' },
        { label: 'Mi Historial', icon: History, href: '/producer/history' },
    ];

    const adminLinks = [
        { label: 'Panel Solicitudes', icon: LayoutDashboard, href: '/admin' },
        { label: 'Gestión DDJJC', icon: ClipboardCheck, href: '/admin/ddjjc' },
        { label: 'Historial Consumo', icon: History, href: '/admin/history' },
        { label: 'Gestión Red', icon: Droplets, href: '/admin/network' },
        { label: 'Configuración', icon: Settings, href: '/admin/settings' },
    ];

    const links = isAdmin ? adminLinks : producerLinks;

    useEffect(() => {
        const updateNotifications = () => {
            setNotifications(dataService.getAppNotifications());
        };

        updateNotifications();
        window.addEventListener('storage', updateNotifications);
        return () => window.removeEventListener('storage', updateNotifications);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkAllRead = () => {
        dataService.markAllAppNotificationsAsRead();
        setIsNotificationsOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-center">
                    <img src="/assets/logo-idevi.jpg" alt="IDEVI Logo" className="h-16 w-auto object-contain" />
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                location.pathname === link.href
                                    ? "bg-primary-50 text-primary-700 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                            )}
                        >
                            <link.icon className={cn(
                                "w-5 h-5 transition-transform group-hover:scale-110",
                                location.pathname === link.href ? "text-primary-600" : ""
                            )} />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 pt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col pb-20 md:pb-0">
                {/* Header (Top Bar) */}
                <header className="bg-white dark:bg-black border-b border-slate-100 dark:border-white/5 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5 text-slate-600 dark:text-white" />
                        </button>
                        <div className="flex flex-col">
                            {isAdmin ? (
                                <>
                                    <span className="text-[10px] font-black text-[#19b366] uppercase tracking-widest leading-none mb-0.5">ADMINISTRADOR</span>
                                    <Link
                                        to="/admin/profile"
                                        className="text-sm font-bold text-slate-800 dark:text-white leading-tight hover:text-primary transition-colors cursor-pointer"
                                    >
                                        Emanuel Vela
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">PRODUCTOR</span>
                                    <Link
                                        to="/producer/profile"
                                        className="text-sm font-bold text-slate-800 dark:text-white leading-tight hover:text-primary transition-colors cursor-pointer"
                                    >
                                        {localStorage.getItem('userName') || (isAdmin ? 'Emanuel Vela' : 'Juan Pérez')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2.5 bg-slate-50 dark:bg-white/5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all group"
                        >
                            {isDark ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="relative p-2.5 bg-slate-50 dark:bg-white/5 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all group"
                            >
                                {unreadCount > 0 && (
                                    <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-background-dark animate-bounce-short">
                                        {unreadCount}
                                    </div>
                                )}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                                    <div className="absolute right-0 mt-4 w-80 md:w-96 bg-white dark:bg-[#121212] rounded-[2rem] shadow-2xl border border-slate-100 dark:border-white/10 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                                            <h3 className="font-black text-slate-900 dark:text-white text-lg">Notificaciones</h3>
                                            <button
                                                onClick={handleMarkAllRead}
                                                className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                                            >
                                                Marcar todo leído
                                            </button>
                                        </div>
                                        <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden">
                                            {notifications.length === 0 ? (
                                                <div className="p-12 text-center">
                                                    <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                                        <History className="text-slate-300" size={32} />
                                                    </div>
                                                    <p className="text-slate-400 font-bold text-sm">No hay notificaciones</p>
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-slate-50 dark:divide-white/5">
                                                    {notifications.map((n) => (
                                                        <div
                                                            key={n.id}
                                                            className={cn(
                                                                "p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-4 items-start",
                                                                !n.isRead && "bg-primary/5 dark:bg-primary/5"
                                                            )}
                                                            onClick={() => {
                                                                if (n.link) navigate(n.link);
                                                                setIsNotificationsOpen(false);
                                                            }}
                                                        >
                                                            <div className={cn(
                                                                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
                                                                n.type === 'SUCCESS' ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" :
                                                                    n.type === 'ALERT' ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400" :
                                                                        "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                                                            )}>
                                                                {n.type === 'SUCCESS' ? <ClipboardCheck size={20} /> : <Bell size={20} />}
                                                            </div>
                                                            <div className="space-y-1 pr-4">
                                                                <p className="font-black text-slate-900 dark:text-white text-sm leading-tight">{n.title}</p>
                                                                <p className="text-xs text-slate-500 dark:text-gray-400 font-medium line-clamp-2">{n.message}</p>
                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-1">
                                                                    {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </p>
                                                            </div>
                                                            {!n.isRead && (
                                                                <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
                    <Outlet />
                </div>
            </main>

            {/* Bottom Navigation (Mobile Only) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black border-t border-slate-100 dark:border-white/10 px-6 py-3 flex justify-between items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                {(isAdmin
                    ? [
                        { label: 'PANEL', icon: LayoutDashboard, path: '/admin', active: location.pathname === '/admin' },
                        { label: 'DDJJC', icon: ClipboardCheck, path: '/admin/ddjjc', active: location.pathname === '/admin/ddjjc' },
                        { label: 'HISTORIAL', icon: History, path: '/admin/history', active: location.pathname === '/admin/history' },
                        { label: 'TURNOS', icon: Calendar, path: '/admin/schedule', active: location.pathname === '/admin/schedule' },
                        { label: 'AJUSTES', icon: Settings, path: '/admin/settings', active: location.pathname === '/admin/settings' }
                    ]
                    : [
                        { label: 'INICIO', icon: LayoutDashboard, path: '/producer', active: location.pathname === '/producer' },
                        { label: 'DDJJC', icon: ClipboardCheck, path: '/producer/ddjjc', active: location.pathname === '/producer/ddjjc' },
                        { label: 'HISTORIAL', icon: History, path: '/producer/history', active: location.pathname === '/producer/history' },
                        { label: 'PERFIL', icon: User, path: '/producer/profile', active: location.pathname === '/producer/profile' }
                    ]
                ).map((item, i) => (
                    <Link
                        key={i}
                        to={item.path}
                        className={cn(
                            "flex flex-col items-center gap-1 transition-all",
                            item.active ? "text-primary scale-110" : "text-slate-400"
                        )}
                    >
                        <item.icon className={cn("w-6 h-6", item.active ? "stroke-[2.5px]" : "stroke-2")} />
                        <span className="text-[8px] font-black tracking-widest">{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <div
                        className="w-72 bg-white h-full p-6 animate-in slide-in-from-left duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center justify-center">
                                <img src="/assets/logo-idevi.jpg" alt="IDEVI Logo" className="h-14 w-auto object-contain" />
                            </div>
                            <button
                                className="p-2 hover:bg-slate-100 rounded-lg"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <X className="w-6 h-6 text-slate-600" />
                            </button>
                        </div>
                        <nav className="space-y-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-4 px-4 py-3 rounded-xl",
                                        location.pathname === link.href ? "bg-primary-50 text-primary-700" : "text-slate-600"
                                    )}
                                >
                                    <link.icon className="w-6 h-6" />
                                    <span className="font-semibold">{link.label}</span>
                                </Link>
                            ))}
                            <div className="h-px bg-slate-100 my-4" />
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-500"
                            >
                                <LogOut className="w-6 h-6" />
                                <span className="font-semibold">Cerrar Sesión</span>
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};
