import { Chat } from './../shared/models/chat';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  chatsUrl = environment.apiUrl + '/chats';

  constructor(private http: HttpClient) { }

  getChat(chatId: string) {
    return this.http.get<Chat>(this.chatsUrl + "/getChat/" + chatId);
  }

  getActiveChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.chatsUrl + "/getActiveChats");
  }

  getArchivedChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.chatsUrl + "/getArchivedChats");
  }

  joinChat(connectionId: string, chatId: string){
    return this.http.get<object>(this.chatsUrl + '/joinChat/' + connectionId + '/' + chatId);
  }

  leaveChat(connectionId: string, chatId: string){
    return this.http.get<object>(this.chatsUrl + '/leaveChat/' + connectionId + '/' + chatId);
  }

  createChat(chat: Chat){
    return this.http.post(this.chatsUrl + "/postNewChat", chat);
  }
}
