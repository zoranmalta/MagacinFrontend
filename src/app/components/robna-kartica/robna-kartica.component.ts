import { Component, OnInit, ViewChild } from '@angular/core';
import { RobnaKartica } from 'src/app/model/robnaKartica';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MyErrorStateMatcher } from 'src/app/error-validators/MyErrorStateMatcher';
import { Router } from '@angular/router';
import { LagerService } from 'src/app/services/lager.service';
import { AnalitikaMagacinskeKartice } from 'src/app/model/analitikaMagacinskeKartice';

@Component({
  selector: 'app-robna-kartica',
  templateUrl: './robna-kartica.component.html',
  styleUrls: ['./robna-kartica.component.css']
})
export class RobnaKarticaComponent implements OnInit {

  robnaKartica :RobnaKartica
  robnaKarticaTemp:RobnaKartica=new RobnaKartica();
  listaAnalitika: AnalitikaMagacinskeKartice[]=[]
  dataSource:any

  displayedColumns: string[] = ['datum','tip','dokument','smer','ulaz','izlaz','saldo','cena','vrednostUlaza',
                                  'vrednostIzlaza','ukupnaVrednost'];
  matcher = new MyErrorStateMatcher();
  @ViewChild(MatTable, {static:true}) table: MatTable<any>;

  constructor(private router:Router,private lagerService:LagerService) { 

  }

  ngOnInit(): void {
     //primamo ceo objekat Prometnidokument preko brauzera history.state.paramObject(ime objekta paramObject)
   this.robnaKartica=window.history.state.paramObject
   this.lagerService.listaAnalitika(this.robnaKartica.id).subscribe(
     data=>{
       this.listaAnalitika=data.map<AnalitikaMagacinskeKartice>(value => {
        value.robnaKartica=new RobnaKartica()
        return value;
       }).filter(a=>{
         if(a.stavkaDokumenta==null){
           return a
         }
         if(a.stavkaDokumenta!=null){
           return a.stavkaDokumenta.prometniDokument.statusDokumenta!="Storniran"
         }
       })
       console.log("uspesno ucitavanje analitika")
       this.dataSource=new MatTableDataSource(this.listaAnalitika);
     },
     error=>{
       console.log("greska pri ucitavanju analitika")
     }
   )
  }
  getSaldo(analitika:AnalitikaMagacinskeKartice):number{
    if(analitika.stavkaDokumenta==null){
      this.robnaKarticaTemp.ukupnaKolicina=analitika.kolicina
      return this.robnaKarticaTemp.ukupnaKolicina
    }
    if(analitika.stavkaDokumenta.prometniDokument.tipPrometnogDokumenta=="PRIJEMNICA"){
      this.robnaKarticaTemp.ukupnaKolicina+=analitika.kolicina
    }
    if(analitika.stavkaDokumenta.prometniDokument.tipPrometnogDokumenta=="MM" && 
        analitika.tipPrometa=="OTPREMLJENO"){
          this.robnaKarticaTemp.ukupnaKolicina-=analitika.kolicina
    }
    if(analitika.stavkaDokumenta.prometniDokument.tipPrometnogDokumenta=="MM" && 
        analitika.tipPrometa=="DOBAVLJENO"){
          this.robnaKarticaTemp.ukupnaKolicina+=analitika.kolicina
    }
    if(analitika.stavkaDokumenta.prometniDokument.tipPrometnogDokumenta=="OTPREMNICA"){
      this.robnaKarticaTemp.ukupnaKolicina-=analitika.kolicina
    }
    return this.robnaKarticaTemp.ukupnaKolicina
  }

  getUkupnaVrednost(analitika:AnalitikaMagacinskeKartice):number{
    if(analitika.stavkaDokumenta==null){
      this.robnaKarticaTemp.ukupnaVrednost=analitika.vrednost
      return this.robnaKarticaTemp.ukupnaVrednost
    }
    if(analitika.stavkaDokumenta.prometniDokument.tipPrometnogDokumenta=="PRIJEMNICA"){
      this.robnaKarticaTemp.ukupnaVrednost+=analitika.vrednost
    }
    if(analitika.stavkaDokumenta.prometniDokument.tipPrometnogDokumenta=="MM" && 
        analitika.tipPrometa=="OTPREMLJENO"){
          this.robnaKarticaTemp.ukupnaVrednost-=analitika.vrednost
    }
    if(analitika.stavkaDokumenta.prometniDokument.tipPrometnogDokumenta=="MM" && 
        analitika.tipPrometa=="DOBAVLJENO"){
          this.robnaKarticaTemp.ukupnaVrednost+=analitika.vrednost
    }
    if(analitika.stavkaDokumenta.prometniDokument.tipPrometnogDokumenta=="OTPREMNICA"){
      this.robnaKarticaTemp.ukupnaVrednost-=analitika.vrednost
    }
    return this.robnaKarticaTemp.ukupnaVrednost
  }

  onReport(){
    this.lagerService.reportAnalitika(this.robnaKartica.id).subscribe(
      data=>console.log("kreiran pdf : "+data),
      error=>console.log("greska pri kreiranju reporta"+error.string)
    );
  }

  onBack(){
    this.router.navigate([`/robnekarticelista`])
  }

}
