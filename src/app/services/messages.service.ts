import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messagesUrl = environment.apiUrl + '/messages';

  constructor(private http: HttpClient) { }

  getUserMessages(){
    return this.http.get<Message>(this.messagesUrl + '/getUserMessages');
  }



}
