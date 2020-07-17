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
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"],
})
export class ChatPage implements OnInit {

  chatId: string;
  connectionId: string;
  chat: Chat;
  userName: string;
  messages: Message[];
  chatUsers: User[];
  loadingData: boolean;
  errorSendingMessage: boolean;

  sendMessageForm = new FormGroup({
    content: new FormControl("", Validators.required),
    chatId: new FormControl(""),
  });

  constructor(
    private hubsService: HubsService,
    private chatsService: ChatsService,
    private usersService: UsersService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  
  ngOnInit() {
    this.loadingData = true;
    this.errorSendingMessage = false;
    this.setChatControls();
  }

  setChatControls(){
    setTimeout(() => {
      this.setHubProperties();
      this.getChat();
      this.getUserDetails();
    }, 1000);
  }

  setHubProperties(){
    this.getChat();
    this.hubsService.startConnection(this.chatId);
    this.subscribeToChatEvents();
  }
  
  getChat() {
    this.chatId = this.route.snapshot.paramMap.get("id");

    this.chatsService.getChat(this.chatId).subscribe((chat: any) => {
      this.chat = Object.assign(new Chat(), chat);
      this.messages = this.chat.messages;
      this.chatUsers = this.chat.users;
      this.getUserDetails();
      this.loadingData = false;
      this.scrollToBottom();
    });
  }

  subscribeToChatEvents() {
    this.hubsService.getReceivedMessage().subscribe((response: any) => {
      this.messages.push(response as Message);
      this.scrollToBottom();
    });
  }

  sendMessage(sendMessageForm: NgForm) {

    this.sendMessageForm.controls["chatId"].setValue(this.chatId);

    this.messagesService.sendChatMessage(sendMessageForm.value).subscribe(
      (response: any) => {
        this.sendMessageForm.reset();
        this.scrollToBottom();
      },
      () => {
        this.errorSendingMessage = true;
      }
    );
  }

  getUserDetails(){
    this.usersService.getUserDetails().subscribe(
      (response) =>{
        this.userName = response.userName;
      })
  }

  scrollToBottom(){
    let content = document.querySelector('ion-content');
    content.scrollToBottom(500);
  }

  messageType = () => {
    return MessageType;
  };

  leaveChat() {
    this.hubsService.endConnection();
    this.navCtrl.navigateBack("/feed");
  }
}
