let handler = async (m, { conn, participants }) => {
    const chatId = m.chat;
    const pp = await conn.profilePictureUrl(chatId, 'image').catch(_ => null) || './Menu.jpg';

    const getMessageCount = async (chatId, participantId) => {

        return await conn.getMessageCount(chatId, participantId);
    };

    const countMessagesPerUser = async (participants) => {
        let userMessages = {};
        for (let participant of participants) {
            const user = participant.id.split('@')[0];
            const count = await getMessageCount(chatId, participant.id);
            userMessages[user] = count || 0;
        }
        return userMessages;
    };

    const getTopUsers = (userMessages) => {
        return Object.entries(userMessages)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5);
    };

    const formatTopUsersText = (topUsers) => {
        let text = `*━「* أعلى 5 متفاعلين *」━*\n\n`;
        topUsers.forEach(([user, count], index) => {
            text += `${index + 1}. @${user} - ${count} رسائل\n`;
        });
        return text;
    };

    const userMessages = await countMessagesPerUser(participants);

    const topUsers = getTopUsers(userMessages);

    const text = formatTopUsersText(topUsers);

    conn.sendFile(chatId, pp, 'Menu.jpg', text, m, false, { mentions: topUsers.map(([user]) => `${user}@s.whatsapp.net`) });
};

handler.help = ['top5'];
handler.tags = ['group'];
handler.command = /^(تفاعلل|top5)$/i;
handler.admin = true;
handler.group = true;

export default handler;
