import { MessagesService } from './../../services/messages.service';
import { NavController } from '@ionic/angular';
import { MessageType } from './../../shared/enums/message-type.enum';
import { Chat } from './../../shared/models/chat';
import { ChatsService } from './../../services/chats.service';
import { Component, OnInit } from '@angular/core';
import { HubsService } from 'src/app/services/hubs.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/shared/models/message';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {

  chatId: string;
  chat: Chat;
  messages: Message[];
  loadingData: boolean;
  errorSendingMessage: boolean;

  sendMessageForm = new FormGroup({
    content: new FormControl("", Validators.required),
    chatId: new FormControl(""),
  });

  constructor(
    private hubsService: HubsService,
    private chatsService: ChatsService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadingData = true;
    this.errorSendingMessage = false;
    setTimeout(() => {
      this.hubsService.startConnection();
      this.hubsService.addChatMessagesListener();
      this.subscribeToChatEvents();
      this.getChat();
    }, 1000);
  }

  messageType = () => {
    return MessageType;
  };

  goToFeed() {
    this.navCtrl.navigateBack("/feed");
  }

  getChat() {
    this.chatId = this.route.snapshot.paramMap.get("id");
    this.chatsService.getChat(this.chatId).subscribe((response: any) => {
      this.chat = response as Chat;
      this.messages = this.chat.messages;
      this.loadingData = false;
    });
  }

  subscribeToChatEvents() {
    this.hubsService.getReceivedMessage().subscribe((response: any) => {
      this.messages.push(response as Message);
    });
  }

  sendMessage(sendMessageForm: NgForm) {
    this.sendMessageForm.controls["chatId"].setValue(this.chatId);

    this.messagesService.sendChatMessage(sendMessageForm.value).subscribe(
      (response: any) => {
        this.sendMessageForm.reset();
      },
      () => {
        this.errorSendingMessage = true;
      }
    );
  }
}
