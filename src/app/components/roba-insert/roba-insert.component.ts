import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/error-validators/MyErrorStateMatcher';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roba } from 'src/app/model/roba';
import { GrupaRoba } from 'src/app/model/grupaRoba';
import { JedinicaMere } from 'src/app/model/jedinicaMere';
import { Router } from '@angular/router';
import { RobaService } from 'src/app/services/roba.service';
import { DialogYesNoComponent } from '../dialog-yes-no/dialog-yes-no.component';

@Component({
  selector: 'app-roba-insert',
  templateUrl: './roba-insert.component.html',
  styleUrls: ['./roba-insert.component.css']
})
export class RobaInsertComponent implements OnInit {

  grupaRobaList :GrupaRoba[]=[]
  jedinicaMereList : JedinicaMere[]=[]
  matcher = new MyErrorStateMatcher();

  robaForm=this.formBuilder.group({
    id:[""],
    sifra:["",[Validators.required,Validators.pattern('[0-9]{5}')]],
    grupaRoba:["",Validators.required],
    pakovanje:["",[Validators.required,Validators.pattern('[0-9]*')]],
    jedinicaMere:["",Validators.required],
    naziv:["",Validators.required]
  })

  constructor(private formBuilder:FormBuilder,private dialog: MatDialog,private snackBar:MatSnackBar
    ,private router:Router,private robaService:RobaService) { }

  ngOnInit(): void {
    this.robaService.getGrupaRoba().subscribe(
      data=>this.grupaRobaList=data,
      error=>console.log("greska pri ucitavanju grupaRoba")
    )
    this.robaService.getJedinicaMere().subscribe(
      data=>this.jedinicaMereList=data,
      error=>console.log("greska pri ucitavanju jedinicaMere")
    )
  }

  onSubmitRoba(roba:any){
    
    // let's call our modal window
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      maxWidth: "450px",
      data:{
        title:"Potvrdi ?",
        message:`Kreiraj Artikal : ${roba.naziv}`
      }
    });
    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if(dialogResult == true){
        this.robaService.insertRoba(this.setRobaForInsert(roba)).subscribe(
          data=>{
            this.snackBar.open(`Artikal ${data.naziv}  je kreiran. `,"",{duration:3000})
            this.onClear()
          },
          error=>{
            console.log("greskapri insertu robe")
            this.snackBar.open("Artikal nije kreiran","",{duration:3000})
            this.onClear()
          }
        )
      }else{
        this.snackBar.open(`Canceled`,"",{duration:2500})
      }
    });
    this.onClear()
  }

  setRobaForInsert(roba:any):Roba{
    let newArtikal=new Roba()
    newArtikal.naziv=roba.naziv
    newArtikal.pakovanje=roba.pakovanje
    newArtikal.sifra=roba.sifra
    let newJedinicaMere:any=this.jedinicaMereList.filter(jedinica=>{return jedinica.id==roba.jedinicaMere})[0]
    console.log("Ucitana jedinica mere "+newJedinicaMere)
    newArtikal.jedinicaMere=newJedinicaMere
    let newGrupaRoba:any=this.grupaRobaList.filter(jedinica=>{return jedinica.id==roba.grupaRoba})[0]
     
    newArtikal.grupaRoba=newGrupaRoba
    return newArtikal
  }

  onUpdate(roba:Roba){}

  onClear(){
    this.robaForm.reset()
    this.robaForm.markAsUntouched()
    this.robaForm.markAsPristine()
  }

  onCancel(){
    this.robaForm.reset()
    this.router.navigate(["roba"])
  }

}
