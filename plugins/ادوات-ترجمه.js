import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';


const handler = async (m, {args, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.herramientas__translate

  const msg = `*❐┃صيغة غير صالحة┃❗❯*
 *▢ مثال لاستخدام الامر :*
 ◄ ${usedPrefix + command} ar hi
 
 *▢ اللغات المتوفرة :*
◄ عربية - ar
◄ أسبانيا - es
◄ الفرنسية - fr
◄ الانجليزية - en
◄ الروسية -  ru
◄ او اي اختصار للغة
┇❍❯ *اكتب : .اللغات* 
لرؤية باقي الاختصارات`;
  if (!args || !args[0]) return m.reply(msg);
  let lang = args[0];
  let text = args.slice(1).join(' ');
  const defaultLang = 'es';
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text;
  try {
    const result = await translate(`${text}`, {to: lang, autoCorrect: true});
    await m.reply(tradutor.texto3 + result.text);
  } catch {
    try {
      const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`);
      const loll = await lol.json();
      const result2 = loll.result.translated;
      await m.reply(`${tradutor.texto3 }` + result2);
    } catch {
      await m.reply(tradutor.texto2);
    }
  }
};
handler.command = /^(ترجمه|ترجمة|ترجم)$/i;
export default handler;
