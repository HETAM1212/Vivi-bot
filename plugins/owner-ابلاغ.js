let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*❐┃استخدام الامر غير صحيح┃❗❯*
اكتب المشكلة التي تواجهها او بلاغك 

*⟐ مثال :*
${usedPrefix + command} < اكتب المشكلة >`
if (text.length < 3) throw `*❐┃البلاغ لا يقل عن ثلاث احرف┃❗❯*`
if (text.length > 1000) throw `*❐┃البلاغ لا يزيد عن الف حرف┃❗❯*`
let teks = `*❒═════[إبلاغ مهم]═════❒*

*▢ الرقم :* wa.me/${m.sender.split`@`[0]}

*▢البلاغ :* ${text}`
conn
//حط رقمق مكان رقمي
.reply('96551048712@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
conn.reply('@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
m.reply(`*❐┃تم إبلاغ المطور و إن شاء الله يكون ف خدمتك في أسرع وقت┃✅❯*`)
}
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.command = /^(report|بلاغ|بلغ|ابلاغ|bug|report-owner|reportes)$/i
export default handler
