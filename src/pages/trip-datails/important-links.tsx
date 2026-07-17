import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinksn(){
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links Importantes</h2>
            <div className=" space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="#" className="block text-zinc-400 text-sm truncate hover:underline hover:text-zinc-200">
                            https://www.figma.com/file/abcdefg1234567
                        </a>
                    </div>
                    <Link2 className="size-5 text-zinc-400" />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="#" className="block text-zinc-400 text-sm truncate hover:underline hover:text-zinc-200">
                            https://www.figma.com/file/abcdefg1234567
                        </a>
                    </div>
                    <Link2 className="size-5 text-zinc-400" />
                </div>
            </div>
           <Button variant="secondary" size="full">
           Cadastrar novo Link
           <Plus className='size-5 sh-0' />
           </Button>
        </div>
             
    )
}