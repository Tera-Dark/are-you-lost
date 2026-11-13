import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import rough from 'roughjs';
import {
  AlarmClock,
  FileText,
  Link2,
  MessageSquare,
  Music2,
  PhoneMissed,
  Plane,
  Receipt,
  Send,
} from 'lucide-react';
import type { PropEvent } from '../types/narrative';

interface StoryPropCardProps {
  prop: PropEvent;
}

type PropIconKind =
  | 'msg'
  | 'link'
  | 'sent'
  | 'receipt'
  | 'note'
  | 'phone'
  | 'music'
  | 'plane'
  | 'alarm';

interface PropContent {
  sender: string;
  time: string;
  body: string;
  tone: 'work' | 'rent' | 'mom' | 'sent' | 'quiet';
  icon: PropIconKind;
}

const PROP_DATA: Record<Exclude<PropEvent, 'none'>, PropContent> = {
  msg_work: {
    sender: '品牌部大群 (48)',
    time: '23:41',
    body: '@所有人 周末注意看消息，周一早会前随时配合微调。',
    tone: 'work',
    icon: 'msg',
  },
  msg_rent: {
    sender: '房屋中介 · 陈姐',
    time: '23:41',
    body: '[语音转文字] 下个月租期到了，房东说要微调三百，明早给个准信。',
    tone: 'rent',
    icon: 'msg',
  },
  msg_mom: {
    sender: '妈',
    time: '19:20 · 未读',
    body: '今年省考与事业单位汇总表出来了，你抽空看看',
    tone: 'mom',
    icon: 'link',
  },
  sent_ok: {
    sender: '已发送至 品牌部大群',
    time: '23:42',
    body: '收到 :)',
    tone: 'sent',
    icon: 'sent',
  },
  msg_boss_dm: {
    sender: '周哥 · 品牌总监',
    time: '23:54',
    body: '小陈，云盘第八版刚看了，有两页数据口径明天抽空再核一遍，辛苦。',
    tone: 'work',
    icon: 'msg',
  },
  job_rejected: {
    sender: '招聘进展通知',
    time: '今天 · 第 4 次',
    body: '你投递的【资深品牌策划】已被对方标记为“暂不匹配”。',
    tone: 'rent',
    icon: 'note',
  },
  draft_note: {
    sender: '手机备忘录 · 2021.10',
    time: '置顶草稿',
    body: '“二十八岁之前，想做出一个真正只署自己名字的作品，哪怕很小。”',
    tone: 'mom',
    icon: 'note',
  },
  bill_reminder: {
    sender: '手机银行 · 待还提醒',
    time: '3 日后到期',
    body: '本月房租 2,850 元及账单合计 4,320 元，请留意卡内余额。',
    tone: 'rent',
    icon: 'receipt',
  },
  msg_roommate: {
    sender: '室友 · 阿哲',
    time: '00:22',
    body: '冰箱上层剩的半个西瓜你吃了吧，我明早七点高铁去苏州，钥匙放鞋柜了。',
    tone: 'quiet',
    icon: 'msg',
  },
  msg_classmate: {
    sender: '2019届304宿舍',
    time: '00:52',
    body: '兄弟们，下个月回老家办婚礼，顺便在新区买了套三居。你们还在一线卷吗？',
    tone: 'work',
    icon: 'msg',
  },
  msg_friend_call: {
    sender: '陆远',
    time: '00:31',
    body: '还没睡呢？刚才路过你们写字楼，看见十二层还亮着两排灯。',
    tone: 'mom',
    icon: 'msg',
  },
  call_home_missed: {
    sender: '妈 · 微信语音',
    time: '响铃 38 秒',
    body: '“已取消” — 上一条对话停在春节的“我这边挺好的”。',
    tone: 'quiet',
    icon: 'phone',
  },
  music_share: {
    sender: '深夜播放列表',
    time: '单曲循环 42 分钟',
    body: '《末班车以后》 · 耳机电量剩余 14%',
    tone: 'quiet',
    icon: 'music',
  },
  msg_lin_resume: {
    sender: '林哥递过来的纸巾背面',
    time: '02:38',
    body: '写着三行字：半年备用金数额 / 一件不看KPI想做的事 / 一通真正想打的电话。',
    tone: 'mom',
    icon: 'note',
  },
  flight_on: {
    sender: '系统状态',
    time: '03:55',
    body: '已开启飞行模式 · 27 条群消息与推送暂已收起',
    tone: 'sent',
    icon: 'plane',
  },
  alarm_set: {
    sender: '闹钟 · 工作日',
    time: '07:30',
    body: '距离清晨闹钟响起，还剩 2 小时 12 分钟。',
    tone: 'rent',
    icon: 'alarm',
  },
  msg_mom_reply: {
    sender: '妈',
    time: '05:36',
    body: '累了就先睡一觉，周末我们开视频慢慢说，别什么事都一个人硬扛。',
    tone: 'mom',
    icon: 'msg',
  },
  msg_self_note: {
    sender: '新建备忘录 · 今天',
    time: '05:34',
    body: '今天下班后，给自己留出一小时不被任何人打扰的空白。',
    tone: 'mom',
    icon: 'note',
  },
};

