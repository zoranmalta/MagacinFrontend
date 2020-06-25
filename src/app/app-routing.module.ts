import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RobaComponent } from './components/roba/roba.component';
import { RobaInsertComponent } from './components/roba-insert/roba-insert.component';
import { PrometniDokumentComponent } from './components/prometni-dokument/prometni-dokument.component';
import { PrikazPrometnogDokumentaComponent } from './components/prikaz-prometnog-dokumenta/prikaz-prometnog-dokumenta.component';
import { ListaPrometnihDokumenataComponent } from './components/lista-prometnih-dokumenata/lista-prometnih-dokumenata.component';
import { LagerListaComponent } from './components/lager-lista/lager-lista.component';


const routes: Routes = [
  { path : "home" , component : HomepageComponent },
  { path : "lager" , component : LagerListaComponent },

  { path : "roba" , component : RobaComponent},
  { path : "robainsert" , component : RobaInsertComponent},
  { path : "kreirajdokument" , component : PrometniDokumentComponent},
  { path : "prikazprometnogdokumenta" , component : PrikazPrometnogDokumentaComponent},
  { path : "listaprometnidokument" , component : ListaPrometnihDokumenataComponent},

  { path : "**" , component : HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
