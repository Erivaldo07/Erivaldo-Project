import { ArrowRight, UserRoundPlus, Users, Mail } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepsProps {
    openGuestsModal: () => void;
    openConfirmTripModal: () => void;
    emailsToInvite: string[];
}

export function InviteGuestsSteps({
    openGuestsModal,
    openConfirmTripModal,
    emailsToInvite
}: InviteGuestsStepsProps) {

    const guestCount = emailsToInvite.length;
    const hasGuests = guestCount > 0;

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-4 shadow-lg border border-zinc-800/50">

            {/* Botão de Convidados */}
            <button
                type='button'
                onClick={openGuestsModal}
                className='flex items-center gap-2 flex-1 min-w-0 group'
            >
                <UserRoundPlus className='text-zinc-400 size-5 shrink-0 group-hover:text-zinc-300 transition-colors' />

                {hasGuests ? (
                    <span className='flex items-center gap-2 text-zinc-100 text-sm flex-1 text-left cursor-pointer truncate'>
                        <span className="flex items-center gap-1.5 bg-zinc-800 px-2 py-0.5 rounded-full text-xs">
                            <Users className='size-3' />
                            {guestCount}
                        </span>
                        <span className="text-zinc-400">
                            {guestCount === 1 ? 'pessoa convidada' : 'pessoas convidadas'}
                        </span>
                        <span className="text-zinc-500 text-xs hidden sm:inline">
                            • {emailsToInvite[0]}{guestCount > 1 && ` +${guestCount - 1}`}
                        </span>
                    </span>
                ) : (
                    <span className='text-zinc-400 text-sm flex-1 text-left cursor-pointer group-hover:text-zinc-300 transition-colors'>
                        Quem estará na viagem?
                    </span>
                )}
            </button>

            {/* Divisor */}
            <div className="w-px h-8 bg-zinc-800 shrink-0" />

            {/* Botão Confirmar */}
            <Button
                variant={hasGuests ? "primary" : "secondary"}
                onClick={openConfirmTripModal}
                size="sm"
                disabled={!hasGuests}
                className="shrink-0"
            >
                {hasGuests ? (
                    <>
                        Confirmar Viagem
                        <ArrowRight className='size-4' />
                    </>
                ) : (
                    <>
                        <Mail className='size-4' />
                        Convidar
                    </>
                )}
            </Button>
        </div>
    );
}
