import { Magacin } from './magacin';
import { PoslovniPartner } from './poslovniPartner';
import { PoslovnaGodina } from './poslovnaGodina';

export class PrometniDokument{
    id:number;
    redniBroj:string;
    datumFormiranja:Date;
    datumKnjizenja:Date;
    tipPrometnogDokumenta:string;
    statusDokumenta:string;
    magacin:Magacin;
    magacin2:Magacin;
    poslovniPartner:PoslovniPartner;
    poslovnaGodina:PoslovnaGodina;
}