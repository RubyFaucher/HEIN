import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  patient: any = {};
  appointment: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.patient = data.patient;
    this.appointment = data.appointment;
  }

  ngOnInit(): void {}
}
