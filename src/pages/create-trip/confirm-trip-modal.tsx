import { User, X } from "lucide-react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    createTrip: ( event: React.FormEvent<HTMLFormElement>) => void
    

}


export function ConfirmTripModal ({closeConfirmTripModal, createTrip} : ConfirmTripModalProps){

    return (

          <div className='fixed inset-0 bg-black/60 flex justify-center items-center'>
          <div className='w-[640px] h-80 rounded-xl  py-5 px-6 bg-zinc-900 space-y-5'>

            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold mb-2'>Confirmar Criação de Viagem</h2>
              <button type='button' onClick={closeConfirmTripModal}>
                <X className='size-4 cursor-pointer text-zinc-400 rounded-4xl hover:bg-zinc-500' />
              </button>
            </div>
            <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>Florianópolis, Brazil</span> nas datas de <span className='text-zinc-100 font-semibold'>17 de Dezembro de 2025 </span>preencha os campos a baixo:</p>

              <div className='w-full h-px bg-zinc-800 '>

                <form onClick={createTrip} className='space-y-4 mt-4'>
                <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center mb-2'>
                  <User className='text-zinc-400 size-5' />
                  <input
                    type=" name"
                    placeholder="Digite o seu Nome Completo"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                    />
              </div>
              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center mb-2'>
                  <User className='text-zinc-400 size-5' />
                  <input
                    type="email"
                    name='email'
                    placeholder="Digite o seu Email"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                    />
              </div>
                 <Button type="submit" variant="primary" size="full">
                    Confirmar a criação da viagem
                 </Button>
                </form>

              </div>
            </div>
          </div>
     
    )

}