import { X, AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmationModal({
    isOpen,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    type = 'warning',
    onConfirm,
    onCancel
}: ConfirmationModalProps) {

    if (!isOpen) return null;

    const getColors = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: 'text-red-400',
                    button: 'danger',
                    border: 'border-red-500/20'
                };
            case 'warning':
                return {
                    icon: 'text-amber-400',
                    button: 'warning',
                    border: 'border-amber-500/20'
                };
            default:
                return {
                    icon: 'text-blue-400',
                    button: 'primary',
                    border: 'border-blue-500/20'
                };
        }
    };

    const colors = getColors();

    return (
        <div
            className='fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50'
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onCancel();
                }
            }}
        >
            <div className='w-full max-w-md rounded-xl py-6 px-6 bg-zinc-900 space-y-5 shadow-2xl border border-zinc-800/50'>

                <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg bg-${colors.button === 'danger' ? 'red' : colors.button === 'warning' ? 'amber' : 'blue'}-400/10 shrink-0`}>
                        <AlertTriangle className={`size-6 ${colors.icon}`} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">
                            {title}
                        </h3>
                        <p className="text-sm text-zinc-400 mt-1">
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-1 rounded-full hover:bg-zinc-800 transition-colors shrink-0"
                    >
                        <X className="size-5 text-zinc-400 hover:text-white transition-colors" />
                    </button>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        size="full"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={colors.button as 'danger' | 'warning' | 'primary' | 'secondary' | 'success' | 'ghost' | 'outline'}
                        size="full"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
