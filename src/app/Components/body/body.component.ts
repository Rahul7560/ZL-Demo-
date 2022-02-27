import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Result, RootObject } from '../Model/UserModel';
import { interval, UnsubscriptionError } from 'rxjs';
import { ColDef, UserComponentRegistry } from 'ag-grid-community';
import { gridModel } from '../Model/GridModel';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { GridImageComponent } from '../grid-image/grid-image.component';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {


  private gridApi: any;
  Users: Result[] = [];
  Repeat: boolean = true;

  AgeCount: number = 0;
  MaleCount: number = 0;
  FemaleCount: number = 0;

  template: string = '<img border="0" width="50" height="50" src=\"{{ params.value }}\">';



  columnDefs: ColDef[] = [
    { field: "img", headerName: "Img", cellStyle: { border: '1px solid', innerHeight: '100px' }, cellRendererFramework: GridImageComponent },
    { field: "name", headerName: "Name", cellStyle: { border: '1px solid' } },
    { field: 'gender', headerName: "Gender", cellStyle: { border: '1px solid' } },
    { field: 'age', headerName: "Age", cellStyle: { border: '1px solid' } },
    { field: 'mobile', headerName: "Phone", cellStyle: { border: '1px solid' } },
    { field: 'email', headerName: "Email", cellStyle: { border: '1px solid' } },

  ];

  GridDataArray: gridModel[] = [];
  GridData: gridModel | undefined;

  rowData = this.GridDataArray;



  constructor(public api: ApiService) { }
  ngOnInit(): void {

    this.fnGeData();

    interval(10000).subscribe(x => {
      if (this.Repeat) {
        this.fnGeData();
      }
    });
  }



  public fnGeData() {
    try {
      this.api.FnFetchApi()
        .subscribe(m => {
          this.Users.push(m.results[0])
          console.log(this.GridDataArray);


          // Grid Data Binding
          this.GridData = {
            name: m.results[0].name.title + " " + m.results[0].name.first + " " + m.results[0].name.last,
            age: m.results[0].dob.age,
            email: m.results[0].email,
            mobile: m.results[0].phone,
            gender: m.results[0].gender,
            img: m.results[0].picture.thumbnail

          }
          this.GridDataArray.push(this.GridData);
          this.gridApi.setRowData(this.GridDataArray);

          //Count Calculation
          this.AgeCount = this.Users.filter(x => x.dob.age > 50).length;
          this.FemaleCount = this.Users.filter(x => x.gender == "female").length;
          this.MaleCount = this.Users.filter(x => x.gender == "male").length;

        })
    } catch (error) {
      console.log(error)
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api; // To access the grids API
  }

  public autoRefreshToogle() {
    try {
      this.Repeat = !this.Repeat;

    } catch (error) {
      console.log(error)
    }
  }




  public refreshApi() {
    try {
      this.fnGeData();
    } catch (error) {
      console.log(error);
    }
  }

  public reset() {
    try {
      this.Users = [];
      this.GridDataArray=[];
      this.rowData=[];
      this.AgeCount = 0;
      this.FemaleCount = 0;
      this.MaleCount = 0;
      this.gridApi.setRowData([]);

    } catch (error) {

      console.log(error);

    }
  }

}
