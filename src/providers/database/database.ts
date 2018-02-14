import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';

import { Customer } from '../../models/customer/customer.model';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
 
   constructor(public sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: Http) {
      alert("calling dbp constructor");
    
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          //let dbInstance = db._objectInstance;
          this.database = db;
          alert('Database:'+this.database);
          this.http.get('assets/seed.sql')
           .subscribe(sql => { 
            this.sqlitePorter.importSqlToDb(db, sql['_body'])
            .then(() => alert('Imported'))
            .catch(e => alert("Error:"+e));
           });
        },(err) => alert("e:"+err));

  }
 
  // fillDatabase() {
  //   this.http.get('assets/seed.sql')
  //     .subscribe(sql => {
  //       console.log(sql);
  //       this.sqlitePorter.importSqlToDb(this.database, sql['_body'])
  //         .then(data => {
  //           this.databaseReady.next(true);
  //           this.storage.set('database_filled', true);
  //           alert("Customer imported.");
  //         })
  //         .catch(e => alert(JSON.stringify(e)));
  //     });
  // }
 
  addCustomer(customer: Customer) {
    let queryArray = [customer.custNumber,customer.custName,customer.acctNumber,customer.memberShipNo,customer.address,customer.mobileNo];
    return this.database.
    executeSql('INSERT INTO nkk_customer (custNumber, custName, acctNumber,memberShipNo,address,mobileNo) VALUES (?, ?, ?, ?, ?, ?)', queryArray).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getCustomerContainsName (name: string) : Customer[] {
    let customers : Customer[] =[];
    
    try{
    this.database.executeSql("SELECT * FROM nkk_customer where custName like ?",[name+'%']).then((data) => {
      
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          
          customers.push(new Customer(
            data.rows.item(i).custName,
            data.rows.item(i).custNumber, 
            data.rows.item(i).acctNumber,
             data.rows.item(i).memberShipNo,
             data.rows.item(i).address,
             data.rows.item(i).mobileNo ));
        }
      }
      
      return customers;
    }, err => {
      alert('Error: '+err);
      return [];
    });
    }catch(e){
      alert("Catched :"+e);
    }
    return customers;
    
  }
 
  getAllCustomers() : Customer[] {
    let customers : Customer[] =[];
    
    try{
    this.database.executeSql("SELECT * FROM nkk_customer",[]).then((data) => {
      
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          
          customers.push(new Customer(
            data.rows.item(i).custName,
            data.rows.item(i).custNumber, 
            data.rows.item(i).acctNumber,
             data.rows.item(i).memberType,
             data.rows.item(i).address,
             data.rows.item(i).mobileNo ));
        }
      }
      
      return customers;
    }, err => {
      alert('Error: '+err);
      return [];
    });
    }catch(e){
      alert("Catched :"+e);
    }
    return customers;
    
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

}
