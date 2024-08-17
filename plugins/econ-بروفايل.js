import {createHash} from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, participants, isPrems}) => {
  let who = m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender);

  if (!(who in global.db.data.users)) {
    throw '✳️ المستخدم غير موجود في قاعدة البيانات';
  }

  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Menu2.jpg');
  let user = global.db.data.users[who];
  let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || '';
 let {name, limit, lastclaim, registered, regTime, age, premiumTime} = global.db.data.users[who];
  let username = conn.getName(who);
  let prem = global.prems.includes(who.split`@`[0]);
  let sn = createHash('md5').update(who).digest('hex');


  const str = `╮────〈 بـــروفـــايـــل 〉────⟐
│╮┈┈┈┈⊷
┴ *▢ الاسـم :* ${username} ${registered ? '(' + name + ') ': ''}
   ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
   ╮┈┈┈┈⊷
    *▢ الـلـقـب :* ${user.role}
   ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
   ╮┈┈┈┈⊷
    *▢ الـرقـم :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
   ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
   ╮┈┈┈┈⊷
    *▢ الـعـمـر :* ${registered ? age : ''}
   ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
   ╮┈┈┈┈⊷
    *▢ بـريـمـيـوم :* ${premiumTime > 0 ? 'مـمـيـز' : (isPrems ? 'مـمـيـز' : 'عـادي') || ''}
   ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
   ╮┈┈┈┈⊷
    *▢ الـتـسـجـيـل :* ${registered ? 'مـسـجـل': 'غير مـسـجـل'}
   ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
   ╮┈┈┈┈⊷
    *▢ الالـمـاس :* ${user.diamond}
   ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
   ╮┈┈┈┈⊷
    *▢ نـقـاط الـخـبـره :* ${user.exp}
   ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
   ╮┈┈┈┈⊷
┬ *▢ لـفـل :* ${user.level}
│╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
╯────────────────⟐`;

  conn.sendFile(m.chat, pp, 'profil.jpg', str, m, false, { mentions: [who] });
};
handler.help = ['profile [@user]'];
handler.tags = ['xp'];
handler.command = /^بروفايلي|بروفايل?$/i;
export default handler;
