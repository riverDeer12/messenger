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
  errorLoadingProfile: boolean;

  constructor(private chatsService: ChatsService) { }

  ngOnInit() {
    this.loadingData = true;
    this.errorLoadingProfile = false;
    setTimeout(()=> {
      this.getActiveChats();
    }, 1000);
  }

  getActiveChats(){
    this.chatsService.getActiveChats().subscribe(chats => {
      this.chats = chats.map(chat => 
        Object.assign(new Chat(), chat));
        this.loadingData = false;
    });
  }
}
