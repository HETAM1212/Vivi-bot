let handler = async (m, { conn, participants, usedPrefix, command }) => {

    let kickte = `*❐┃منشن شخص لطرده او رد على رسالة┃❗❯*`
    let ownerJid = '96551048712@s.whatsapp.net' // استبدل owner_number برقم مطور البوت

    if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)}) 
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let botNumber = conn.user.jid

    if (user === botNumber) {
        return m.reply(`*❐┃وخر لا اكردك انت┃🍋‍🟩❯*`)
    }

    if (user === ownerJid) {
        return m.reply(`*❐┃اقول وخر عن مطوري لا اعصر الليمون بعيونك┃🍋‍🟩❯*`)
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
    m.reply(`*❐┃تم الطرد بنجاح┃✅❯*`) 
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = ['kick', 'طرد'] 
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
