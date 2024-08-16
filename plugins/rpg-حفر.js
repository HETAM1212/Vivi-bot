

const handler = async (m, {conn, isPrems}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.rpg_minar

  const hasil = Math.floor(Math.random() * 10000);
  const time = global.db.data.users[m.sender].lastmiming + 600000;
  if (new Date - global.db.data.users[m.sender].lastmiming < 600000) throw `*❐┃غمض عين فتح عين يخلص الوقت  ┃⏱️❯*\n*✦ الوقت المتبقي :* ${msToTime(time - new Date())}`;
  m.reply(`*❐┃مبروك ، خلصت تنقيب┃🎉❯*\n*✦ جائزتك :* ${hasil} XP`);
  global.db.data.users[m.sender].lastmiming = new Date * 1;
};
handler.help = ['minar'];
handler.tags = ['xp'];
handler.command = ['حفر', 'تنقيب', 'mine'];
handler.fail = null;
handler.exp = 0;
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return minutes + ' دقائق ' + seconds + ' ثانية ';
}
