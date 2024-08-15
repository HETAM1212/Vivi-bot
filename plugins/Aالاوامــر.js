import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';
import {createHash} from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, participants, isPrems}) => {

    
     let who = m.quoted ? m.quoted.sender : (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : (m.fromMe ? conn.user.jid : m.sender);
  if (!(who in global.db.data.users)) {
    throw '✳️ المستخدم غير موجود في قاعدة البيانات';
  }
      let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Menu2.jpg');
  let user = global.db.data.users[who];
  let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || '';
 let {name, limit, lastclaim, registered, regTime, age, premiumTime} = global.db.data.users[who];
  let username = conn.getName(who);
  let prem = global.prems.includes(who.split`@`[0]);
   
  let sn = createHash('md5').update(who).digest('hex');
    
    const device = await getDevice(m.key.id);
    const mentionId = m.key.participant || m.key.remoteJid;

    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);

    if (device !== 'desktop' && device !== 'web') {
        var joanimiimg = await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/2a7bf4ee1980dc10aec4e.jpg' }}, { upload: conn.waUploadToServer });
        
        const interactiveMessage = {
            body: { text: `*▢ مرحبا بك يا : @${mentionId.split('@')[0]}*

╮┈┈❲ *معلومـات المستخدم* ❳┈┈⊷
▢ الاسـم : *${registered ?  name : ''}*
▢ بـريـمـيـوم : *${premiumTime > 0 ? 'مـمـيـز' : (isPrems ? 'مـمـيـز' : 'عـادي') || ''}*
▢ الـتـسـجـيـل : *${registered ? 'مـسـجـل': 'غير مـسـجـل'}*
╯┈┈┈┈┈┈┈┈┈┈┈┈┈┈⩺‏

╮┈┈❲ *مـعـلـومـات الــبــوت* ❳┈┈⊷
▢ اسم البوت : *فـيـفـي - Vivi*
▢ المطور : *بروك - 𝐾 ͟͟𝐿 ͟͟⁩*
▢ مدة التشغيل : *${uptime}*
╯┈┈┈┈┈┈┈┈┈┈┈┈┈┈⩺‏

╮┈┈❲ *بـعض الـمـلاحـظـات* ❳┈┈⊷
 ⌗ اختر القائمه من خلال الزر ☟
 ⌗ اكتب *" . "* قبل كل امر
 ⌗ ممنوع السبام او تكرار الردود
╯┈┈┈┈┈┈┈┈┈┈┈┈┈┈⩺‏`.trim() },
            footer: { text: `*_˼‏ 𝙑 𝙞 𝙫 𝙞  𝘽 𝙤 𝙩 – v3.0 – 𝘽 𝙧 𝙤 𝙤 𝙠 ˹_*`.trim() },  
            header: {
                title: `╮━─═❆❮ قـائـمـة الاوامــر ❯❆═─━╭`,
                subtitle: `*▢ مرحبا بك يا : @${mentionId.split('@')[0]}*

╮┈┈❲ *معلومـات المستخدم* ❳┈┈⊷
▢ الاسـم : *${registered ?  name : ''}*
▢ بـريـمـيـوم : *${premiumTime > 0 ? 'مـمـيـز' : (isPrems ? 'مـمـيـز' : 'عـادي') || ''}*
▢ الـتـسـجـيـل : *${registered ? 'مـسـجـل': 'غير مـسـجـل'}*
╯┈┈┈┈┈┈┈┈┈┈┈┈┈┈⩺‏

╮┈┈❲ *مـعـلـومـات الــبــوت* ❳┈┈⊷
▢ اسم البوت : *فـيـفـي - Vivi*
▢ المطور : *بروك - 𝐾 ͟͟𝐿 ͟͟⁩*
▢ مدة التشغيل : *${uptime}*
╯┈┈┈┈┈┈┈┈┈┈┈┈┈┈⩺‏

╮┈┈❲ *بـعض الـمـلاحـظـات* ❳┈┈⊷
 ⌗ اختر القائمه من خلال الزر ☟
 ⌗ اكتب *" . "* قبل كل امر
 ⌗ ممنوع السبام او تكرار الردود
╯┈┈┈┈┈┈┈┈┈┈┈┈┈┈⩺‏`,
                hasMediaAttachment: true,
                imageMessage: joanimiimg.imageMessage,
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: 'اضـغـط هـنـا ➥',
                            sections: [
                                {
                                    title: '⟐═━─⏣─━═❪ 🇻 🇮 🇻 🇮   🇧 🇴 🇹 ❫═━─⏣─━═⟐',
                                    highlight_label: '☚',
                                    rows: [
                                        {
                                            header: '# قـسـم الأعـضـاء 👤 ⍅',
                                            title: '.الاعضاء',
                                            description: '',
                                            id: '.الاعضاء'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '',
                                    rows: [
                                        {
                                            header: '# قـسـم الادوات📥 ⍅',
                                            title: '.الادوات',
                                            description: '',
                                            id: '.الادوات'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '',
                                    rows: [
                                        {
                                            header: '# قـسـم الالـعـاب🎮 ⍅',
                                            title: '.العاب',
                                            description: '',
                                            id: '.العاب'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '',
                                    rows: [
                                        {
                                            header: '# قـسـم الـتـرفـيـه🏵️ ⍅',
                                            title: '.ترفيه',
                                            description: '',
                                            id: '.ترفيه'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '',
                                    rows: [
                                        {
                                            header: '# قـسـم الـديـن📿 ⍅',
                                            title: '.دين',
                                            description: '',
                                            id: '.دين'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '',
                                    rows: [
                                        {
                                            header: '# قـسـم الـمـجـمـوعـة⚙️ ⍅',
                                            title: '.المجموعة',
                                            description: '',
                                            id: '.المجموعة'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: '',
                                    rows: [
                                        {
                                            header: '# قـسـم المطور👨🏻‍💻 ⍅',
                                            title: '.مطور',
                                            description: '',
                                            id: '.مطور'
                                        }
                                    ]
                                }
                            ]
                        })
                    }
                ],
                messageParamsJson: ''
            }
        };

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m });
        
        msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: [mentionId] };
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        conn.sendFile(m.chat, 'JoAnimi•Error.jpg', m);
    }
};

handler.help = ['imgboton'];
handler.tags = ['For Test'];
handler.command = /^(اوامر|أوامر|الاوامر|الأوامر)$/i;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

export default handler;
