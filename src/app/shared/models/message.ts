import { MessageType } from './../enums/message-type.enum';

export class Message {
    messageId: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    applicationUser: string;
    messageType: MessageType;
}
