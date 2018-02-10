import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {  Http } from '@angular/http';

import { AddCustomerPage } from '../addcustomer/addcustomer';
import { Customer } from '../../models/customer/customer.model';
import { CustomerService } from '../../services/customer.service';
import { FileChooser } from '@ionic-native/file-chooser';
import * as XLSX from 'xlsx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  custName: string;
  customers: Customer[];
  errorMsg:string;
  

  constructor(public navCtrl: NavController,
    private customerService:CustomerService,
    private fileChooser:FileChooser,
    private http: Http) {

  }

  navigateTo() {
    this.navCtrl.push('AddCustomerPage');
  }

  searchCustomer(name: string) {
    this.customers =  this.customerService.getCustomerByName(name);

  }


  onOpenFileChooser(){

    this.fileChooser.open()
  .then(uri => {
      //this.errorMsg=uri;
      // this.http.get(uri).subscribe(data =>{
      //     this.extractCSVData(data);
      // },err=>this.errorMsg=err)
      alert(XLSX);
      let data = XLSX.readFile(uri);
      alert(data);
      
    }
  )
  .catch(e => this.errorMsg=e);
  }


  

}
