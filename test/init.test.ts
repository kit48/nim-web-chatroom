import Chatroom from '../src';
import config from './config.json';

export const baseInitOptions = {
  appKey: '632feff1f4c838541ab75195d1ceb3fa',
  account: config.token,
  token: config.token,
  chatroomId: config.chatroomId,
  chatroomAddresses: ['chatweblink01.netease.im:443'],
};

const handleConnect = async (chatroom: Chatroom, data: any) => {
  console.log('进入聊天室:\n', 'chatroom', data.chatroom, '\n', 'member', data.member);

  let desc = '获取聊天室成员';
  try {
    const data = await chatroom.getChatroomMembers({
      guest: false,
    });
    console.log(`${desc}成功`, data);
  } catch (error) {
    console.log(`${desc}失败`, error);
  }

  desc = '获取聊天室成员信息';
  try {
    const data = await chatroom.getChatroomMembersInfo({
      accounts: [config.account],
    });
    console.log(`${desc}成功`, data);
  } catch (error) {
    console.log(`${desc}失败`, error);
  }

  desc = '获取聊天室历史';
  try {
    const data = await chatroom.getHistoryMsgs({
      timetag: new Date().valueOf(),
      limit: 5,
    });
    console.log(`${desc}成功`, data);
  } catch (error) {
    console.log(`${desc}失败`, error);
  }
};

function listenChatroom() {
  return new Promise((res, rej) => {
    console.log('Init Chatroom...');
    const chatroom = new Chatroom({
      ...baseInitOptions,

      onconnect: (data) => {
        handleConnect(chatroom, data).finally(() => {
          chatroom.disconnect();
          res();
        });
      },
      onerror: (error, obj) => {
        console.log('发生错误', error, obj);

        chatroom.disconnect();
        rej();
      },
      onwillreconnect: (obj: any) => {
        // 此时说明 `SDK` 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
        console.log('即将重连', obj);
      },
      ondisconnect: (error: any) => {
        // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
        console.log('连接断开', error);
        if (error) {
          switch (error.code) {
            // 账号或者密码错误, 请跳转到登录页面并提示错误
            case 302:
              break;
            // 被踢, 请提示错误后跳转到登录页面
            case 'kicked':
              break;
            default:
              break;
          }
        }
      },
      onmsgs: (msgs) => {
        console.log('收到聊天室消息', msgs);
      },
    });
  });
}

describe('init chatroom instance', () => {
  it('new', async () => {
    await listenChatroom();
  });
});
