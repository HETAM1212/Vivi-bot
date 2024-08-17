import fetch from "node-fetch"
import cheerio from "cheerio"

let handler = async (m, {
    text,
    usedPrefix,
    command
}) => {
if (!text) throw `*❐┃صيغة غير صالحة┃❗❯*
 *▢ مثال لاستخدام الامر :*
 ◄ .أذان Kuwait

 *▢ ملاحظة :* 
يشترط ان يكون اسم الدولة باللغة الإنجليزية`
    try {
            let res = await fetchPrayerTimes(text)
            m.reply(`╮═━─━╞مواقيت الاذان╡━─━═╭
${Object.entries(res).map(([name, data]) => `▢ مـوعـد صـلاة *${name}* : ${data}`).join('\n').trim()}
╯•═━──━═⪨•⚶•⪩═━──━═•╰
> ملاحظة : هذه الاوقات قد تختلف من محافظة الى محافظة بفارق يسير فلا تعتمد عليها`.trim())
        } catch (e) {
            m.reply(eror)
        }
}
handler.help = ['adhan']
handler.tags = ['islam']
handler.command = /^(أذان|اذان)$/i
export default handler

async function fetchPrayerTimes(q) {
  const url = 'https://athantime.me/' + q; // Ganti URL_HALAMAN_ADZAN dengan URL halaman web yang berisi informasi jadwal waktu adzan

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const prayerTimes = {
      
      الفجر: $('td:contains("موعد اذان الفجر")').next().text().trim(), // Mengambil waktu adzan Fajr
      الظهر: $('td:contains("موعد اذان الظهر")').next().text().trim(), // Mengambil waktu adzan Dhuhr
      العصر: $('td:contains("موعد اذان العصر")').next().text().trim(), // Mengambil waktu adzan Asr
      المغرب: $('td:contains("موعد اذان المغرب")').next().text().trim(), // Mengambil waktu adzan Maghrib
      العشاء: $('td:contains("موعد اذان العشاء")').next().text().trim(), // Mengambil waktu adzan Isha
      
    };
    return prayerTimes;
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return null;
  }
}
