import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RobnaKartica } from '../model/robnaKartica';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AnalitikaMagacinskeKartice } from '../model/analitikaMagacinskeKartice';

@Injectable({
  providedIn: 'root'
})
export class LagerService {

  readonly listaRobnihKarticaUrl=`${environment.apiBaseUri}/robnakartica/magacin`
  readonly reportLagerUrl=`${environment.apiBaseUri}/robnakartica/izvestajlager`
  readonly listaAnalitikaUrl=`${environment.apiBaseUri}/analitika/kartica`
  readonly reportAnalitikaUrl=`${environment.apiBaseUri}/robnakartica/izvestajanalitika`

  constructor(private http:HttpClient) { }

  listaRobnihKartica(magacinId:number):Observable<RobnaKartica[]>{
    return this.http.get<RobnaKartica[]>(`${this.listaRobnihKarticaUrl}/${magacinId}`)
  }

  reportLager(magacinId:number):Observable<void>{
    return this.http.get<void>(`${this.reportLagerUrl}/${magacinId}`)
  }

  listaAnalitika(robnaKarticaId:number):Observable<AnalitikaMagacinskeKartice[]>{
    return this.http.get<AnalitikaMagacinskeKartice[]>(`${this.listaAnalitikaUrl}/${robnaKarticaId}`);
  }

  reportAnalitika(robnaKarticaId:number):Observable<void>{
    return this.http.get<void>(`${this.reportAnalitikaUrl}/${robnaKarticaId}`)
  }

}
