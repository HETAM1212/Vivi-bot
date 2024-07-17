/* Created by https://github.com/unptoadrih15 */

const handler = async (m, {conn}) => {
  conn.tebaklagu = conn.tebaklagu ? conn.tebaklagu : {};
  const id = m.chat;
  if (!(id in conn.tebaklagu)) throw false;
  const json = conn.tebaklagu[id][1];
  const nya = json.jawaban;
  const nyanya = nya.replace(/[ﻱ ﻭ ﻩ ﻥ ﻡ ﻝ ﻙ ﻕ ﻑ ﻍ ﻉ ﻅ ﻁ ﺽ ﺹ ﺵ ﺱ ﺯ ﺭ ﺫ ﺩ ﺥ ﺡ ﺝ ﺙ ﺕ ﺏ ﺍ]/g, '-');
  m.reply('' + nyanya + '');
};
handler.command = /^تلميح|غش$/i;
export default handler;
