import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Customer } from '../../models/customer/customer.model';
import { CustomerService } from '../../services/customer.service';

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  customer: Customer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private customerService: CustomerService) {

    this.customer = this.navParams.get('customer');
    //this.customer = new Customer('Shriman Nijagun', 201, 100202, 'Regular', 'Bangalore', 993923423);
  }

  callCustomer(mobile: number) {
    this.customerService.call('' + mobile);
  }



}
