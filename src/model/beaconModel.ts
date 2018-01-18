import moment from 'moment';

export class BeaconModel {

  uuid: string;
  major: number;
  minor: number;
  rssi: number;
  tx: number;
  accuracy: number;
  proximity: string;
  distance: any;
  arrivalTime: any;

  constructor(public beacon: any) {

    this.uuid = beacon.uuid;
    this.major = beacon.major;
    this.minor = beacon.minor;
    this.rssi = beacon.rssi;
    this.tx = beacon.tx;
    this.accuracy = beacon.accuracy;
    this.proximity = beacon.proximity;
    this.distance = '';
    this.arrivalTime = moment();

  }
}