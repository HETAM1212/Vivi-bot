import {createHash} from 'crypto';



const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
const handler = async function(m, {conn, text, usedPrefix, command}) {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.rpg_verificar

  const user = global.db.data.users[m.sender];
  const name2 = conn.getName(m.sender);
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => global.imagen1);
  if (user.registered === true) throw `*❐ ┃ انـت مـسـجـل ┃❗❯*
▢ لإلغاء التسجيل اكتب :\n*${usedPrefix}الغاء* ${tradutor.texto1[1]}

⸙ اذا لا تتذكر رقم التسلسل يمكنك معرفته من خلال امر : *.تسلسل*`;
  if (!Reg.test(text)) throw `*❐ ┃ صيغة غير صالحة ┃❗❯*

*◉ استخدم الأمر : .تسجيل اسم.العمر*
*◉ مثال : .تسجيل فيفي.18*`;
  let [_, name, splitter, age] = text.match(Reg);
  if (!name) throw tradutor.texto3;
  if (!age) throw tradutor.texto5;
  if (name.length >= 30) throw tradutor.texto6;
  age = parseInt(age);
  if (age > 100) throw tradutor.texto6;
  if (age < 5) throw tradutor.texto7;
  user.name = name.trim();
  user.age = age;
  user.regTime = + new Date;
  user.registered = true;
  const sn = createHash('md5').update(m.sender).digest('hex');
  const caption = `*╮─━══━─⬣ ❈ ⬣─━══━─╭*
    『✓ انـت مـسـجـل الان ✓』
    ──━━━══⟐══━━━──
*▢ الاسـم :* ${name}
*▢ الـعـمـر :* ${age} ${tradutor.texto8[5]}
*▢ رقـم الـتـسـلـسـل :*
➥ ${sn}
    ──━━━══⟐══━━━──
 ⸙ لحذف التسجيل اكتب : *.الغاء <رقم التسلسل>*
*╯─━══━─⬣ ❈ ⬣─━══━─╰*`;
  // let author = global.author
  await conn.sendFile(m.chat, pp, 'mystic.jpg', caption);
  // conn.sendButton(m.chat, caption, `¡𝚃𝚄 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝚂𝙴𝚁𝙸𝙴 𝚃𝙴 𝚂𝙴𝚁𝚅𝙸𝚁𝙰 𝙿𝙾𝚁 𝚂𝙸 𝙳𝙴𝚂𝙴𝙰𝚂 𝙱𝙾𝚁𝚁𝙰𝚁 𝚃𝚄 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙾 𝙴𝙽 𝙴𝙻 𝙱𝙾𝚃!\n${author}`, [['¡¡𝙰𝙷𝙾𝚁𝙰 𝚂𝙾𝚈 𝚄𝙽 𝚅𝙴𝚁𝙸𝙵𝙸𝙲𝙰𝙳𝙾/𝙰!!', '/profile']], m)
  global.db.data.users[m.sender].money += 10000;
  global.db.data.users[m.sender].exp += 10000;
};
handler.help = ['verificar'];
handler.tags = ['xp'];
handler.command = /^(تسجيل|register|verificar|reg|registrar)$/i;
export default handler;
