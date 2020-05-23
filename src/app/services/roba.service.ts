import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JedinicaMere } from '../model/jedinicaMere';
import { GrupaRoba } from '../model/grupaRoba';
import { Roba } from '../model/roba';

@Injectable({
  providedIn: 'root'
})
export class RobaService {

  readonly getRobaUrl=`${environment.apiBaseUri}/roba/all`
  readonly insertRobaUrl=`${environment.apiBaseUri}/roba/insert`
  readonly reportRobaUrl=`${environment.apiBaseUri}/roba/izvestaj`


  readonly getJedinicaMereUrl=`${environment.apiBaseUri}/jedinicamere/all`;
  readonly getGrupaRobaUrl=`${environment.apiBaseUri}/gruparoba/all`

  constructor(private http:HttpClient) { }

  getRoba():Observable<Roba[]>{
    return this.http.get<Roba[]>(this.getRobaUrl)
  }

  reportRoba():Observable<void>{
    return this.http.get<void>(this.reportRobaUrl);
  }

  insertRoba(roba:Roba):Observable<Roba>{
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objekat poslan na server za insert roba :"+roba )
    return this.http.post<Roba>(this.insertRobaUrl,roba,{headers})
  }

  getJedinicaMere():Observable<JedinicaMere[]>{
    return this.http.get<JedinicaMere[]>(this.getJedinicaMereUrl);
  }

  getGrupaRoba():Observable<GrupaRoba[]>{
    return this.http.get<GrupaRoba[]>(this.getGrupaRobaUrl);
  }

  get

}
