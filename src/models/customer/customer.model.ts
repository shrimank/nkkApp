export class Customer {

    constructor(public custName:string,
        public  custNumber:number,
        public  acctNumber:number,
        public  memberType:string,
        public  address:string,
        public  mobileNo:number,
        public  profilePhoto:string){}
}

export const CUSTOMER_LIST= [
new Customer('Shriman Nijagun',201,100202,'Regular','Bangalore',993923423,'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg'),
new Customer('Pavan',203,100203,'Associate','Bangalore',445678345,'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg'),
new Customer('James',204,100204,'Regular','Bangalore',335673278,'http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg')
];
