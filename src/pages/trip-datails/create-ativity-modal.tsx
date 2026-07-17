import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";


interface CreateAtivityModalProps{
    closeCreateActivityModal: () => void 
}



export function CreateAtivityModal({ closeCreateActivityModal }: CreateAtivityModalProps) {
    return (

        <div className='fixed inset-0 bg-black/60 flex justify-center items-center'>
            <div className='w-[640px] h-80 rounded-xl  py-5 px-6 bg-zinc-900 space-y-5'>

                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold mb-2'>Cadastrar atividade</h2>
                    <button type='button' onClick={closeCreateActivityModal}>
                        <X className='size-4 cursor-pointer text-zinc-400 rounded-4xl hover:bg-zinc-500' />
                    </button>
                </div>
                <p className='text-sm text-zinc-400'>
                    Todos convidados podem visualizar as atividades
                </p>

                <div className='w-full h-px bg-zinc-800 '>

                    <form className='space-y-4 mt-4'>
                        {/*PRIMEIRO INPUT*/}

                        <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                            <Tag className='text-zinc-400 size-5 ' />
                            <input
                                type="title"
                                placeholder="Qual Atividade"
                                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 "
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            {/*SEGUNDO INPUT*/}
                            <div className='h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                                <Calendar className='text-zinc-400 size-5' />
                                <input
                                    type="datetime-local"
                                    name='occurs_at'
                                    placeholder="Data e Horário da atividade"
                                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark] "
                                />
                            </div>
                        </div>

                       <Button variant="primary" size="full">
                         Salvar atividade
                      </Button>
                    </form>

                </div>
            </div>
        </div>
    )
}