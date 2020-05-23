import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PoslovniPartnerService } from 'src/app/services/poslovni-partner.service';
import { MagacinService } from 'src/app/services/magacin.service';
import { Roba } from 'src/app/model/roba';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take, takeUntil } from 'rxjs/operators';
import { RobaService } from 'src/app/services/roba.service';

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

  magacinList:any[]=[]
  poslovniPartnerList:any[]=[]

  prometniDokumentForm=this.fb.group({
    redniBroj:["",Validators.required],
    tipPrometnogDokumenta:["",Validators.required],
    magacinId:["",Validators.required],
    poslovniPartnerid:["",Validators.required],
    magacinId2:[""],
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
    ,private magacinService:MagacinService,private robaService:RobaService) { }

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
      kolicina: ['',Validators.required],
      cena: ['',Validators.required],
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

  editRowPrometni(prometniDokumentForm:FormGroup){
    prometniDokumentForm.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    console.log("done row selected")
    group.get('isEditable').setValue(false);
  }
 
  doneRowPrometni(prometniDokumentForm:FormGroup){
    prometniDokumentForm.get('isEditable').setValue(false)
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    console.log(this.touchedRows);
  }
  showPoslovniParter(){
    this.showPP=true
  }

  showMagacin2(){
    this.showPP=false
  }

  toggleTheme() {
    this.mode = !this.mode;
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredArtikli
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
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