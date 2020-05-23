import { Mesto } from './mesto';
import { Preduzece } from './preduzece';

export class PoslovniPartner{
    id:number;
    naziv:string;
    adresa:string;
    pib:number;
    tipPartnera:string
    mesto:Mesto;
    preduzece:Preduzece;
}