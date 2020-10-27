export interface NIMError {
  message: string;
  code: number;
  event: Object;
}

export interface ChatroomInfo {
  /** 聊天室 id */
  id: string;

  /** 聊天室名字 */
  name: string;

  /** 聊天室公告 */
  announcement: string;

  /** 直播地址 */
  broadcastUrl: string;

  /** 第三方扩展字段 */
  custom: string;

  /** 创建时间 */
  createTime: number;

  /** 更新时间 */
  updateTime: number;

  /** 创建者账号 */
  creator: string;

  /** 当前在线人数 */
  onlineMemberNum: number;

  /** 是否禁言, 禁言状态下普通成员不能发送消息, 创建者和管理员可以发送消息 */
  mute: boolean;
}

export interface GetInstanceOptions {
  /** secure 模式下会通过 https 协议跟服务器建立连接, 非 secure 模式下会通过 http 协议跟服务器建立连接, 默认 true */
  secure?: boolean | Object;

  /** 在云信管理后台查看应用的 appKey */
  appKey: string;

  /** 帐号, 应用内唯一 */
  account: string;

  /** 帐号的 token, 用于建立连接 */
  token: string;

  /** 聊天室 id */
  chatroomId: string;

  /** 聊天室地址列表 */
  chatroomAddresses: string[];

  /** nos文件存储全局配置，存储场景，实例有效，默认 chatroom */
  nosScenes?: string;

  /** nos文件存储全局配置，存储有效时间，实例有效，默认 Infinity ，不得小于一天，单位秒 */
  nosSurvivalTime?: number;

  /** 进入聊天室后展示的昵称, 如果不设置并且托管了用户资料, 那么使用用户资料里面的昵称 */
  chatroomNick?: string;

  /** 进入聊天室后展示的头像, 如果不设置并且托管了用户资料, 那么使用用户资料里面的头像 */
  chatroomAvatar?: string;

  /**
   * 扩展字段, 设置了之后, 通过 getChatroomMembers 获取的聊天室成员信息会包含此字段
   * - 推荐使用 JSON 格式构建, 非 JSON 格式的话，Web 端会正常接收, 但是会被其它端丢弃
   */
  chatroomCustom?: string;

  /**
   * 扩展字段, 如果填了, 那么其它聊天室成员收到的聊天室通知消息的 attach.custom 的值为此字段
   * - 推荐使用 JSON 格式构建, 非 JSON 格式的话，Web 端会正常接收, 但是会被其它端丢弃
   */
  chatroomEnterCustom?: string;

  /** 连接建立后的回调, 会传入聊天室信息 */
  onconnect?: (data: { chatroom: ChatroomInfo; member: ChatroomMember }) => void;

  /**
   * 即将重连的回调
   * - 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
   * - 此回调会收到一个对象, 包含额外的信息, 有以下字段
   *    - duration: 距离下次重连的时间
   *    - retryCount: 重连尝试的次数
   */
  onwillreconnect?: Function;

  /** SDK尝试重连的最大次数，超过后则不再尝试重连，并触发 ondisconnect 回调 */
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
  ondisconnect?: Function;

  /** 发生错误的回调, 会传入错误对象 */
  onerror?: (error: NIMError, object: any) => void;

  /** 收到消息的回调, 会传入消息数组 */
  onmsgs?: (msgs: Message[]) => void;
}

export interface Message {
  /** 聊天室 ID */
  chatroomId: string;

  /** SDK生成的消息id, 在发送消息之后会返回给开发者, 开发者可以在发送消息的结果回调里面根据这个ID来判断相应消息的发送状态, 到底是发送成功了还是发送失败了, 然后根据此状态来更新页面的UI。如果发送失败, 那么可以重新发送此消息 */
  idClient: string;

  /** 消息发送方, 帐号 */
  from: string;

  /** 消息发送方的昵称 */
  fromNick: string;

  /** 消息发送方的头像 */
  fromAvatar: string;

  /** 消息发送方的扩展字段 */
  fromCustom: string;

  /** 发送方的设备类型 */
  fromClientType: string;

  /** 消息类型 */
  type: string;

  /**
   * 消息的流向
   * - 'in'表示此消息是收到的消息
   * - 'out'表示此消息是发出的消息
   */
  flow: string;

  /** 是否跳过存云端历史, false: 不跳过,true: 跳过存历史,默认 false */
  skipHistory?: boolean;

  /** 文本消息的文本内容, 请参考发送聊天室文本消息 */
  text?: string;

  /** 文件消息的文件对象, 具体字段请参考图片对象、音频对象、视频对象和文件对象, 请参考发送聊天室文件消息 */
  file?: object;

