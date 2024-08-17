import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';


const handler = async (m, { conn }) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.rpg_levelup

  const name = conn.getName(m.sender);
  const usertag = '@' + m.sender.split('@s.whatsapp.net')[0];
  const user = global.db.data.users[m.sender];
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    const { min, xp, max } = xpRange(user.level, global.multiplier);
    const message = `
⏣‏╞•━═⟐ ❪╰𝐑𝐀𝐍𝐊╮❫ ⟐═━•╡⏣
*▢ الاسم :* ${usertag}
*▢ المستوى الحالي :* ${user.level}
*▢ التصنيف الحالي :* ${user.role}
*▢ نقاط الخبرة :* ${user.exp - min}/${xp} XP
      ──━━━══⟐══━━━──
⸙ انت تحتاج الى : ${max - user.exp} XP لرفع مستواك.
⏣╞•━──━═⟐ ❈ ⟐═━──━•╡⏣`.trim();
    return conn.sendMessage(m.chat, {text: message, mentions: [m.sender]}, {quoted: m});
  }
  const before = user.level * 1;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    const levelUpMessage = `${tradutor.texto2[0]} ${name}! ${tradutor.texto2[1]} ${user.level}`;
    const levelUpDetails = `❐┃تمت زيادة مستواك، مبروك┃🚀❯
╮═━──━═⬣❈⬣═━──━═╭
*▢ المستوى السابق :* ${before}
*▢ المستوى الجديد :* ${user.level}
*▢ التصنيف الحالي :* ${user.role}
╯═━──━═⬣❈⬣═━──━═╰
*⸙ كلما تفاعلت مع البوت ارتفع مستواك*`.trim();
    try {
      const levelUpImage = await levelup(levelUpMessage, user.level);
      conn.sendFile(m.chat, levelUpImage, 'levelup.jpg', levelUpDetails, m);
    } catch (e) {
      conn.sendMessage(m.chat, {text: levelUpDetails, mentions: [m.sender]}, {quoted: m});
    }
  }
};
handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = ['لفل', 'lvl', 'مستوى', 'level'];
export default handler;
