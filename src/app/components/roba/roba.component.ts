import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RobaService } from 'src/app/services/roba.service';
import { Roba } from 'src/app/model/roba';

@Component({
  selector: 'app-roba',
  templateUrl: './roba.component.html',
  styleUrls: ['./roba.component.css']
})
export class RobaComponent implements OnInit {

  dataSource:any
  robaList:Roba[]=[]
  displayedColumns: string[] = ['sifra','grupaRoba','pakovanje','jedinicaMere','naziv']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static:true}) table: MatTable<any>;

  constructor(private dialog: MatDialog,private snackBar:MatSnackBar,private router:Router
    ,private robaService:RobaService) { }

  ngOnInit(): void {
    this.robaService.getRoba().subscribe(
      data=>{
        this.robaList=data
        this.dataSource=new MatTableDataSource(this.robaList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      error=>console.log("greska pri ucitavanju roba")
    )
  }

  onAddRoba(){
    this.router.navigate(["/robainsert"])
  }

  onReport(){
    this.robaService.reportRoba().subscribe(
      data=>console.log("kreiran pdf : "+data),
      error=>console.log("greska pri kreiranju reporta"+error.string)
    )
  }

  //event uzima element sa htmla i njegovu vrednost koju prosledjuje filteru
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
