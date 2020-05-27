import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PoslovniPartnerService } from 'src/app/services/poslovni-partner.service';
import { MagacinService } from 'src/app/services/magacin.service';
import { Roba } from 'src/app/model/roba';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { RobaService } from 'src/app/services/roba.service';
import { PrometniDokument } from 'src/app/model/prometniDokument';
import { StavkaDokumenta } from 'src/app/model/stavkaDokumenta';
import { PrometniDokumentService } from 'src/app/services/prometni-dokument.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogYesNoComponent } from '../dialog-yes-no/dialog-yes-no.component';
import { MyErrorStateMatcher } from 'src/app/error-validators/MyErrorStateMatcher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prometni-dokument',
  templateUrl: './prometni-dokument.component.html',
  styleUrls: ['./prometni-dokument.component.css']
})
export class PrometniDokumentComponent implements OnInit, AfterViewInit, OnDestroy{

  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  showPP:boolean=true

  //validacija datuma fakture min-max i radni dani
  minDate: Date;
  maxDate: Date;
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  matcher = new MyErrorStateMatcher();

  magacinList:any[]=[]
  poslovniPartnerList:any[]=[]

  prometniDokumentForm=this.fb.group({
    redniBroj:["",Validators.required],
    datumFakturisanja:['',Validators.required],
    tipPrometnogDokumenta:["",Validators.required],
    magacin:["",Validators.required],
    poslovniPartner:[null],
    magacin2:[null],
    isEditable:[true]
  })
  
   /** list of banks */
   protected artikli: Roba[] = [];

   /** control for the MatSelect filter keyword */
   public artikalFilterCtrl: FormControl = new FormControl();
 
   /** list of artikli filtered by search keyword */
   public filteredArtikli: ReplaySubject<Roba[]> = new ReplaySubject<Roba[]>(1);
 
   @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
 
   /** Subject that emits when the component has been destroyed. */
   protected _onDestroy = new Subject<void>();

  constructor(private fb: FormBuilder,private poslovniPartnerService:PoslovniPartnerService
    ,private magacinService:MagacinService,private robaService:RobaService
    ,private prometniDokumentService:PrometniDokumentService,private dialog: MatDialog
    ,private snackBar:MatSnackBar,private router:Router) { 
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 0, 0, 1);
      this.maxDate = new Date();
    }

  ngAfterViewInit(): void {
    this.setInitialValue();
  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.poslovniPartnerService.getPoslovniPartnerList().subscribe(
      data=>this.poslovniPartnerList=data,
      error=>console.log("greska u prijemu poslovnih partnera")
    )
    this.magacinService.getMagacinList().subscribe(
      data=>this.magacinList=data,
      error=>console.log("greska u ucitavanju magacina")
    )
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();

    this.robaService.getRoba().subscribe(
      data=>{
        this.artikli=data,
         // set initial selection
        //this.artikalCtrl.setValue(this.artikli[0]);

        // load the initial artikal list
        this.filteredArtikli.next(this.artikli.slice());
    
        // osluskuje search field value changes
        this.artikalFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterArtikli();
          });
      },
      error=>console.log("greska pri ucinavanju artikala")
    )
  }
  
  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
    
  }

  initiateForm(): FormGroup {
    return this.fb.group({
      artikalCtrl: ['',Validators.required],
      kolicina: ['',[Validators.required,Validators.pattern('[0-9]*')]],
      cena: ['',[Validators.required,Validators.pattern('[0-9]*')]],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    console.log("delete row selected")
    const control =  this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    console.log("done row selected")
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  insertPrijemnicaDokument(control:FormArray){
    const prometniDokumentNew=new PrometniDokument()
    prometniDokumentNew.redniBroj=this.prometniDokumentForm.get('redniBroj').value;
    prometniDokumentNew.tipPrometnogDokumenta=this.prometniDokumentForm.get('tipPrometnogDokumenta').value;
    prometniDokumentNew.magacin=this.prometniDokumentForm.get('magacin').value;
    //prometniDokumentNew.magacin2=this.prometniDokumentForm.get('magacin2').value;
    prometniDokumentNew.poslovniPartner=this.prometniDokumentForm.get('poslovniPartner').value;
    prometniDokumentNew.datumFormiranja=this.prometniDokumentForm.get("datumFakturisanja").value;
    prometniDokumentNew.statusDokumenta="U_Fazi_Knjizenja"
    this.touchedRows.forEach(element => {
      let stavkanew=new StavkaDokumenta();
      stavkanew.roba=element.artikalCtrl
      stavkanew.kolicina=element.kolicina
      stavkanew.cena=element.cena
      stavkanew.vrednost=stavkanew.cena*stavkanew.kolicina
      prometniDokumentNew.stavke.push(stavkanew);
    });

 // let's call our modal window
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      maxWidth: "450px",
      data:{
        title:"Potvrdi ?",
        message:`Kreiraj Prometni Dokument(Prijemnica) : ${prometniDokumentNew.redniBroj}`
      }
    });
    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if(dialogResult == true){
        this.prometniDokumentService.insertPrijemnicaDokument(prometniDokumentNew).subscribe(
          data=>{
            this.snackBar.open(`Prometni dokument ${data.redniBroj}  je kreiran. `,"",{duration:3000})
            control.clear();
            this.addRow();
            this.router.navigate(['/prikazprometnogdokumenta'],{state:{paramObject:data,navigateBack:"kreirajdokument"}})
          },
          error=>{
            console.log("greska pri insertu prometnog dokumenta")
            this.snackBar.open("Prometni dokument nije kreiran","",{duration:3000})
            control.clear();
            this.addRow()
          }
        )
      }else{
        this.snackBar.open(`Canceled`,"",{duration:2500})
        control.clear();
        this.addRow()
      }
    });
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
    if(this.prometniDokumentForm.get('tipPrometnogDokumenta').value=="PRIJEMNICA"){
      console.log("kreiramo prijemnicu")
      this.insertPrijemnicaDokument(control)
    }
    if(this.prometniDokumentForm.get('tipPrometnogDokumenta').value=="OTPREMNICA"){
      console.log("kreiramo OTPREMNICA")
    }
    if(this.prometniDokumentForm.get('tipPrometnogDokumenta').value=="MM"){
      console.log("kreiramo MM")
    }
   
  }

  showPoslovniParter(){
    this.prometniDokumentForm.get('magacin2').reset();
    this.showPP=true
  }
  
  showMagacin2(){
    this.prometniDokumentForm.get("poslovniPartner").reset();
    this.showPP=false
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  /**
   * Sets the initial value after the filteredArtikli are loaded initially
   */
  protected setInitialValue() {
    this.filteredArtikli
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredArtikli are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Roba, b: Roba) => a && b && a.id === b.id;
      });
  }
  protected filterArtikli() {
    if (!this.artikli) {
      return;
    }
    // get the search keyword
    let search = this.artikalFilterCtrl.value;
    if (!search) {
      this.filteredArtikli.next(this.artikli.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the artikli
    this.filteredArtikli.next(
      this.artikli.filter(artikal => artikal.naziv.toLowerCase().indexOf(search) > -1)
    );
  }
}