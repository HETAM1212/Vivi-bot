import similarity from 'similarity';


const threshold = 0.72;
const handler = {
  
  async before(m) {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.game__cancion


    const id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/./i.test(m.quoted.text)) return !0;
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {};
    if (!(id in this.tebaklagu)) return m.reply(tradutor.texto1);
    if (m.quoted.id == this.tebaklagu[id][0].id) {
      const json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]));
      if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += this.tebaklagu[id][2];
        m.reply(`*❐┃اجـابـة صـحـيـحـة┃✅ ❯*

*❐┇الـجـائـزة💰↞${this.tebaklagu[id][2]} EXP*`);
        clearTimeout(this.tebaklagu[id][3]);
        delete this.tebaklagu[id];
      } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*❐┃قـريـب جـدااا┃🫣❯*`);
      else m.reply('*❐┃اجـابـة خـاطـئـة┃❌❯*');
    }
    return !0;
  },
  exp: 0,
};
export default handler;
