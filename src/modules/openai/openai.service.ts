import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionCreateParams } from 'openai/resources';
import { Stream } from 'openai/streaming';
import { Observable } from 'rxjs';
import { ChatDto } from './dto/openai.dto';

@Injectable()
export class OpenaiService extends OpenAI {
  options: ChatCompletionCreateParams;
  constructor(readonly configService: ConfigService) {
    super({
      apiKey: configService.get('AI_API_KEY'),
      baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
    });
    this.options = {
      model: 'glm-4-flash',
      messages: [],
      // eslint-disable-next-line camelcase
      top_p: 0.7,
      temperature: 0.9,
    };
  }

  async getMessageData(chatData: ChatDto) {
    this.chat.completions.create({
      ...this.options,
      ...chatData
    });
  }

  async getMessageStreamData(chatData: ChatDto) {
    return new Observable(subscribe => {
      this.chat.completions.create({
        ...this.options,
        ...chatData
      }).then(async (res: Stream<OpenAI.ChatCompletionChunk>) => {
        for await (const chunk of res) {
          subscribe.next(chunk);
          if (chunk.choices[0].finish_reason === 'stop') {
            subscribe.next(chunk);
            return subscribe.complete();
          }
        }
      });
    });
  }
}
