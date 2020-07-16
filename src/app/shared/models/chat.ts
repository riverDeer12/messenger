import { Message } from './message';
import { User } from './user';
import { ThrowStmt } from '@angular/compiler';

export class Chat {
    chatId: string;
    name: string;
    messages: Message[];
    users: User[];
    lastActivityAt: Date;
}
