import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestionationAndDateStep } from './spets/destination-and-date-step'
import { InviteGuestsSteps } from './spets/invite-guests-steps'


export function CreateTripPage() {
  const navigate = useNavigate ()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailToInvite, setEmailToInvite] = useState([
    'erivaldomanuelz35@gmail.com'
  ])

  function openGuestsInput() {

    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }
  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }
  function closeGuestsModel() {
    setIsGuestsModalOpen(false)
  }
  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailToInvite.includes(email)) {
      return
    }

    setEmailToInvite([...emailToInvite, email])
    event.currentTarget.reset()
  }
  function removeEmailToInvite(emailToRemove: string) {
    const newEmailList = emailToInvite.filter(email => email! == emailToRemove)

    setEmailToInvite(newEmailList)

  }
  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true)
  }
  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false)
  }
  function createTrip (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/trips/123')
    return ;
  }

  return (
    <div className="h-screen flex items-center justify-center ">

      <div className="max-w-3xl px-6 text-center space-y-10 ">
        <p className="text-zinc-300 tex-lg">Convide seus amigos e planeje suas viagens</p>


        <div className='space-y-4'>
          
          <DestionationAndDateStep 
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}        
          />

          {isGuestsInputOpen && ( 
           
           <InviteGuestsSteps
             emailsToInvite={emailToInvite}
             openConfirmTripModal={openConfirmTripModal}
             openGuestsModal={openGuestsModal}
           />
          )}

        </div>

        <p className="text-zinc-500 text-sm ">
          Planejar a sua viagem pela Plann.er voce automaticamente concorda <br />
          Com os nossos <a className="text-zinc-300 underline " href="#">Termos de Uso</a>  e <a className="text-zinc-300 underline" href="#">Politica de Privacidade.</a>
        </p>
      </div>

      {isGuestsModalOpen && ( //MODAL PARA CONVIDAR AMIGOS
        <InviteGuestsModal
          emailToInvite={emailToInvite}
          closeGuestsModel={closeGuestsModel}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailToInvite={removeEmailToInvite}
        />
      )}

      {isConfirmTripModalOpen && ( // MODAL DE CONFIRMAÇÃO DE VIAGEM
      
      <ConfirmTripModal
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip} />
      )}
      
    </div>
  )
}


