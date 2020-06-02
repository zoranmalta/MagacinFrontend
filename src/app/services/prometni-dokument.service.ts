import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrometniDokument } from '../model/prometniDokument';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RobnaKartica } from '../model/robnaKartica';

@Injectable({
  providedIn: 'root'
})
export class PrometniDokumentService {

  readonly insertDokumentUrl=`${environment.apiBaseUri}/prometnidokument/insertprijemnica`;
  readonly insertOtpremnicaDokumentUrl=`${environment.apiBaseUri}/prometnidokument/insertotpremnica`
  readonly insertMMDokumentUrl=`${environment.apiBaseUri}/prometnidokument/insertmm`
  readonly getAllDokumentUrl=`${environment.apiBaseUri}/prometnidokument/all`;
  readonly proknjiziDokumentUrl=`${environment.apiBaseUri}/prometnidokument/proknjizi`;
  readonly stornirajDokumentUrl=`${environment.apiBaseUri}/prometnidokument/stornodokument`;

  readonly validacionaListaRobnihKarticaUrl=`${environment.apiBaseUri}/robnakartica/karticeoddokumenta`


  constructor(private http:HttpClient) { }

  insertOtpremnicaDokument(prometniDokument:PrometniDokument):Observable<PrometniDokument>{
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objekat poslat na server za prometniDokument Otpremnica :"+prometniDokument )
    return this.http.post<PrometniDokument>(this.insertOtpremnicaDokumentUrl,prometniDokument,{headers})
  }

  insertPrijemnicaDokument(prometniDokument:PrometniDokument):Observable<PrometniDokument>{
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objekat poslat na server za prometniDokument roba :"+prometniDokument )
    return this.http.post<PrometniDokument>(this.insertDokumentUrl,prometniDokument,{headers})
  }
  insertMMDokument(prometniDokument:PrometniDokument):Observable<PrometniDokument>{
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objekat poslat na server za prometniDokument roba :"+prometniDokument )
    return this.http.post<PrometniDokument>(this.insertMMDokumentUrl,prometniDokument,{headers})
  }

  proknjiziDokument(prometniDokument:PrometniDokument):Observable<PrometniDokument>{
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objekat poslat na server za prometniDokument analitika :"+prometniDokument )
    return this.http.post<PrometniDokument>(this.proknjiziDokumentUrl,prometniDokument,{headers})
  }
  stornirajDokument(prometniDokument:PrometniDokument):Observable<PrometniDokument>{
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objekat poslat na server za prometniDokument stornoo prijemnice :"+prometniDokument )
    return this.http.post<PrometniDokument>(this.stornirajDokumentUrl,prometniDokument,{headers})
  }

  getAllDokument():Observable<PrometniDokument[]>{
    return this.http.get<PrometniDokument[]>(this.getAllDokumentUrl)
  }
  //ideja da vrati listu kartica i da na frontu prikaze sve nedostatke i ogranicenja
  validacionaListaRobnihKartica(prometniDokument:PrometniDokument):Observable<RobnaKartica[]>{
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Objekat poslat na server za prometniDokument robna kartica validacija :"+prometniDokument )
    return this.http.post<RobnaKartica[]>(this.validacionaListaRobnihKarticaUrl,prometniDokument,{headers})
  }
}
