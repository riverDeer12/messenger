import { Chat } from './chat';

export class User {
    userId: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phoneNumber: string;
    userName: string;
    chats: Chat[];
}
