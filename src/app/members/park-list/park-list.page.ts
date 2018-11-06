import { Component, OnInit } from '@angular/core';
import { ParklotService, Parklot } from '../../services/parklot.service';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.page.html',
  styleUrls: ['./park-list.page.scss'],
})
export class ParkListPage implements OnInit {

  parklot : Parklot[];
  constructor(private parklotService: ParklotService ) { }

  ngOnInit() {
    this.parklotService.getParklots().subscribe(res => {
      this.parklot = res;
    });
  }

  

}
