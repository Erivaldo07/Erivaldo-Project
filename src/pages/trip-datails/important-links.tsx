import { Link2, Plus, Trash2, Edit2, Copy, ExternalLink, Link, Clock, MoreVertical } from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";
import { Toast } from "../../components/toast";
import { ConfirmationModal } from "../../components/confirmation-modal";

interface LinkData {
    id: string;
    title: string;
    url: string;
    category?: string;
    createdAt: string;
}

interface ToastState {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
}

export function ImportantLinks() {
    const [links, setLinks] = useState<LinkData[]>([
        {
            id: "1",
            title: "Reserva do AirBnB",
            url: "https://www.airbnb.com/rooms/123456",
            category: "Hospedagem",
            createdAt: "2025-12-17T10:00:00"
        },
        {
            id: "2",
            title: "Ingressos do Show",
            url: "https://www.eventim.com/event/789012",
            category: "Eventos",
            createdAt: "2025-12-17T10:30:00"
        },
        {
            id: "3",
            title: "Roteiro Turístico",
            url: "https://docs.google.com/document/d/abcdefg",
            category: "Planejamento",
            createdAt: "2025-12-17T11:00:00"
        }
    ]);

    const [showMenu, setShowMenu] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newCategory, setNewCategory] = useState("");

    // Estado para Toast
    const [toast, setToast] = useState<ToastState>({
        message: '',
        type: 'info',
        isVisible: false
    });

    // Estado para Modal de Confirmação
    const [confirmationModal, setConfirmationModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'warning' as 'danger' | 'warning' | 'info',
        onConfirm: () => {},
        linkId: ''
    });

    // Handlers do Toast
    const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
        setToast({ message, type, isVisible: true });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, isVisible: false }));
    };

    // Handlers do Modal de Confirmação
    const showConfirmation = (
        title: string,
        message: string,
        onConfirm: () => void,
        type: 'danger' | 'warning' | 'info' = 'warning'
    ) => {
        setConfirmationModal({
            isOpen: true,
            title,
            message,
            type,
            onConfirm,
            linkId: ''
        });
    };

    const hideConfirmation = () => {
        setConfirmationModal(prev => ({ ...prev, isOpen: false }));
    };

    const handleCopyLink = (url: string) => {
        navigator.clipboard.writeText(url);
        showToast('Link copiado para a área de transferência! 📋', 'success');
        setShowMenu(null);
    };

    const handleDeleteLink = (id: string, title: string) => {
        showConfirmation(
            'Remover Link',
            `Tem certeza que deseja remover o link "${title}"?`,
            () => {
                setLinks(links.filter(link => link.id !== id));
                showToast(`Link "${title}" removido com sucesso!`, 'success');
                hideConfirmation();
            },
            'danger'
        );
        setShowMenu(null);
    };

    const handleAddLink = () => {
        if (!newTitle.trim() || !newUrl.trim()) {
            showToast('Preencha todos os campos obrigatórios', 'warning');
            return;
        }

        // Validar URL
        try {
            new URL(newUrl);
        } catch {
            showToast('URL inválida. Certifique-se de incluir http:// ou https://', 'error');
            return;
        }

        const newLink: LinkData = {
            id: Date.now().toString(),
            title: newTitle.trim(),
            url: newUrl.trim(),
            category: newCategory.trim() || "Geral",
            createdAt: new Date().toISOString()
        };

        setLinks([newLink, ...links]);
        setNewTitle("");
        setNewUrl("");
        setNewCategory("");
        setShowAddForm(false);
        showToast(`Link "${newTitle.trim()}" adicionado com sucesso! 🎉`, 'success');
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            "Hospedagem": "bg-blue-400/10 text-blue-400",
            "Eventos": "bg-purple-400/10 text-purple-400",
            "Planejamento": "bg-emerald-400/10 text-emerald-400",
            "Alimentação": "bg-orange-400/10 text-orange-400",
            "Transporte": "bg-cyan-400/10 text-cyan-400",
            "Geral": "bg-zinc-400/10 text-zinc-400"
        };
        return colors[category] || colors["Geral"];
    };

    const getDomain = (url: string) => {
        try {
            const domain = new URL(url).hostname;
            return domain.replace('www.', '');
        } catch {
            return url;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header com estatísticas */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-xl text-white">Links Importantes</h2>
                    <p className="text-sm text-zinc-400 mt-0.5">
                        {links.length} {links.length === 1 ? 'link salvo' : 'links salvos'}
                    </p>
                </div>

                {links.length > 0 && (
                    <span className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-0.5 rounded-full">
                        Último: {formatDate(links[0].createdAt)}
                    </span>
                )}
            </div>

            {/* Lista de Links */}
            <div className="space-y-2">
                {links.length > 0 ? (
                    links.map((link) => (
                        <div
                            key={link.id}
                            className="group px-4 py-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="font-medium text-sm text-zinc-100 truncate">
                                            {link.title}
                                        </span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(link.category || "Geral")}`}>
                                            {link.category || "Geral"}
                                        </span>
                                        <span className="text-xs text-zinc-500 hidden sm:inline">
                                            • {getDomain(link.url)}
                                        </span>
                                    </div>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors truncate group/link"
                                    >
                                        <Link className="size-3.5 shrink-0" />
                                        <span className="truncate">{link.url}</span>
                                        <ExternalLink className="size-3 shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                    </a>
                                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                                        <Clock className="size-3" />
                                        <span>Adicionado em {formatDate(link.createdAt)}</span>
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="flex items-center gap-1 shrink-0">
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 rounded-lg hover:bg-zinc-700 transition-colors"
                                        aria-label="Abrir link"
                                    >
                                        <ExternalLink className="size-4 text-zinc-400 hover:text-zinc-200" />
                                    </a>

                                    <div className="relative">
                                        <button
                                            onClick={() => setShowMenu(showMenu === link.id ? null : link.id)}
                                            className="p-1.5 rounded-lg hover:bg-zinc-700 transition-colors opacity-0 group-hover:opacity-100"
                                            aria-label="Mais opções"
                                        >
                                            <MoreVertical className="size-4 text-zinc-400" />
                                        </button>

                                        {showMenu === link.id && (
                                            <div className="absolute right-0 mt-1 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl py-1 z-10">
                                                <button
                                                    onClick={() => handleCopyLink(link.url)}
                                                    className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2"
                                                >
                                                    <Copy className="size-4" />
                                                    Copiar link
                                                </button>
                                                <button
                                                    className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2"
                                                >
                                                    <Edit2 className="size-4" />
                                                    Editar link
                                                </button>
                                                <div className="h-px bg-zinc-700 my-1" />
                                                <button
                                                    onClick={() => handleDeleteLink(link.id, link.title)}
                                                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-700 transition-colors flex items-center gap-2"
                                                >
                                                    <Trash2 className="size-4" />
                                                    Remover link
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 bg-zinc-800/30 rounded-xl border border-dashed border-zinc-700/50">
                        <Link2 className="size-8 text-zinc-600 mx-auto mb-2" />
                        <p className="text-zinc-400 text-sm">Nenhum link cadastrado</p>
                        <p className="text-xs text-zinc-500 mt-1">Adicione links importantes para sua viagem</p>
                    </div>
                )}
            </div>

            {/* Botão Adicionar */}
            {!showAddForm ? (
                <Button
                    variant="secondary"
                    size="full"
                    onClick={() => setShowAddForm(true)}
                >
                    Cadastrar novo Link
                    <Plus className='size-5' />
                </Button>
            ) : (
                <div className="p-4 bg-zinc-800/50 rounded-xl border border-zinc-700/50 space-y-3 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Título do link"
                            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-lime-400/50 transition-colors"
                            autoFocus
                        />
                        <input
                            type="url"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            placeholder="URL (ex: https://exemplo.com)"
                            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-lime-400/50 transition-colors"
                        />
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Categoria (opcional)"
                            className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-lime-400/50 transition-colors"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="full"
                            onClick={() => {
                                setShowAddForm(false);
                                setNewTitle("");
                                setNewUrl("");
                                setNewCategory("");
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            size="full"
                            onClick={handleAddLink}
                            disabled={!newTitle.trim() || !newUrl.trim()}
                        >
                            <Plus className="size-4" />
                            Salvar Link
                        </Button>
                    </div>
                </div>
            )}

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
                onConfirm={confirmationModal.onConfirm}
                onCancel={hideConfirmation}
                confirmText={confirmationModal.type === 'danger' ? 'Sim, remover' : 'Confirmar'}
                cancelText="Cancelar"
            />
        </div>
    );
}
