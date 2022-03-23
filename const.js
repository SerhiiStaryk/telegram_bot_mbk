const commands = `
/start - Перезапустити бот
/portals - Список порталів
/help - Допомога
`;

const portals = [
    `<a href = "https://mbk.city-adm.lviv.ua/">Зовнішній геопортал містобудівного кадастру</a>`,
    `<a href = "https://172.16.12.12:3000/">Внутрішній геопортал містобудівного кадастру</a>`,
];

module.exports.commands = commands;
module.exports.portals = portals;
