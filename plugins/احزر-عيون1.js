let timeout = 60000
let poin = 1000
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (id in conn.tebakbendera) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة على السؤال بعد┃❌❯', conn.tebakbendera[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/Brook-88/Game/main/game-eyes.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `╮─┈〈 *تخمين الشخصية👤*〉┈─⟐
${command.toUpperCase()}
*▢❯* الوقت : *${(timeout / 1000).toFixed(2)}* ثانيه
*▢❯* اكتب : *"استسلم"* للانسحاب
*▢❯* الجائزة : *${poin}* EXP
*▢❯* الرد على هذه الرسالة مع الاجابة!
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()
    conn.tebakbendera[id] = [
        await conn.sendFile(m.chat, json.img, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera[id]) conn.reply(m.chat, `❮ ⌛┇انتهى الوقت┇⌛❯\n\n❐┇الاجـابـة✅↞ ${json.name}`, conn.tebakbendera[id][0])
            delete conn.tebakbendera[id]
        }, timeout)
    ]
}
handler.help = ['عين']
handler.tags = ['fun']
handler.command = /^عيون/i

export default handler
