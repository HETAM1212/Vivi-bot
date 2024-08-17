//CÓDIGO CREADO POR elrebelde21 : https://github.com/elrebelde21

const handler = async (m, {conn, text, isPrems}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.fun_ruletas

if (!db.data.chats[m.chat].game) throw tradutor.texto1 
const date = global.db.data.users[m.sender].juegos + 21600000; //21600000 = 6 hs 
if (new Date - global.db.data.users[m.sender].juegos < 21600000) throw `*❐┃انتظر لين يخلص الوقت┃🤌❯*

*▢ الوقت المتبقي :* ${msToTime(date - new Date())}`
let user = global.db.data.users[m.sender]
const prem = Math.floor(Math.random() * 3600000)
const exp = Math.floor(Math.random() * 20000)
const diamond = Math.floor(Math.random() * 300)
const money = Math.floor(Math.random() * 10000)
let rulet = ['text', 'text2', 'text5', 'text6']; 
let ruleta = rulet[Math.floor(Math.random() * 4)]
global.db.data.users[m.sender].juegos = new Date * 1;
  
if (ruleta === 'text') return m.reply(`${tradutor.texto3} ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp) 
  
if (ruleta === 'text2') return m.reply(`${tradutor.texto4} ${exp} XP`).catch(global.db.data.users[m.sender].exp -= exp) 
  
if (ruleta === 'text5') return m.reply(`${tradutor.texto7} ${diamond} 💎`).catch(global.db.data.users[m.sender].diamond += diamond) 
  
if (ruleta === 'text6') return m.reply(tradutor.texto8).catch(global.db.data.users[m.sender].premium += prem) 
}
handler.help = ['game'];
handler.tags = ['xp'];
handler.command = /^(روليت|ruleta|suerte)$/i
handler.fail = null;
handler.group = true
handler.register = true
export default handler;

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return hours + ' ساعات و ' + minutes + ' دقيقة '}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
