import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/اكتب :.*مدري/i.test(m.quoted.text) || /.*hhint/i.test(m.text))
        return !0
    this.Alamvivi = this.Alamvivi ? this.Alamvivi : {}
    if (!(id in this.Alamvivi))
        return this.reply(m.chat, '*❐┃صح النوم ذا السؤال انتهى┃😪❯*', m)
    if (m.quoted.id == this.Alamvivi[id][0].id) {
        let isSurrender = /^(مدري|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.Alamvivi[id][3])
            delete this.Alamvivi[id]
            return this.reply(m.chat, '*❐┃معليك حتى انا مدري┃🤭❯*', m)
        }
        let json = JSON.parse(JSON.stringify(this.Alamvivi[id][1]))
        
        if (m.text.toLowerCase() == json.name.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.Alamvivi[id][2]
            this.reply(m.chat, `*❐┃اجـابـة صـحـيـحـة┃✅ ❯*\n\n*❐┇الـجـائـزة💰↞${this.vivianime[id][2]} EXP*`, m)
            clearTimeout(this.Alamvivi[id][3])
            delete this.Alamvivi[id]
        } else if (similarity(m.text.toLowerCase(), json.name.toLowerCase().trim()) >= threshold)
            m.reply(`*❐┃قـريـب جـدااا┃🫣❯*`)
        else
            this.reply(m.chat, `❐┃اجـابـة خـاطـئـة┃❌ ❯`, m)
    }
    return !0
}
export const exp = 0
