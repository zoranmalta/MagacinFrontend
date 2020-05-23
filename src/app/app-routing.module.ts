import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RobaComponent } from './components/roba/roba.component';
import { RobaInsertComponent } from './components/roba-insert/roba-insert.component';
import { PrometniDokumentComponent } from './components/prometni-dokument/prometni-dokument.component';


const routes: Routes = [
  { path : "home" , component : HomepageComponent },
  { path : "roba" , component : RobaComponent},
  { path : "robainsert" , component : RobaInsertComponent},
  { path : "prometnidokument" , component : PrometniDokumentComponent},

  { path : "**" , component : HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
