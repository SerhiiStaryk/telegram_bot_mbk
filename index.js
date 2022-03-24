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

bot.command('zonning', async ctx => {
    try {
        await ctx.replyWithHTML(
            '<b>Дати затвердження планів зонування:</b>',
            Markup.inlineKeyboard([
                [
                    Markup.button.callback('Галицький район', 'btn_district_hal'),
                    Markup.button.callback('Залізничний район', 'btn_district_zal'),
                    Markup.button.callback('Личаківський район', 'btn_district_lych'),
                ],
                [
                    Markup.button.callback('Сихівський район', 'btn_district_syh'),
                    Markup.button.callback('Франківський район', 'btn_district_fra'),
                    Markup.button.callback('Шевченківський район', 'btn_district_schev'),
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

addActionBot('btn_district_hal', false, true, data.districts[0]);
addActionBot('btn_district_zal', false, true, data.districts[1]);
addActionBot('btn_district_lych', false, true, data.districts[2]);
addActionBot('btn_district_syh', false, true, data.districts[3]);
addActionBot('btn_district_fra', false, true, data.districts[4]);
addActionBot('btn_district_schev', false, true, data.districts[5]);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
