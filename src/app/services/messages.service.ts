import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Message } from '../shared/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesUrl = environment.apiUrl + '/messages';

  constructor(private http: HttpClient) { }

  getUserMessages() : Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl + "/getUserMessages");
  }

  sendChatMessage(message: Message) {
    return this.http.post(this.messagesUrl + "/sendChatMessage", message);
  }

  sendNewChatMessage(message: Message) {
    return this.http.post(this.messagesUrl + "/sendNewChatMessage", message);
  }

  getChatMessages(chatId: string){
    return this.http.get<Message[]>(this.messagesUrl + "/getChatMessages/" + chatId);
  }
}
