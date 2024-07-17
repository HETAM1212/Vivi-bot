

const handler = async (m, {command, usedPrefix, text}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.owner_addmsg

  const M = m.constructor;
  const which = command.replace(/agregar/i, '');
  if (!m.quoted) throw `*❐┃استخدام غير صحيح┃❗❯*
*▢* رد على رسالة نصية او صورة ، إلخ. واضف كلمة مرور

*⟐ مثال :*
.تخزين <كلمة مرور>`;
  if (!text) throw `${tradutor.texto2[0]} *${usedPrefix}list${which}* ${tradutor.texto2[1]}`;
  const msgs = global.db.data.msgs;
  if (text in msgs) throw `*❐┃كلمة المرور هذه مستخدما شوف غيرها┃☕❯*`;
  msgs[text] = M.toObject(await m.getQuotedObj());
  m.reply(`*❐┃تمت اضافة الرسالة الى الخزنة بنجاح┃🙂‍↕❯*
*▢* لاستدعاء الرسالة المخزنة قم بكتابة vermsg مع كلمة المرور

*⟐ مثال :*
‏.vermsg <كلمة مرور>`);
};
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map((v) => 'add' + v + ' <text>');
handler.tags = ['database'];
handler.command = /^تخزين$/;
handler.rowner = true;
export default handler;
