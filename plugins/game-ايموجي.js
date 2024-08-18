import fs from 'fs';

let timeout = 30000;
let poin = 2000;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    if (id in conn.tekateki) {
        conn.reply(m.chat, '*❐┃لم يتم الاجابة على السؤال بعد┃❗❯*', conn.tekateki[id][0]);
        throw false;
    }
    let tekateki = JSON.parse(fs.readFileSync(`./src/game/ايموجي.json`));
    let json = tekateki[Math.floor(Math.random() * tekateki.length)];
    let _clue = json.response;
    let clue = _clue.replace(/[A-Za-z]/g, ''); // Fixed this line
    let caption = `
╮─━═⟐ ❪╰ايموجـي╮❫ ⟐═━─╭
*● ${json.question}*
 *◄ الـوقـت : ${(timeout / 1000).toFixed(2)} ثانيه*
 *◄ الـجـائزة : ${poin} XP*
╯━───━═⟐ ❈ ⟐═━───━╰
> *الرد على هذه الرسالة للإجابة*
`.trim();
    conn.tekateki[id] = [
       await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `
╮─━═⟐ ❪╰ايموجـي╮❫ ⟐═━─╭
*◄ انتهى وقت الاجابة ⌛*
*◄ الاجابة : ${json.response}*
╯━───━═⟐ ❈ ⟐═━───━╰`, conn.tekateki[id][0]);
            delete conn.tekateki[id];
        }, timeout)
    ];
};

handler.help = ['miku'];
handler.tags = ['game'];
handler.command = /^(ايجوجي|انمي-ايموجي)$/i;

export default handler;
