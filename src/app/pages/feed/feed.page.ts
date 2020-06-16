import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  openProfile(){
    this.navCtrl.navigateForward('/profile');
  }

}
