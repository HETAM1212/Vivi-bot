let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `[✳️] 
المستخدم مفقود من قاعدة البيانات الخاصة بي`
    conn.reply(m.chat, `
*ꕤ─────⍆「🏦」⍅─────ꕤ*
    ▢ *👤 الاسم* : @${who.split('@')[0]}
    ▢ *💎 عدد الألماس* : ${user.diamond}
    ▢ *⬆️ نقاط الخبره* : XP ${user.exp} 
   *◄──────⍆⌘⍅──────►*
    *▣ ملحوظة :* 
    ◄ يمكنك شراء 💎 الماس باستخدام الطلبات :
    ❏ *${usedPrefix}buy <الكمية>*
    ❏ *${usedPrefix}buyall*
*ꕤ─────⍆「🏦」⍅─────ꕤ*`, m, { mentions: [who] })
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['بنك', 'دايموند', 'البنك', 'الماس'] 

export default handler
