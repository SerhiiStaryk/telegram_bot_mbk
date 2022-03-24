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

bot.command('zoning', async ctx => {
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

bot.command('genplan', async ctx => {
    try {
        await ctx.replyWithHTML(
            '<b>Дати затвердження генеральних планів:</b>',
            Markup.inlineKeyboard([
                [
                    Markup.button.callback('селище міського типу Брюховичі', 'btn_genplan_bryh'),
                    Markup.button.callback('місто Винники', 'btn_genplan_vyn'),
                    Markup.button.callback('селище міського типу Рудне', 'btn_genplan_rydn'),
                ],
                [
                    Markup.button.callback('село Великі Грибовичі', 'btn_genplan_vgryb'),
                    Markup.button.callback('село Збиранка', 'btn_genplan_zbur'),
                    Markup.button.callback('село Малі Грибовичі', 'btn_genplan_mgryb'),
                ],
                [
                    Markup.button.callback('село Воля-Гомулецька', 'btn_genplan_vhol'),
                    Markup.button.callback('село Гряда', 'btn_genplan_hriad'),
                    Markup.button.callback('місто Дубляни', 'btn_genplan_dub'),
                ],
                [
                    Markup.button.callback('село Малі Підліски', 'btn_genplan_mpidl'),
                    Markup.button.callback('село Ситихів', 'btn_genplan_sytyh'),
                    Markup.button.callback('село Зарудці', 'btn_genplan_zaryd'),
                ],
                [
                    Markup.button.callback('село Завадів', 'btn_genplan_zavad'),
                    Markup.button.callback('село Зашків', 'btn_genplan_zashk'),
                    Markup.button.callback('село Малехів', 'btn_genplan_maleh'),
                ],
                [
                    Markup.button.callback('село Лисиничі', 'btn_genplan_lys'),
                    Markup.button.callback('село Підбірці', 'btn_genplan_pidb'),
                    Markup.button.callback('село Підрясне', 'btn_genplan_pidr'),
                ],
                [
                    Markup.button.callback('село Рясне-Руське', 'btn_genplan_rrus'),
                ],

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

addActionBot('btn_genplan_bryh', false, true, data.genplans[0]);
addActionBot('btn_genplan_vyn', false, true, data.genplans[1]);
addActionBot('btn_genplan_rydn', false, true, data.genplans[2]);
addActionBot('btn_genplan_vgryb', false, true, data.genplans[3]);
addActionBot('btn_genplan_zbur', false, true, data.genplans[3]);
addActionBot('btn_genplan_mgryb', false, true, data.genplans[3]);
addActionBot('btn_genplan_vhol', false, true, data.genplans[4]);
addActionBot('btn_genplan_hriad', false, true, data.genplans[4]);
addActionBot('btn_genplan_dub', false, true, data.genplans[14]);
addActionBot('btn_genplan_mpidl', false, true, data.genplans[5]);
addActionBot('btn_genplan_sytyh', false, true, data.genplans[6]);
addActionBot('btn_genplan_zaryd', false, true, data.genplans[7]);
addActionBot('btn_genplan_zavad', false, true, data.genplans[8]);
addActionBot('btn_genplan_zashk', false, true, data.genplans[8]);
addActionBot('btn_genplan_maleh', false, true, data.genplans[9]);
addActionBot('btn_genplan_lys', false, true, data.genplans[10]);
addActionBot('btn_genplan_pidb', false, true, data.genplans[11]);
addActionBot('btn_genplan_pidr', false, true, data.genplans[12]);
addActionBot('btn_genplan_rrus', false, true, data.genplans[13]);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
