import { Message } from './../shared/models/message';
import { environment } from 'src/environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import * as SignalR from '@aspnet/SignalR';

@Injectable({
  providedIn: 'root'
})
export class HubsService {

  constructor() { }
  
  messageReceived = new EventEmitter<Message>();
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
 
  addMessagesListener(): any {
    this.hubConnection.on('MessageReceived', 
      (message) => {
        this.messageReceived.emit(message);
    });
  }
  
  // addMessagesListener = () => {
  //   this.hubConnection.on('receivemessages', 
  //   (messages) => {
  //     console.log(messages);
  //   });
  // }
}
