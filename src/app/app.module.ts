import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RadnikComponent } from './components/radnik/radnik.component';
import { PrometniDokumentComponent } from './components/prometni-dokument/prometni-dokument.component';
import { MagacinComponent } from './components/magacin/magacin.component';
import { PoslovniPartnerComponent } from './components/poslovni-partner/poslovni-partner.component';
import { LagerListaComponent } from './components/lager-lista/lager-lista.component';
import { RobaComponent } from './components/roba/roba.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card';
import { DialogYesNoComponent } from './components/dialog-yes-no/dialog-yes-no.component';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar' 
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RobaInsertComponent } from './components/roba-insert/roba-insert.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PrikazPrometnogDokumentaComponent } from './components/prikaz-prometnog-dokumenta/prikaz-prometnog-dokumenta.component';
import { ListaPrometnihDokumenataComponent } from './components/lista-prometnih-dokumenata/lista-prometnih-dokumenata.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideMenuComponent,
    HomepageComponent,
    RadnikComponent,
    PrometniDokumentComponent,
    MagacinComponent,
    PoslovniPartnerComponent,
    LagerListaComponent,
    RobaComponent,
    DialogYesNoComponent,
    RobaInsertComponent,
    PrikazPrometnogDokumentaComponent,
    ListaPrometnihDokumenataComponent

  ],
  entryComponents: [DialogYesNoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
