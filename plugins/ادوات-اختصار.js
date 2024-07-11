
//Shortner link:

import fetch from 'node-fetch'; 

let handler = async function (m, { text }) {
  try {
    if (!text) {
      m.reply(`❐┃لاختصار الرابط اتبع الخطوات┃👇❯

❍❯ *اذا كنت تريده بدون تخصيص↶*
`.اختصار «الرابط»`
*⟐ مثال :*
.اختصار https://bk9.site/

❍❯ *اذا كنت تريده مع تخصيص↶*
`.اختصار «الرابط + الكلمة»`
*⟐ مثال :*
.اختصار https://bk9.site/ + جروب`);
      return;
    }
    const [link, alias] = text.split("+").map(part => part.trim());
    let apiUrl = `https://bk9.site/api/create?url=${encodeURIComponent(link)}`;
    if (alias) apiUrl += `&alias=${encodeURIComponent(alias)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.BK99) {
      return m.reply("*❐┃هذا التخصيص مأخوذ جرب غيره┃❗❯*");
    }
    const shortURL = data.BK9;
    return m.reply(`֎╎تـم  اخـتـصـار  رابـطـك ${alias ? ' مع التخصيص ب "' + alias + '"' : ''}:\n\n${shortURL}`);
  } catch (error) {
    console.error(error);
    return m.reply('*❐┃هـنـاك خـطـأ┃❗❯*');
  }
};

handler.command = ['اختصار'];
handler.tags = ['اختصار'];
export default handler;
