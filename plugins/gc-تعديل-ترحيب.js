

const handler = async (m, {conn, text, isROwner, isOwner}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.gc_setwelcome

  if (text) {
    global.db.data.chats[m.chat].sWelcome = text;
    m.reply(tradutor.texto1);
  } else throw `*❐┃استخدام غير صحيح┃❗❯*
*▢* لتعديل الترحيب يجب عليك كتابة ما يلي:

*⟐ مثال :*
*.تعديل-ترحيب < @user > للمنشن*
*.تعديل-ترحيب < @group > اسم الجروب*
*.تعديل-ترحيب < @desc > وصف الجروب*

* *اسـتـخـدام الامـر :*
.تعديل-ترحيب مرحبا بك @user`;
};
handler.help = ['setwelcome <text>'];
handler.tags = ['group'];
handler.command = ['تعديل-ترحيب'];
handler.admin = true;
export default handler;
