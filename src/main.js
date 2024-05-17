import { Telegraf, session } from 'telegraf';
import { message } from 'telegraf/filters';
import config from 'config';
import { chatGPT } from './chatgpt.js';
import { create } from './notion.js'

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
  handlerTimeout: Infinity,
});

bot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать в бота. Отправьте текстовое сообщене с тезисами про историю')
})

bot.on(message('text'), async (ctx) => {
  try {
    const text = ctx.message.text;
    if (!text.trim()) ctx.reply('Текст не может быть пустым')

    const response = await chatGPT(ctx.message.text)

    if(!response) return ctx.reply('Ошибка с API', response);

    const notionResponse = await create(text, response.content)

    ctx.reply(`Ваша страница: ${notionResponse.url}`);

  } catch (error) {
    console.log('Error', error.message)
  }
 
})

bot.launch();
