import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from './modal/modal.component';
import { ReportModalComponent } from './reportModal/reportModal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HEIN';
  private apiURL = 'https://fhir.eole-consulting.io/api';
  patient: any = {};
  doctor: any = {};
  id: any = {};
  YourTextData: any = {};
  value: any = {};
  toggle = true;
  status = 'enable';
  comMed: any = {};
  appointment: any = {};

  constructor(
    private http: HttpClient,
    public matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.getPatient();
    this.getPractitionner();
    this.getAppointment();
    this.getCommunication();
  }
  getPatient() {
    return this.http
      .get(this.apiURL + '/patient/613f4788a5b46400122cf50e')
      .forEach(patient => {
        this.patient = patient;
      });
  }
  getPractitionner() {
    return this.http
      .get(this.apiURL + '/practitioner/613f51d8a5b46400122cf511')
      .forEach(doctor => {
        this.doctor = doctor;
      });
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      patient: this.patient,
      appointment: this.appointment
    };
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
  openReportModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'reportModal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '600px';
    dialogConfig.data = this.appointment;
    const modalDialog = this.matDialog.open(ReportModalComponent, dialogConfig);
  }

  getCommunication() {
    return this.http.get(this.apiURL + '/communication').forEach(comMed => {
      this.comMed = comMed;
      // for (let i in comMed) {
      //   if(comMed[i].recipient[0].reference=="Practitioner/613f51d8a5b46400122cf511"){
      //     let test = comMed[i];
      //     console.log(test)
      //     this.comMed = test;
      //     console.log(this.comMed)
      //     console.log('ta mere la pute')
      //   }else{
      //     console.log('error')
      //   }
      // }

      // for (let i in com) {
      //   console.log('for')
      //   console.log(com)
      //   if (com[i].subject.reference == 'Patient/613f4788a5b46400122cf50e') {
      //     console.log('if')
      //     console.log(com)
      //     let test = com[i];
      //     console.log('test')
      //     console.log(test)
      //     this.com = test;
      //     console.log('fin')
      //     console.log(com)
      //   }
      // }
    });
  }

  postCommunication(YourTextData) {
    window.location.reload();
    return this.http
      .post(
        this.apiURL + '/communication',
        {
          resourceType: 'Communication',
          text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">Test</div>'
          },

          recipient: [
            {
              reference: 'Practitioner/613f51d8a5b46400122cf511'
            }
          ],
          payload: [
            {
              contentString: YourTextData
            }
          ]
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  onKey(event: any) {
    this.value = event.target.value;
  }

  getAppointment() {
    return this.http.get(this.apiURL + '/appointment').forEach(appointment => {
      for (let i in appointment) {
        if (appointment[i].participant[0].actor.display == 'Justin Mazoyer') {
          let test = appointment[i];
          this.appointment = test;
        } else {
          console.log('error');
        }
      }
    });
  }

  delAppointment(id) {
    this.snackBar.open('Votre rendez-vous a bien été annulé', 'X', {
      panelClass: 'notif',
      verticalPosition: 'top',
      duration: 2000
    });
    return this.http
      .delete(this.apiURL + '/appointment/' + id)
      .forEach(appointment => {
        console.log(appointment);
      });
  }
  popupConfirm() {
    let message = this.toggle
      ? 'Votre rendez-vous a bien été confirmé'
      : "Votre rendez-vous n'est plus confirmé";
    this.snackBar.open(message, 'X', {
      panelClass: 'notif',
      verticalPosition: 'top',
      duration: 2000
    });
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'enable' : 'disable';
  }
}
