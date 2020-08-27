import Chatroom from '../src';
import config from './config.json';

export const baseInitOptions = {
  appKey: '632feff1f4c838541ab75195d1ceb3fa',
  account: config.token,
  token: config.token,
  chatroomId: config.chatroomId,
  chatroomAddresses: ['chatweblink01.netease.im:443'],
};

function listenChatroom() {
  return new Promise((res, rej) => {
    const chatroom = new Chatroom({
      ...baseInitOptions,

      onconnect: (data) => {
        console.log('进入聊天室:');
        console.log('chatroom', data.chatroom);
        console.log('member', data.member);

        chatroom.getChatroomMembers({
          guest: false,
          done: (error, data) => {
            console.log('获取聊天室成员' + (!error ? '成功' : '失败'), error, data.members);

            chatroom.disconnect();
            res();
          },
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
      // 消息
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
