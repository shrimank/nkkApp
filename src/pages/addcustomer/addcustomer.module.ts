import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCustomerPage } from './addcustomer';

@NgModule({
  declarations: [
    AddCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCustomerPage),
  ],
})
export class AddcustomerPageModule {}
