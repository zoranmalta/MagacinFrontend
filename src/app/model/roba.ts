import { JedinicaMere } from './jedinicaMere';
import { GrupaRoba } from './grupaRoba';

export class Roba{
    id:number;
    naziv:string;
    sifra:string;
    pakovanje:number;
    jedinicaMere:JedinicaMere;
    grupaRoba:GrupaRoba;
}