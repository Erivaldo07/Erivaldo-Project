import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";

interface DestonationAndDateStepProps {
    isGuestsInputOpen: boolean
    openGuestsInput: () => void
    closeGuestsInput: () => void
}
export function DestionationAndDateStep ({closeGuestsInput, openGuestsInput,isGuestsInputOpen} : DestonationAndDateStepProps){
    return (
         <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center ">


            <div className='flex items-center gap-2 flex-1'>
              <MapPin className='text-zinc-400 size-5' />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde voce vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
            </div>

            <div className='flex items-center gap-2'>
              <Calendar className='text-zinc-400 size-5' />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
            </div>

            {isGuestsInputOpen ? (

              <Button variant="secondary" onClick={closeGuestsInput}>
                Alterar Local/Data
                <Settings2 className='size-5' />        
              </Button>
            ) : (
              <Button variant="primary" onClick={openGuestsInput}>
                Continuar
                <ArrowRight className='size-5' />
              </Button>
            )}

          </div>
    )
}