import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw '*❐┃الرد على صورة للتحويل الى ملصق مطلوب┃❗❯*'
  if (mime && mime.startsWith('video/')) {
    throw '*❐┃قلنا لك الرد على صورة┃🍋‍🟩❯*';
  }
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)/.test(mime)
  let link = await (isTele ? uploadImage : uploadImage)(media);
  let lr = (`https://api.popcat.xyz/wanted?image=${link}`)
  conn.sendFile(m.chat, lr, 'wanted.png', `*❮❗❯ مطلوب حي او ميت*`, m)
  await conn.sendMessage(m.chat, { react: { text: '⛓️', key: m.key } })

}
handler.help = ['wanted']
handler.tags = ['meme']
handler.command = ['مطلوب','المطلوب']

export default handler
