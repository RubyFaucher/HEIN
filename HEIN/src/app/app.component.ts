import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HEIN';
  private apiURL = "https://fhir.eole-consulting.io/api";
  patient: any = {};
  doctor: any = {};
  constructor(private http: HttpClient,public matDialog: MatDialog) {
    console.log("hello");
    this.getPatient();
    this.getPractitionner();

  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = this.patient;
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
  getPatient() {
    return (this.http.get(this.apiURL+'/patient/613f4788a5b46400122cf50e').forEach(patient => {  this.patient = patient; }));

  }
  getPractitionner() {
    return (this.http.get(this.apiURL+'/practitioner/613f51d8a5b46400122cf511').forEach(doctor => {  this.doctor = doctor; }));

  }

}
