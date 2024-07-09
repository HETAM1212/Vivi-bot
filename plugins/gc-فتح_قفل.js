const handler = async (m, {conn, args, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.gc_config

  const isClose = { // Switch Case Like :v
    'فتح': 'not_announcement',
    'قفل': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement',
    'abrir': 'not_announcement',
    'cerrar': 'announcement',
  }[(args[0] || '')];
  if (isClose === undefined) {
    throw `*[❗] تنسيق خاطئ!!*
╮═━─━═⬣ *مثال* ⬣═━─━═╭
⸙↜ .جروب فتح
⸙↜ .جروب قفل
╯═━──━═⬣❈⬣═━──━═╰`.trim();
  }
  await conn.groupSettingUpdate(m.chat, isClose);
  {m.reply(`*❐┃ تم تنفيذ العملية بنجاح ┃✅ ❯*`);}
};
handler.help = ['group open / close', 'grupo abrir / cerrar'];
handler.tags = ['group'];
handler.command = /^(جروب)$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;
