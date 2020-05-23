import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Magacin } from '../model/magacin';
import { PoslovniPartner } from '../model/poslovniPartner';

@Injectable({
  providedIn: 'root'
})
export class PoslovniPartnerService {
  readonly getPoslovniPartnerListUrl=`${environment.apiBaseUri}/poslovnipartner/all`

  constructor(private http:HttpClient) { }

  getPoslovniPartnerList():Observable<PoslovniPartner[]>{
    return this.http.get<PoslovniPartner[]>(this.getPoslovniPartnerListUrl)
  }
}
