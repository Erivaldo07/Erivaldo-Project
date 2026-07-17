import { AtSign, Plus, X } from "lucide-react"
import { Button } from "../../components/button"
import { useState, type FormEvent, useRef } from "react"

interface InviteGuestsModalProps {
    emailToInvite: string[]
    closeGuestsModel: () => void
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailToInvite: (emailToRemove: string) => void
}

export function InviteGuestsModal({
    emailToInvite,
    closeGuestsModel,
    addNewEmailToInvite,
    removeEmailToInvite
}: InviteGuestsModalProps) {

    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email.trim()) {
            inputRef.current?.focus()
            return
        }

        setIsSubmitting(true)

        // Chama a função do parent component
        addNewEmailToInvite(event)

        // Limpa o input após adicionar
        setEmail("")
        setIsSubmitting(false)
        inputRef.current?.focus()
    }

    const handleRemoveEmail = (emailToRemove: string) => {
        if (confirm(`Remover ${emailToRemove} da lista de convidados?`)) {
            removeEmailToInvite(emailToRemove)
        }
    }

    return (
        <div
            className='fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50'
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeGuestsModel()
                }
            }}
        >
            <div className='w-full max-w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5 shadow-2xl'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-semibold text-white'>
                            Selecionar Convidados
                        </h2>
                        <span className='text-sm text-zinc-400'>
                            {emailToInvite.length} convidado{emailToInvite.length !== 1 ? 's' : ''}
                            {emailToInvite.length > 0 && ' adicionado(s)'}
                        </span>
                    </div>
                    <button
                        type='button'
                        onClick={closeGuestsModel}
                        className='p-1 rounded-full hover:bg-zinc-800 transition-colors'
                    >
                        <X className='size-5 text-zinc-400 hover:text-white transition-colors' />
                    </button>
                </div>

                {/* Description */}
                <p className='text-sm text-zinc-400'>
                    Os convidados irão receber e-mails para confirmar a participação na viagem
                </p>

                {/* Email List */}
                <div className='space-y-3'>
                    {emailToInvite.length > 0 ? (
                        <div className='flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1'>
                            {emailToInvite.map((email) => (
                                <div
                                    key={email}
                                    className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2 group animate-in fade-in'
                                >
                                    <span className='text-zinc-300 text-sm'>
                                        {email}
                                    </span>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveEmail(email)}
                                        className='p-0.5 rounded-full hover:bg-zinc-700 transition-colors'
                                        aria-label={`Remover ${email}`}
                                    >
                                        <X className='size-3.5 text-zinc-400 hover:text-red-400 transition-colors' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-4 text-zinc-500 text-sm'>
                            Nenhum convidado adicionado ainda
                        </div>
                    )}

                    {/* Divider */}
                    <div className='w-full h-px bg-zinc-800' />

                    {/* Add Email Form */}
                    <form
                        onSubmit={handleSubmit}
                        className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'
                    >
                        <div className='flex items-center flex-1 gap-2 px-2'>
                            <AtSign className='text-zinc-400 size-5 flex-shrink-0' />
                            <input
                                ref={inputRef}
                                type="email"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite o e-mail do convidado"
                                className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1 min-w-0"
                                disabled={isSubmitting}
                                autoComplete="email"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting || !email.trim()}
                            className="flex-shrink-0"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin">⏳</span>
                                    Adicionando...
                                </span>
                            ) : (
                                <>
                                    Adicionar
                                    <Plus className='size-4' />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Quick actions */}
                    {emailToInvite.length > 0 && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    if (confirm("Remover todos os convidados?")) {
                                        emailToInvite.forEach(email => removeEmailToInvite(email))
                                    }
                                }}
                                className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                            >
                                Remover todos
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
