import { Component, OnInit, ViewChild } from '@angular/core';
import { Magacin } from 'src/app/model/magacin';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MagacinService } from 'src/app/services/magacin.service';
import { RobnaKartica } from 'src/app/model/robnaKartica';
import { LagerService } from 'src/app/services/lager.service';

@Component({
  selector: 'app-lager-lista',
  templateUrl: './lager-lista.component.html',
  styleUrls: ['./lager-lista.component.css']
})
export class LagerListaComponent implements OnInit {

  magacinList:Magacin[]=[]
  magacinIdGlobal:number
  centralni:Magacin
  robnaKarticaList:RobnaKartica[]=[]
  dataSource:any
  displayedColumns: string[] = ['sifra','pakovanje','jedinicaMere','naziv','kolicina','cena','vrednost']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static:true}) table: MatTable<any>;

  constructor(private dialog: MatDialog,private snackBar:MatSnackBar,private router:Router
    ,private magacinService:MagacinService,private lagerService:LagerService) { }

  ngOnInit(): void {
    this.magacinService.getMagacinList().subscribe(
      data=>{
        this.magacinList=data;
        if(this.magacinList.length>0){
          this.centralni=this.magacinList[0];
          this.magacinIdGlobal=this.centralni.id
          this.lagerService.listaRobnihKartica(this.centralni.id).subscribe(
            data=>{
              this.robnaKarticaList=data.filter(element => {return element.ukupnaKolicina>0})
              this.dataSource=new MatTableDataSource(this.robnaKarticaList);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort=this.sort;
            },
            error=>{
              console.log("greska pri ucitavanju kartica")
            }
          )
        }
      },
      errot=>console.log("greska u ucitavanju magacina")
    )

  }
  onClick(magacinId:number){
    this.magacinIdGlobal=magacinId
    this.lagerService.listaRobnihKartica(magacinId).subscribe(
      data=>{
        this.robnaKarticaList=data.filter(element => { return element.ukupnaKolicina>0})
        this.dataSource=new MatTableDataSource(this.robnaKarticaList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error=>{
        console.log("greska pri ucitavanju kartica")
      }
    )
  }
  getTotal():number{
    let total:number=0;
    this.robnaKarticaList.forEach(element => {
        total +=element.ukupnaVrednost
    })
    return total
  }

  onReport(){
    this.lagerService.reportLager(this.magacinIdGlobal).subscribe(
      data=>{
        console.log("kreiran pdf : "+data)
        this.snackBar.open("PDF Dokument je formiran!","",{duration:3000})
      },
      error=>{
        console.log("greska pri kreiranju reporta"+error.string)
        this.snackBar.open("PDF Dokument nije formiran!","",{duration:3000})
      }
    );
  }

   //event uzima element sa htmla i njegovu vrednost koju prosledjuje filteru
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
