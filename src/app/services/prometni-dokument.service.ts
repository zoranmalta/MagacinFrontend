import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrometniDokument } from '../model/prometniDokument';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrometniDokumentService {

  readonly insertDokumentUrl=`${environment.apiBaseUri}/prometnidokument/insertprijemnica`;
  readonly getAllDokumentUrl=`${environment.apiBaseUri}/prometnidokument/all`;

  constructor(private http:HttpClient) { }

  insertPrijemnicaDokument(prometniDokument:PrometniDokument):Observable<PrometniDokument>{
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objekat poslan na server za prometniDokument roba :"+prometniDokument )
    return this.http.post<PrometniDokument>(this.insertDokumentUrl,prometniDokument,{headers})
  }
  getAllDokument():Observable<PrometniDokument[]>{
    return this.http.get<PrometniDokument[]>(this.getAllDokumentUrl)
  }
}
