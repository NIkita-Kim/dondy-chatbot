import { Injectable } from '@nestjs/common';
import { Model, ProjectionType, QueryOptions, RootFilterQuery } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
  ) {}

  async findAll(
    filter?: RootFilterQuery<ChatDocument>,
    projection?: ProjectionType<ChatDocument>,
    options?: QueryOptions<ChatDocument>,
  ): Promise<ChatDocument[]> {
    return await this.chatModel.find(filter, projection, options);
  }

  async findForUser(customerId: string): Promise<ChatDocument[]> {
    return await this.chatModel.find({
      customerId,
    });
  }

  async startConversation(dto: CreateChatDto): Promise<ChatDocument> {
    return await this.chatModel.create({
      ...dto,
    });
  }

  async loadConversation(
    chatId: string,
    customerId: string,
  ): Promise<ChatDocument> {
    return await this.chatModel.findOne({
      _id: chatId,
      customerId,
    });
  }

  async updateConversation(
    id: string,
    dto: UpdateConversationDto,
  ): Promise<ChatDocument> {
    return await this.chatModel.findByIdAndUpdate(
      { _id: id },
      {
        interactions: dto.interactions,
      },
    );
  }
}
