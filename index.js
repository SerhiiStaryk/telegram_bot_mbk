const { Telegraf, Markup } = require('telegraf');

require('dotenv').config();

const data = require('./const');

const bot = new Telegraf(process.env.BOT_TOCKEN);
bot.start(ctx =>
    ctx.reply(
        `Привіт ${
            ctx.message.from.first_name ? ctx.message.from.first_name : 'anonym'
        }! Я бот містобудівного кадастру.`
    )
);
bot.help(ctx => ctx.reply(data.commands));

bot.command('portals', async ctx => {
    try {
        await ctx.replyWithHTML(
            '<b>Посилання на геопортали містобудівного кадастру</b>',
            Markup.inlineKeyboard([
                [
                    Markup.button.callback('Зовнішній портал', 'btn_portal_out'),
                    Markup.button.callback('Внутрішній портал', 'btn_portal_inner'),
                ]
            ])
        );
    } catch (err) {
        console.error(err);
    }
});

function addActionBot(name, src, preview, text) {
    bot.action(name, async ctx => {
        try {
            await ctx.answerCbQuery();
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                });
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: preview,
            });
        } catch (err) {
            console.log(err);
        }
    });
}

addActionBot('btn_portal_out', false, false, data.portals[0]);
addActionBot('btn_portal_inner', false, true, data.portals[1]);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
