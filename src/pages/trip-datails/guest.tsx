import { CircleDashed, CircleCheck, UserCog, Mail, MoreVertical, Trash2, Crown, Clock } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";

interface GuestData {
    id: string;
    name: string;
    email: string;
    confirmed: boolean;
    isOwner?: boolean;
    invitedAt: string;
}

export function Guest() {
    const [guests, setGuests] = useState<GuestData[]>([
        {
            id: "1",
            name: "Erivaldo Neves",
            email: "erivaldomanuel@gmail.com",
            confirmed: true,
            isOwner: true,
            invitedAt: "2025-12-17T10:00:00"
        },
        {
            id: "2",
            name: "Luís Fidel",
            email: "luisfidel@gmail.com",
            confirmed: false,
            isOwner: false,
            invitedAt: "2025-12-17T10:30:00"
        },
        {
            id: "3",
            name: "Maria Silva",
            email: "maria.silva@gmail.com",
            confirmed: true,
            isOwner: false,
            invitedAt: "2025-12-17T11:00:00"
        },
        {
            id: "4",
            name: "João Santos",
            email: "joao.santos@gmail.com",
            confirmed: false,
            isOwner: false,
            invitedAt: "2025-12-17T11:30:00"
        }
    ]);

    const [showMenu, setShowMenu] = useState<string | null>(null);

    const totalGuests = guests.length;
    const confirmedGuests = guests.filter(g => g.confirmed).length;
    const pendingGuests = totalGuests - confirmedGuests;
    const confirmationRate = totalGuests > 0 ? Math.round((confirmedGuests / totalGuests) * 100) : 0;

    const handleRemoveGuest = (id: string) => {
        if (confirm("Remover este convidado?")) {
            setGuests(guests.filter(g => g.id !== id));
            setShowMenu(null);
        }
    };

    const handleResendInvite = (email: string) => {
        alert(`Convite reenviado para ${email}`);
        setShowMenu(null);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header com estatísticas */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-xl text-white">Convidados</h2>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-zinc-400">
                            {totalGuests} {totalGuests === 1 ? 'pessoa' : 'pessoas'}
                        </span>
                        <span className="text-xs text-zinc-500">
                            • {confirmedGuests} confirmado{confirmedGuests !== 1 ? 's' : ''}
                        </span>
                        {pendingGuests > 0 && (
                            <span className="text-xs text-amber-400">
                                • {pendingGuests} pendente{pendingGuests !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                </div>

                {/* Barra de progresso de confirmação */}
                {totalGuests > 0 && (
                    <div className="hidden sm:block">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-500">
                                {confirmationRate}%
                            </span>
                            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-lime-400 rounded-full transition-all duration-500"
                                    style={{ width: `${confirmationRate}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Lista de Convidados */}
            <div className="space-y-2">
                {guests.length > 0 ? (
                    guests.map((guest) => (
                        <div
                            key={guest.id}
                            className={`group px-4 py-3 bg-zinc-800/50 rounded-xl border transition-all duration-300 hover:border-zinc-600 ${
                                guest.confirmed
                                    ? 'border-lime-400/20 bg-zinc-800/30'
                                    : 'border-zinc-700/50'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    {/* Avatar */}
                                    <div className={`relative shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                                        guest.confirmed
                                            ? 'bg-lime-400/20 text-lime-400'
                                            : 'bg-zinc-700/50 text-zinc-400'
                                    }`}>
                                        {guest.name.charAt(0).toUpperCase()}
                                        {guest.isOwner && (
                                            <div className="absolute -top-1 -right-1">
                                                <Crown className="size-3.5 text-amber-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Informações */}
                                    <div className="space-y-0.5 flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-medium text-sm truncate ${
                                                guest.confirmed ? 'text-zinc-100' : 'text-zinc-300'
                                            }`}>
                                                {guest.name}
                                            </span>
                                            {guest.isOwner && (
                                                <span className="text-xs text-amber-400/80 bg-amber-400/10 px-1.5 py-0.5 rounded-full">
                                                    Anfitrião
                                                </span>
                                            )}
                                            {guest.confirmed && (
                                                <span className="text-xs text-emerald-400/80 bg-emerald-400/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                                    <CircleCheck className="size-3" />
                                                    Confirmado
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                                            <Mail className="size-3" />
                                            <span className="truncate">{guest.email}</span>
                                            <span className="text-zinc-600">•</span>
                                            <Clock className="size-3" />
                                            <span>Convidado em {formatDate(guest.invitedAt)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status e Ações */}
                                <div className="flex items-center gap-2 shrink-0">
                                    {guest.confirmed ? (
                                        <CircleCheck className="size-5 text-emerald-400" />
                                    ) : (
                                        <CircleDashed className="size-5 text-amber-400 animate-pulse" />
                                    )}

                                    {/* Menu de ações */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowMenu(showMenu === guest.id ? null : guest.id)}
                                            className="p-1 rounded-full hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
                                            aria-label="Mais opções"
                                        >
                                            <MoreVertical className="size-4 text-zinc-400" />
                                        </button>

                                        {showMenu === guest.id && (
                                            <div className="absolute right-0 mt-1 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl py-1 z-10">
                                                <button
                                                    onClick={() => handleResendInvite(guest.email)}
                                                    className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2"
                                                >
                                                    <Mail className="size-4" />
                                                    Reenviar convite
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveGuest(guest.id)}
                                                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-700 transition-colors flex items-center gap-2"
                                                >
                                                    <Trash2 className="size-4" />
                                                    Remover convidado
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 bg-zinc-800/30 rounded-xl border border-dashed border-zinc-700/50">
                        <UserCog className="size-8 text-zinc-600 mx-auto mb-2" />
                        <p className="text-zinc-400 text-sm">Nenhum convidado adicionado</p>
                        <p className="text-xs text-zinc-500 mt-1">Convide pessoas para sua viagem</p>
                    </div>
                )}
            </div>

            {/* Resumo e Botões */}
            <div className="space-y-3">
                {/* Resumo rápido */}
                {totalGuests > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-400">
                                <span className="text-emerald-400">{confirmedGuests}</span> confirmados
                            </span>
                            <span className="text-zinc-400">
                                <span className="text-amber-400">{pendingGuests}</span> pendentes
                            </span>
                            <span className="text-zinc-500">
                                Taxa: {confirmationRate}%
                            </span>
                        </div>
                        {pendingGuests > 0 && (
                            <button
                                onClick={() => alert("Enviar lembretes para todos os pendentes")}
                                className="text-lime-400 hover:text-lime-300 transition-colors"
                            >
                                Enviar lembretes
                            </button>
                        )}
                    </div>
                )}

                {/* Botão Gerenciar */}
                <Button
                    variant="secondary"
                    size="full"
                    onClick={() => alert("Abrir gerenciamento de convidados")}
                >
                    Gerenciar Convidados
                    <UserCog className='size-5' />
                </Button>
            </div>
        </div>
    );
}
