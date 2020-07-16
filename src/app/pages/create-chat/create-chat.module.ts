import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateChatPageRoutingModule } from './create-chat-routing.module';

import { CreateChatPage } from './create-chat.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateChatPageRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
  declarations: [CreateChatPage]
})
export class CreateChatPageModule {}
