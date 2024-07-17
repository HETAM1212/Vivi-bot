import fetch from 'node-fetch';

let points = 50;
let maxPlayers = 10;
let maxQuestions = 30;
let questionTimeout = 10 * 1000; // 25 ثانيه لو عايز تغيرها براحتك

let handler = async (m, { conn, command }) => {
    let id = m.chat;
    conn.venom3mk = conn.venom3mk ? conn.venom3mk : {};

    if (command === "مسابقة-عيون") {
        if (id in conn.venom3mk) {
            conn.reply(m.chat, '*❐┃المسابقة سارية يمكنك المشاركة┃❕❯*', conn.venom3mk[id][0]);
            throw false;
        }

        conn.venom3mk[id] = [
            await conn.reply(m.chat, `╮───〈 *مـسـابـقـه عيون🎡* 〉───⟐
│ ╮┈┈┈┈┈┈⊷
┴ *▢❯*  جاوب علي السوال قبل اي احد.
    *▢❯*  تبدأ المسابقة عند تسجيل اربع 
           اعضاء في المسابقة.
    *▢❯*  السوال الواحد بـ 50 نقطه.
    ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
    ╮┈┈┈┈┈┈⊷
    *▢❯* للانضمام للمسابقة: *.انضم-عيون* 
┬ *▢❯*  لحذف المسابقة : *.حذف-عيون*
│ ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
╯──────────────────⟐`, m), [], [], 0, 0, null
        ];

        conn.reply(m.chat, `*❐┃المسابقة تم تفعيلها┃🎡❯*
 *▢* استخدم الامر : *.انضم-عيون*`, m);
        throw false;
    } else if (command === "انضم-عيون") {
        if (!(id in conn.venom3mk)) {
            conn.reply(m.chat, '*❐┃المعذره لايوجد مسابقة حالياً┃❗❯*', m);
            throw false;
        }

        if (conn.venom3mk[id][2].length >= maxPlayers) {
            conn.reply(m.chat, '*❐┃اكـتـمـل الـعـدد المطلوب┃✅❯*', m);
            throw false;
        }

        if (conn.venom3mk[id][2].findIndex(player => player.id === m.sender) !== -1) {
            conn.reply(m.chat, '*❐┃المعذره العدد مكتمل┃❗❯*', m);
            throw false;
        }

        conn.venom3mk[id][2].push({ id: m.sender, points: 0, correctAnswers: 0 });
        conn.reply(m.chat, `*❐┃تـم الـتـسـجـيـل بـنـجـاح┃✅❯*\n ▢ تـبـقـى للـانـضـمـام : ${maxPlayers - conn.venom3mk[id][2].length}`, m);

        if (conn.venom3mk[id][2].length >= 4) {
            let venom3mk = await (await fetch(`https://raw.githubusercontent.com/Brook-88/Game/main/game-eyes.json`)).json();
            let json = venom3mk[Math.floor(Math.random() * venom3mk.length)];
            conn.venom3mk[id][1] = json;
            let playersList = conn.venom3mk[id][2].map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
            let caption = `╮─┈〈 *مـسـابـقـه عيون 🎡* 〉┈─⟐
*▢❯ رقـم الـسـوال :* ${conn.venom3mk[id][4] + 1}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()//\n\n${playersList}
            conn.sendFile(m.chat, json.img, '', caption, m)

            conn.venom3mk[id][5] = setTimeout(() => {
                conn.reply(m.chat, `❐┃انـتـهـى الـوقـت┃⌛❯
╮┈─┈─┈┈⊷
*▢❯* الإجابة هي : *${json.name}*
╯┈┈─┈──┈┈┈─┈─⩺`, conn.venom3mk[id][0]);
                clearTimeout(conn.venom3mk[id][5]);
                conn.venom3mk[id][5] = null;

                setTimeout(async () => {
                    let newJson = venom3mk[Math.floor(Math.random() * venom3mk.length)];
                    conn.venom3mk[id][1] = newJson;
                    conn.venom3mk[id][3]++;
                    conn.venom3mk[id][4]++;

                    let newCaption = `╮─┈〈 *مـسـابـقـه عيون 🎡* 〉┈─⟐
*▢❯ رقـم الـسـوال :* ${conn.venom3mk[id][4] + 1}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()//\n\n${playersList}
                    conn.sendFile(m.chat, newJson.img, '', newCaption, m)
                }, 1000); // Delay sending new question for better visualization
            }, questionTimeout);
        }
    } else if (command === "حذف-عيون") {
        if (!conn.venom3mk[id]) {
            conn.reply(m.chat, '*❐┃لا توجد مسابقة سارية اساسا┃🗿❯*', m);
        } else {
            clearTimeout(conn.venom3mk[id][5]); // Clear timeout if any
            delete conn.venom3mk[id];
            conn.reply(m.chat, '*❐┃تم الغاء المسابقة بنجاح┃✅❯*', m);
        }
    }
};

