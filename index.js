const { Telegraf, Markup } = require('telegraf');

require('dotenv').config();

const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOCKEN);
bot.start(ctx =>
    ctx.reply(
        `Привіт ${
            ctx.message.from.first_name ? ctx.message.from.first_name : 'anonym'
        }`
    )
);
bot.help(ctx => ctx.reply(text.commands));

bot.command('manage', async ctx => {
    try {
        await ctx.replyWithHTML(
            '<b>Sites</b>',
            Markup.inlineKeyboard([
                [
                    Markup.button.callback('Зовнішній портал', 'btn_1'),
                    Markup.button.callback('JS', 'btn_2'),
                ],
                [Markup.button.callback('HTML', 'btn_3')],
            ])
        );
    } catch (err) {
        console.error(err);
    }
});

function addActionBot(name, src, text) {
    bot.action(name, async ctx => {
        try {
            await ctx.answerCbQuery();
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                });
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true,
            });
        } catch (err) {
            console.log(err);
        }
    });
}

addActionBot('btn_1', './img/icon.png', text.text)


bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
