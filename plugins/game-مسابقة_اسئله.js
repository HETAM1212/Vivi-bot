import fetch from 'node-fetch';

let points = 50;
let maxPlayers = 10;
let questionTimeout = 10 * 1000;

let handler = async (m, { conn, command, text }) => {
    let id = m.chat;
    conn.tekateki1 = conn.tekateki1 ? conn.tekateki1 : {};


    if (command === "مسابقة-اسئله") {
        if (id in conn.tekateki1) {
            return conn.reply(m.chat, '*❐┃المسابقة سارية يمكنك المشاركة┃❕❯*', conn.tekateki1[id][0]);
        } else if (!text) {
            return conn.reply(m.chat, '*❐┃ادخـل عـدد الاعـبـيـن┃❕❯*', m);
        } else if (isNaN(text)) {
            return conn.reply(m.chat, '*❐┃يرجى ادخال عدد الاعبين┃❕❯*', m);
        } else if (text > 10 || text < 5) {
            return conn.reply(m.chat, '*❐┃الحد الأقصى للاعبين عشرة , والحد الأدنى خمسة┃❗❯*', m);
        } else {
            maxPlayers = text;
        }
        conn.tekateki1[id] = [
            await conn.reply(m.chat, `╮───〈 *مـسـابـقـه اسئلة🎡* 〉───⟐
│ ╮┈┈┈┈┈┈⊷
┴ *▢❯* جاوب علي السوال قبل اي احد.
    *▢❯* السوال الواحد بـ 50 نقطه.
    *▢❯* طريقة المسابقة اول واحد         
    يجاوب يطرد شخص من اختياره
    ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
    ╮┈┈┈┈┈┈⊷
    *▢❯* للانضمام للمسابقة: *.انضم-اسئله* 
┬ *▢❯* لحذف المسابقة : *.حذف-اسئله*
│ ╯┈┈┈┈┈┈┈┈┈┈┈┈⩺
╯──────────────────⟐`, m), [], [], 0
        ];

        conn.reply(m.chat, `*❐┃المسابقة تم تفعيلها┃🎡❯*
▢ يمكن للاعبين *الـ${maxPlayers}* المشاركة
▢ من خلال كتابة : *.انضم-اسئله*`, m);
        throw false;
    } else if (command === "انضم-اسئله") {
        if (!(id in conn.tekateki1)) {
            throw conn.reply(m.chat, '*❐┃المعذره لايوجد مسابقة حالياً┃❗❯*', m);
        } 

        if (conn.tekateki1[id][2].length >= maxPlayers) {
            throw conn.reply(m.chat, '*❐┃المعذره العدد مكتمل┃❗❯*', m);;
        }

        if (conn.tekateki1[id][2].findIndex(player => player.id === m.sender) !== -1) {
            throw conn.reply(m.chat, '*❐┃لقد قمت بلتسجيل مسبقاً┃❗❯*', m);
        }

        conn.tekateki1[id][2].push({ id: m.sender, points: 0, correctAnswers: 0 });
        conn.reply(m.chat, `*❐┃تـم الـتـسـجـيـل بـنـجـاح┃✅❯*\n ▢ تـبـقـى للـانـضـمـام : ${maxPlayers - conn.tekateki1[id][2].length}`, m);

        if (conn.tekateki1[id][2].length >= maxPlayers) {
            let tekateki1 = await (await fetch(`https://raw.githubusercontent.com/Brook-88/Game/main/game-ask.json`)).json();
            let json = tekateki1[Math.floor(Math.random() * tekateki1.length)];
            conn.tekateki1[id][1] = json;
            let playersList = conn.tekateki1[id][2].map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
            let question = `╮─┈〈 *مـسـابـقـه اسئلة 🎡* 〉┈─⟐
*▢❯ الـسـوال :* ${json.question}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`;//\n\n${playersList}
            conn.reply(m.chat, question, m);
        }
    } else if (command === "حذف-اسئله") {
        if (!conn.tekateki1[id]) {
            conn.reply(m.chat, '*❐┃لا توجد مسابقة سارية اساسا┃🗿❯*', m);
        } else {
            delete conn.tekateki1[id];
            conn.reply(m.chat, '*❐┃تم الغاء المسابقة بنجاح┃✅❯*', m);
        }
    }
};

handler.before = async function (m, { conn }) {
  let id = m.chat;
  this.tekateki1 = this.tekateki1 ? this.tekateki1 : {};

  if (!(id in this.tekateki1)) return;

  let json = this.tekateki1[id][1];
  let players = this.tekateki1[id][2];
  let questionCount = this.tekateki1[id][3];

  if (json && json.response && m.text.toLowerCase() === json.response.toLowerCase()) {
      let playerIndex = players.findIndex(player => player.id === m.sender);
      players[playerIndex].points += points;
      questionCount++;

      if (players.length === 2) {
          let winner = players[playerIndex];
          this.reply(m.chat, `❐┃الـمـسـابـقـة انـتـهـت┃🎡❯
╮┈─┈─┈┈⊷
*▢❯* الفائز هو : @${winner.id.split('@')[0]}
*▢❯* بفارق نقاط : ${winner.points}
╯┈┈─┈──┈┈┈─┈─⩺`, m, { mentions: [winner.id] });
          delete this.tekateki1[id];
      } else {
          // إرسال قائمة باللاعبين المتبقين
          let playersList = players.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
          this.reply(m.chat, `*❐┃@${m.sender.split('@')[0]} اجاب بشكل صحيح┃✔️❯*
*▢* يمكنك الان اختيار لاعب لاستبعاده.
*▢* عن طريق كتابة *:* *#* متبوعا برقم ترتيب الاعب.

*⟐ الاعبين المتبقين :*
${playersList}`, m, { mentions: conn.parseMention(playersList) });
      }
  } else if (m.text.startsWith("#") && players.length > 2) {
      let playerIndex = parseInt(m.text.replace("#", "")) - 1;
      if (playerIndex < players.length && playerIndex !== players.findIndex(player => player.id === m.sender)) {
          players.splice(playerIndex, 1);
          let playersList = players.map((player, i) => `${i + 1} - @${player.id.split('@')[0]} [${player.points} نقطة]`).join('\n');
          this.reply(m.chat, `❐┃تم استبعاد الاعب بنجاح┃✔️❯
*⟐ الاعبين المتبقين :*
${playersList}`, m, { mentions: conn.parseMention(playersList) });
          let tekateki1 = await (await fetch(`https://raw.githubusercontent.com/Brook-88/Game/main/game-ask.json`)).json();
          json = tekateki1[Math.floor(Math.random() * tekateki1.length)];
          this.tekateki1[id][1] = json;
          let question = `╮─┈〈 *مـسـابـقـه اسئلة 🎡* 〉┈─⟐
*▢❯ الـسـوال :* ${json.question}
*▢❯ اجب بسرعه لكسب النقاط*
*▢❯ الجائزة :* ⌊ ${points} ⌉ نقطة لكل أجابة
╯┈──┈┈─┈┈┈┈──┈┈─┈⟐`;
          conn.reply(m.chat, question, m);
      } else {
          conn.reply(m.chat, '❐┃رقـم غـيـر صـحـيـح┃❗❯', m);
      }
  }
};

handler.command = /^(مسابقة-اسئله|انضم-اسئله|حذف-اسئله)$/i;

export default handler;
