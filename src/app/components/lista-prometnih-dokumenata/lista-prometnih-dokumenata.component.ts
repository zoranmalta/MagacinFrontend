import { Component, OnInit, ViewChild } from '@angular/core';
import { PrometniDokument } from 'src/app/model/prometniDokument';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrometniDokumentService } from 'src/app/services/prometni-dokument.service';

@Component({
  selector: 'app-lista-prometnih-dokumenata',
  templateUrl: './lista-prometnih-dokumenata.component.html',
  styleUrls: ['./lista-prometnih-dokumenata.component.css']
})
export class ListaPrometnihDokumenataComponent implements OnInit {

  dataSource:any
  dokumentiList:PrometniDokument[]=[]
  displayedColumns: string[] = ['redniBroj','tipPrometnogDokumenta','poslovniPartner','status','datumFormiranja','datumKnjizenja','details']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static:true}) table: MatTable<any>;

  constructor(private dialog: MatDialog,private snackBar:MatSnackBar,private router:Router
    ,private prometniDokumentService:PrometniDokumentService) { }

  ngOnInit(): void {
    this.prometniDokumentService.getAllDokument().subscribe(
      data=>{
        this.dokumentiList=data
        this.dataSource=new MatTableDataSource(this.dokumentiList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error=>console.log("greska pri ucitavanju liste dokumenata")
    )
  }

  details(prometniDokument:PrometniDokument){
    //otvaram detalje i saljem objekat prometnogDokumenta i string za navigaciju nazad na ovu stranu
    this.router.navigate(['/prikazprometnogdokumenta'],{state:{paramObject:prometniDokument,navigateBack:"listaprometnidokument"}})
  }

 //event uzima element sa htmla i njegovu vrednost koju prosledjuje filteru
  applyFilter(event: Event) { 
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
