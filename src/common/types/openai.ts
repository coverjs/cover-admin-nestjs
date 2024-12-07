import OpenAI from 'openai';

export interface IChatRequest {
  messages: OpenAI.Chat.ChatCompletionMessage[] // existing property
  stream?: boolean
}
