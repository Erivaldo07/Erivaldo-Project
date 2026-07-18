import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean;
    openGuestsInput: () => void;
    closeGuestsInput: () => void;


      onTripDataChange: React.Dispatch<
    React.SetStateAction<{
      destination: string;
      startDate: string;
      endDate: string;
    }>
  >;

}

export function DestinationAndDateStep({
    closeGuestsInput,
    openGuestsInput,
    isGuestsInputOpen
}: DestinationAndDateStepProps) {

    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");

    const isFormValid = destination.trim() !== "" && date.trim() !== "";

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-4 shadow-lg border border-zinc-800/50">

            {/* Destino */}
            <div className='flex items-center gap-2 flex-1 min-w-0'>
                <MapPin className='text-zinc-400 size-5 shrink-0' />
                <input
                    disabled={isGuestsInputOpen}
                    type="text"
                    placeholder="Para onde você vai?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full disabled:cursor-not-allowed"
                />
            </div>

            {/* Divisor */}
            <div className="w-px h-8 bg-zinc-800 shrink-0" />

            {/* Data */}
            <div className='flex items-center gap-2 flex-1 min-w-0'>
                <Calendar className='text-zinc-400 size-5 ' />
                <input
                    disabled={isGuestsInputOpen}
                    type="text"
                    placeholder="Quando?"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent text-sm placeholder-zinc-400 outline-none w-full disabled:cursor-not-allowed"
                />
            </div>

            {/* Botão */}
            <div className="shrink-0">
                {isGuestsInputOpen ? (
                    <Button variant="secondary" onClick={closeGuestsInput} size="sm">
                        <Settings2 className='size-4' />
                        Alterar
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        onClick={openGuestsInput}
                        size="sm"
                        disabled={!isFormValid}
                    >
                        Continuar
                        <ArrowRight className='size-4' />
                    </Button>
                )}
            </div>
        </div>
    );
}
