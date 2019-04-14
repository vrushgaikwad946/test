import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-crud',
  templateUrl: './employee-crud.component.html',
  styleUrls: ['./employee-crud.component.css']
})
export class EmployeeCrudComponent implements OnInit {

  title='Employee CRUD Application'

  employees:any[];
  employee:any;
  message="";
  add=false;
  save=false;

  constructor(private as:EmployeeService) {
    console.log("EmployeeCrudComponent created...")
   }

  ngOnInit() {
    this.getAllEmployees();
    console.log("EmployeeCrudComponent initialized...")
  }

  ngOnDestroy() {
    console.log("EmployeeCrudComponent destroyed...")
  }

  newEmployee(){
    this.add=false;
    this.save=true; 
this.employee={
  id:0,
  name:'',
  salary:0.0,
  email:'',
  mobile:'',
  pan:'',
  doc:new Date()
}
  }

  getAllEmployees(){
    this.as.getAllEmployees()
           .subscribe(response=>this.employees=response,
                       error=>this.message=error);
  }

  getEmployeeById(id:number){
    this.as.getEmployeeById(id)
           .subscribe(response=>this.employee=response,
                       error=>this.message=error);
   this.add=true;
   this.save=false;                    
  }

  deleteEmployeeById(id:number){
    this.as.deleteEmployeeById(id)
           .subscribe(response=>this.employees=response,
                       error=>this.message=error);
  }

  updateEmployeeById(id:number){
    this.as.updateEmployeeById(id,this.employee)
           .subscribe(response=>this.employees=response,
                       error=>this.message=error);
                       this.employee=null;                    
  }

  addEmployee(){
    this.as.addEmployee(this.employee)
           .subscribe(response=>this.employees=response,
                       error=>this.message=error);
                       this.employee=null;
  }
}
