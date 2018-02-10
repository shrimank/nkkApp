import { Customer, CUSTOMER_LIST } from '../models/customer/customer.model';
import { Subject } from 'rxjs/Subject';

export class CustomerService {

    customers: Customer[]=CUSTOMER_LIST;

    customersUpdateEvent = new Subject<Customer[]>();


    addCustomer(customer: Customer){
        this.customers.push(customer);
        this.customersUpdateEvent.next(this.getCustomers());
    }

    getCustomers(){
        return this.customers.slice();
    }

    updateCustomer(index: number,updateCustomer: Customer){
        this.customers[index]=updateCustomer;
        this.customersUpdateEvent.next(this.getCustomers());
    }

    getCustomerByName(name: string){
        console.log('GetCustomerByName:',this.getCustomers());
        return this.getCustomers().filter(customer => customer.custName.toString().startsWith(name));
    }





}