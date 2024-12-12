import { CommonApiOperation } from '@/common/decorators/common-api-operation.dec';
import { Body, Controller, Header, Post, Sse } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatDto } from './dto/openai.dto';
import { OpenaiService } from './openai.service';

@ApiTags('OpenAI')
@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('/chat')
  @CommonApiOperation({ summary: 'AI聊天', isPublic: true })
  getChat(@Body() chatData: ChatDto) {
    return this.openaiService.getMessageData(chatData);
  }

  @Post('/chat/stream')
  @Sse('/chat/stream')
  @Header('Content-type', 'text/event-stream')
  @CommonApiOperation({ summary: 'AI聊天(流式响应)', isPublic: true })
  @ApiResponse({
    content: {
      'text/plain': {
        schema: {
          type: 'object'
        }
      }
    }
  })
  getChatStream(@Body() chatData: ChatDto) {
    return this.openaiService.getMessageStreamData(chatData);
  }
}
