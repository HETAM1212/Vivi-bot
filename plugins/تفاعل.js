const getMessageCount = async (conn, chatId, participantId) => {
    // جلب جميع الرسائل من المحادثة
    let messages = await conn.loadAllMessages(chatId);

    // حساب عدد الرسائل المرسلة من قبل المشارك المحدد
    let count = messages.filter(msg => msg.key.remoteJid === participantId).length;

    return count;
};

let handler = async (m, { conn, participants }) => {
    const chatId = m.chat;
    const pp = await conn.profilePictureUrl(chatId, 'image').catch(_ => null) || './Menu.jpg';

    // جمع بيانات المشاركين وحساب عدد الرسائل لكل مشارك
    let userMessages = {};

    // استخدام groupMetadata لجلب بيانات المجموعة
    const metadata = await conn.groupMetadata(chatId);

    // فرضية: استخدام metadata.participants للحصول على المشاركين
    const groupParticipants = metadata.participants;

    for (let participant of groupParticipants) {
        const user = participant.id.split('@')[0];
        const count = await getMessageCount(conn, chatId, participant.id);
        userMessages[user] = count || 0;
    }

    // ترتيب المشاركين بناءً على عدد الرسائل
    let topUsers = Object.entries(userMessages).sort(([, a], [, b]) => b - a).slice(0, 5);

    // صياغة النص النهائي
    let text = `*━「* أعلى 5 متفاعلين *」━*\n\n`;
    topUsers.forEach(([user, count], index) => {
        text += `${index + 1}. @${user} - ${count} رسائل\n`;
    });

    // إرسال الرسالة مع صورة المجموعة
    conn.sendFile(chatId, pp, 'Menu.jpg', text, m, false, { mentions: topUsers.map(([user]) => `${user}@s.whatsapp.net`) });
};

handler.help = ['top5'];
handler.tags = ['group'];
handler.command = /^(تفاعلل|top5)$/i;
handler.admin = true;
handler.group = true;

export default handler;
