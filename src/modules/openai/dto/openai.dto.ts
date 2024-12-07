import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({ description: '消息内容' })
  content: string;

  @ApiProperty({ description: '角色' })
  role: 'user' | 'system';
}

export class ChatDto {
  @ApiProperty({ description: '消息内容列表', type: ChatMessageDto, isArray: true })
  message: ChatMessageDto[];

  @ApiProperty({ description: '是否使用流式数据' })
  stream: boolean;
}

export class OpenAiModelsListDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  object: string;

  @ApiProperty()
  created: number;

  @ApiProperty()
  // eslint-disable-next-line camelcase
  owned_by: string;

  @ApiProperty()
  root?: string = null;

  @ApiProperty()
  parent?: string = null;
}
