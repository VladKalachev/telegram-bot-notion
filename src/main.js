import { Telegraf, session } from 'telegraf';

import config from 'config';


const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
  handlerTimeout: Infinity,
});

bot.command('start', (ctx) => {
  ctx.reply('Добро пожаловать в бота. Отправьте текстовое сообщене с тезисами про историю')
})


bot.launch();
