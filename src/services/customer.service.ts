import { Customer } from '../models/customer/customer.model';
import { Subject } from 'rxjs/Subject';
import { DatabaseProvider } from '../providers/database/database';
import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';


@Injectable()
export class CustomerService {

    customers: Customer[] = [];

    customersUpdateEvent = new Subject<Customer[]>();

    constructor(private dbProivder: DatabaseProvider,
    private callNumber: CallNumber) {
    }

    addCustomer(customer: Customer) {
        //this.customers.push(customer);
        this.dbProivder.addCustomer(customer);
        this.eventEmitForCustomer();

    }

    eventEmitForCustomer() {
        this.customersUpdateEvent.next(this.getCustomers());
    }

    getCustomers() {
        return this.dbProivder.getAllCustomers();
    }

    updateCustomer(index: number, updateCustomer: Customer) {
        this.customers[index] = updateCustomer;
        this.eventEmitForCustomer();
    }

    getCustomerByName(name: string) {
        let allCustomer = [];
        const promise = new Promise<Customer[]>((resolve, reject) => {
            if (name) {
                allCustomer = this.getCustomers();
                const cust = this.dbProivder.getCustomerContainsName(name);
                return resolve(cust);
            } else {
                allCustomer = this.getCustomers();
                return resolve(allCustomer);
            }
        });
        return promise;



    }

    call(mobileNo: string) {

        this.callNumber.callNumber(mobileNo, true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
      }





}