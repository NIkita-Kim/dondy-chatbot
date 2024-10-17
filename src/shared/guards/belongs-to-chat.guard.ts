import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ChatService } from '../../chat/chat.service';

@Injectable()
export class BelongsToChatGuard implements CanActivate {
  constructor(private readonly chatService: ChatService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const chatId = request.params['id'];
    const chat = await this.chatService.loadConversation(
      chatId,
      request.user['id'],
    );

    return !!chat;
  }
}
