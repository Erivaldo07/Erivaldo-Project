import { CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";

 export function Guest (){
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className=" space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Erivaldo Neves</span>
                        <span className="block text-zinc-400 text-sm">
                            erivaldomanuel@gmail.com
                        </span>
                    </div>
                    <CircleDashed className="size-5 text-zinc-400" />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Luís Fidel</span>
                        <span className="block text-zinc-400 text-sm">
                            luísfidel@gmail.com
                        </span>
                    </div>
                    <CircleDashed className="size-5 text-zinc-400" />
                </div>
            </div>
            <Button variant="secondary" size="full">
               Gerenciar Convidados
            <UserCog className='size-5 sh-0' />    
            </Button>
        </div>
    )
 }