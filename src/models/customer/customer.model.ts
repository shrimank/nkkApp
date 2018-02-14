import { Injectable } from '@angular/core';

@Injectable()
export class Customer {
    custPkId: number;
    constructor(public custName: string,
        public custNumber: number,
        public acctNumber: string,
        public memberShipNo: string,
        public address: string,
        public mobileNo: number) {

    }



}

export const CUSTOMER_LIST = [
    new Customer('Shriman Nijagun', 201, '100202', 'Regular', 'Bangalore', 993923423),
    new Customer('Pavan', 203, '100203', 'Associate', 'Bangalore', 445678345),
    new Customer('James', 204, '100204', 'Regular', 'Bangalore', 335673278)
];
