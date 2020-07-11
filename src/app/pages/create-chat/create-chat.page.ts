import { UsersService } from './../../services/users.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.page.html',
  styleUrls: ['./create-chat.page.scss'],
})
export class CreateChatPage implements OnInit {

  searchText: string;
  loadingData: boolean;
  chatSubmitted: boolean;
  users: User[] = [];
  selectedUsers: User[] = [];

  constructor(private navCtrl: NavController,
              private usersService: UsersService) { }

  ngOnInit() {
    this.loadingData = true;
    this.chatSubmitted = false;
    this.getActiveChatUsers();
  }

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
    console.log("WAAAAA!");
  }
}
