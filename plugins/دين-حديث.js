//API Imgs:

const handler = async (m, { conn }) => {
  try {
      const photoLink = "https://api.bk9.site/Islam/hadith";
      const photoFileName = "photo.jpg"; 
      await conn.sendMessage(m.chat, { image: { url: photoLink }, fileName: photoFileName, mimetype: 'image/jpeg', caption: '*❀ أحــاديــث نــبــويــة*' }, { quoted: m });
  } catch (error) {
      console.error(error);
      throw "*❐┃فشل في ارسال الصورة┃❗❯*";
  }
};

handler.tags = ['islam'];
handler.command = /^(حديث)$/i;

export default handler;
