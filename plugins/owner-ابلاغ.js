const handler = async (m, {conn, text, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.owner_reporte

  if (!text) throw `*❐┃استخدام الامر غير صحيح┃❗❯*
اكتب المشكلة التي تواجهها او بلاغك 

*⟐ مثال :*
.بلاغ < اكتب المشكلة >`;
  if (text.length < 10) throw tradutor.texto2;
  if (text.length > 1000) throw tradutor.texto3;
  const teks = `${tradutor.texto4[0]} wa.me/${m.sender.split`@`[0]}\n${tradutor.texto4[1]} ${text}\n*┴*`;
  conn.reply('96551048712@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender]}});
  conn.reply('@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender]}});
  m.reply(tradutor.texto5);
};
handler.help = ['reporte', 'request'].map((v) => v + ' <teks>');
handler.tags = ['info'];
handler.command = /^(report|ابلاغ|شكوى|مشكله|bug|report-owner|reportes)$/i;
export default handler;
