import _Chatroom from './sdk';
import {
  GetInstanceOptions,
  ChatroomInfo,
  GetChatroomMembersOptions,
  GetChatroomMembersInfoOptions,
  NIMError,
  DropResult,
  GetChatroomMembersResult,
  GetChatroomMembersInfoResult,
  GetHistoryMsgsOptions,
  GetHistoryMsgsResult,
} from './interface';

const instances: Chatroom[] = [];

export default class Chatroom {
  account: string;

  _instance: any;

  /**
   * - 此接口为单例模式, 对于同一个账号, 永远返回同一份实例, 即只有第一次调用会初始化一个实例
   * - 后续调用此接口会直接返回初始化过的实例, 同时也会调用接口setOptions更新传入的配置
   * - 后续调用此接口时, 如果连接已断开, 会自动建立连接
   * - 当发生掉线时，SDK会自动进行重连
   *
   * @param options
   */
  static getInstance(options: GetInstanceOptions): Chatroom {
    const target = instances.find((item) => item.account === options.account);

    if (target) {
      return target;
    } else {
      const instance = new Chatroom(options);
      instances.push(instance);
      return instance;
    }
  }

  /**
   * - 请使用 Chatroom.getInstance 来初始化聊天室
   * - 此接口为单例模式, 对于同一个账号的同一个聊天室, 永远返回同一份实例, 即只有第一次调用会初始化一个实例, 后续调用此接口会直接返回初始化过的实例.
   *
   * @param options
   */
  constructor(options: GetInstanceOptions) {
    this.account = options.account;
    this._instance = _Chatroom.getInstance(options);
  }

  /**
   * 将音频 url 转为 mp3
   *
   * @param options
   */
  audioToMp3(options: { url: string }) {
    return this._instance.audioToMp3(options);
  }

  /**
   * 进入聊天室
   */
  connect() {
    this._instance.connect();
  }

  /**
   * 退出聊天室
   */
  disconnect() {
    this._instance.disconnect();
  }

  /**
   * 清除聊天室队列
   *
   * @param options
   */
  drop() {
    return new Promise<DropResult>((res, rej) => {
      this._instance.drop({
        done: (error: NIMError, data, content) => {
          if (error) {
            rej(error);
          } else {
            res({
              data,
              content,
            });
          }
        },
      });
    });
  }

  /**
   * 获取聊天室信息
   *
   * @param options
   */
  getChatroom() {
    return new Promise<ChatroomInfo>((res, rej) => {
      this._instance.getChatroom({
        done: (error: NIMError, chatroomInfo: ChatroomInfo) => {
          if (error) {
            rej(error);
          } else {
            res(chatroomInfo);
          }
        },
      });
    });
  }

  /**
   * 获取聊天室成员列表
   *
   * @param options
   */
  getChatroomMembers(options: GetChatroomMembersOptions) {
    return new Promise<GetChatroomMembersResult>((res, rej) => {
      this._instance.getChatroomMembers({
        ...options,
        done: (error: NIMError, data: GetChatroomMembersResult) => {
          if (error) {
            rej(error);
          } else {
            res(data);
          }
        },
      });
    });
  }

  /**
   * 获取聊天室成员信息
   *
   * @param options
   */
  getChatroomMembersInfo(options: GetChatroomMembersInfoOptions) {
    return new Promise<GetChatroomMembersInfoResult>((res, rej) => {
      this._instance.getChatroomMembersInfo({
        ...options,
        done: (error: NIMError, data: GetChatroomMembersInfoResult) => {
          if (error) {
            rej(error);
          } else {
            res(data);
          }
        },
      });
    });
  }

  /**
   * 获取聊天室历史消息
   * - 获取从 timetag 对应的时间点往前的若干条数据
   * - 不填 timetag 的话默认为服务器当前时间
   *
   * @param options
   */
  getHistoryMsgs(options: GetHistoryMsgsOptions) {
    return new Promise<GetHistoryMsgsResult>((res, rej) => {
      this._instance.getHistoryMsgs({
        ...options,
        done: (error: NIMError, data: GetHistoryMsgsResult) => {
          if (error) {
            rej(error);
          } else {
            res(data);
          }
        },
      });
    });
  }
}
