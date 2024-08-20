let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
await conn.reply(id, '*❐┃اهاا، ماشي يصير خير يا ناكر المعروف┃🤌❯*') 
await conn.groupLeave(id)}
handler.command = /^(اخرج|اطلع|غادر|خروج|برا)$/i
handler.group = true
handler.rowner = true
export default handler
