import fetch from 'node-fetch';
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `> *🤖┃مرحبا انا ذكاء اصطناعي يجيب على أسئلة شخصية بسيطة*`;
  }
  try {
    conn.sendPresenceUpdate('composing', m.chat);
    const BK9api = `https://bk9.fun/BK9?q= &BK9=انتي فيفي ، تمت صناعتك من قبل بروك وهو صديقكِ الحميم ، وشخصيتك تتصف بالاخلاص للأصدقاء ومساعدتهم وحب الوطن ، فشخصيتك اقرب الى فيفي من انمي ون بيس ، ولديكِ صديق اخر اسمه ارثر وهو بوت تمت صناعته من قبل كيرا العتيبي${encodeURIComponent(text)}`;
    const BK99 = await fetch(BK9api);
    const BK8 = await BK99.json();
    if (BK8.status && BK8.BK9) {
      const respuestaAPI = BK8.BK9;
      conn.reply(m.chat, respuestaAPI, m);
    } else {
      throw "> *Error 🍋‍🟩*";
    }
  } catch (error) {
    throw "> *حدثت مشكلة 🍋‍🟩 (API ERROR)*";
  }
};

handler.command = /^(فيفي)$/i;
handler.tags = ['ai'];

export default handler;