  /** 地理位置消息的地理位置对象, 请参考发送聊天室地理位置消息 */
  geo?: object;

  /** 提醒消息的内容, 请参考发送聊天室提醒消息 */
  tip?: string;

  /** 自定义消息的消息内容, 开发者可以自行扩展, 建议封装成JSON格式字符串, 请参考发送聊天室自定义消息 */
  content?: string;

  /** 聊天室通知消息的附加信息, 参考聊天室通知消息的类型来查看详细解释 */
  attach?: object;

  /**
   * 扩展字段
   * - 推荐使用 JSON 格式构建, 非 JSON 格式的话, Web 端会正常接收, 但是会被其它端丢弃
   */
  custom?: string;

  /** 是否是重发的消息 */
  resend: boolean;

  /** 时间戳 */
  time: number;

  /** 服务器第三方回调的扩展字段 */
  callbackExt: string;

  /** 开发者自定义的消息子类型，格式为大于0的整数 */
  subType: number;
}

export interface ChatroomMember {
  /** 聊天室 ID */
  chatroomId: string;

  /** 账号 */
  account: string;

  /** 聊天室内的昵称 */
  nick: string;

  /** 聊天室内的头像 */
  avatar: string;

  /**
   * 聊天室成员类型。聊天室成员分为固定成员和游客两种。固定成员又分为房主、管理员、普通成员和受限成员四种。禁言用户和拉黑用户都属于受限用户。
   * - 'owner' (房主)
   * - 'manager' (管理员)
   * - 'restricted' (受限制, 被拉黑或者禁言)
   * - 'unset' (未设置)
   * - 'common' (普通成员)
   * - 'guest' (游客)
   * - 'anonymous' (匿名非注册用户，非云信注册用户)
   */
  type: 'owner' | 'manager' | 'restricted' | 'unset' | 'common' | 'guest' | 'anonymous';

  /** 是否是游客 */
  guest: string;

  /** 是否被拉黑 */
  blacked: string;

  /** 是否被禁言 */
  gaged: string;

  /** 级别 */
  level: number;

  /** 是否在线, 只有固定成员才能离线, 对游客而言只能是在线 */
  online: boolean;

  /** 进入聊天室的时间, 如果离线, 无该字段 */
  enterTime: number;

  /** 第三方扩展字段 */
  custom: string;

  /** 更新时间 */
  updateTime: number;

  /** 是否被临时禁言 */
  tempMuted: boolean;

  /** 临时禁言剩余时长 */
  tempMuteDuration: number;
}

export interface GetChatroomMembersOptions {
  /**
   * true 表示获取游客, false 表示获取非游客成员
   * - true 为获取游客列表，默认按加入加入聊天室时间倒序排列
   * - false 为获取非游客（即固定成员）列表，按照成为固定成员的时间倒序排列，默认获取所有（包括不在线的）固定成员
   */
  guest: boolean;

  /**
   * 对 guest=true 时生效
   * - true 为加入聊天室时间降序排列（即加入时间晚的排前面）
   * - false 为加入聊天室时间升序排列（即加入时间晚的排后面）
   */
  desc?: boolean;

  /**
   * 对 guest=false 时生效
   * - true 只获取在线的固定成员
   * - false 获取所有（包括不在线的）固定成员
   */
  onlyOnline?: boolean;

  /**
   * 分页用, 查找该时间戳之前的成员
   * - 默认 0 代表当前服务器时间
   * - 获取游客时, 此字段填上次获取的最后一个游客的 enterTime
   * - 获取非游客时, 此字段填上次获取的最后一个非游客的 updateTime
   */
  time?: number;

  /** 分页用, 默认 100 */
  limit?: number;
}

export interface GetChatroomMembersResult extends Pick<GetChatroomMembersOptions, 'time' | 'limit'> {
  type: number;
  members: ChatroomMember[];
}

export interface GetChatroomMembersInfoOptions {
  /** 待查询的账号列表, 每次最多20个 */
  accounts: string[];
}

export interface GetChatroomMembersInfoResult extends GetChatroomMembersInfoOptions {
  members: ChatroomMember[];
}

export interface DropResult {
  data: any;
  content: any;
}

export interface GetHistoryMsgsOptions {
  /** 时间戳 */
  timetag?: number;

  /** limit, 默认 100 */
  limit?: number;

  /** 默认 false 表示从 timetag 开始往前查找历史消息 */
  reverse?: boolean;

  /** 消息类型列表，默认全部消息类型 */
  msgTypes?: string[];
}

export interface GetHistoryMsgsResult extends GetHistoryMsgsOptions {
  msgs: Message[];
}
