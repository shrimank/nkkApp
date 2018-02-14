import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



import { IonicPage } from 'ionic-angular';
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

  constructor(private customerService: CustomerService,
  private toastCtrl:ToastController,
 ) {
  }

  ngOnInit() {
    this.addCustomerForm = new FormGroup({
      'custNumber': new FormControl(null, Validators.required),
      'custName': new FormControl(null, Validators.required),
      'acctNumber': new FormControl(null, Validators.required),
      'memberShipNo': new FormControl(null, Validators.required),
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
                this.addCustomerForm.value.memberShipNo,
                this.addCustomerForm.value.address,
                this.addCustomerForm.value.mobileNo);

    this.customerService.addCustomer(cust);
    this.addCustomerForm.reset();
    let toast = this.toastCtrl.create({
      message: `Customer ${cust.custName} added successfully.`,
      duration: 3000
    });
    toast.present();

  }


}
