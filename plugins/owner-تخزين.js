

const handler = async (m, {command, usedPrefix, text}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.owner_addmsg

  const M = m.constructor;
  const which = command.replace(/agregar/i, '');
  if (!m.quoted) throw tradutor.texto1;
  if (!text) throw `تت`;
  const msgs = global.db.data.msgs;
  if (text in msgs) throw `*[❗𝐈𝐍𝐅𝐎❗] '${text}'لا ${tradutor.texto3}`;
  msgs[text] = M.toObject(await m.getQuotedObj());
  m.reply(`*❐┃تمت اضافة الرسالة الى الخزنة بنجاح┃🙂‍↕❯*
*▢* لاستدعاء الرسالة المخزنة قم بكتابة استدعاء مع كلمة المرور

*⟐ مثال :*
.استدعاء <كلمة مرور>`);
};
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map((v) => 'add' + v + ' <text>');
handler.tags = ['database'];
handler.command = /^تخزين$/;
handler.rowner = true;
export default handler;
