import { Chatroom } from '.';

export interface GetInstanceOptions {
  /**
   * secure 模式下会通过 https 协议跟服务器建立连接, 非 secure 模式下会通过 http 协议跟服务器建立连接, 默认 true
   */
  secure?: boolean | Object;

  /**
   * 在云信管理后台查看应用的 appKey
   */
  appKey: string;

  /**
   * 帐号, 应用内唯一
   */
  account: string;

  /**
   * 帐号的 token, 用于建立连接
   */
  token: string;

  /**
   * 聊天室 id
   */
  chatroomId: string;

  /**
   * 聊天室地址列表
   */
  chatroomAddresses: string[];

  /**
   * nos文件存储全局配置，存储场景，实例有效，默认 chatroom
   */
  nosScenes?: string;

  /**
   * nos文件存储全局配置，存储有效时间，实例有效，默认 Infinity ，不得小于一天，单位秒
   */
  nosSurvivalTime?: number;

  /**
   * 进入聊天室后展示的昵称, 如果不设置并且托管了用户资料, 那么使用用户资料里面的昵称
   */
  chatroomNick?: string;

  /**
   * 进入聊天室后展示的头像, 如果不设置并且托管了用户资料, 那么使用用户资料里面的头像
   */
  chatroomAvatar?: string;

  /**
   * 扩展字段, 设置了之后, 通过 getChatroomMembers 获取的聊天室成员信息会包含此字段
   *
   * - 推荐使用 JSON 格式构建, 非 JSON 格式的话, Web 端会正常接收, 但是会被其它端丢弃
   */
  chatroomCustom?: string;

  /**
   * 扩展字段, 如果填了, 那么其它聊天室成员收到的聊天室通知消息的 attach.custom 的值为此字段
   *
   * - 推荐使用JSON格式构建, 非JSON格式的话, Web端会正常接收, 但是会被其它端丢弃
   */
  chatroomEnterCustom?: string;

  /**
   * 连接建立后的回调, 会传入聊天室信息
   */
  onconnect?: function;

  /**
   * 即将重连的回调
   *
   * - 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
   * - 此回调会收到一个对象, 包含额外的信息, 有以下字段
   *    - duration: 距离下次重连的时间
   *    - retryCount: 重连尝试的次数
   */
  onwillreconnect?: function;

  /**
   * SDK尝试重连的最大次数，超过后则不再尝试重连，并触发 ondisconnect 回调
   */
  reconnectionAttempts?: number;

  /**
   * 断开连接后的回调
   * - 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
   * - 此回调会收到一个对象, 包含错误的信息, 有以下字段
   *    - code: 出错时的错误码, 可能为空
   *      - 302: 账号或者密码错误
   *      - 'kicked': 被踢
   * - 当 code 为 'kicked' 的时候, 此对象会有以下字段
   *    - reason: 被踢的原因
   *      - chatroomClosed: 聊天室关闭了
   *      - managerKick: 被管理员踢出
   *      - samePlatformKick: 不允许同一个帐号重复登录同一个聊天室
   *    - message: 文字描述的被踢的原因
   */
  ondisconnect?: function;

  /**
   * 发生错误的回调, 会传入错误对象
   */
  onerror?: function;

  /**
   * 收到消息的回调, 会传入消息数组
   */
  onmsgs?: function;
}

export default class Chatroom {
  static getInstance(options: GetInstanceOptions) {}

  constructor(options: GetInstanceOptions);

  disconnect();
}
