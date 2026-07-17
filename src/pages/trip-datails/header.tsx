import { Calendar, MapPinIcon, Settings2, } from "lucide-react";
import { Button } from "../../components/button";

export function Header (){
    return (
         <div className="px-4 h-16 rounded-xl bg-zinc-900 flex items-center justify-between shadow-neutral-800">
                <div className="flex items-center gap-2">
                    <MapPinIcon className="size-5 text-zinc-400" />
                    <span className="text-lg text-zinc-100"> Florianópolis, Brazil</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-5 text-zinc-400" />
                        <span className="text-lg text-zinc-100"> 20 a 31 de Dezembro</span>
                    </div>

                    <div className="w-px h-6 bg-zinc-800"/>

                       <Button variant="secondary">
                          Alterar Lonal/Data
                        <Settings2 className='size-5' />
                       </Button>
                       
                      {/*<Button/>*/}

                </div>
            </div>
    )
}