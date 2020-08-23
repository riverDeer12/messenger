import { NavController, ModalController } from '@ionic/angular';
import { ChatsService } from './../../services/chats.service';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/shared/models/chat';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  chats: Chat[] = [];
  loadingData: boolean;
  hasActiveChats: boolean;
  errorLoadingProfile: boolean;

  constructor(private chatsService: ChatsService,
              private navCtrl: NavController,
              public modalController: ModalController) { }

  ngOnInit() {
    this.loadingData = true;
    this.hasActiveChats = true;
    this.errorLoadingProfile = false;
    setTimeout(()=> {
      this.getActiveChats();
    }, 1000);
  }

  getActiveChats(){
    this.chatsService.getActiveChats().subscribe(chats => {
      this.chats = chats.map(chat => 
        Object.assign(new Chat(), chat));
        console.log("Active chats:", chats);
        this.loadingData = false;
        if(this.chats.length === 0){
          this.hasActiveChats = false;
        }
    });
  }

  openChat(chatId: string){
    this.navCtrl.navigateForward('/chat/' + chatId);
  }

  openNewChatDialog(){
    this.navCtrl.navigateForward('/chat/create');
  }
}
