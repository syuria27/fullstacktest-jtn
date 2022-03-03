import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  nohp: string = '';
  provider: string = '';
  data: any = {};

  constructor(
    private _snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  getAuto() {
    if (window.confirm('Are you sure, you want to generete auto phone numbers?')) {
      this.apiService.getAutoPhoneNo().subscribe(
        (data: {}) => {
          this.data = data;

          if(!this.data.error) {
            this._snackBar.open("Success create auto phone number", "OK");
          } else {
            this._snackBar.open(this.data.message, "OK");
          }
          console.log(data);
        });
    }
  }

  savePhoneNo() {
    if (window.confirm('Are you sure, you want to create phone numbers?')) {
      this.apiService.savePhoneNo(this.nohp, this.provider).subscribe(
        (data: {}) => {
          this.data = data;

          if(!this.data.error) {
            this.nohp = '';
            this._snackBar.open("Success create phone number", "OK");
          } else {
            this._snackBar.open(this.data.message, "OK");
          }
          console.log(data);
        });
    }
  }

}
