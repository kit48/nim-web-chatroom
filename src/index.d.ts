import { GetInstanceOptions, Message, ChatroomInfo, GetChatroomMembersOptions, NIMError } from './interface';

export default class Chatroom {
  /**
   * - 此接口为单例模式, 对于同一个账号, 永远返回同一份实例, 即只有第一次调用会初始化一个实例
   * - 后续调用此接口会直接返回初始化过的实例, 同时也会调用接口setOptions更新传入的配置
   * - 后续调用此接口时, 如果连接已断开, 会自动建立连接
   * - 当发生掉线时，SDK会自动进行重连
   *
   * @param options
   */
  static getInstance(options: GetInstanceOptions) {}

  /**
   * - 请使用 Chatroom.getInstance 来初始化聊天室
   * - 此接口为单例模式, 对于同一个账号的同一个聊天室, 永远返回同一份实例, 即只有第一次调用会初始化一个实例, 后续调用此接口会直接返回初始化过的实例.
   *
   * @param options
   */
  constructor(options: GetInstanceOptions);

  /**
   * 将音频 url 转为 mp3
   *
   * @param options
   */
  audioToMp3(options: { url: string });

  /**
   * 进入聊天室
   */
  connect();

  /**
   * 退出聊天室
   */
  disconnect();

  /**
   * 清除聊天室队列
   *
   * @param options
   */
  drop(options: { done: (error: NIMError, obj, content) => void });

  /**
   * 获取聊天室信息
   *
   * @param options
   */
  getChatroom(options: { done: (error: NIMError, chatroomInfo: ChatroomInfo) => void });

  /**
   * 获取聊天室成员列表
   *
   * @param options
   */
  getChatroomMembers(options: GetChatroomMembersOptions);
}
