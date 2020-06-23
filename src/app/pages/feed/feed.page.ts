import { MessagesService } from './../../services/messages.service';
import { HubsService } from './../../services/hubs.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  loadingData: boolean;
  errorLoadingProfile: boolean;

  constructor(private hubsService: HubsService,
              private messagesService: MessagesService) { }

  ngOnInit() {
    this.loadingData = true;
    this.errorLoadingProfile = false;

    setTimeout(()=> {
      this.hubsService.startConnection();
      this.hubsService.addMessagesListener();
      this.getMessages();
    }, 1000);
  }

  getMessages(){
    this.messagesService.getUserMessages()
      .subscribe(response => {
          console.log(response);
          this.loadingData = false;
        },() => {
          this.loadingData = false;
          this.errorLoadingProfile = true;
      });
  }
}
