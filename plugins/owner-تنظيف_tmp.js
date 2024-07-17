import {tmpdir} from 'os';
import path, {join} from 'path';
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch,
} from 'fs';




const handler = async (m, {conn, usedPrefix: _p, __dirname, args}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/es.json`))
  const tradutor = _translate.plugins.owner_cleartmp

  conn.reply(m.chat, '*❐┃تم حذف ملفات المجلد المؤقت بنجاح┃✔❯*', m);

  const tmp = [tmpdir(), join(__dirname, '../tmp')];
  const filename = [];
  tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
  return filename.map((file) => {
    const stats = statSync(file);
    unlinkSync(file);
  });
};
handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.command = /^(تنظيف-tmp|cleartemp)$/i;
handler.rowner = true;
export default handler;
