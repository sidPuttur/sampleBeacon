import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { BeaconProvider } from '../../providers/beacon/beacon';

import { BeaconModel } from '../../model/beaconModel';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

 
  beaconList: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events,
    private platform: Platform, public beaconProvider: BeaconProvider, public zone: NgZone) {
   
    
  }

  ionViewDidLoad() {
   
   try {
      this.platform.ready().then(() => {
        this.beaconProvider.initialise().then((isInitialised) => {
          if (isInitialised)
            this.listenToBeaconEvents();
        })

      })
    } catch (e) {
      console.error(e);
    }  
    
  }



  listenToBeaconEvents() {
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {

      // update the UI with the beacon list 
       
      this.zone.run(() => {


        let beaconList = data.beacons;
        beaconList.forEach((beacon) => {

          let beaconObject = new BeaconModel(beacon);
          console.log(beaconObject);
          this.beaconList.push(beaconObject);
         
        })
      })
    })
    
  }
}  



  
  
