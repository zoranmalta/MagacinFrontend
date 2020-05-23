import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Magacin } from '../model/magacin';

@Injectable({
  providedIn: 'root'
})
export class MagacinService {

  readonly getMagacinListUrl=`${environment.apiBaseUri}/magacin/all`

  constructor(private http:HttpClient) { }

  getMagacinList():Observable<Magacin[]>{
    return this.http.get<Magacin[]>(this.getMagacinListUrl)
  }
}
