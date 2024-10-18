import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatDocument } from './schemas/chat.schema';
import { Public } from '../shared/decorators/public.decorator';
import { Cookie } from '../shared/decorators/cookie.decorator';
import { USER_ID_COOKIE_NAME } from '../shared/cookie/cookie.const';
import { StartConversationDto } from './dto/start-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { BelongsToChatGuard } from '../shared/guards/belongs-to-chat.guard';

@ApiTags('Chat')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @Public()
  async findForUser(
    @Cookie(USER_ID_COOKIE_NAME) userId: string,
  ): Promise<ChatDocument[]> {
    return await this.chatService.findForUser(userId);
  }

  @Post()
  @Public()
  async startConversation(
    @Cookie(USER_ID_COOKIE_NAME) customerId: string,
    @Body() dto: StartConversationDto,
  ): Promise<ChatDocument> {
    return await this.chatService.startConversation({
      customerId,
      ...dto,
    });
  }

  @Get(':id')
  @UseGuards(BelongsToChatGuard)
  @Public()
  async loadConversation(
    @Cookie(USER_ID_COOKIE_NAME) customerId: string,
    @Param('id') id: string,
  ): Promise<ChatDocument> {
    return await this.chatService.loadConversation(id, customerId);
  }

  @Patch(':id')
  @UseGuards(BelongsToChatGuard)
  @Public()
  async updateConversation(
    @Param('id') id: string,
    @Body() dto: UpdateConversationDto,
  ): Promise<ChatDocument> {
    return await this.chatService.updateConversation(id, dto);
  }
}
