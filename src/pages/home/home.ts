import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import {  Http } from '@angular/http';


import { Customer } from '../../models/customer/customer.model';
import { CustomerService } from '../../services/customer.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { CustomerPage } from '../customer/customer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  custName: string;
  customers: Customer[];
  errorMsg: string;


  constructor(public navCtrl: NavController,
    private customerService: CustomerService,
    private loadCtrl: LoadingController) { }

  navigateTo() {
    this.navCtrl.push('AddCustomerPage');
  }

  async searchCustomer(name: string) {
    this.loader().present();

    await this.customerService.getCustomerByName(name)
      .then(
      customers => {
        this.loader().dismiss();
        this.customers = customers;
      },
      (err) => {

        this.loader().dismiss();
        alert(err);
      });




  }

  loader() {
    let loader = this.loadCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    return loader;
  }



  viewCustomer(customer: Customer) {
    this.navCtrl.push(CustomerPage, { 'customer': customer });
  }


  callCustomer(mobile: number) {
    this.customerService.call('' + mobile);
  }


  clear(){
    this.customers = [];
    this.custName='';
  }





}
