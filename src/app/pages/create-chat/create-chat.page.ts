import { Chat } from 'src/app/shared/models/chat';
import { ChatsService } from './../../services/chats.service';
import { UsersService } from './../../services/users.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.page.html',
  styleUrls: ['./create-chat.page.scss'],
})
export class CreateChatPage implements OnInit {
  
  creatingError: boolean;
  searchText: string;
  loadingData: boolean;
  chatSubmitted: boolean;
  users: User[] = [];
  selectedUsers: User[] = [];

  constructor(private navCtrl: NavController,
              private usersService: UsersService,
              private chatsService: ChatsService) { }

  ngOnInit() {
    this.creatingError = false;
    this.loadingData = true;
    this.chatSubmitted = false;
    this.getActiveChatUsers();
  }

  chatForm = new FormGroup(
    {
      chatName: new FormControl('')
    }
  )

  goToFeed() {
    this.navCtrl.navigateBack("/feed");
  }

  getActiveChatUsers(){
    this.usersService.getUsers().subscribe(
      (users) => {
        this.users = users.map(user => 
          Object.assign(new User(), user));
      }
    )

    this.loadingData = false;
  }

  addUser(user: User){
    let indexOfUser = this.users.indexOf(user);
    this.selectedUsers.push(user);
    this.users.splice(indexOfUser, 1);
  }

  removeUser(user: User){
    let indexOfUser = this.selectedUsers.indexOf(user);
    this.selectedUsers.splice(indexOfUser, 1);
    this.users.push(user);
  }

  createNewChat(){
    this.chatSubmitted = true;

    let chat = new Chat();

    chat.users = this.selectedUsers;
    chat.name = this.chatForm.controls["chatName"].value;

    this.chatsService.createChat(chat).subscribe(
      (response: any) =>{
        this.chatSubmitted = true;
        this.navCtrl.navigateForward("/chat/" + response.chatId);
      });
      
  }
}
