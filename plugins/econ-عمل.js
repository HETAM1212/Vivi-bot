
const handler = async (m, { conn, isPrems }) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.rpg_work

  global.work = tradutor.texto1;


  let enviando;
  if (enviando) return
  enviando = true
  const hasil = Math.floor(Math.random() * 10000);
  const time = global.db.data.users[m.sender].lastwork + 600000;
  if (new Date - global.db.data.users[m.sender].lastwork < 600000) throw `*❮ ⌛┇خذ استراحة يكوتش┇⌛❯*
  
  *❐ الوقت المتبقي :*
  ◄ ${msToTime(time - new Date())}`;
  conn.sendMessage(m.chat, { text: `*❐┃لقد اتممت عملك بـنـجـاح┃✅❯*
  
  *⸙ ${pickRandom(global.work)}*
  *⟐ جائزتك :* ${hasil} XP` }, { quoted: m });
  global.db.data.users[m.sender].exp += hasil;
  global.db.data.users[m.sender].lastwork = new Date() * 1;
  enviando = false
};
handler.help = ['work'];
handler.tags = ['xp'];
handler.command = /^(work|عمل|chambear)$/i
handler.fail = null;
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return minutes + ' دقائق و ' + seconds + ' ثانية ';
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
