import { Injectable, EventEmitter } from '@angular/core';
import * as SignalR from '@aspnet/SignalR';
import { Message } from '../shared/models/message';

@Injectable({
  providedIn: 'root'
})
export class HubsService {

  constructor() { }
  
  messageReceived: EventEmitter<Message> = new EventEmitter();
  hubConnection: SignalR.HubConnection
  hubUrl = 'https://localhost:44303/message';
 
  startConnection = () => {
    this.hubConnection = new SignalR.HubConnectionBuilder()
                            .withUrl(this.hubUrl)
                            .configureLogging(SignalR.LogLevel.Information)
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  

  addChatMessagesListener = () => {
    this.hubConnection.on('receivemessages', 
    (message) => {
      this.messageReceived.emit(message);
    });
  }

  getReceivedMessage(){
    return this.messageReceived;
  }
}
