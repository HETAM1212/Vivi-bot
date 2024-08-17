import fetch from 'node-fetch'
import fs from 'fs'
let handler = async (m, { conn, args, participants, usedPrefix }) => {
let users = Object.entries(global.db.data.users).map(([key, value]) => { 
return {...value, jid: key}
  })

let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
let sorteddiamond = users.map(toNumber('diamond')).sort(sort('diamond'))
let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
let sortedRole = users.map(toNumber('role')).sort(sort('role'))
let sortedMoney = users.map(toNumber('money')).sort(sort('money'))
let sortedJoincount = users.map(toNumber('joincount')).sort(sort('joincount'))
let sortedPremium = users.map(toNumber('premium')).sort(sort('premium'))
let usersExp = sortedExp.map(enumGetKey)
let usersdiamond = sorteddiamond.map(enumGetKey)
let usersLevel = sortedLevel.map(enumGetKey)
let usersRole = sortedRole.map(enumGetKey)
let usersMoney = sortedMoney.map(enumGetKey)
let usersJoincount = sortedJoincount.map(enumGetKey)
let usersPremium = sortedPremium.map(enumGetKey)
           
console.log(participants)
let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length)
let text = `‏╮━╞‬‬‬‬‬‬‬‬🇻 🇮 🇻 🇮 🇧 🇴 🇹 ╡━╭
⏣═┇قــائــمــة الــمــتــصــدريـن┇═⏣
⟐──━═━─⬣  ❈  ⬣─━═━──⟐

▢‏ *𝐓𝐎𝐏 ${len} 𝐗𝐏* ⚡
✦ المركز : *${usersExp.indexOf(m.sender) + 1}* من *${usersExp.length}* متصدر
${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ${exp}`).join`\n`}
⟐──━═━─⬣  ❈  ⬣─━═━──⟐

▢‏ *𝐓𝐎𝐏 ${len} 𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄* 💎
✦ المركز : *${usersdiamond.indexOf(m.sender) + 1}* من *${usersdiamond.length}* مصنف
${sorteddiamond.slice(0, len).map(({ jid, diamond }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ${diamond}`).join`\n`}
⟐──━═━─⬣  ❈  ⬣─━═━──⟐

▢‏ *𝐓𝐎𝐏 ${len} 𝐋𝐄𝐕𝐄𝐋* 💠
✦ المركز : *${usersLevel.indexOf(m.sender) + 1}* من *${usersLevel.length}* مصنف
${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ${level}`).join`\n`}
⟐──━═━─⬣  ❈  ⬣─━═━──⟐

▢‏ *𝐓𝐎𝐏 ${len} 𝐑𝐎𝐋* 🔰
✦ المركز : *${usersLevel.indexOf(m.sender) + 1}* من *${usersLevel.length}* مصنف
${sortedLevel.slice(0, len).map(({ jid, role, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ${role}`).join`\n`}
╯─━─═ ❆  〘🌟〙  ❆ ═─━─╰
`.trim()
await m.reply(text, null, { mentions: conn.parseMention(text) })}
handler.help = ['top']
handler.tags = ['xp']
handler.command = ['leaderboard', 'lb', 'top'] 
handler.register = true
handler.fail = null
handler.exp = 0

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
  }
