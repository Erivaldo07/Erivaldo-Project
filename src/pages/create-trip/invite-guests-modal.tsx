import { AtSign, Plus, X } from "lucide-react"
import { Button } from "../../components/button"


interface InviteGuestsModalProps {
    emailToInvite: string[]
    closeGuestsModel: () => void
    addNewEmailToInvite: (event: React.FormEvent<HTMLFormElement>) => void
    removeEmailToInvite: (emailToRemove: string) => void
}

export function InviteGuestsModal ({emailToInvite, closeGuestsModel, addNewEmailToInvite}: InviteGuestsModalProps){

    return (

        <div className='fixed inset-0 bg-black/60 flex justify-center items-center'>
          <div className='w-[640px] h-70 rounded-xl  py-5 px-6 bg-zinc-900 space-y-5'>

            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold mb-2'>Selecionar Convidados</h2>
              <button type='button' onClick={closeGuestsModel}>
                <X className='size-4 cursor-pointer text-zinc-400 rounded-4xl hover:bg-zinc-500' />
              </button>
            </div>
            <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem</p>

            <div className='flex flex-wrap gap-2 '>
              {emailToInvite.map(email => {
                  function removeEmailToInvite(_email: any): void {
                      throw new Error("Function not implemented.")
                  }
                  
                return (
                  <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                    <span className='text-zinc-300'>{ email}</span>
                    <button type='button' onClick={() => removeEmailToInvite(email)}>
                      <X className='size-4 text-zinc-400 hover:bg-zinc-500' />
                    </button>

                  </div>
                )
              })}
              <div className='w-full h-px bg-zinc-800 '>

                <form onSubmit={addNewEmailToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center'>
                 <div className='px-2 flex items-center flex-1 gap-2'>
                  <AtSign className='text-zinc-400 size-5' />
                  <input
                    type="email"
                    name='email'
                    placeholder="Digite o E-Gmail do seu convidado"
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                    />

                  <Button type="submit" variant="primary">
                     Adicionar Convidado
                    <Plus className='size-5' />
                  </Button>
                    </div>

                </form>

              </div>
            </div>
          </div>
        </div>
    )
}