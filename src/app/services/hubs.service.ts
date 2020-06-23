import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as SignalR from '@aspnet/SignalR';

@Injectable({
  providedIn: 'root'
})
export class HubsService {

  constructor() { }

  hubConnection: SignalR.HubConnection
  hubUrl = 'https://localhost:44303/message';
 
  public startConnection = () => {
    this.hubConnection = new SignalR.HubConnectionBuilder()
                            .withUrl(this.hubUrl)
                            .configureLogging(SignalR.LogLevel.Information)
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
 
  public addMessagesListener = () => {
    this.hubConnection.on('receivemessages', 
    (response) => {
      alert(response);
    });
  }
}
