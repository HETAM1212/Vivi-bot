
const handler = async (m, {conn, text, isROwner, isOwner}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.gc_setbye

  if (text) {
    global.db.data.chats[m.chat].sBye = text;
    m.reply(tradutor.texto1);
  } else throw `*❐┃استخدام غير صحيح┃❗❯*
*▢* لتعديل المغادرة يجب عليك كتابة ما يلي:

*⟐ مثال :*
*.تعديل-ترحيب < @user > للمنشن*
*.تعديل-ترحيب < @group > اسم الجروب*
*.تعديل-ترحيب < @desc > وصف الجروب*

* *اسـتـخـدام الامـر :*
.تعديل-مغادرة مع السلامة @user`;
};
handler.help = ['setbye <text>'];
handler.tags = ['group'];
handler.command = ['تعديل-مغادرة'];
handler.admin = true;
export default handler;
