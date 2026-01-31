import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored === 'dark';
        return document.documentElement.classList.contains('dark');
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light'); // Keep this line for consistency with original logic
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light'); // Keep this line for consistency with original logic
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulación de login: si el usuario es 'admin', va al panel de admin
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const username = formData.get('username')?.toString().toLowerCase();

        setTimeout(() => {
            setLoading(false);
            if (username === 'admin') {
                localStorage.setItem('userName', 'Emanuel Vela');
                localStorage.setItem('userRole', 'ADMIN');
                navigate('/admin');
            } else {
                localStorage.setItem('userName', 'Juan Pérez');
                localStorage.setItem('userRole', 'PRODUCER');
                navigate('/producer');
            }
        }, 1000);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZrqMoZvTs5MD5vuZWpWkN2mvL8ogdXCiRWHWlSrn2Wuxe2CQOSveokZoKtN9ynkonWvbrv6l3RqNz5u-pPF63nRGrvUFfEF1MWqn5zrpP63c3rjlWw9DBjMh9Nv3uSOsB9JjL0T5SpKWd8nX16ji56LP_sSKBFiO7nTH5qLulFEPl7ts5uur_iAoHdEd5qMRsQp6vh7QJAyqW15F-GqQOngZa3POemr3NMD11ZuojfJsNqDnLG69ZHmD3XpDZnYh54zttqLImeg")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background-light dark:to-background-dark"></div>
            </div>

            {/* Main Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-6 py-12">
                {/* Header Section */}
                <Logo />

                {/* Login Card */}
                <div className="w-full max-w-[400px] glass-effect rounded-xl p-8 shadow-2xl border border-white/20 dark:border-white/10">
                    <div className="mb-8 text-center">
                        <h2 className="text-[#111714] dark:text-white tracking-tight text-2xl font-bold leading-tight">
                            Bienvenido
                        </h2>
                        <p className="text-[#111714]/70 dark:text-white/70 text-sm font-normal leading-normal mt-2">
                            Gestión inteligente de turnos de riego
                        </p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        {/* Username Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#111714] dark:text-white text-sm font-semibold px-1">Usuario o Correo</label>
                            <div className="relative flex items-center">
                                <span className="material-symbols-outlined absolute left-4 text-[#648775] dark:text-primary/70">person</span>
                                <input
                                    name="username"
                                    className="flex w-full rounded-lg text-[#111714] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dce5e0] dark:border-white/10 bg-white dark:bg-white/5 h-14 pl-12 pr-4 placeholder:text-[#648775]/50 text-base font-normal transition-all"
                                    placeholder="ejemplo@correo.com"
                                    type="text"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#111714] dark:text-white text-sm font-semibold px-1">Contraseña</label>
                            <div className="relative flex items-center">
                                <span className="material-symbols-outlined absolute left-4 text-[#648775] dark:text-primary/70">lock</span>
                                <input
                                    className="flex w-full rounded-lg text-[#111714] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dce5e0] dark:border-white/10 bg-white dark:bg-white/5 h-14 pl-12 pr-12 placeholder:text-[#648775]/50 text-base font-normal transition-all"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                />
                                <span className="material-symbols-outlined absolute right-4 text-[#648775] cursor-pointer hover:text-primary transition-colors">visibility</span>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <a className="text-primary text-sm font-semibold hover:underline decoration-2 underline-offset-4" href="#">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Primary Action */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            <span className="truncate">{loading ? 'Ingresando...' : 'Ingresar'}</span>
                        </button>
                    </form>
                </div>

                {/* Footer Section */}
                <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-[#111714] dark:text-white/60 text-sm">¿No tienes cuenta?</p>
                        <button
                            onClick={() => navigate('/register')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/30 text-primary font-bold text-sm bg-white/50 dark:bg-background-dark/50 hover:bg-primary/10 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-lg font-bold">person_add</span>
                            Registrar nuevo productor
                        </button>
                        <button
                            onClick={() => navigate('/admin')}
                            className="text-primary/70 dark:text-white/40 text-xs font-bold hover:text-primary transition-colors mt-2"
                        >
                            Acceso Administradores
                        </button>
                    </div>

                    {/* Theme Toggle Button */}
                    <button
                        type="button"
                        className="p-3 rounded-full bg-white/20 dark:bg-white/10 border border-white/30 text-[#111714] dark:text-white backdrop-blur-md hover:bg-white/30 dark:hover:bg-white/20 transition-all shadow-lg"
                        onClick={() => setIsDark(!isDark)}
                    >
                        {isDark ? (
                            <span className="material-symbols-outlined block">light_mode</span>
                        ) : (
                            <span className="material-symbols-outlined block">dark_mode</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
