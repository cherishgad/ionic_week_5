import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkData } from '../../app/providers/park-data';
/*
  Generated class for the ParkList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
  parks: Array<Object> = [];
  searchQuery: string = '';
  constructor(public navCtrl: NavController, public parkData: ParkData){ 
    parkData.getParks().then(theResult => { 
      this.parks = theResult; 
    }) 
  } 
  goParkDetails(theParkData) { 
    this.navCtrl.push("ParkDetailsPage", { parkData: theParkData });
  }
  getParks(event) { 
    // Reset items back to all of the items 
    this.parkData.getParks().then(theResult => { 
      this.parks = theResult; 
    })

    // set queryString to the value of the searchbar 
    let queryString = event.target.value;

    if (queryString !== undefined) { 
      // if the value is an empty string don't filter the items 
    if (queryString.trim() == '') {  return;  }

    this.parkData.getFilteredParks(queryString).then 
      (theResult => {
        this.parks = theResult;    
      })
    }
  }
  resetList(event) { 
    // Reset items back to all of the items 
    this.parkData.getParks().then(theResult => { 
      this.parks = theResult; 
    }) 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkListPage');
  }
  
}
