import { Chat } from './../../shared/models/chat';
import { ChatsService } from './../../services/chats.service';
import { Component, OnInit } from '@angular/core';
import { HubsService } from 'src/app/services/hubs.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/shared/models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatId: string;
  chat: Chat;
  messages: Message[];
  loadingData: boolean;
  errorLoadingProfile: boolean;

  constructor(private hubsService: HubsService,
              private chatsService: ChatsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadingData = true;
    this.errorLoadingProfile = false;
    setTimeout(()=> {
      this.hubsService.startConnection();
      this.hubsService.addChatMessagesListener();
      this.getChat();
    }, 1000);
  }

  getChat(){
    this.chatId = this.route.snapshot.paramMap.get('id');
    this.chatsService.getChat(this.chatId).subscribe(
      (response: any) => {
        this.chat = response as Chat;
        this.messages = this.chat.messages;
    });

    this.hubsService.getReceivedMessage().subscribe(
      (response: any) => {
        this.messages.push(response as Message);
    })

    this.loadingData = false;
  }
}
