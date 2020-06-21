import { NavigationTabsComponent } from './../../components/navigation-tabs/navigation-tabs.component';
import { Component, OnInit } from '@angular/core';
import { NavController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  loadingData: boolean;
  errorLoadingProfile: boolean;

  constructor(private navCtrl: NavController,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadingData = true;
    this.errorLoadingProfile = false;
    setTimeout(()=> {
      this.getChats();
    }, 1000);
  }

  getChats(){
    console.log("Milan")
    this.loadingData = false;
  }
}
