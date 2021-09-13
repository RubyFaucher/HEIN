import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HEIN';
  private apiURL = "https://fhir.eole-consulting.io/api/patient/613f4788a5b46400122cf50e";
  data: any = {};
  constructor(private http: HttpClient) {
    console.log("hello");
    this.getData();
  }
  getData() {
    return (this.http.get(this.apiURL).forEach(patient => { console.log(patient); this.data = patient; }));

  }
  getPatient() {

  }
}
