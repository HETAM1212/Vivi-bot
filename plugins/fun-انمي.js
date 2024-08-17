import fetch from 'node-fetch';
const handler = async (m, {conn, text}) => {
  try {
    const res = await fetch('https://api.thedogapi.com/v1/images/search');
    const img = await res.json();
    const caption = `_©Vivi - Bot_`.trim();
    conn.sendFile(m.chat, img[0].url, 'anime.jpg', caption, m);
  } catch {
    throw '*Error!*';
  }
};
handler.help = ['dog'];
handler.tags = ['random'];
handler.command = /^انمي$/i;
handler.fail = null;
export default handler;
