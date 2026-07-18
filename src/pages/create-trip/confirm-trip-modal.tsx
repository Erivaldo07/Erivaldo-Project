import { User, Mail, X, Calendar, MapPin } from "lucide-react";
import { Button } from "../../components/button";
import { useState, type FormEvent } from "react";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void;
    createTrip: (event: FormEvent<HTMLFormElement>) => void;
    tripData?: {
        destination: string;
        startDate: string;
        endDate: string;
        guestsCount: number;
    };
    isLoading: boolean;
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    tripData,
}: ConfirmTripModalProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    // Dados padrão para exemplo
    const defaultTripData = {
        destination: "Florianópolis, Brazil",
        startDate: "17 de Dezembro de 2025",
        endDate: "24 de Dezembro de 2025",
        guestsCount: 5
    };

    const data = tripData || defaultTripData;

    const validateForm = () => {
        const newErrors: { name?: string; email?: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Nome completo é obrigatório";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Nome deve ter pelo menos 3 caracteres";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await createTrip(event);
            // O modal será fechado pelo componente pai após o sucesso
        } catch (error) {
            console.error("Erro ao criar viagem:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpar erro do campo quando o usuário digitar
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // Fechar modal com ESC
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeConfirmTripModal();
        }
    };

    return (
        <div
            className='fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50'
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeConfirmTripModal();
                }
            }}
            onKeyDown={handleKeyDown}
        >
            <div className='w-full max-w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5 shadow-2xl border border-zinc-800/50'>

                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-semibold text-white'>
                            Confirmar Viagem
                        </h2>
                        <p className='text-xs text-zinc-500'>
                            Preencha seus dados para finalizar
                        </p>
                    </div>
                    <button
                        type='button'
                        onClick={closeConfirmTripModal}
                        className='p-1 rounded-full hover:bg-zinc-800 transition-colors'
                    >
                        <X className='size-5 text-zinc-400 hover:text-white transition-colors' />
                    </button>
                </div>

                {/* Resumo da Viagem */}
                <div className='bg-zinc-950/50 rounded-lg p-4 border border-zinc-800/50 space-y-2'>
                    <div className='flex items-center gap-2 text-sm'>
                        <MapPin className='size-4 text-lime-400 shrink-0' />
                        <span className='text-zinc-300 font-medium'>{data.destination}</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                        <Calendar className='size-4 text-lime-400 shrink-0' />
                        <span className='text-zinc-400'>
                            {data.startDate} • {data.guestsCount} {data.guestsCount === 1 ? 'convidado' : 'convidados'}
                        </span>
                    </div>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Nome */}
                    <div className='space-y-1.5'>
                        <div className={`h-14 px-4 bg-zinc-950 border rounded-lg flex items-center gap-2 transition-colors ${
                            errors.name ? 'border-red-500' : 'border-zinc-800 focus-within:border-lime-400'
                        }`}>
                            <User className='text-zinc-400 size-5 shrink-0' />
                            <input
                                type="text"
                                name="name"
                                placeholder="Seu nome completo"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1"
                                disabled={isLoading}
                                autoComplete="name"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-xs text-red-400 px-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className='space-y-1.5'>
                        <div className={`h-14 px-4 bg-zinc-950 border rounded-lg flex items-center gap-2 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-zinc-800 focus-within:border-lime-400'
                        }`}>
                            <Mail className='text-zinc-400 size-5 shrink-0' />
                            <input
                                type="email"
                                name="email"
                                placeholder="Seu melhor email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1"
                                disabled={isLoading}
                                autoComplete="email"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-400 px-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Botão */}
                    <Button
                        type="submit"
                        variant="primary"
                        size="full"
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            "Criando viagem..."
                        ) : (
                            "Confirmar Criação da Viagem"
                        )}
                    </Button>

                    {/* Aviso */}
                    <p className="text-center text-xs text-zinc-500">
                        Ao confirmar, você concorda com nossos termos de uso
                    </p>
                </form>
            </div>
        </div>
    );
}
