import { CircleCheck } from "lucide-react";


export function Ativities (){
    return (
        <div className="space-y-8 ">

            <div className="space-y-2.5 ">
                <div className="flex gap-2 items-baseline font-semibold">
                    <span className="text-xl text-zinc-300">Dia 17</span>
                    <span className="text-xs text-zinc-500">Sábado</span>
                </div>
                <p className="text-zinc-500 text-sm">Nehuma atividade cadastrada nessa data</p>
            </div>

            <div className="space-y-2.5 ">
                <div className="flex gap-2 items-baseline font-semibold">
                    <span className="text-xl text-zinc-300">Dia 18</span>
                    <span className="text-xs text-zinc-500">Domingo</span>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-800 rounded-xl shadow-gray-900 flex items-center gap-3 ">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Academia em teste</span>
                        <span className="text-zinc-400 text-sm flex ml-auto">8:00h</span>
                    </div>

                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-800 rounded-xl shadow-gray-900 flex items-center gap-3 ">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Fazer Exercicios</span>
                        <span className="text-zinc-400 text-sm flex ml-auto">18:00h</span>
                    </div>
                </div>
            </div>
        </div>
    )
}