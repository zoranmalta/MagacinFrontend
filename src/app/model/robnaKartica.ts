import { PoslovnaGodina } from './poslovnaGodina';
import { Roba } from './roba';
import { Magacin } from './magacin';
import { AnalitikaMagacinskeKartice } from './analitikaMagacinskeKartice';

export class RobnaKartica{
    id:number;
    
    kolicinaUlaza:number;
    kolicinaIzlaza:number;
    kolicinaPocetnogStanja:number;
    cena:number;
    vrednostUlaza:number;
    vrednostIzlaza:number;
    ukupnaVrednost:number;

    vrednostPocetnogStanja:number;
    ukupnaKolicina:number;

    magacin:Magacin;
    roba:Roba;
    poslovnaGodina:PoslovnaGodina;
    analitike:AnalitikaMagacinskeKartice[]=[]
}