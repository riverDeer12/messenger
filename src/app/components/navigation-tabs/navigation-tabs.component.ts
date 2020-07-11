import { NavController, IonicModule } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.scss'],
})

export class NavigationTabsComponent implements OnInit {

  constructor(private navCtrl: NavController,
              private authService: AuthService) { }

  ngOnInit() {}

  openProfile(){
    this.navCtrl.navigateForward('/profile');
  }

  openFeed(){
    this.navCtrl.navigateBack('/feed')
  }

  logOut(){
    this.authService.logOut();
  }

  openNewChat(){
    this.navCtrl.navigateForward('/createNewChat')
  }
}
