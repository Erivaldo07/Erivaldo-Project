import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './spets/destination-and-date-step'
import { InviteGuestsSteps } from './spets/invite-guests-steps'
import { Toast } from '../../components/toast'
import { ConfirmationModal } from '../../components/confirmation-modal'

interface TripData {
  destination: string;
  startDate: string;
  endDate: string;
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
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
  const [isLoading, setIsLoading] = useState(false)

  // Estado para Toast
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'info',
    isVisible: false
  })

  // Estado para Modal de Confirmação
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning' as 'danger' | 'warning' | 'info',
    onConfirm: () => {}
  })

  // Handlers do Toast
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({ message, type, isVisible: true })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  // Handlers do Modal de Confirmação

  const hideConfirmation = () => {
    setConfirmationModal(prev => ({ ...prev, isOpen: false }))
  }

  // Handlers principais
  const openGuestsInput = () => setIsGuestsInputOpen(true)
  const closeGuestsInput = () => setIsGuestsInputOpen(false)
  const openGuestsModal = () => setIsGuestsModalOpen(true)
  const closeGuestsModal = () => setIsGuestsModalOpen(false)
  const openConfirmTripModal = () => setIsConfirmTripModalOpen(true)
  const closeConfirmTripModal = () => setIsConfirmTripModalOpen(false)

  // FUNÇÃO CORRIGIDA - Agora recebe string diretamente
  const addNewEmailToInvite = (email: string) => {
    if (!email) return

    if (emailToInvite.includes(email)) {
      showToast('Este email já foi convidado', 'warning')
      return
    }

    setEmailToInvite([...emailToInvite, email])
    showToast('Email adicionado com sucesso!', 'success')
  }

  const removeEmailToInvite = (emailToRemove: string) => {
    setEmailToInvite(emailToInvite.filter(email => email !== emailToRemove))
  }

  const createTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (emailToInvite.length === 0) {
      showToast('Adicione pelo menos um convidado para criar a viagem', 'warning')
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      showToast('Viagem criada com sucesso! 🎉', 'success')
      setTimeout(() => {
        navigate('/trips/123')
      }, 500)
    } catch (error) {
      console.error('Erro ao criar viagem:', error)
      showToast('Ocorreu um erro ao criar a viagem. Tente novamente.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Função para confirmar remoção de todos os convidados

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
            Convide seus amigos e planeje viagens inesquecíveis 
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='space-y-4'
        >
          {/* Step 1 */}
          <div className="relative">
            <DestinationAndDateStep
              closeGuestsInput={closeGuestsInput}
              isGuestsInputOpen={isGuestsInputOpen}
              openGuestsInput={openGuestsInput}
              onTripDataChange={setTripData}
            />

            <div className="absolute -top-3 left-4 bg-zinc-800 px-2 py-0.5 rounded-full text-xs text-zinc-400">
              Passo 1
            </div>
          </div>

          {/* Step 2 */}
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
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type={confirmationModal.type}
        onConfirm={() => {
          confirmationModal.onConfirm()
        }}
        onCancel={hideConfirmation}
        confirmText="Sim, remover"
        cancelText="Cancelar"
      />
    </div>
  )
}
