import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HEIN';
  private apiURL = 'https://fhir.eole-consulting.io/api';
  patient: any = {};
  doctor: any = {};
  id: any={};
  toggle = true;
  status = "Enable";

  appointment: any = {};
  constructor(private http: HttpClient,public matDialog: MatDialog) {
    this.getPatient();
    this.getPractitionner();
    this.getCommunication();
    this.getAppointment();
    this.delAppointment(this.id);
  }
  getPatient() {
    return this.http
      .get(this.apiURL + '/patient/613f4788a5b46400122cf50e')
      .forEach((patient) => {
        this.patient = patient;
      });
  }
  getPractitionner() {
    return this.http
      .get(this.apiURL + '/practitioner/613f51d8a5b46400122cf511')
      .forEach((doctor) => {
        this.doctor = doctor;
      });
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
  getCommunication() {
    return this.http.get(this.apiURL + '/communication').forEach((comm) => {});
  }
  getAppointment() {
    return this.http
      .get(this.apiURL + '/appointment')
      .forEach((appointment) => {
        for (let i in appointment) {
          if (appointment[i].participant[0].actor.display == "Justin Mazoyer") {
            let test = appointment[i]
            this.appointment = test;
          }else{
            console.log("error")
          }
        }
      });
  }

  delAppointment(id){
    return (this.http.delete(this.apiURL+'/appointment/'+id).forEach(appointment => { console.log(appointment);      
       }))
  }
popupConfirm(){
  alert('Votre RDV est confirmé')
  this.toggle = !this.toggle;
  this.status = this.toggle ? "Enable" : "Disable";
}

}
