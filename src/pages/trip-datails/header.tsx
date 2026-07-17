import { Calendar, MapPinIcon, Users, Edit2, Share2, Heart } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";

interface HeaderProps {
    destination?: string;
    startDate?: string;
    endDate?: string;
    guestsCount?: number;
    onEdit?: () => void;
    onShare?: () => void;
}

export function Header({
    destination = "Florianópolis, Brazil",
    startDate = "20 de Dezembro",
    endDate = "31 de Dezembro",
    guestsCount = 8,
    onEdit,
    onShare
}: HeaderProps) {

    const [isFavorite, setIsFavorite] = useState(false);

    const formatDateRange = (start: string, end: string) => {
        // Se for no mesmo mês
        const startParts = start.split(' de ');
        const endParts = end.split(' de ');

        if (startParts.length === 2 && endParts.length === 2) {
            if (startParts[1] === endParts[1]) {
                return `${startParts[0]} a ${end}`;
            }
        }
        return `${start} a ${end}`;
    };

    return (
        <div className="px-6 h-16 rounded-xl bg-zinc-900/90 backdrop-blur-sm border border-zinc-800/50 flex items-center justify-between shadow-lg transition-all hover:border-zinc-700">

            {/* Esquerda - Destino */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 bg-lime-400/10 rounded-lg">
                    <MapPinIcon className="size-4 text-lime-400" />
                </div>
                <span className="text-base font-medium text-zinc-100 truncate">
                    {destination}
                </span>
                {guestsCount > 0 && (
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded-full">
                        <Users className="size-3" />
                        <span>{guestsCount} {guestsCount === 1 ? 'convidado' : 'convidados'}</span>
                    </div>
                )}
            </div>

            {/* Centro - Data (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/30 rounded-lg border border-zinc-800/50">
                    <Calendar className="size-4 text-zinc-400" />
                    <span className="text-sm text-zinc-300 whitespace-nowrap">
                        {formatDateRange(startDate, endDate)}
                    </span>
                </div>
            </div>

            {/* Direita - Ações */}
            <div className="flex items-center gap-2">
                {/* Data (Mobile) */}
                <div className="flex md:hidden items-center gap-1.5 px-2 py-1 bg-zinc-800/30 rounded-lg border border-zinc-800/50">
                    <Calendar className="size-3.5 text-zinc-400" />
                    <span className="text-xs text-zinc-300">
                        {startDate} - {endDate}
                    </span>
                </div>

                {/* Favorito */}
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    aria-label="Favoritar viagem"
                >
                    <Heart
                        className={`size-4 transition-all ${
                            isFavorite
                                ? 'fill-red-500 text-red-500'
                                : 'text-zinc-400 hover:text-red-400'
                        }`}
                    />
                </button>

                {/* Divisor */}
                <div className="w-px h-8 bg-zinc-800 hidden sm:block" />

                {/* Botão Compartilhar */}
                <button
                    onClick={onShare}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <Share2 className="size-4" />
                    <span className="hidden lg:inline">Compartilhar</span>
                </button>

                {/* Divisor */}
                <div className="w-px h-8 bg-zinc-800" />

                {/* Botão Editar */}
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={onEdit}
                    className="gap-1.5"
                >
                    <Edit2 className="size-4" />
                    <span className="hidden sm:inline">Editar</span>
                </Button>
            </div>
        </div>
    );
}
