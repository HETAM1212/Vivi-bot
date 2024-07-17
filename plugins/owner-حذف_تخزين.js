

const handler = async (m, {command, usedPrefix, text}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.owner_delmsg

  const which = command.replace(/eliminar/i, '');
  if (!text) throw `*❐┃استخدام غير صحيح┃❗❯*
*▢* لحذف احد الرسائل المخزنة استخدم الامر يليه كلمة المرور.
*▢* اذا لا تتذكر كلمات المرور استخدم امر *قائمة-التخزين*

*⟐ مثال :*
‏.delmsg <كلمة المرور>`;
  const msgs = global.db.data.msgs;
  if (!text in msgs) throw `${tradutor.texto2[0]} '${text}' ${tradutor.texto2[1]}`;
  delete msgs[text];
  m.reply(`*❐┃لقد تم الحذف بنجاح┃✅❯*

*⟐ تم حذف جميع الرسائل التي باسم '${text}'*`);
};
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'sticker'].map((v) => 'del' + v + ' <text>');
handler.tags = ['database'];
handler.command = /^delmsg$/;
handler.rowner = true;
export default handler;
