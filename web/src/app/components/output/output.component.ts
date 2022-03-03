import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {

  data: any = {};
  dataEdit: any = {}

  loading: boolean = false;
  oddDisplayedColumns: string[] = ['id', 'noHp', 'provider', 'action'];
  oddDataSource = new MatTableDataSource<any>([]);
  evenDisplayedColumns: string[] = ['id', 'noHp', 'provider' , 'action'];
  evenDataSource = new MatTableDataSource<any>([]);

  @ViewChild('TableOddPaginator', {static: true}) paginatorOdd!: MatPaginator;
  @ViewChild('TableEvenPaginator', {static: true}) paginatorEven!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getOutput();
    setInterval(() => {
      this.getOutput();
    }, 30000);
  }

  getOutput() {
    this.oddDataSource = new MatTableDataSource<any>([]);
    this.evenDataSource = new MatTableDataSource<any>([]);
    this.apiService.getOutputPhoneNo().subscribe(
      (data: {}) => {
        this.data = data;
        this.oddDataSource = new MatTableDataSource<any>(this.data.oddContacts);
        this.oddDataSource.paginator = this.paginatorOdd;
        this.evenDataSource = new MatTableDataSource<any>(this.data.evenContacts);
        this.evenDataSource.paginator = this.paginatorEven;
        console.log(data);
      });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '450px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'edit'){
        this.editPhoneNo(result.data)
      }
    });
  }

  editPhoneNo(data: any) {
    if (window.confirm('Are you sure, you want to edit phone numbers?')) {
      this.apiService.editPhoneNo(data.id, data.noHp, data.provider).subscribe(
        (data: {}) => {
          this.dataEdit = data;

          if(!this.dataEdit.error) {
            this.getOutput();
            this._snackBar.open("Success update phone number", "OK");
          } else {
            this._snackBar.open(this.dataEdit.message, "OK");
          }
          console.log(data);
        });
    }
  }

  deletePhoneNo(id: string, type: string) {
    if (window.confirm('Are you sure, you want to delete phone number?')) {
      this.apiService.deletePhoneNo(id).subscribe(
        (data: {}) => {
          this.data = data;

          if(type == 'odd') {
            this.oddDataSource.data = this.oddDataSource.data.filter((value,key)=>{
              return value.id != id;
            });
          } else {
            this.evenDataSource.data = this.evenDataSource.data.filter((value,key)=>{
              return value.id != id;
            });
          }


          if(!this.data.error) {
            this._snackBar.open("Success delete phone number", "OK");
          } else {
            this._snackBar.open(this.data.message, "OK");
          }
          console.log(data);
        });
    }
  }

}

@Component({
  selector: 'edit-dialog',
  templateUrl: './edit.dialog.html',
  styles: [``]
})
export class EditDialog {

  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.local_data = {...data};
      dialogRef.disableClose = true;
    }

  onNoClick(): void {
    this.dialogRef.close({event:'',data:this.local_data});
  }

  submit() {
    // emppty stuff
  }

  doAction(){
    this.dialogRef.close({event:'edit',data:this.local_data});
  }

}
