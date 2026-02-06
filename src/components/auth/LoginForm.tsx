import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulación básica de login
        setTimeout(() => {
            setIsLoading(false);
            navigate('/producer');
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Usuario o Correo"
                placeholder="ejemplo@correo.com"
                type="text"
                icon={<Mail size={18} />}
                className="bg-white/5 border-white/10"
                required
            />
            <Input
                label="Contraseña"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                icon={<Lock size={18} />}
                rightElement={
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 hover:text-primary transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                }
                className="bg-white/5 border-white/10"
                required
            />
            <Button type="submit" isLoading={isLoading} className="w-full h-12">
                Ingresar
            </Button>
        </form>
    );
};
