  const handler = async (m, {conn, text, isPrems}) => {
    const datas = global
    const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.rpg_cofre

  const time = global.db.data.users[m.sender].lastcofre + 86400000; // 36000000 10 Horas //86400000 24 Horas
  if (new Date - global.db.data.users[m.sender].lastcofre < 86400000) throw `*❐┃خذ كنزك بعد انتهاء الوقت┃❗❯*
▢ *${msToTime(time - new Date())}*
▢ ${tradutor.texto1[1]}`;

  const img = 'https://telegra.ph/file/037ef8a889c823ee566e6.jpg';
  const diamond = Math.floor(Math.random() * 400);
  const tok = Math.floor(Math.random() * 50);
  const mystic = Math.floor(Math.random() * 7000);
  const expp = Math.floor(Math.random() * 50000);

    (global.db.data.users[m.sender].diamond += diamond);
  global.db.data.users[m.sender].money += mystic;
  global.db.data.users[m.sender].joincount += tok;
  global.db.data.users[m.sender].exp += expp;

  const texto = `
╮━──━═⟐❪╰🏴‍☠️╮❫⟐═━──━╭
     *❪╰مـحـتـوى صـنـدوق الكـنـز╮❫*
      ──━━━══⟐══━━━──
*▢ الألماس💎:* ${diamond}
*▢ العملات🪙:* ${tok}
*▢ العملات الغامضة👾:* ${mystic}
*▢ الخبرة⚡:* ${expp}
╯━────━═⟐❈⟐═━────━╰`;

  const fkontak = {
    'key': {
      'participants': '0@s.whatsapp.net',
      'remoteJid': 'status@broadcast',
      'fromMe': false,
      'id': 'Halo',
    },
    'message': {
      'contactMessage': {
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
    'participant': '0@s.whatsapp.net',
  };

  await conn.sendFile(m.chat, img, 'mystic.jpg', texto, fkontak);
  // await conn.sendButton(m.chat, texto, wm, img, [['🔰 𝙼𝙴𝙽𝚄', '/menu'] ], fkontak, m)
  global.db.data.users[m.sender].lastcofre = new Date * 1;
};
handler.help = ['daily'];
handler.tags = ['xp'];
handler.command = ['كنز', 'cofre', 'abrircofre', 'cofreabrir'];
handler.level = 5;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + ' ساعة و ' + minutes + ' دقيقة';
    }
