import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../../../components/button"

interface InviteGuestsStepsProps{

    openGuestsModal: () => void
    openConfirmTripModal : () => void
    emailsToInvite: string[]


}


export function InviteGuestsSteps ( {openGuestsModal, openConfirmTripModal,emailsToInvite} : InviteGuestsStepsProps){

    return(

         <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center ">
        
                      <button type='button' onClick={openGuestsModal} className='flex items-center gap-2 flex-1'>
                        <UserRoundPlus className='text-zinc-400 size-5' />
                        {emailsToInvite.length > 0 ? (
                          <span className='text-zinc-100 text-lg flex-1 text-left cursor-pointer'>
                            {emailsToInvite.length} pessoa(s) convidada(s)
                          </span>
                        ):(
                          <span className='text-zinc-400 text-lg flex-1 text-left cursor-pointer'>Quem estará na Vaigem?</span>
                        )}
        
                      </button>
        
                      <Button variant="primary" onClick={openConfirmTripModal}>
                        Confirmar Viagem
                        <ArrowRight className='size-5' />
                       </Button>
                    </div>
    )
}