import fetch from 'node-fetch';

var handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw "> *مرحبا انا خدمة بلاك ai، خدمة قادرة على برمجة الأكواد بجميع اللغات وحل مشاكل البرمجة، على سبيل المثال :*\n\n* *#بلاك كيفية إنشاء صفحة تسجيل دخول باستخدام `html`*";

  try {
 
    var apii = await fetch(`https://zoro-api-zoro-bot-5b28aebf.koyeb.app/api/blackbox?text=${encodeURIComponent(text)}`);
    var res = await apii.json();

    if (res.result && text.trim().length > 0) {
      await conn.sendFile(m.chat, 'https://telegra.ph/file/34bd1de01d59fb18833cc.jpg', 'image.png', res.result, m, { caption: text });
    } else if (res.result) {
      await conn.sendFile(m.chat, 'https://telegra.ph/file/34bd1de01d59fb18833cc.jpg', res.result, m);
    } else {
      throw '> *Error 🍋‍🟩*';
    }

  } catch (error) {
    console.error(error);
    throw '> *حدثت مشكلة 🍋‍🟩 (API ERROR)*';
  }
};

handler.command = ['bb', 'بلاك', 'iabox'];
handler.help = ['blackbox'];
handler.tags = ['herramientas'];
export default handler;

// By Saad - @nm9h
// Thanks for Zoro API
