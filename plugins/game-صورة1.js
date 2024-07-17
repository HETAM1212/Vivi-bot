let timeout = 60000
let poin = 1000
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.vivianime = conn.vivianime ? conn.vivianime : {}
    let id = m.chat
    if (id in conn.vivianime) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة على السؤال بعد┃❌ ❯', conn.vivianime[id][0])
        throw false
    }
    let src = await (await fetch('https://gist.githubusercontent.com/Brook-88/4d9f832ef47e56aeb470b257dcec4a6a/raw/f3dcd83ee52f9a1e32560f5d68bed95a6047fd8a/%25D8%25B5%25D9%2588%25D8%25B1_%25D8%25A7%25D9%2586%25D9%2585%25D9%258A')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `╮─┈〈 *تخمين الشخصية👤*〉┈─⟐
*▢❯* الوقت : *${(timeout / 1000).toFixed(2)}* ثانيه
*▢❯* اكتب : *"استسلم"* للانسحاب
*▢❯* الجائزة : *${poin}* EXP
*▢❯* الرد على هذه الرسالة مع الاجابة!
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()
    conn.vivianime[id] = [
        await conn.sendFile(m.chat, json.img, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.vivianime[id]) conn.reply(m.chat, `❮ ⌛┇انتهى الوقت┇⌛❯\n\n❐┇الاجـابـة✅↞ ${json.name}┇`, conn.vivianime[id][0])
            delete conn.vivianime[id]
        }, timeout)
    ]
}
handler.help = ['guessflag']
handler.tags = ['game']
handler.command = /^صورة/i

export default handler
