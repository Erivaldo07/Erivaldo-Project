import { Plus,} from "lucide-react";
import { useState } from "react";
import { CreateAtivityModal } from "./create-ativity-modal";
import { ImportantLinksn } from "./important-links";
import { Guest } from "./guest";
import { Ativities } from "./activities";
import { Header } from "./header";
import { Button } from "../../components/button";

export function TripDatailsPage() {
    const [isCreateActivityModalOpen, setIsCreateAtivityModalOpen] = useState(false)

    function openCreateActivityModal() {
        setIsCreateAtivityModalOpen(true)
    }

    function closeCreateActivityModal() {
        setIsCreateAtivityModalOpen(false)
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">

            <Header />

            <main className="flex gap-16 px-6">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between ">
                        <h2 className="text-3xl font-semibold ">Atividades </h2>
                        <Button onClick={openCreateActivityModal} variant="primary">
                            Cadastrar Atividades
                            <Plus className='size-5' />
                             
                         </Button>
                    </div>
                    <Ativities />
                </div>


                <div className="w-80 space-y-6">
                    <ImportantLinksn />
                    <div className="w-full h-px bg-zinc-800" />
                    <Guest />
                </div>
            </main>
            {isCreateActivityModalOpen && (
                <CreateAtivityModal

                    closeCreateActivityModal={closeCreateActivityModal} />
            )}
        </div>

    )
}