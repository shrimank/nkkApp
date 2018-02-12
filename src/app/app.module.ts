import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { FileChooser } from '@ionic-native/file-chooser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerService } from '../services/customer.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DatabaseProvider } from '../providers/database/database';
 
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { CustomerPage } from '../pages/customer/customer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomerPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomerService,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    CallNumber
  ]
})
export class AppModule {}
