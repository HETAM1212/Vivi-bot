import fetch from 'node-fetch';

let points = 50;
let maxPlayers = 10;
let maxQuestions = 30;
let questionTimeout = 10 * 1000; 

let handler = async (m, { conn, command }) => {
    let id = m.chat;
    conn.itachixvi = conn.itachixvi ? conn.itachixvi : {};

    if (command === "مسابقة-صور") {
        if (id in conn.itachixvi) {
            conn.reply(m.chat, '*❐┃المسابقة سارية يمكنك المشاركة┃❕❯*', conn.itachixvi[id][0]);
            throw false;
        }

        conn.itachixvi[id] = [
            await conn.reply(m.chat, `╮───〈 *مـسـابـقـه صور 🎡* 〉───⟐
│ ╮┈┈┈┈┈┈⊷
┴ *▢❯*  جاوب علي السوال قبل اي احد.
    *▢❯*  تبدأ المسابقة عند تسجيل اربع 
           اعضاء في المسابقة.
    *▢❯*  السوال الواحد بـ 50 نقطه.
    ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
    ╮┈┈┈┈┈┈⊷
    *▢❯* للانضمام للمسابقة: *.انضم-صور* 
┬ *▢❯*  لحذف المسابقة : *.حذف-صور*
│ ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
╯──────────────────⟐`, m), [], [], 0, 0, null
        ];

        conn.reply(m.chat, `*❐┃المسابقة تم تفعيلها┃🎡❯*
 *▢* استخدم الامر : *.انضم-صور*`, m);
        throw false;
      //زرار الانضمام
    } else if (command === "انضم-صور") {
        if (!(id in conn.itachixvi)) {
            conn.reply(m.chat, '*❐┃المعذره لايوجد مسابقة حالياً┃❗❯*', m);
            throw false;
        }

        if (conn.itachixvi[id][2].length >= maxPlayers) {
            conn.reply(m.chat, '*❐┃المعذره العدد مكتمل┃❗❯*', m);
            throw false;
        }

        if (conn.itachixvi[id][2].findIndex(player => player.id === m.sender) !== -1) {
            conn.reply(m.chat, '*❐┃لقد قمت بلتسجيل مسبقاً┃❗❯*', m);
            throw false;
        }

        conn.itachixvi[id][2].push({ id: m.sender, points: 0, correctAnswers: 0 });
        conn.reply(m.chat, `*❐┃تـم الـتـسـجـيـل بـنـجـاح┃✅❯*\n ▢ تـبـقـى للـانـضـمـام : ${maxPlayers - conn.itachixvi[id][2].length}`, m);
//وقفنا هنا تمام
        if (conn.itachixvi[id][2].length >= 4) {
            let itachixvi = await (await fetch(`https://raw.githubusercontent.com/Brook-88/Game/main/game-anime.json`)).json();
            let json = itachixvi[Math.floor(Math.random() * itachixvi.length)];
            conn.itachixvi[id][1] = json;
            let playersList = conn.itachixvi[id][2].map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
            let caption = `╮─┈〈 *مـسـابـقـه صـور 🎡* 〉┈─⟐
*▢❯ رقـم الـسـوال :* ${conn.itachixvi[id][4] + 1}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()
            conn.sendFile(m.chat, json.img, '', caption, m)
//لضبط الوقت
            conn.itachixvi[id][5] = setTimeout(() => {
                conn.reply(m.chat, `❐┃انـتـهـى الـوقـت┃⌛❯
╮┈─┈─┈┈⊷
*▢❯* الإجابة هي : *${json.name}*
╯┈┈─┈──┈┈┈─┈─⩺`, conn.itachixvi[id][0]);
                clearTimeout(conn.itachixvi[id][5]);
                conn.itachixvi[id][5] = null;

                setTimeout(async () => {
                    let newJson = itachixvi[Math.floor(Math.random() * itachixvi.length)];
                    conn.itachixvi[id][1] = newJson;
                    conn.itachixvi[id][3]++;
                    conn.itachixvi[id][4]++;

                    let newCaption = `╮─┈〈 *مـسـابـقـه صـور 🎡* 〉┈─⟐
*▢❯ رقـم الـسـوال :* ${conn.itachixvi[id][4] + 1}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()
                    conn.sendFile(m.chat, newJson.img, '', newCaption, m)
                }, 1000); 
            }, questionTimeout);
        }//شرط الحذق
    } else if (command === "حذف-صور") {
        if (!conn.itachixvi[id]) {
            conn.reply(m.chat, '*❐┃لا توجد مسابقة سارية اساسا┃🗿❯*', m);
        } else {
            clearTimeout(conn.itachixvi[id][5]); 
            delete conn.itachixvi[id];
            conn.reply(m.chat, '*❐┃تم الغاء المسابقة بنجاح┃✅❯*', m);
        }
    }
};

handler.before = async function (m, { conn }) {
    let id = m.chat;
    this.itachixvi = this.itachixvi ? this.itachixvi : {};

    if (!(id in this.itachixvi)) return;

    let json = this.itachixvi[id][1];
    let players = this.itachixvi[id][2];
    let questionCount = this.itachixvi[id][3];

    if (json && json.name && m.text.toLowerCase() === json.name.toLowerCase()) {
        clearTimeout(this.itachixvi[id][5]); // Clear timeout
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
            delete this.itachixvi[id];
        } else {
            let itachixvi = await (await fetch(`https://raw.githubusercontent.com/Brook-88/Game/main/game-anime.json`)).json();
            json = itachixvi[Math.floor(Math.random() * itachixvi.length)];
            this.itachixvi[id][1] = json;
            this.itachixvi[id][3] = questionCount;
            this.itachixvi[id][4]++;
            let playersList = players.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة, ${player.correctAnswers} إجابات صحيحة]`).join('\n');
            let caption = `╮─┈〈 *مـسـابـقـه صـور 🎡* 〉┈─⟐
*▢❯ رقـم الـسـوال :* ${conn.itachixvi[id][4] + 1}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()
            this.sendFile(m.chat, json.img, '', caption, m)

 
            this.itachixvi[id][5] = setTimeout(() => {
                this.reply(m.chat, `❐┃انـتـهـى الـوقـت┃⌛❯
╮┈─┈─┈┈⊷
*▢❯* الإجابة هي : *${json.name}*
╯┈┈─┈──┈┈┈─┈─⩺`, this.itachixvi[id][0]);
                clearTimeout(this.itachixvi[id][5]);
                this.itachixvi[id][5] = null;

                setTimeout(async () => {
                    let newJson = itachixvi[Math.floor(Math.random() * itachixvi.length)];
                    this.itachixvi[id][1] = newJson;
                    this.itachixvi[id][3]++;
                    this.itachixvi[id][4]++;
//تكرار الشروط مهمه
                    let newCaption = `╮─┈〈 *مـسـابـقـه صـور 🎡* 〉┈─⟐
*▢❯ رقـم الـسـوال :* ${conn.itachixvi[id][4] + 1}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`.trim()
                    this.sendFile(m.chat, newJson.img, '', newCaption, m)
                }, 1000); 
            }, questionTimeout);
        }
    }
};
handler.command = /^(مسابقة-صور|انضم-صور|حذف-صور)$/i;
handler.group = true;
export default handler;
