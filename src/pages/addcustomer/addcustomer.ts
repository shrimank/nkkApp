import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Customer,CUSTOMER_LIST } from '../../models/customer/customer.model';
import { CustomerService } from '../../services/customer.service';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the AddCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcustomer',
  templateUrl: 'addcustomer.html',
})
export class AddCustomerPage implements OnInit {

  customer: Customer;
  customers: Customer[];
  addCustomerForm: FormGroup;
  memberType: string[] = ['Regular', 'Associate'];

  constructor(public navCtrl: NavController,
    private customerService: CustomerService,
  private toastCtrl:ToastController ) {
  }

  ngOnInit() {
    this.addCustomerForm = new FormGroup({
      'custNumber': new FormControl(null, Validators.required),
      'custName': new FormControl(null, Validators.required),
      'acctNumber': new FormControl(null, Validators.required),
      'memberType': new FormControl(this.memberType[0], Validators.required),
      'address': new FormControl(null, Validators.required),
      'mobileNo': new FormControl(null, Validators.required)
    });
    this.customers =  CUSTOMER_LIST;
    console.log(this.customers);
    this.customerService.customersUpdateEvent.subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      });

  }

  onAddCustomer() {
    let cust = 
    new Customer(this.addCustomerForm.value.custName,
                this.addCustomerForm.value.custNumber,
                this.addCustomerForm.value.acctNumber,
                this.addCustomerForm.value.memberType,
                this.addCustomerForm.value.address,
                this.addCustomerForm.value.mobileNo,
              'http://keenthemes.com/preview/metronic/theme/assets/layouts/layout5/img/avatar1.jpg');

    this.customerService.addCustomer(cust);
    this.addCustomerForm.reset();
    let toast = this.toastCtrl.create({
      message: `Customer ${cust.custName} added successfully.`,
      duration: 3000
    });
    toast.present();

  }


}
