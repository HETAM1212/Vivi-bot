import fs from 'fs';

const handler = async (m, {conn, args}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.gc_link

  const group = m.chat;
  conn.reply(m.chat, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group), m, {
    contextInfo: {externalAdReply: {mediaUrl: null, mediaType: 1, description: null
    };
handler.help = ['linkgroup'];
handler.tags = ['group'];
handler.command = /^(لينك)?$/i;
handler.group = true;
handler.botAdmin = true;
export default handler;
