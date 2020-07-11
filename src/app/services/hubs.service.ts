import { ChatsService } from './chats.service';
import { MessagesService } from './messages.service';
import { Injectable, EventEmitter } from '@angular/core';
import * as SignalR from '@aspnet/SignalR';
import { Message } from '../shared/models/message';

@Injectable({
  providedIn: "root",
})
export class HubsService {
  constructor(public chatsService: ChatsService) {}

  messageReceived: EventEmitter<Message> = new EventEmitter();
  hubConnection: SignalR.HubConnection;
  hubUrl = "https://localhost:44303/message";
  
  startConnection(chatId: string){
    this.hubConnection = new SignalR.HubConnectionBuilder()
                            .withUrl(this.hubUrl)
                            .configureLogging(SignalR.LogLevel.Information)
                            .build();
    
    this.addChatMessagesListener();

    this.hubConnection.start().then(() => {
      console.log("Connection started");
      this.hubConnection.invoke('getConnectionId').then((connectionId) => {
        console.log("ConnectionId: " + connectionId);
        this.joinChatHub(connectionId, chatId);
      }).catch(error => 
        { 
          console.log("Error while joining chat: " + error);
          return;
        })
    }).catch(error => 
      {
        console.log("Error while starting connection: " + error);
        return;
      }
    );
  }

  joinChatHub(connectionId: string, chatId: string){
    this.chatsService.joinChat(connectionId, chatId).subscribe((response) => {
      console.log("Joined chat !")
    });
  }

  addChatMessagesListener(){
    this.hubConnection.on("receivemessage", (message) => {
      this.messageReceived.emit(message);
    });
  };

  getReceivedMessage() {
    return this.messageReceived;
  }
}
