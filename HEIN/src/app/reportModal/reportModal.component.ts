import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reportModal',
  templateUrl: './reportModal.component.html',
  styleUrls: ['./reportModal.component.css']
})
export class ReportModalComponent implements OnInit {
  appointmentDate: any = {};
  appointment: any = {};
  private apiURL = 'https://fhir.eole-consulting.io/api';

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.appointment = data;
  }

  ngOnInit(): void {}
  submit(appointmentDate) {
    this.dialog.closeAll();
    this.appointment.requestedPeriod = [
      { start: appointmentDate, end: appointmentDate }
    ];
    this.snackBar.open('Votre rendez-vous a bien été reporté', 'X', {
      panelClass: 'notif',
      verticalPosition: 'top',
      duration: 2000
    });
    return this.http
      .put(
        this.apiURL + '/appointment/' + this.appointment.id,
        this.appointment
      )
      .subscribe(data => {
        console.log('apres put', data);
      });
  }
}
