import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';
import { Body, Controller, Header, Post, Sse } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatDto } from './dto/openai.dto';
import { OpenaiService } from './openai.service';

@ApiTags('OpenAI')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  @Sse('/chat')
  @Header('Content-type', 'text/event-stream')
  @CommonApiOperation({ summary: 'AI聊天', isPublic: true })
  @ApiResponse({
    content: {
      'text/plain': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  getChat(@Body() chatData: ChatDto) {
    if (chatData.stream) {
      return this.openaiService.getMessageStreamData(chatData);
    }
    else {
      return this.openaiService.getMessageData(chatData);
    }
  }
}
