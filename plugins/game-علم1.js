import fetch from 'node-fetch'
let timeout = 30000
let poin = 2000
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.Alamvivi = conn.Alamvivi ? conn.Alamvivi : {}
    let id = m.chat
    if (id in conn.Alamvivi) {
        conn.reply(m.chat, '*❐╏لم يتم الاجابة علي السؤال بعد┃❌ ❯*', conn.Alamvivi[id][0])
        throw false
    }
    let src = await (await fetch('https://gist.githubusercontent.com/Kyutaka101/799d5646ceed992bf862026847473852/raw/dcbecff259b1d94615d7c48079ed1396ed42ef67/gistfile1.txt')).json()
  let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
╮─┈〈 *تـخـمـيـن الـعـلم 🏳️* 〉┈─⟐
*▢❯* الوقت : *${(timeout / 1000).toFixed(2)}* ثانيه
*▢❯* اكتب : .مدري للأنسحاب
*▢❯* الجائزة : *${poin}* EXP
*▢❯* الرد على هذه الرسالة مع الاجابة!
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐
    `.trim()
    conn.Alamvivi[id] = [
        await conn.sendFile(m.chat, json.img, '', caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.Alamvivi[id]) conn.reply(m.chat, `*❮ ⌛┇انتهي الوقت┇⌛❯*\n*❐↞┇الاجـابـة✅↞ ${json.name}┇*`, conn.Alamvivi[id][0])
            delete conn.Alamvivi[id]
        }, timeout)
    ]
}
handler.help = ['guessflag']
handler.tags = ['game']
handler.command = /^guessflag|علم/i

export default handler
