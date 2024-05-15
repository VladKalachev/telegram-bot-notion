import OpenAI from 'openai';
import config from 'config';

const CHATGPT_MODEL = 'gpt-3.5-turbo'

const ROLES = {
  ASSISTANT: 'assistant',
  USER: 'user',
  SYSTEM: 'system',
}

const openai = new OpenAI({
  apiKey: config.get('OPENAI_API_KEY'),
})

const getMessage = (m) => `
  Напиши на основе этих тезисов эмоциональную историю: ${m}
`

export async function chatGPT(message = '') {
  const messages = [{
    role: ROLES.SYSTEM,
    content: 'Ты опытный копирайтер который пишет яркие инетерсные статьи'
  }, {
    role: ROLES.USER,
    content: getMessage(message)
  }];

  try {
    const response = await openai.chat.completions.create({
      messages,
      module: CHATGPT_MODEL,
    });
  } catch (error) {
    console.log('Error while chat completion', error.message);
  }
}