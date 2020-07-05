import { Message } from './message';
import { User } from './user';

export class Chat {
    chatId: string;
    name: string;
    messages: Message[];
    users: User[];
    lastActivityAt: Date;
}
