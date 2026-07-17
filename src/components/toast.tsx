import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="size-5 text-emerald-400" />;
            case 'error':
                return <AlertCircle className="size-5 text-red-400" />;
            case 'warning':
                return <AlertTriangle className="size-5 text-amber-400" />;
            default:
                return <Info className="size-5 text-blue-400" />;
        }
    };

    const getColors = () => {
        switch (type) {
            case 'success':
                return 'border-emerald-500/20 bg-emerald-500/10';
            case 'error':
                return 'border-red-500/20 bg-red-500/10';
            case 'warning':
                return 'border-amber-500/20 bg-amber-500/10';
            default:
                return 'border-blue-500/20 bg-blue-500/10';
        }
    };

    return (
        <div
            className={`fixed top-6 right-6 z-50 max-w-md w-full transition-all duration-300 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
        >
            <div className={`p-4 rounded-xl border ${getColors()} backdrop-blur-sm shadow-2xl flex items-start gap-3`}>
                <div className="shrink-0 mt-0.5">
                    {getIcon()}
                </div>
                <p className="flex-1 text-sm text-zinc-200">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="shrink-0 p-0.5 rounded-lg hover:bg-zinc-800/50 transition-colors"
                >
                    <X className="size-4 text-zinc-400 hover:text-zinc-200" />
                </button>
            </div>
        </div>
    );
}
