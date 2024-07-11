
const handler = async (m, {text, conn, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.owner_block_unblock

  const why = `❐┃منشن الي تبي تبلكه┃⛓️❯

*⟐ مثال :*
${usedPrefix + command} @${m.sender.split('@')[0]}`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  if (!who) conn.reply(m.chat, why, m, {mentions: [m.sender]});
  const res = [];
  switch (command) {
    case 'blok': case 'block':
      if (who) {
        await conn.updateBlockStatus(who, 'بلوك').then(() => {
          res.push(who);
        });
      } else conn.reply(m.chat, why, m, {mentions: [m.sender]});
      break;
    case 'unblok': case 'unblock':
      if (who) {
        await conn.updateBlockStatus(who, 'فك-بلوك').then(() => {
          res.push(who);
        });
      } else conn.reply(m.chat, why, m, {mentions: [m.sender]});
      break;
  }
  if (res[0]) conn.reply(m.chat, `❐┃اذا تبي تفك الباند┃⛓‍💥❯

*⟐ مثال :*
  ${command} ${res ? `${res.map((v) => '@' + v.split('@')[0])}` : ''}`, m, {mentions: res});
};
handler.command = /^(بلوك|فك-بلوك)$/i;
handler.rowner = true;
export default handler;
