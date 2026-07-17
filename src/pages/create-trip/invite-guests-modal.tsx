import { AtSign, Plus, X, Users, Mail, Check, AlertCircle } from "lucide-react"
import { Button } from "../../components/button"
import { useState, type FormEvent, useRef, useEffect } from "react"

interface InviteGuestsModalProps {
    emailToInvite: string[]
    closeGuestsModel: () => void
    addNewEmailToInvite: (email: string) => void // Alterado para receber string
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
    const [emailError, setEmailError] = useState<string>("")
    const [isSuccess, setIsSuccess] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Foco automático no input ao abrir o modal
    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 100)
    }, [])

    // Validação de email
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setEmailError("")

        const trimmedEmail = email.trim()

        if (!trimmedEmail) {
            setEmailError("Digite um e-mail")
            inputRef.current?.focus()
            return
        }

        if (!validateEmail(trimmedEmail)) {
            setEmailError("E-mail inválido")
            inputRef.current?.focus()
            return
        }

        if (emailToInvite.includes(trimmedEmail)) {
            setEmailError("Este e-mail já foi adicionado")
            inputRef.current?.focus()
            return
        }

        setIsSubmitting(true)

        // Chamar diretamente a função do pai com o email
        addNewEmailToInvite(trimmedEmail)

        // Limpar e mostrar sucesso
        setEmail("")
        setIsSubmitting(false)
        setIsSuccess(true)
        inputRef.current?.focus()

        // Resetar estado de sucesso após 2 segundos
        setTimeout(() => {
            setIsSuccess(false)
        }, 2000)
    }

    const handleRemoveEmail = (emailToRemove: string) => {
        if (confirm(`Remover ${emailToRemove} da lista de convidados?`)) {
            removeEmailToInvite(emailToRemove)
        }
    }

    const handleRemoveAll = () => {
        if (emailToInvite.length === 0) return

        if (confirm(`Remover todos os ${emailToInvite.length} convidados?`)) {
            // Criar cópia da lista para evitar problemas de estado
            const emailsCopy = [...emailToInvite]
            emailsCopy.forEach(email => removeEmailToInvite(email))
        }
    }

    // Lidar com tecla ESC
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeGuestsModel()
        }
    }

    return (
        <div
            className='fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50'
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeGuestsModel()
                }
            }}
            onKeyDown={handleKeyDown}
        >
            <div className='w-full max-w-[640px] rounded-xl py-6 px-6 bg-zinc-900 space-y-5 shadow-2xl border border-zinc-800/50'>

                {/* Header */}
                <div className='flex items-center justify-between'>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-lime-400/10 rounded-lg">
                            <Users className="size-5 text-lime-400" />
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold text-white'>
                                Convidar Pessoas
                            </h2>
                            <span className='text-sm text-zinc-400'>
                                {emailToInvite.length === 0
                                    ? 'Nenhum convidado adicionado'
                                    : `${emailToInvite.length} convidado${emailToInvite.length !== 1 ? 's' : ''} adicionado${emailToInvite.length !== 1 ? 's' : ''}`
                                }
                            </span>
                        </div>
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
                <div className="flex items-start gap-2 p-3 bg-zinc-800/30 rounded-lg border border-zinc-800/50">
                    <Mail className="size-4 text-zinc-400 shrink-0 mt-0.5" />
                    <p className='text-sm text-zinc-400'>
                        Os convidados irão receber um e-mail com o link para confirmar a participação na viagem
                    </p>
                </div>

                {/* Email List */}
                <div className='space-y-3'>
                    {emailToInvite.length > 0 ? (
                        <div className='flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1 custom-scrollbar'>
                            {emailToInvite.map((email, index) => (
                                <div
                                    key={email}
                                    className="py-1.5 px-3 rounded-md bg-zinc-800/80 flex items-center gap-2 group border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                                    style={{
                                        animationDelay: `${index * 50}ms`
                                    }}
                                >
                                    <span className='text-zinc-300 text-sm truncate max-w-[200px]'>
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
                        <div className='text-center py-6 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-lg'>
                            <Users className="size-8 text-zinc-600 mx-auto mb-2" />
                            Nenhum convidado adicionado ainda
                            <br />
                            <span className="text-xs text-zinc-600">Adicione os e-mails dos seus amigos</span>
                        </div>
                    )}

                    {/* Divider */}
                    <div className='w-full h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent' />

                    {/* Add Email Form */}
                    <form
                        onSubmit={handleSubmit}
                        className='space-y-2'
                    >
                        <div className={`p-2.5 bg-zinc-950 border rounded-lg flex items-center gap-2 transition-colors ${
                            emailError
                                ? 'border-red-500/50 focus-within:border-red-500'
                                : isSuccess
                                ? 'border-emerald-500/50 focus-within:border-emerald-500'
                                : 'border-zinc-800 focus-within:border-lime-400/50'
                        }`}>
                            <div className='flex items-center flex-1 gap-2 px-2'>
                                <AtSign className={`size-5 shrink-0 transition-colors ${
                                    emailError ? 'text-red-400' : isSuccess ? 'text-emerald-400' : 'text-zinc-400'
                                }`} />
                                <input
                                    ref={inputRef}
                                    type="email"
                                    name='email'
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (emailError) setEmailError("")
                                        if (isSuccess) setIsSuccess(false)
                                    }}
                                    placeholder="Digite o e-mail do convidado"
                                    className="bg-transparent text-sm placeholder-zinc-400 outline-none flex-1 min-w-0"
                                    disabled={isSubmitting}
                                    autoComplete="email"
                                />
                                {isSuccess && <Check className="size-5 text-emerald-400 shrink-0" />}
                                {emailError && <AlertCircle className="size-5 text-red-400 shrink-0" />}
                            </div>
                            <Button
                                type="submit"
                                variant={emailError ? "danger" : isSuccess ? "success" : "primary"}
                                size="sm"
                                disabled={isSubmitting || !email.trim() || isSuccess}
                                className="shrink-0"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin">⏳</span>
                                        Adicionando...
                                    </span>
                                ) : isSuccess ? (
                                    <>
                                        Adicionado
                                        <Check className='size-4' />
                                    </>
                                ) : (
                                    <>
                                        Adicionar
                                        <Plus className='size-4' />
                                    </>
                                )}
                            </Button>
                        </div>
                        {emailError && (
                            <p className="text-xs text-red-400 px-1">{emailError}</p>
                        )}
                    </form>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-zinc-500">
                            {emailToInvite.length > 0 && `${emailToInvite.length} convidado${emailToInvite.length !== 1 ? 's' : ''}`}
                        </span>
                        <div className="flex gap-2">
                            {emailToInvite.length > 0 && (
                                <button
                                    type="button"
                                    onClick={handleRemoveAll}
                                    className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                                >
                                    Remover todos
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #52525b;
                }
            `}</style>
        </div>
    )
}
