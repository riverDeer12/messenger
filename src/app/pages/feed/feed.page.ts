import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Message } from './../../shared/models/message';
import { MessagesService } from './../../services/messages.service';
import { HubsService } from './../../services/hubs.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  messages: Message[] = [];
  loadingData: boolean;
  errorLoadingProfile: boolean;

  constructor(private hubsService: HubsService,
              private messagesService: MessagesService) { }

  ngOnInit() {
    this.loadingData = true;
    this.errorLoadingProfile = false;

    setTimeout(()=> {
      this.hubsService.startConnection();
      this.subscribeToEvents();
      this.getMessages();
    }, 1000);
  }

  subscribeToEvents(): void{
    this.hubsService.messageReceived.subscribe((message: Message) => {  
      this.messages.push(message);   
    });  
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
