import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrometniDokument } from 'src/app/model/prometniDokument';
import { MyErrorStateMatcher } from 'src/app/error-validators/MyErrorStateMatcher';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-prikaz-prometnog-dokumenta',
  templateUrl: './prikaz-prometnog-dokumenta.component.html',
  styleUrls: ['./prikaz-prometnog-dokumenta.component.css']
})
export class PrikazPrometnogDokumentaComponent implements OnInit {

  backroute:string=''
  prometniDokument:PrometniDokument

  dataSource:any;
  displayedColumns: string[] = ['sifra', 'pakovanje', 'naziv','jedinicaMere','kolicina','cena'];
  matcher = new MyErrorStateMatcher();
  @ViewChild(MatTable, {static:true}) table: MatTable<any>;

  constructor(private router:Router) { }

  ngOnInit(): void {
    //primamo ceo objekat Prometnidokument preko brauzera history.state.paramObject(ime objekta paramObject)
   this.prometniDokument=window.history.state.paramObject
   this.backroute=window.history.state.navigateBack
   this.dataSource=new MatTableDataSource(this.prometniDokument.stavke);
  }

  proknjizi(){

  }
  storniraj(){

  }
  onBack(){
    this.router.navigate([`/${this.backroute}`])
  }
}
