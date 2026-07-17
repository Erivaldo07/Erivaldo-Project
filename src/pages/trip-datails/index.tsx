import { Plus, Users, Link2, Activity, ChevronLeft, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { CreateActivityModal } from "./create-ativity-modal";
import { ImportantLinks } from "./important-links";
import { Guest } from "./guest";
import { Activities } from "./activities";
import { Header } from "./header";
import { Button } from "../../components/button";
import { Toast } from "../../components/toast";
import { ConfirmationModal } from "../../components/confirmation-modal";

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
}

export function TripDetailsPage() {
    const navigate = useNavigate();
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [tripStats, setTripStats] = useState({
        activities: 12,
        guests: 8,
        links: 5,
        days: 7
    });

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
        onConfirm: () => {}
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
            onConfirm
        });
    };

    const hideConfirmation = () => {
        setConfirmationModal(prev => ({ ...prev, isOpen: false }));
    };

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true);
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false);
    }

    function handleCreateActivity(data: { title: string; date: string }) {
        console.log("Nova atividade:", data);
        setTripStats(prev => ({
            ...prev,
            activities: prev.activities + 1
        }));
        showToast(`Atividade "${data.title}" criada com sucesso! 🎉`, 'success');
        closeCreateActivityModal();
    }

    function handleGoBack() {
        navigate('/');
    }

    function handleExportTrip() {
        showToast('Exportando dados da viagem... 📥', 'info');
        // Simular exportação
        setTimeout(() => {
            showToast('Viagem exportada com sucesso! ✅', 'success');
        }, 1500);
    }

    function handleShareTrip() {
        showToast('Link de compartilhamento copiado! 📤', 'success');
    }

    function handleDeleteTrip() {
        showConfirmation(
            'Excluir Viagem',
            'Tem certeza que deseja excluir esta viagem? Esta ação não pode ser desfeita.',
            () => {
                showToast('Viagem excluída com sucesso', 'success');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                hideConfirmation();
            },
            'danger'
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">

                {/* Header com Navegação */}
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors group"
                    >
                        <ChevronLeft className="size-5 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-sm hidden sm:inline">Voltar</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {/* Estatísticas rápidas */}
                        <div className="hidden md:flex items-center gap-4 text-xs text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-800/50">
                            <span className="flex items-center gap-1">
                                <Activity className="size-3.5 text-lime-400" />
                                {tripStats.activities} atividades
                            </span>
                            <span className="text-zinc-700">|</span>
                            <span className="flex items-center gap-1">
                                <Users className="size-3.5 text-lime-400" />
                                {tripStats.guests} convidados
                            </span>
                            <span className="text-zinc-700">|</span>
                            <span className="flex items-center gap-1">
                                <Link2 className="size-3.5 text-lime-400" />
                                {tripStats.links} links
                            </span>
                        </div>

                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleExportTrip}
                            className="hidden sm:flex"
                            disabled={isLoading}
                        >
                            <Download className="size-4" />
                            Exportar
                        </Button>

                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleShareTrip}
                            className="hidden sm:flex"
                            disabled={isLoading}
                        >
                            <Share2 className="size-4" />
                            Compartilhar
                        </Button>

                        {/* Botão Excluir - Opcional */}
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={handleDeleteTrip}
                            className="hidden sm:flex"
                            disabled={isLoading}
                        >
                            Excluir
                        </Button>
                    </div>
                </div>

                {/* Header Principal */}
                <Header
                    destination="Florianópolis, Brazil"
                    startDate="20 de Dezembro"
                    endDate="31 de Dezembro"
                    guestsCount={tripStats.guests}
                    onEdit={() => console.log("Editar viagem")}
                    onShare={handleShareTrip}
                />

                {/* Conteúdo Principal */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Coluna Esquerda - Atividades */}
                    <div className="flex-1 space-y-6 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                                    Atividades
                                </h2>
                                <p className="text-sm text-zinc-400 mt-0.5">
                                    {tripStats.days} dias de viagem planejados
                                </p>
                            </div>
                            <Button
                                onClick={openCreateActivityModal}
                                variant="primary"
                                className="shrink-0"
                                disabled={isLoading}
                            >
                                <Plus className="size-5" />
                                Cadastrar Atividade
                            </Button>
                        </div>

                        <Activities />
                    </div>

                    {/* Coluna Direita - Sidebar */}
                    <div className="lg:w-80 space-y-6 shrink-0">
                        {/* Links Importantes */}
                        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-4">
                            <ImportantLinks />
                        </div>

                        {/* Divisor */}
                        <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

                        {/* Convidados */}
                        <div className="bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-4">
                            <Guest />
                        </div>

                        {/* Resumo rápido (Mobile) */}
                        <div className="lg:hidden grid grid-cols-3 gap-2 text-center text-xs bg-zinc-800/30 rounded-xl p-3 border border-zinc-800/50">
                            <div>
                                <div className="text-lg font-bold text-white">{tripStats.activities}</div>
                                <div className="text-zinc-400">Atividades</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-white">{tripStats.guests}</div>
                                <div className="text-zinc-400">Convidados</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-white">{tripStats.links}</div>
                                <div className="text-zinc-400">Links</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <footer className="pt-6 border-t border-zinc-800/50 text-center text-xs text-zinc-500">
                    <p>
                        Plann.er © 2025 • Planeje suas viagens com quem você ama ✨
                    </p>
                </footer>
            </div>

            {/* Modal */}
            {isCreateActivityModalOpen && (
                <CreateActivityModal
                    closeCreateActivityModal={closeCreateActivityModal}
                    onCreateActivity={handleCreateActivity}
                />
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
                onConfirm={() => {
                    confirmationModal.onConfirm();
                }}
                onCancel={hideConfirmation}
                confirmText={confirmationModal.type === 'danger' ? 'Sim, excluir' : 'Confirmar'}
                cancelText="Cancelar"
            />
        </div>
    );
}
