import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
  constructor(private http: HttpClient) {
    console.log("hello");
    this.getPatient();
    this.getPractitionner();
  }
  getPatient() {
    return (this.http.get(this.apiURL+'/patient/613f4788a5b46400122cf50e').forEach(patient => { console.log(patient); this.patient = patient; }));

  }
  getPractitionner() {
    return (this.http.get(this.apiURL+'/practitioner/613f51d8a5b46400122cf511').forEach(doctor => { console.log(doctor); this.doctor = doctor; }));

  }
}
