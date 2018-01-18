
import { Injectable } from '@angular/core';
import { Platform,Events } from 'ionic-angular'
import { IBeacon } from '@ionic-native/ibeacon';

/*
  Generated class for the BeaconProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeaconProvider {

delegate: any;
  region: any;  
  constructor(public platform:Platform,private events:Events, public IBeacon:IBeacon) {
    console.log('Hello BeaconProvider Provider');
  }

  initialise(): any {
    console.log("Inside initialize");
    return new Promise((resolve, reject) => {
        console.log("Inside promise");
      // we need to be running on a device 
      if (this.platform.is('cordova')) {
        console.log("Inside cordova");
        // Request permission to use location on iOS
        this.IBeacon.requestAlwaysAuthorization().then(() => {
        console.log("Inside requestAlwaysAuthorization");

        // create a new delegate and register it with the native layer
          this.delegate = this.IBeacon.Delegate();
          console.log("Inside Delegate");
          console.log(this.delegate, "my delegate");
        // Subscribe to some of the delegate's event handlers
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
          data => {
            console.log("didRangeBeaconsInRegion");
            resolve(true);
            this.events.publish('didRangeBeaconsInRegion', data);
          },
          error => console.error()
          );

        // setup a beacon region
        this.region = this.IBeacon.BeaconRegion('Genting-Beacon', 'beac1234-1234-1234-1234-123412341234');
                  console.log("Inside Region");

        // start ranging
        this.IBeacon.startRangingBeaconsInRegion(this.region)
          .then(
          () => {
            console.log("startedRangingBeaconsInRegion");
            resolve(true);
          },
          error => {
            console.error('Failed to begin monitoring: ', error);
            resolve(false);
          }
          );
        }, err => {
          console.log("Request authorization error");
      });

      } else {
        console.error("This application needs to be running on a device");
        resolve(false);
      }
    });
    // console.log("returned");
    // console.log(promise, "promise");
    // return promise;
  }


}
