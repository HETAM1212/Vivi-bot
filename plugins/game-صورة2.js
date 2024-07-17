import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/.استسلم|مدري/i.test(m.quoted.text) || /.hhint/i.test(m.text))
        return !0
    this.vivianime = this.vivianime ? this.vivianime : {}
    if (m.quoted.id == this.vivianime[id][0].id) {
        let isSurrender = /^(استسلم|مدري)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.vivianime[id][3])
            delete this.vivianime[id]
            return this.reply(m.chat, '*❐┃طلع فاشل واستسلم┃🤭❯*', m)
        }
        let json = JSON.parse(JSON.stringify(this.vivianime[id][1]))

        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.vivianime[id][2]
            this.reply(m.chat, `*❐┃اجـابـة صـحـيـحـة┃✅ ❯*\n\n*❐┇الـجـائـزة💰↞${this.vivianime[id][2]} EXP*`, m)
            clearTimeout(this.vivianime[id][3])
            delete this.vivianime[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold)
            m.reply(`*❐┃قـريـب جـدااا┃🫣❯*`)
        else
            this.reply(m.chat, `❐┃اجـابـة خـاطـئـة┃❌ ❯`, m)
    }
    return !0
}
export const exp = 0
