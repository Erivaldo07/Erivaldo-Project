import { useState, type FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './spets/destination-and-date-step'
import { InviteGuestsSteps } from './spets/invite-guests-steps'

interface TripData {
  destination: string;
  startDate: string;
  endDate: string;
}

export function CreateTripPage() {
  const navigate = useNavigate()

  // Estados
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const [emailToInvite, setEmailToInvite] = useState<string[]>([])
  const [tripData, setTripData] = useState<TripData>({
    destination: '',
    startDate: '',
    endDate: ''
  })


  // Efeito para adicionar email de exemplo (apenas desenvolvimento)
  useEffect(() => {
    // Comentado para não poluir
    // setEmailToInvite(['erivaldomanuelz35@gmail.com'])
  }, [])

  // Handlers
  const openGuestsInput = () => setIsGuestsInputOpen(true)
  const closeGuestsInput = () => setIsGuestsInputOpen(false)
  const openGuestsModal = () => setIsGuestsModalOpen(true)
  const closeGuestsModal = () => setIsGuestsModalOpen(false)
  const openConfirmTripModal = () => setIsConfirmTripModalOpen(true)
  const closeConfirmTripModal = () => setIsConfirmTripModalOpen(false)

  const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()?.trim()

    if (!email) return

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido')
      return
    }

    if (emailToInvite.includes(email)) {
      alert('Este email já foi convidado')
      return
    }

    setEmailToInvite([...emailToInvite, email])
    event.currentTarget.reset()
  }

  const removeEmailToInvite = (emailToRemove: string) => {
    setEmailToInvite(emailToInvite.filter(email => email !== emailToRemove))
  }

  const createTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Validar se tem convidados
    if (emailToInvite.length === 0) {
      alert('Adicione pelo menos um convidado para criar a viagem')
      return
    }



    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Navegar para página da viagem
      navigate('/trips/123')
    } catch (error) {
      console.error('Erro ao criar viagem:', error)
      alert('Ocorreu um erro ao criar a viagem. Tente novamente.')
    } 
  }

  // Verificar se o formulário está preenchido

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-4">

      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        {/* Logo/Header */}
        <div className="space-y-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="size-8 text-lime-400" />
            <h1 className="text-4xl font-bold text-white">
              Plann<span className="text-lime-400">.er</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg"
          >
            Convide seus amigos e planeje viagens inesquecíveis ✨
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='space-y-4'
        >
          {/* Step 1: Destino e Data */}
          <div className="relative">
            <DestinationAndDateStep
              closeGuestsInput={closeGuestsInput}
              isGuestsInputOpen={isGuestsInputOpen}
              openGuestsInput={openGuestsInput}
              onTripDataChange={setTripData}
            />

            {/* Indicador de passo */}
            <div className="absolute -top-3 left-4 bg-zinc-800 px-2 py-0.5 rounded-full text-xs text-zinc-400">
              Passo 1
            </div>
          </div>

          {/* Step 2: Convidados (aparece após passo 1) */}
          <AnimatePresence>
            {isGuestsInputOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <InviteGuestsSteps
                  emailsToInvite={emailToInvite}
                  openConfirmTripModal={openConfirmTripModal}
                  openGuestsModal={openGuestsModal}
                />

                {/* Indicador de passo */}
                <div className="absolute -top-3 left-4 bg-zinc-800 px-2 py-0.5 rounded-full text-xs text-zinc-400">
                  Passo 2
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progresso */}
          {isGuestsInputOpen && (
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-lime-400" />
                Destino
              </span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${emailToInvite.length > 0 ? 'bg-lime-400' : 'bg-zinc-700'}`} />
                Convidados ({emailToInvite.length})
              </span>
              <span className="w-8 h-px bg-zinc-700" />
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-zinc-700" />
                Confirmar
              </span>
            </div>
          )}
        </motion.div>

        {/* Termos */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-zinc-500 text-xs"
        >
          Ao planejar sua viagem pelo Plann.er, você concorda automaticamente com os
          <a className="text-zinc-300 hover:text-lime-400 underline transition-colors ml-1" href="#">
            Termos de Uso
          </a>
          {' '}e{' '}
          <a className="text-zinc-300 hover:text-lime-400 underline transition-colors" href="#">
            Política de Privacidade
          </a>
        </motion.p>
      </div>

      {/* Modais */}
      <AnimatePresence>
        {isGuestsModalOpen && (
          <InviteGuestsModal
            emailToInvite={emailToInvite}
            closeGuestsModel={closeGuestsModal}
            addNewEmailToInvite={addNewEmailToInvite}
            removeEmailToInvite={removeEmailToInvite}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            tripData={{
              destination: tripData.destination,
              startDate: tripData.startDate,
              endDate: tripData.endDate,
              guestsCount: emailToInvite.length
            }}

          />
        )}
      </AnimatePresence>
    </div>
  )
}
