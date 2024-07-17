import fetch from 'node-fetch';
import axios from 'axios';

const timeout = 60000;
const poin = 1000;
const handler = async (m, {conn, usedPrefix}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.game_cancion

  conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {};
  const id = m.chat;
  if (id in conn.tebaklagu) {
    conn.reply(m.chat, tradutor.texto1, conn.tebaklagu[id][0]);
    throw false;
  } // 5LTV57azwaid7dXfz5fzJu
  const res = await fetchJson(`https://gist.githubusercontent.com/Brook-88/6fd1ec8ec4d33a7c0e6cdd264d4b2ca2/raw/75c1120ee8b71b9af72124c02ceef9fae0c09a1d/%25D8%25A7%25D8%25B5%25D9%2588%25D8%25A7%25D8%25AA%2520%25D8%25A7%25D9%2584%25D8%25B4%25D8%25AE%25D8%25B5%25D9%258A%25D8%25A7%25D8%25AA`);
  const json = res[Math.floor(Math.random() * res.length)];
  const caption = `╮─┈〈 *تخمين الشخصية👤*〉┈─⟐
*▢❯* الوقت : *${(timeout / 1000).toFixed(2)}* ثانيه 
*▢❯* الجائزة : *${poin}* EXP
*▢❯* اكتب : *${usedPrefix}غش* لمعرفة الاجابة
*▢❯* الرد على هذه الرسالة مع الاجابة!
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim();
  conn.tebaklagu[id] = [
    await m.reply(caption),
    json, poin,
    setTimeout(() => {
      if (conn.tebaklagu[id]) conn.reply(m.chat, `*❮ ⌛┇انتهى الوقت┇⌛❯*

❐┇الاجـابـة✅ : *${json.jawaban}*`, conn.tebaklagu[id][0]);
      delete conn.tebaklagu[id];
    }, timeout),
  ];
  const aa = await conn.sendMessage(m.chat, {audio: {url: json.link_song}, fileName: `error.mp3`, mimetype: 'audio/mpeg'}, {quoted: m});
  if (!aa) return conn.sendFile(m.chat, json.link_song, 'coba-lagi.mp3', '', m);
};
handler.help = ['tebaklagu'];
handler.tags = ['game'];
handler.command = /^صوت|canción$/i;
export default handler;
async function fetchJson(url, options) {
  try {
options ? options : {};
const res = await axios({method: 'GET', url: url, headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}, ...options});
return res.data;
  } catch (err) {
    return err;
  }
}