handler.before = async function (m, { conn }) {
    let id = m.chat;
    this.venom3mk = this.venom3mk ? this.venom3mk : {};

    if (!(id in this.venom3mk)) return;

    let json = this.venom3mk[id][1];
    let players = this.venom3mk[id][2];
    let questionCount = this.venom3mk[id][3];

    if (json && json.name && m.text.toLowerCase() === json.name.toLowerCase()) {
        clearTimeout(this.venom3mk[id][5]); // Clear timeout
        let playerIndex = players.findIndex(player => player.id === m.sender);
        players[playerIndex].points += points;
        players[playerIndex].correctAnswers++;
        questionCount++;

        if (questionCount >= maxQuestions) {
            let sortedPlayers = players.sort((a, b) => b.points - a.points);
            let playersList = sortedPlayers.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} ❪${player.points} نقطة, ${player.correctAnswers} من الإجابات الصحيحة❫`).join('\n');
            this.reply(m.chat, `╮─┈〈 *انتهت المـسـابـقـه 🎡* 〉┈┈⟐
*▢❯* *الـيـك قـائـمـة الـمـتصـدريـن🔝:*
${playersList}
╯┈──┈┈─┈┈┈┈──┈┈──┈⟐`, m, { mentions: conn.parseMention(playersList) });
            delete this.venom3mk[id];
        } else {
            let venom3mk = await (await fetch(`https://raw.githubusercontent.com/Brook-88/Game/main/game-eyes.json`)).json();
            json = venom3mk[Math.floor(Math.random() * venom3mk.length)];
            this.venom3mk[id][1] = json;
            this.venom3mk[id][3] = questionCount;
            this.venom3mk[id][4]++;
            let playersList = players.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة, ${player.correctAnswers} إجابات صحيحة]`).join('\n');
            let caption = `╮─┈〈 *مـسـابـقـه عيون 🎡* 〉┈─⟐
*▢❯ رقـم الـسـوال :* ${conn.venom3mk[id][4] + 1}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()//\n\n${playersList}
            this.sendFile(m.chat, json.img, '', caption, m)


            this.venom3mk[id][5] = setTimeout(() => {
                this.reply(m.chat, `❐┃انـتـهـى الـوقـت┃⌛❯
╮┈─┈─┈┈⊷
*▢❯* الإجابة هي : *${json.name}*
╯┈┈─┈──┈┈┈─┈─⩺`, this.venom3mk[id][0]);
                clearTimeout(this.venom3mk[id][5]);
                this.venom3mk[id][5] = null;

                setTimeout(async () => {
                    let newJson = venom3mk[Math.floor(Math.random() * venom3mk.length)];
                    this.venom3mk[id][1] = newJson;
                    this.venom3mk[id][3]++;
                    this.venom3mk[id][4]++;

                    let newCaption = `╮─┈〈 *مـسـابـقـه عيون 🎡* 〉┈─⟐
*▢❯ رقـم الـسـوال :* ${conn.venom3mk[id][4] + 1}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()//\n\n${playersList}
                    this.sendFile(m.chat, newJson.img, '', newCaption, m)
                }, 1000); // Delay sending new question for better visualization
            }, questionTimeout);
        }
    }
};
handler.command = /^(مسابقة-عيون|انضم-عيون|حذف-عيون)$/i;
handler.group = true;
export default handler;