function renderPropIcon(icon: PropIconKind) {
  const cls = 'w-3.5 h-3.5';
  switch (icon) {
    case 'link':
      return <Link2 className={cls} strokeWidth={1.7} />;
    case 'sent':
      return <Send className={cls} strokeWidth={1.7} />;
    case 'receipt':
      return <Receipt className={cls} strokeWidth={1.7} />;
    case 'note':
      return <FileText className={cls} strokeWidth={1.7} />;
    case 'phone':
      return <PhoneMissed className={cls} strokeWidth={1.7} />;
    case 'music':
      return <Music2 className={cls} strokeWidth={1.7} />;
    case 'plane':
      return <Plane className={cls} strokeWidth={1.7} />;
    case 'alarm':
      return <AlarmClock className={cls} strokeWidth={1.7} />;
    default:
      return <MessageSquare className={cls} strokeWidth={1.7} />;
  }
}

export function StoryPropCard({ prop }: StoryPropCardProps) {
  const borderPaths = useMemo(() => {
    const gen = rough.generator({ options: { seed: 204 } });
    return {
      default: gen.toPaths(
        gen.rectangle(3, 3, 314, 78, {
          stroke: 'rgba(234, 230, 223, 0.34)',
          strokeWidth: 1.3,
          roughness: 1.6,
          bowing: 1.3,
        })
      ),
      warm: gen.toPaths(
        gen.rectangle(3, 3, 314, 78, {
          stroke: 'rgba(226, 168, 86, 0.65)',
          strokeWidth: 1.4,
          roughness: 1.6,
          bowing: 1.3,
        })
      ),
    };
  }, []);

  const data = prop !== 'none' ? PROP_DATA[prop] : null;
  const isWarm = data?.tone === 'mom';
  const shouldShake =
    data && data.tone !== 'sent' && data.tone !== 'quiet' && data.icon !== 'note';

  return (
    <AnimatePresence mode="wait">
      {data && (
        <motion.div
          key={prop}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            x: shouldShake ? [0, -2.5, 2.5, -1.5, 1.5, 0] : 0,
          }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{
            opacity: { duration: 0.28 },
            y: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.38, delay: 0.08 },
          }}
          className="relative w-full max-w-[380px] mx-auto px-4 py-3 bg-[#15151B]/95 rounded-xl"
        >
          {/* Hand-drawn sketchy notification / artifact frame */}
          <svg
            viewBox="0 0 320 84"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {(isWarm ? borderPaths.warm : borderPaths.default).map((p, idx) => (
              <motion.path
                key={`${prop}-b-${idx}`}
                d={p.d}
                stroke={p.stroke}
                strokeWidth={p.strokeWidth}
                fill="none"
                initial={{ pathLength: 0.2 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            ))}
          </svg>

          <div className="relative z-10 flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
                isWarm
                  ? 'border-[#E2A856]/40 bg-[#E2A856]/10 text-[#E2A856]'
                  : data.tone === 'sent'
                    ? 'border-[#8AB4E0]/40 bg-[#8AB4E0]/10 text-[#8AB4E0]'
                    : 'border-white/15 bg-white/[0.04] text-[#EAE6DF]/80'
              }`}
            >
              {renderPropIcon(data.icon)}
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-sans-ui text-xs font-medium truncate ${
                    isWarm ? 'text-[#E2A856]' : 'text-[#EAE6DF]/90'
                  }`}
                >
                  {data.sender}
                </span>
                <span className="font-sans-ui text-[11px] text-[#8A867E] tabular-nums shrink-0">
                  {data.time}
                </span>
              </div>
              <p className="font-sans-ui text-[13px] leading-[1.55] text-[#D8D3CA]">
                {data.body}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
