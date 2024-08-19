import mongoose from 'mongoose';

const uri = 'mongodb+srv://itachi3mk:mypassis1199@cluster0.zzyxjo3.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch(error => console.error('Error connecting to MongoDB:', error));

const bk9Schema = new mongoose.Schema({
    groupId: String,
    userId: String,
    bk9: String
});

const BK9 = mongoose.model('BK9', bk9Schema);

let handler = async function (message, { conn, text, command, isAdmin }) {
    try {
        if (command === 'الالقاب') {
            if (!message.isGroup) {
                message.reply('*❐┃الامر ذا خاص بالجروب بس┃👀❯*');
                return;
            }
            if (!isAdmin) {
                message.reply('*❐┃الامر للمشرفين فقط┃🍋‍🟩❯*');
                return;
            }
            const nicknames = await BK9.find({ groupId: message.chat });
            if (nicknames.length === 0) {
                message.reply('*❐┃لا يـوجـد ألـقـاب مـسـجـلـة حـالـيـا┃❗❯*');
            } else {
                let replyText = '';
                nicknames.forEach((nickname, index) => {
                    replyText += (index + 1 ) + '-' + ' اللقب : ' +'*『' + nickname.bk9 + '』*' + '\n' + '*❮┃ _Vivi Bot MD - 3.0_ ┃❯*';
                });
                message.reply('*❐┇الألقـاب المـسـجـلـة :*\n\n' + replyText);
            }
        } else if (command === 'سجل') {
            if (!message.isGroup) {
                message.reply('*❐┃الامر ذا خاص بالجروب بس┃👀❯*');
                return;
            }
            if (!isAdmin) {
                message.reply('*❐┃الامر للمشرفين فقط┃🍋‍🟩❯*');
                return;
            }
            if (!message.mentionedJid || !text || text.trim() === '') {
                message.reply('*❐ ┃ صيغة غير صالحة ┃❗❯*\n\n*◉ استخدام الامر :*\n*.سجل + «المنشن» + «اللقب»*\n\n*◉ مثال :*\n*.سجل @user بروك*');
                return;
            }
            const userId = message.mentionedJid[0].replace('@s.whatsapp.net', '');
            const nickname = text.trim().split(' ').slice(1).filter(part => part.trim() !== '').join(' ');
            if (!/\S/.test(nickname)) {
                message.reply('*⟐ مثال:*\n *.سجل @user بروك*');
                return;
            }
            const existingNickname = await BK9.findOne({ bk9: nickname, groupId: message.chat });
            if (existingNickname) {
                const userName = await conn.getName(existingNickname.userId + '@s.whatsapp.net');
                message.reply('*❮❗❯ اللقب مأخوذ*'  + '\n' + '⟐ صاحب لقب :' + '*' + nickname + '*' + '\n' +' ⟐ هو : '+ '*' + userName + '*');
            } else {
                await BK9.findOneAndUpdate({ userId, groupId: message.chat }, { bk9: nickname }, { upsert: true });
                message.reply('❮✔️❯ تم تسجيله بلقب '+ '*『' + nickname + '』*'+ ' بنجاح');
            }
        } else if (command === 'حذف_لقب') {
            if (!message.isGroup) {
                message.reply('*❐┃الامر ذا خاص بالجروب بس┃👀❯*');
                return;
            }
            if (!isAdmin) {
                message.reply('*❐┃الامر للمشرفين فقط┃🍋‍🟩❯*');
                return;
            }
            if (!text || text.trim() === '') {
                message.reply('*❐┃اكتب اللقب الذي تريد حذفه┃❗❯*');
                return;
            }
            const nickname = text.trim();
            const result = await BK9.deleteOne({ bk9: nickname, groupId: message.chat });
            result.deletedCount > 0 ? message.reply('❮✔️❯ تم حذف اللقب ' + '*『' + nickname + '』*' + ' بنجاح') : message.reply('❮❗❯ اللّقب ' + '*『' + nickname + '』*'+ ' غير مسجل لاحد اساسا');
        } else if (command === 'لقبي') {
            try {
                const userId = message.sender.split('@')[0];
                const userNickname = await BK9.findOne({ userId, groupId: message.chat });
                userNickname && userNickname.bk9 ? message.reply('*✦ لقبك هو :* ' + userNickname.bk9) : message.reply('*✦ لم يتم تسجيلك بعد*');
            } catch (error) {
                console.error('Error fetching user\'s nickname:', error);
                message.reply('❮❗❯ حدث خطأ أثناء جلب لقبك');
            }
        } else if (command === 'لقبه' && message.mentionedJid) {
            if (!message.mentionedJid || message.mentionedJid.length === 0) {
                message.reply('*❐┃منشن حدا مشان اشوفلك لقبه┃🤨❯*');
                return;
            }
            const userId = message.mentionedJid[0].replace('@s.whatsapp.net', '');
            const userNickname = await BK9.findOne({ userId, groupId: message.chat });
            if (userNickname) {
                const userName = await conn.getName(userId + '@s.whatsapp.net');
                message.reply('*✦ لقبه هو :* ' + userNickname.bk9);
            } else {
                message.reply('*✦ لم يتم تسجيله بعد*');
            }
        } else if (command === 'اللقب') {
            if (!text || text.trim() === '') {
                message.reply('*❐┃اكتب اللقب للتحقق من اذا كان متوفر او مأخوذ┃🏄❯*');
                return;
            }
            const nickname = text.trim();
            const userNickname = await BK9.findOne({ bk9: nickname, groupId: message.chat });
            if (userNickname) {
                const userName = await conn.getName(userNickname.userId.split('@')[0] + '@s.whatsapp.net');
                message.reply('❮❗❯ اللقب : ' + '*『' + nickname + '』*' + '\n' + ' ✦ ماخوذ من طرف @' + userName);
            } else {
                message.reply('✦ اللقب ' + '*『' + nickname + '』*'+ ' متوفر');
            }
        }
    } catch (error) {
        console.error('❮❗❯ حدث خطأ : ', error);
    }
};

handler.command = ['الالقاب', 'سجل', 'لقبي', 'لقبه', 'حذف_لقب', 'اللقب'];
handler.tags = ['BK9'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
