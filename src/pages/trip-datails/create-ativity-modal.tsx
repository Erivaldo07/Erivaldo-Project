import { Calendar, Tag, X, Clock, AlertCircle, Check } from "lucide-react";
import { Button } from "../../components/button";
import { useState, type FormEvent, useRef, useEffect } from "react";
import { Toast } from "../../components/toast";

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void;
    onCreateActivity?: (data: { title: string; date: string }) => void;
}

interface FormErrors {
    title?: string;
    date?: string;
}

interface ToastState {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
}

export function CreateActivityModal({
    closeCreateActivityModal,
    onCreateActivity
}: CreateActivityModalProps) {

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSuccess, setIsSuccess] = useState(false);

    // Estado para Toast
    const [toast, setToast] = useState<ToastState>({
        message: '',
        type: 'info',
        isVisible: false
    });

    const titleInputRef = useRef<HTMLInputElement>(null);

    // Handlers do Toast
    const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
        setToast({ message, type, isVisible: true });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, isVisible: false }));
    };

    // Foco automático no input ao abrir
    useEffect(() => {
        setTimeout(() => {
            titleInputRef.current?.focus();
        }, 100);
    }, []);

    // Validar formulário
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!title.trim()) {
            newErrors.title = "O título da atividade é obrigatório";
        } else if (title.trim().length < 3) {
            newErrors.title = "O título deve ter pelo menos 3 caracteres";
        } else if (title.trim().length > 50) {
            newErrors.title = "O título deve ter no máximo 50 caracteres";
        }

        if (!date) {
            newErrors.date = "A data e horário são obrigatórios";
        } else {
            const selectedDate = new Date(date);
            const now = new Date();
            if (selectedDate < now) {
                newErrors.date = "A data deve ser no futuro";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simular chamada à API
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Chamar callback do pai
            if (onCreateActivity) {
                onCreateActivity({
                    title: title.trim(),
                    date
                });
            }

            setIsSuccess(true);
            showToast(`Atividade "${title.trim()}" criada com sucesso! 🎉`, 'success');

            // Limpar formulário após sucesso
            setTitle("");
            setDate("");

            // Fechar modal após 1.5 segundos
            setTimeout(() => {
                closeCreateActivityModal();
            }, 1500);

        } catch (error) {
            console.error("Erro ao criar atividade:", error);
            showToast('Erro ao criar atividade. Tente novamente.', 'error');
            setErrors({
                title: "Erro ao criar atividade. Tente novamente."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fechar com ESC
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeCreateActivityModal();
        }
    };

    // Formatar data para exibição
    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return null;
        const dateObj = new Date(dateStr);
        return dateObj.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Sugerir data/hora atual
    const setCurrentDateTime = () => {
        const now = new Date();

        // Adicionar 1 hora por padrão
        const futureDate = new Date(now.getTime() + 60 * 60 * 1000);
        const futureYear = futureDate.getFullYear();
        const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
        const futureDay = String(futureDate.getDate()).padStart(2, '0');
        const futureHours = String(futureDate.getHours()).padStart(2, '0');
        const futureMinutes = String(futureDate.getMinutes()).padStart(2, '0');

        setDate(`${futureYear}-${futureMonth}-${futureDay}T${futureHours}:${futureMinutes}`);
    };

    return (
        <>
            <div
                className='fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50'
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        closeCreateActivityModal();
                    }
                }}
                onKeyDown={handleKeyDown}
            >
                <div className='w-full max-w-[640px] rounded-xl py-6 px-6 bg-zinc-900 space-y-5 shadow-2xl border border-zinc-800/50'>

                    {/* Header */}
                    <div className='flex items-center justify-between'>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-lime-400/10 rounded-lg">
                                <Calendar className="size-5 text-lime-400" />
                            </div>
                            <div>
                                <h2 className='text-lg font-semibold text-white'>
                                    Cadastrar Atividade
                                </h2>
                                <p className='text-xs text-zinc-500'>
                                    Todos os convidados podem visualizar
                                </p>
                            </div>
                        </div>
                        <button
                            type='button'
                            onClick={closeCreateActivityModal}
                            className='p-1 rounded-full hover:bg-zinc-800 transition-colors'
                            aria-label="Fechar modal"
                        >
                            <X className='size-5 text-zinc-400 hover:text-white transition-colors' />
                        </button>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* Título */}
                        <div className="space-y-1.5">
                            <div className={`h-14 px-4 bg-zinc-950 border rounded-lg flex items-center gap-2 transition-colors ${
                                errors.title
                                    ? 'border-red-500/50 focus-within:border-red-500'
                                    : 'border-zinc-800 focus-within:border-lime-400/50'
                            }`}>
                                <Tag className={`size-5 shrink-0 transition-colors ${
                                    errors.title ? 'text-red-400' : 'text-zinc-400'
                                }`} />
                                <input
                                    ref={titleInputRef}
                                    type="text"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        if (errors.title) setErrors({ ...errors, title: undefined });
                                    }}
                                    placeholder="Qual atividade você vai fazer?"
                                    className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1 min-w-0"
                                    disabled={isSubmitting || isSuccess}
                                    maxLength={50}
                                />
                                {title && (
                                    <span className="text-xs text-zinc-500 shrink-0">
                                        {title.length}/50
                                    </span>
                                )}
                            </div>
                            {errors.title && (
                                <p className="flex items-center gap-1 text-xs text-red-400 px-1">
                                    <AlertCircle className="size-3" />
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Data/Horário */}
                        <div className="space-y-1.5">
                            <div className={`h-14 flex-1 px-4 bg-zinc-950 border rounded-lg flex items-center gap-2 transition-colors ${
                                errors.date
                                    ? 'border-red-500/50 focus-within:border-red-500'
                                    : 'border-zinc-800 focus-within:border-lime-400/50'
                            }`}>
                                <Clock className={`size-5 shrink-0 transition-colors ${
                                    errors.date ? 'text-red-400' : 'text-zinc-400'
                                }`} />
                                <input
                                    type="datetime-local"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        if (errors.date) setErrors({ ...errors, date: undefined });
                                    }}
                                    className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1 min-w-0 scheme-dark"
                                    disabled={isSubmitting || isSuccess}
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                                {!date && (
                                    <button
                                        type="button"
                                        onClick={setCurrentDateTime}
                                        className="text-xs text-lime-400 hover:text-lime-300 transition-colors shrink-0"
                                    >
                                        Agora +1h
                                    </button>
                                )}
                            </div>
                            {date && (
                                <p className="text-xs text-zinc-500 px-1 flex items-center gap-1">
                                    <Calendar className="size-3" />
                                    {formatDateDisplay(date)}
                                </p>
                            )}
                            {errors.date && (
                                <p className="flex items-center gap-1 text-xs text-red-400 px-1">
                                    <AlertCircle className="size-3" />
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        {/* Botões */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                type="button"
                                variant="secondary"
                                size="full"
                                onClick={closeCreateActivityModal}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant={isSuccess ? "success" : "primary"}
                                size="full"
                                loading={isSubmitting}
                                disabled={isSubmitting || isSuccess || !title.trim() || !date}
                            >
                                {isSubmitting ? (
                                    "Salvando..."
                                ) : isSuccess ? (
                                    <>
                                        <Check className="size-4" />
                                        Salvo!
                                    </>
                                ) : (
                                    "Salvar Atividade"
                                )}
                            </Button>
                        </div>

                        {/* Mensagem de sucesso inline (mantida para feedback imediato) */}
                        {isSuccess && (
                            <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <Check className="size-4 text-emerald-400" />
                                <p className="text-sm text-emerald-400">
                                    Atividade criada com sucesso!
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Toast */}
            {toast.isVisible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}
        </>
    );
}
