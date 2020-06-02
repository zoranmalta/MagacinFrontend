import { RobnaKartica } from './robnaKartica';
import { StavkaDokumenta } from './stavkaDokumenta';

export class AnalitikaMagacinskeKartice{
    id:number;
    redniBroj:number;
    cena:number;
    kolicina:number;
    vrednost:number;

    tipPrometa:string;
    smer:string;
    
    datumFormiranja:Date;
    robnaKartica:RobnaKartica;
    stavkaDokumenta:StavkaDokumenta;
}