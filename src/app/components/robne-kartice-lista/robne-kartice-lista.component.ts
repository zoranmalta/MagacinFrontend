import { Component, OnInit, ViewChild } from '@angular/core';
import { Magacin } from 'src/app/model/magacin';
import { RobnaKartica } from 'src/app/model/robnaKartica';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MagacinService } from 'src/app/services/magacin.service';
import { LagerService } from 'src/app/services/lager.service';

@Component({
  selector: 'app-robne-kartice-lista',
  templateUrl: './robne-kartice-lista.component.html',
  styleUrls: ['./robne-kartice-lista.component.css']
})
export class RobneKarticeListaComponent implements OnInit {

  magacinList:Magacin[]=[]
  magacinIdGlobal:number
  centralni:Magacin
  robnaKarticaList:RobnaKartica[]=[]
  dataSource:any
  displayedColumns: string[] = ['sifra','jedinicaMere','naziv','kolicina','cena','vrednost','details']

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
              this.robnaKarticaList=data
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
        this.robnaKarticaList=data
        this.dataSource=new MatTableDataSource(this.robnaKarticaList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error=>{
        console.log("greska pri ucitavanju kartica")
      }
    )
  }

  details(kartica:RobnaKartica){
    //otvaram detalje i saljem objekat kartica 
    this.router.navigate(['/robnakartica'],{state:{paramObject:kartica}})
  }


  getTotal():number{
    let total:number=0;
    this.robnaKarticaList.forEach(element => {
        total +=element.ukupnaVrednost
    })
    return total
  }

   //event uzima element sa htmla i njegovu vrednost koju prosledjuje filteru
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
