import { Module, Message } from '../src/index.mjs';

Module(
  {
    name: 'vv',
    fromMe: false,
    desc: 'forward a viewonce message',
    type: 'whatsapp',
  },
  async (msg: Message) => {
    if (!msg.quoted || !msg.quoted.viewonce) {
      return msg.reply('Reply viewonce');
    }
    msg.quoted.message![msg.quoted.type!].viewOnce = false;
    await msg.forward(msg.owner, msg?.quoted, { quoted: msg.quoted });
    return msg.reply('done');
  }
);

Module(
  {
    name: 'waname',
    fromMe: true,
    desc: 'Updates your WA name',
    type: 'whatsapp',
  },
  async (msg: Message, match: string) => {
    if (!match) return msg.reply('provide new name');
    await msg.client.updateProfileName(match);
    return msg.reply('done');
  }
);
