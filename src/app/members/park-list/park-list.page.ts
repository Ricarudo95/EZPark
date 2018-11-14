import { Component, OnInit } from '@angular/core';
import { ParklotService, Parklot } from '../../services/parklot.service';
import {  NavController, NavParams, ModalController } from '@ionic/angular';
import { ParkDetailsPage } from '../park-details/park-details.page';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.page.html',
  styleUrls: ['./park-list.page.scss'],
})
export class ParkListPage implements OnInit {

  parklot : Parklot[];
  constructor(
    private parklotService: ParklotService,
    private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.parklotService.getParklots().subscribe(res => {
      this.parklot = res;
      console.log(this.parklot)
    });
  }

  async getDetails(parkspace: Parklot){
    //console.log(parkspace);
    const modal = await this.modalCtrl.create({
      component:ParkDetailsPage,
      componentProps:{
        parklot: parkspace
      }
    });
    modal.present();
    
  }
  

}
