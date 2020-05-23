import { Roba } from './roba';
import { PrometniDokument } from './prometniDokument';

export class StavkaDokumenta{
    id:number;
    cena:number;
    kolicina:number;
    vrednost:number;
    roba:Roba;
    prometniDokument:PrometniDokument;
}