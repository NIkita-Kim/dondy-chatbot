import { OmitType } from '@nestjs/swagger';
import { CreateChatDto } from './create-chat.dto';

export class StartConversationDto extends OmitType(CreateChatDto, [
  'customerId',
]) {}
