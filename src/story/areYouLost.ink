VAR agency = 0
VAR honesty = 0
VAR bond = 0
VAR compromise = 0
VAR leave_city = 0
VAR craft = 0

VAR replied_work = false
VAR replied_boss = false
VAR checked_bank = false
VAR texted_friend = false
VAR talked_roommate = false
VAR opened_draft = false
VAR closed_laptop = false
VAR called_mom_stopped = false
VAR flight_mode = false
VAR admitted_lost = false
VAR ending_id = ""

-> prologue

=== prologue ===
序幕 · 23:40 · 末班地铁 #act:序幕 · 末班地铁 #scene:subway #mood:rain #visual:default #prop:none #anim:title-card #sfx:bell
周五晚上十一点四十。 #act:序幕 · 末班地铁 #scene:subway #mood:rain #visual:default #prop:none #anim:fade-rise #sfx:turn
我刚把客户端发来的“周一就要”的第八版方案传上云盘，赶在闸机落锁前跨进了末班地铁。 #scene:subway #mood:rain #visual:default #prop:none #anim:fade-rise #sfx:none
写字楼冷气很足，走出地面才发现城市一直在下细雨。风衣袖口还沾着办公室打印机边上的碳粉味。 #scene:subway #mood:rain #visual:default #prop:none #anim:fade-rise #sfx:none
站台玻璃棚外雨丝斜斜划过灯柱。手机在口袋里连续震了三下—— #scene:subway #mood:rain #visual:phone_glow #prop:none #anim:typewriter #sfx:buzz
第一条来自部门大群： #scene:subway #mood:tension #visual:phone_glow #prop:msg_work #anim:fade-rise #sfx:msg
第二条是房屋中介发来的语音转文字： #scene:subway #mood:tension #visual:phone_glow #prop:msg_rent #anim:tremble #sfx:msg
第三条停在列表最下面，是我妈傍晚发来的链接： #scene:subway #mood:memory #visual:phone_glow #prop:msg_mom #anim:blur-focus #sfx:msg

列车还没进站。空荡荡的屏蔽门玻璃上，映出一张有些陌生的脸——眼圈发青，肩膀习惯性地微微前倾。 #scene:subway #mood:night #visual:default #prop:none #anim:fade-rise #sfx:none
我想起早上出门时，楼道镜子里的自己好像也是这个姿势。像一张拉久了、忘记松开的弓。 #scene:subway #mood:night #visual:default #prop:none #anim:fade-rise #sfx:none
!!我们每天都在赶“下一个截止时间”，可这些节点，@@到底有哪一个是为我自己设的？@@!! #scene:subway #mood:night #visual:default #prop:none #anim:blur-focus #sfx:emphasis

* [在部门群里秒回一句“收到”，免得明天一早心里发慌]
    ~ compromise = compromise + 1
    ~ replied_work = true
    -> prologue_reply_work
* [把所有未读红点划掉，抬头看看雨夜里那盏孤零零的站台灯]
    ~ agency = agency + 1
    ~ honesty = honesty + 1
    -> prologue_ignore
* [点开母亲发来的链接，滑动两屏后又默默按灭了屏幕]
    ~ honesty = honesty + 1
    ~ bond = bond + 1
    -> prologue_mom_link

=== prologue_reply_work ===
手指比脑子更快。打出“收到”发出去的时候，我还顺手补了一个微笑表情。 #scene:subway #mood:tension #visual:phone_glow #prop:sent_ok #anim:typewriter #sfx:msg
((只要回得够快，别人就会以为你永远精力充沛、永远情绪稳定、永远随时待命。)) #scene:subway #mood:tension #visual:phone_glow #prop:none #anim:whisper #sfx:none
手机屏幕的冷光照亮了半张脸。直到把手机插回兜里，大拇指关节还在隐隐发酸。 #scene:subway #mood:night #visual:default #prop:none #anim:fade-rise #sfx:turn
-> prologue_train

=== prologue_ignore ===
屏幕暗下去的那一秒，站台暖黄色的灯光透过细雨漫开了一圈柔光。 #scene:subway #mood:stillness #visual:calm_halo #prop:none #anim:blur-focus #sfx:chime
原来把那块六英寸的发光玻璃反扣在掌心，世界并不会立刻崩塌。 #scene:subway #mood:stillness #visual:calm_halo #prop:none #anim:fade-rise #sfx:none
[[只是周围一安静下来，心底那点被忙碌盖住的空落感，反而震耳欲聋。]] #scene:subway #mood:night #visual:calm_halo #prop:none #anim:whisper #sfx:emphasis
-> prologue_train

=== prologue_mom_link ===
密密麻麻的岗位表在屏幕上滑不到底，从市属档案局到县医院行政岗，每一行都被人提前划过荧光笔似的整齐。 #scene:subway #mood:memory #visual:phone_glow #prop:none #anim:fade-rise #sfx:turn
我知道她不是在逼我，她只是在新闻里刷到太多裁员报道后，怕我在大城市摔了没人扶。 #scene:subway #mood:memory #visual:phone_glow #prop:none #anim:fade-rise #sfx:none
%%可一想到要按别人替我圈好的安全线过完往后三十年，胸口就像被一只看不见的手轻轻攥紧。%% #scene:subway #mood:tension #visual:default #prop:none #anim:tremble #sfx:none
我没有回复。也许我怕的不是吃苦，而是[[一旦妥协，就再也找不到理由为自己冒险。]] #scene:subway #mood:night #visual:default #prop:none #anim:whisper #sfx:chime
-> prologue_train

=== prologue_train ===
列车进站时带起一阵潮湿的风。末班车厢里只有三四个人，彼此隔着最远的扶手，默契地不看对方的脸。 #scene:subway #mood:night #visual:default #prop:none #anim:fade-rise #sfx:turn
我靠着冰凉的车门站定，戴上降噪耳机。播放列表依然停在昨晚睡前的那一首： #scene:subway #mood:night #visual:default #prop:music_share #anim:fade-rise #sfx:none
隔着过道，斜对面坐着一个穿米色针织衫的姑娘，怀里抱着的帆布袋露出一角没来得及喝的冰奶茶，整个人靠着铁杆睡得一晃一晃； #scene:subway #mood:memory #visual:default #prop:none #anim:fade-rise #sfx:none
再往右两排，一个头发微白的中年男人正把平板架在膝盖上，老花镜滑到鼻尖，手指放大了密密麻麻的报表，又慢吞吞地往回缩。 #scene:subway #mood:night #visual:default #prop:none #anim:fade-rise #sfx:none
地铁穿进隧道，车窗彻底变成一面黑镜子。在漫长的轰鸣声里，我的视线不由自主地停在—— #scene:subway #mood:night #visual:default #prop:none #anim:blur-focus #sfx:none

* [对面那个抱包睡着的姑娘——她大概也在赶一份明天谁都不会记得的报告吧]
    ~ honesty = honesty + 1
    -> train_girl
* [那个还在盯报表的男人——二十年后的自己，是不是也会坐在这个位置上]
    ~ honesty = honesty + 1
    ~ leave_city = leave_city + 1
    -> train_man
* [黑漆漆的车窗里我自己的眼睛——为什么越想抓紧什么，越觉得手里空空的]
    ~ agency = agency + 1
    -> train_self

=== train_girl ===
她怀里的塑料袋上印着某家连锁咖啡的logo，杯壁凝出的水珠已经把收据小票打湿了一半。 #scene:subway #mood:memory #visual:default #prop:none #anim:fade-rise #sfx:none
列车急刹了一小下，她猛地惊醒，第一反应不是看站名，而是下意识伸手去摸膝盖上的笔记本电脑包。 #scene:subway #mood:tension #visual:default #prop:none #anim:fade-rise #sfx:none
((原来大家都是这样，在睡梦里也把“别出差错”攥得死紧。)) #scene:subway #mood:night #visual:default #prop:none #anim:whisper #sfx:emphasis
-> prologue_boss_dm

=== train_man ===
报站广播响到第三站时，他摘下眼镜揉了揉眉心，屏幕光在他眼角的皱纹里晃来晃去。 #scene:subway #mood:memory #visual:default #prop:none #anim:fade-rise #sfx:none
我忽然有点分不清，我们嘴里常说的“熬出头”，究竟是到达了某个地方，还是只是换了一副更贵的工牌继续赶路。 #scene:subway #mood:night #visual:default #prop:none #anim:blur-focus #sfx:emphasis
-> prologue_boss_dm

=== train_self ===
车窗玻璃随着轨道接缝微微震动，我的倒影也跟着碎成一小块一小块。 #scene:subway #mood:night #visual:default #prop:none #anim:fade-rise #sfx:none
二十二岁刚毕业那年，我觉得自己能记住每个地铁站的名字和每一条街的夕阳；可今年二十七岁，我甚至记不清上一次认真抬头看天是什么时候。 #scene:subway #mood:memory #visual:default #prop:none #anim:blur-focus #sfx:emphasis
-> prologue_boss_dm

=== prologue_boss_dm ===
地铁驶出高架桥的一瞬，微弱的4G信号重新连上了。屏幕顶端悄悄亮起一条私聊： #scene:subway #mood:tension #visual:phone_glow #prop:msg_boss_dm #anim:fade-rise #sfx:msg
“明天抽空再核一遍”。短短六个字，却像把整个双休日先替我签了字。 #scene:subway #mood:tension #visual:phone_glow #prop:none #anim:tremble #sfx:none
我盯着对话框底端跳动的光标，停顿了几秒—— #scene:subway #mood:tension #visual:phone_glow #prop:none #anim:typewriter #sfx:tick

* [回复“好的周哥，明早十点前核好发您”——反正躲不过，早点安抚好对方]
    ~ compromise = compromise + 1
    ~ replied_boss = true
    -> boss_reply_yes
* [先截图拖进待办清单，不点开已读，假装自己在地铁盲区]
    ~ agency = agency + 1
    -> boss_reply_delay
* [没有点开那条私聊，反而习惯性切去招聘软件刷新，却刚好弹出通知]
    ~ honesty = honesty + 1
    -> boss_reply_job

=== boss_reply_yes ===
“好的周哥”四个字打起来无比顺滑。发完之后，我甚至能想象出对方在沙发上满意地点点头、然后安心去睡觉的样子。 #scene:subway #mood:tension #visual:phone_glow #prop:none #anim:fade-rise #sfx:turn
((而我明天的上午，就这样在凌晨前被低价预支了出去。)) #scene:subway #mood:night #visual:default #prop:none #anim:whisper #sfx:none
-> prologue_2021

=== boss_reply_delay ===
把消息框滑出视线之外的那两秒，我甚至生出一点微小的报复感——好像只要我不点开，周末就还完整地属于我自己。 #scene:subway #mood:night #visual:default #prop:none #anim:fade-rise #sfx:turn
可心底清楚，那个未读小红点明天早上还是会准时在枕边亮起来。 #scene:subway #mood:night #visual:default #prop:none #anim:fade-rise #sfx:none
-> prologue_2021

=== boss_reply_job ===
屏幕上方弹出一条冷冰冰的系统通知： #scene:subway #mood:tension #visual:phone_glow #prop:job_rejected #anim:fade-rise #sfx:msg
不是因为能力不行，更多时候只是因为简历上“二十七岁”“非大厂背景”或者“期望薪资高了一千”。 #scene:subway #mood:tension #visual:phone_glow #prop:none #anim:fade-rise #sfx:none
%%被现有的工作消耗着，同时又在人才市场里被反复标价、反复驳回。%% #scene:subway #mood:tension #visual:default #prop:none #anim:tremble #sfx:emphasis
-> prologue_2021

=== prologue_2021 ===
列车到站。走出站口长长的扶梯时，冷风灌进领口。 #scene:subway #mood:rain #visual:default #prop:none #anim:fade-rise #sfx:turn
在翻找雨伞的那几秒里，指尖误触打开了手机备忘录的置顶页——那是一条写于三年前、一直没舍得删的短句： #scene:subway #mood:memory #visual:phone_glow #prop:draft_note #anim:blur-focus #sfx:chime
三年前打字的时候，我还以为二十八岁是一个很远、足够把一切都变成现实的年纪。 #scene:subway #mood:memory #visual:default #prop:none #anim:fade-rise #sfx:none
!!看着屏幕里那个二十四岁的自己，我忽然很想替他问一句：@@后来我们为什么慢慢不再提这件事了？@@!! #scene:subway #mood:memory #visual:calm_halo #prop:none #anim:blur-focus #sfx:emphasis

* [“那时候太天真，不知道房租、社保和生病会教人做人”]
    ~ compromise = compromise + 1
    ~ honesty = honesty + 1
    -> act_alley
* [“其实那个念头一直躲在心里，只是我越来越不敢抬头看它”]
    ~ craft = craft + 2
    ~ honesty = honesty + 1
    -> act_alley
* [“我不是忘了，我只是总在等——等手头宽裕一点再开始”]
    ~ agency = agency + 1
    -> act_alley

=== act_alley ===
第一幕 · 00:15 · 积水老巷 #act:第一幕 · 积水老巷 #scene:alley #mood:rain #visual:streetlight #prop:none #anim:title-card #sfx:bell
穿过主干道再拐进两道窄巷，就是我住了三年的老小区。 #act:第一幕 · 积水老巷 #scene:alley #mood:rain #visual:streetlight #prop:none #anim:fade-rise #sfx:turn
路边铁皮棚下的烤串摊刚拉下卷帘门，油烟混着青草和湿水泥的味道贴在地面上。 #scene:alley #mood:rain #visual:streetlight #prop:none #anim:fade-rise #sfx:none
一个穿黄雨衣的外卖骑手蹲在路灯底下，用袖口擦干手机膜上的雨水，盯着导航路线叹了口气，又拧动电门冲进了雨幕里。 #scene:alley #mood:rain #visual:streetlight #prop:none #anim:fade-rise #sfx:none
墙根下蹲着一只花斑流浪猫，琥珀色的眼睛在车灯余光里亮了一下，又缩回生锈的三轮车底下。 #scene:alley #mood:night #visual:streetlight #prop:none #anim:fade-rise #sfx:none

踩过一块积水松动的地砖时，裤脚还是湿了半截。手机却在这时跳出一条银行待还提醒： #scene:alley #mood:tension #visual:streetlight #prop:bill_reminder #anim:typewriter #sfx:msg
加上刚才中介提到的那三百块涨租，下个月工资还没捂热，一半就已经提前有了去处。 #scene:alley #mood:tension #visual:streetlight #prop:none #anim:fade-rise #sfx:none
走到单元门生锈的铁门前，我一时没有掏钥匙—— #scene:alley #mood:night #visual:streetlight #prop:none #anim:blur-focus #sfx:none

* [在漏雨的窄棚下站三分钟，听雨滴敲在铁皮上的声音]
    ~ agency = agency + 1
    -> alley_wind
* [站在路灯底下点开手机银行，一笔一笔把存款和能撑的月数算清楚]
    ~ honesty = honesty + 1
    ~ checked_bank = true
    -> alley_bank
* [翻出很少联系的通讯录，给同在这座城市打拼的老友陆远发去一句“睡了吗”]
    ~ bond = bond + 2
    ~ texted_friend = true
    -> alley_friend

=== alley_wind ===
铁皮雨棚发出咚咚的轻响，像是替整条巷子数着零点以后的心跳。 #scene:alley #mood:stillness #visual:streetlight #prop:none #anim:blur-focus #sfx:chime
巷子口那盏接触不良的路灯闪了两下，把积水里的倒影拉长又折断。 #scene:alley #mood:stillness #visual:streetlight #prop:none #anim:fade-rise #sfx:none
[[有些疲惫并不是因为今天干了多少活，而是因为看不见这条巷子通向哪一个不一样的明天。]] #scene:alley #mood:night #visual:streetlight #prop:none #anim:whisper #sfx:emphasis
我抖了抖伞上的水，推开了吱呀作响的铁门。 #scene:alley #mood:night #visual:default #prop:none #anim:fade-rise #sfx:turn
-> act_room

=== alley_bank ===
把活期余额、定期存款和下个月预留房租加减一遍之后，屏幕上剩下那个数字安静地停在那里。 #scene:alley #mood:tension #visual:streetlight #prop:none #anim:typewriter #sfx:tick
其实足够一个人安稳吃穿半年。可奇怪的是，哪怕账面并没有山穷水尽，心口那种“只要停下来就会被淘汰”的恐惧却一点也没有少。 #scene:alley #mood:tension #visual:streetlight #prop:none #anim:fade-rise #sfx:none
%%我们到底是在害怕贫穷，还是害怕脱离了既定轨道之后，连自己是谁都解释不清？%% #scene:alley #mood:night #visual:streetlight #prop:none #anim:tremble #sfx:emphasis
-> act_room

=== alley_friend ===
本来以为这个点他早就睡了，没想到不到二十秒屏幕就震了一下： #scene:alley #mood:memory #visual:streetlight #prop:msg_friend_call #anim:fade-rise #sfx:msg
我们上次见面还是去年秋天在街边吃大排档。那时他说等忙完这轮融资就找个周末去爬山，结果一转眼又快入冬了。 #scene:alley #mood:memory #visual:streetlight #prop:none #anim:fade-rise #sfx:none
我回了一句“刚到楼下”，收起手机时，掌心总算没有刚才那么凉。 #scene:alley #mood:stillness #visual:streetlight #prop:none #anim:fade-rise #sfx:chime
-> act_room

=== act_room ===
第二幕 · 00:45 · 十平米合租屋 #act:第二幕 · 合租屋 #scene:room #mood:night #visual:laptop_off #prop:none #anim:title-card #sfx:bell
楼道里的声控灯上个月就坏了，我摸黑踩上二楼，顺手按亮了手机电筒。 #act:第二幕 · 合租屋 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:turn
这间三居室被房东多隔出一间，住了四户互不干涉的年轻人。门缝底下透出不同的生活声音：主卧在低声开着外企的深夜越洋会议，次卧传出断断续续的吹风机嗡鸣。 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:none
刚脱下湿漉漉的球鞋，我就看见鞋柜旁边整整齐齐摞着两个封好胶带的搬家纸箱。紧接着微信跳出一条消息—— #scene:room #mood:memory #visual:laptop_off #prop:msg_roommate #anim:fade-rise #sfx:msg

阿哲是前年和我前后脚搬进来的，在附近一家做外包的小软件公司写前端。去年冬天我们还在公用厨房一起煮过一次九块九的速冻水饺。 #scene:room #mood:memory #visual:laptop_off #prop:none #anim:fade-rise #sfx:none
他的房间门半掩着，台灯还亮着一角暖光，能听见里面拉链拉合的声音。 #scene:room #mood:memory #visual:laptop_off #prop:none #anim:blur-focus #sfx:none

* [轻轻敲两下门，进去跟他道个别，顺便问问他怎么下决心走的]
    ~ honesty = honesty + 1
    ~ leave_city = leave_city + 1
    ~ bond = bond + 1
    ~ talked_roommate = true
    -> room_azhe_talk
* [看一眼时间快一点了，不打扰他休息，只是把冰箱上层的西瓜端回屋里]
    ~ compromise = compromise + 1
    -> room_azhe_silent
* [站在空出一半的鞋架前发了会儿呆，突然觉得这间屋子比刚才更静了]
    ~ honesty = honesty + 1
    -> room_azhe_empty

=== room_azhe_talk ===
我敲门进去时，阿哲正蹲在空荡荡的铁架床边把最后一个插线板塞进背包。他抬头笑了笑，眼底也有熬夜的红血丝，却明显松快了不少。 #scene:room #mood:memory #visual:laptop_off #prop:none #anim:fade-rise #sfx:turn
“苏州那边工资少了个两千多吧，”他倚着纸箱喝了口矿泉水，“但房租直接砍半，骑电驴十五分钟就到公司，下班还能绕去护城河边走两圈。” #scene:room #mood:memory #visual:laptop_off #prop:none #anim:fade-rise #sfx:none
我问他算不算退缩。他摆摆手，指了指窗台边那盆他养了一年、实在带不走的小绿萝： #scene:room #mood:stillness #visual:laptop_off #prop:none #anim:blur-focus #sfx:none
[[“这里不缺聪明人，也不缺肯熬夜的人。我只是不想三十五岁那年，连一盆自己养活的绿植都因为搬家太麻烦而丢在楼下。”]] #scene:room #mood:stillness #visual:laptop_off #prop:none #anim:whisper #sfx:emphasis
他说如果我哪天路过苏州，记得找他吃面。我回了自己房间，把那句祝福在心里默念了一遍。 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:turn
-> room_desk

=== room_azhe_silent ===
打开那台总是嗡嗡作响的旧冰箱时，冷气扑在脸上。最上层果然整整齐齐用保鲜膜包着半个西瓜，旁边还留了一张便利贴：“记得吃，别坏了”。 #scene:room #mood:memory #visual:laptop_off #prop:none #anim:fade-rise #sfx:turn
我端着碗回到自己房间。合租三年，大家像住在同一艘夜航船上的陌生客，最深的交情也不过是互相帮忙收一次快递、在群里提醒一句“厕所灯忘了关”。 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:none
((明天七点以后，连那个偶尔在玄关互相点个头的人，也要下船去下一站了。)) #scene:room #mood:night #visual:laptop_off #prop:none #anim:whisper #sfx:emphasis
-> room_desk

=== room_azhe_empty ===
鞋架第二层空出一大块干净的塑料格子，印着两道浅浅的运动鞋压痕。 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:none
这几年身边的人走了一批又一批：有的回了省会考编，有的去了二线新园区，剩下的继续在清晨七点半挤进同一条换乘通道。 #scene:room #mood:memory #visual:laptop_off #prop:none #anim:fade-rise #sfx:none
我关上自己的房门，听见门锁落下的咔哒一声，把十平米的安静彻底关在了里面。 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:turn
-> room_desk

=== room_desk ===
拧开桌上那盏三十九块买来的小台灯，角落里还放着晚饭剩下一半、早已凉透的轻食盒，旁边笔记本电脑还处于休眠后的亮屏状态—— #scene:room #mood:night #visual:laptop_on #prop:none #anim:blur-focus #sfx:none
屏幕左半边，是投了三十多份、大多石沉大海或停在“已读”的求职软件； #scene:room #mood:tension #visual:laptop_on #prop:none #anim:fade-rise #sfx:none
右半边，是我建了半年、却始终因为“怕写得不够好、怕太矫情、怕没人看”而停在第三千字的个人手记文档。 #scene:room #mood:memory #visual:laptop_on #prop:none #anim:typewriter #sfx:tick

就在这时，沉寂了两个月的大学宿舍群突然跳出一条艾特所有人的喜讯： #scene:room #mood:memory #visual:laptop_on #prop:msg_classmate #anim:fade-rise #sfx:msg
紧接着群里炸开一长串热热闹闹的“恭喜老板”“人生赢家”“早生贵子”，红包雨一连刷了十几条。 #scene:room #mood:tension #visual:laptop_on #prop:none #anim:fade-rise #sfx:none
我默默点开那个五块八毛钱的红包，手指停在“谢谢老板”四个字上迟迟没按发送。 #scene:room #mood:tension #visual:laptop_on #prop:none #anim:fade-rise #sfx:none

* [心里还是酸了一下——二十七岁了，别人都有房有家，我还在算下月房租]
    ~ honesty = honesty + 1
    ~ compromise = compromise + 1
    -> room_peer_envy
* [退出群聊把消息设为免打扰——每个人起跑线和家庭底牌本就不一样]
    ~ agency = agency + 1
    ~ honesty = honesty + 1
    -> room_peer_detach
* [老老实实抢了红包回句“恭喜”，然后低头看看椅子上洗得发白的帆布包]
    ~ bond = bond + 1
    ~ honesty = honesty + 1
    -> room_peer_honest

=== room_peer_envy ===
我其实替老同学高兴。大学时他总在熄灯后借着台灯背考研政治，如今一步步安稳下来，也是他自己挣来的。 #scene:room #mood:memory #visual:laptop_on #prop:none #anim:fade-rise #sfx:none
可人的痛苦往往就在这里：哪怕理智知道不该比较，凌晨一点独自坐在出租屋塑料椅上时，还是会怀疑自己是不是走慢了太多。 #scene:room #mood:tension #visual:laptop_on #prop:none #anim:blur-focus #sfx:emphasis
-> room_laptop_choice

=== room_peer_detach ===
长按关闭提醒的那一秒，世界安静了一点。可手指离开屏幕后，屋子里的寂静又显得太具体了。 #scene:room #mood:night #visual:laptop_on #prop:none #anim:fade-rise #sfx:none
我当然知道拿别人的喜事折磨自己毫无意义，但真正让人睡不着的，其实是我自己也不确定手里现在握着的这把牌，到底该怎么打下去。 #scene:room #mood:night #visual:laptop_on #prop:none #anim:blur-focus #sfx:emphasis
-> room_laptop_choice

=== room_peer_honest ===
打完“恭喜恭喜，下个月随份子”发出去，群里又迅速滑过几十条插科打诨。 #scene:room #mood:memory #visual:laptop_on #prop:none #anim:fade-rise #sfx:none
!!我低头看着椅子上洗得发白的帆布包，忽然有点恍惚：我留在这样一座寸土寸金的城市里熬夜，究竟是因为@@热爱这里的生活@@，还是仅仅因为不甘心空手离开？!! #scene:room #mood:tension #visual:laptop_on #prop:none #anim:blur-focus #sfx:emphasis
-> room_laptop_choice

=== room_laptop_choice ===
屏幕幽蓝的光映在眼前。左边的简历还挂着未保存的红点，右边的个人手记光标还在安静地一闪一灭。 #scene:room #mood:tension #visual:laptop_on #prop:none #anim:fade-rise #sfx:none

* [点开左边的简历文档，继续把“打杂执行”包装成“全链路赋能闭环”]
    ~ compromise = compromise + 1
    -> act_one_resume
* [关掉求职窗口，打开那个积灰半年的个人手记，不管好坏先写完这一段]
    ~ agency = agency + 2
    ~ craft = craft + 2
    ~ opened_draft = true
    -> act_one_project
* [直接合上电脑并关掉主灯，只留一盏暖黄小台灯陪自己喘口气]
    ~ honesty = honesty + 2
    ~ closed_laptop = true
    -> act_one_rest

=== act_one_resume ===
我熟练地敲下那些连自己读起来都觉得陌生的行业黑话：“沉淀方法论”“对齐颗粒度”“撬动核心增长”“打造内容护城河”。 #scene:room #mood:tension #visual:laptop_on #prop:none #anim:typewriter #sfx:tick
明明去年做那个活动时，我只是半夜两点蹲在场地门口数矿泉水箱数、顺便给供应商一遍遍改发票抬头。 #scene:room #mood:tension #visual:laptop_on #prop:none #anim:fade-rise #sfx:none
%%简历上的“我”无所不能、战功赫赫；可窗玻璃反光里的那个我，却越来越像个被抽空的空壳。%% #scene:room #mood:tension #visual:laptop_on #prop:none #anim:tremble #sfx:emphasis
写到一点二十，太阳穴一跳一跳地疼。胸口闷得慌，我推门走到走廊尽头的老阳台上透气。 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:turn
-> act_balcony

=== act_one_project ===
文档里只有零散的观察笔记和几个未成型的故事片段。没有KPI，没有甲方，也没有任何“必须在明天早上十点前对齐”的倒计时。 #scene:room #mood:memory #visual:laptop_on #prop:none #anim:blur-focus #sfx:turn
起初前十分钟手生得厉害，删了又写；可写到第二百个字时，我顺手把刚才地铁上那个抱着冰奶茶睡着的姑娘也写进了片段里。 #scene:room #mood:memory #visual:laptop_on #prop:none #anim:fade-rise #sfx:chime
奇怪的是，明明已经熬到快一点半，手指落在键盘上的声音却让我第一次觉得这半小时是长在自己身上的。 #scene:room #mood:dawn #visual:laptop_on #prop:none #anim:fade-rise #sfx:none
[[原来我并不是怕吃苦，我只是受够了把仅剩的心气，全部消耗在自己并不相信的事情上。]] #scene:room #mood:dawn #visual:laptop_on #prop:none #anim:whisper #sfx:emphasis
合上文档保存好，胃里忽然空得难受。我披上外套，先到走廊尽头的阳台吹两口冷风。 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:turn
-> act_balcony

=== act_one_rest ===
电脑屏幕合上的那一瞬间，刺眼的蓝光彻底消失了，只剩小台灯的一圈暖黄光晕洒在掉漆的木桌面上。 #scene:room #mood:stillness #visual:laptop_off #prop:none #anim:blur-focus #sfx:chime
我往后靠进椅背里，盯着天花板上那道早就裂开的细纹，什么也不做地过了五分钟。 #scene:room #mood:stillness #visual:laptop_off #prop:none #anim:fade-rise #sfx:none
((什么时候开始，连“不带愧疚感地喘口气”，都成了需要鼓起勇气才能做出的决定？)) #scene:room #mood:stillness #visual:laptop_off #prop:none #anim:whisper #sfx:emphasis
房间闷得有些压抑。我套上卫衣，拉开了通往走廊老阳台的那扇推拉门。 #scene:room #mood:night #visual:laptop_off #prop:none #anim:fade-rise #sfx:turn
-> act_balcony

=== act_balcony ===
第三幕 · 01:30 · 走廊尽头的老阳台 #act:第三幕 · 老阳台 #scene:balcony #mood:night #visual:window_lights #prop:none #anim:title-card #sfx:bell
铁栏杆上还挂着白天没干透的衬衫，一摸冰凉。刚下过雨的夜风扑在脸上，比屋里清醒得多。 #act:第三幕 · 老阳台 #scene:balcony #mood:night #visual:window_lights #prop:none #anim:fade-rise #sfx:turn
对面是一整面密密麻麻的老居民楼。此刻整栋楼几乎都睡着了，只有零星三四扇窗户还亮着灯—— #scene:balcony #mood:night #visual:window_lights #prop:none #anim:fade-rise #sfx:none
七楼那扇暖黄的窗前，有人正来回踱步打着电话；五楼那扇发蓝的屏幕光一闪一灭，不知道是谁也在赶工或者打游戏。 #scene:balcony #mood:memory #visual:window_lights #prop:none #anim:fade-rise #sfx:none
我趴在栏杆上，又想起母亲傍晚发来的那张省考汇总表。翻开和家里的微信记录，上一条语音还停在春节回城前夜： #scene:balcony #mood:memory #visual:window_lights #prop:call_home_missed #anim:blur-focus #sfx:none

那时候视频刚接通，我特意挑了房间里光线最亮的角度坐着，笑着跟他们说“公司今年挺稳的，项目奖金也没少”。 #scene:balcony #mood:memory #visual:window_lights #prop:none #anim:fade-rise #sfx:none
话出口的时候挺顺的，甚至连我自己都差点信了。 #scene:balcony #mood:memory #visual:window_lights #prop:none #anim:fade-rise #sfx:none
!!为什么每次跟最亲近的人说话，我第一反应都是把自己的狼狈藏得滴水不漏？!! #scene:balcony #mood:night #visual:window_lights #prop:none #anim:blur-focus #sfx:emphasis

* [“怕他们隔着上千公里，除了干着急和彻夜睡不着，什么也帮不上”]
    ~ bond = bond + 1
    ~ honesty = honesty + 1
    -> balcony_why_protect
* [“怕一旦承认自己过得紧绷，这些年执意留在这里的倔强就成了笑话”]
    ~ honesty = honesty + 2
    -> balcony_why_pride
* [“其实连我自己都说不清，如果打通电话，究竟能开口说什么”]
    ~ honesty = honesty + 1
    -> balcony_why_lost

=== balcony_why_protect ===
他们去年体检报告上的字我都悄悄拍过照片。每次打电话时我多叹半声气，我妈第二天就能翻出一堆偏方和招聘链接发过来。 #scene:balcony #mood:memory #visual:window_lights #prop:none #anim:fade-rise #sfx:none
可这种“报喜不报忧”久了，连我也渐渐习惯把所有委屈咽回胃里，反倒不知道怎么向任何人求救。 #scene:balcony #mood:night #visual:window_lights #prop:none #anim:fade-rise #sfx:none
-> balcony_phone_choice

=== balcony_why_pride ===
当年拖着两个大箱子离开老家时，亲戚桌上的长辈都说“外头卷得很，待两年差不多就回来吧”。我嘴上笑着，心里却暗暗跟自己较着劲。 #scene:balcony #mood:tension #visual:window_lights #prop:none #anim:fade-rise #sfx:none
结果较劲较到第五年，体面和面子慢慢变成了一副盔甲——穿在身上沉得要命，可脱下来又怕露怯。 #scene:balcony #mood:night #visual:window_lights #prop:none #anim:blur-focus #sfx:emphasis
-> balcony_phone_choice

=== balcony_why_lost ===
没有生大病，没有被立刻辞退，甚至卡里也还有几千块钱。可就是每一天醒来，都觉得像被塞进一条看不见尽头的流水线。 #scene:balcony #mood:night #visual:window_lights #prop:none #anim:fade-rise #sfx:none
这种说不清道不明的耗尽感，很难用两分钟的语音在电话里讲明白。 #scene:balcony #mood:night #visual:window_lights #prop:none #anim:fade-rise #sfx:none
-> balcony_phone_choice

=== balcony_phone_choice ===
阳台冷风吹得指尖发僵。我盯着手机屏幕上的“语音通话”按钮—— #scene:balcony #mood:night #visual:window_lights #prop:none #anim:typewriter #sfx:tick

* [深吸一口气，先在备忘录或草稿箱里写一句敢对着家里说出的实话]
    ~ bond = bond + 2
    ~ honesty = honesty + 1
    -> balcony_draft_home
* [犹豫着点了拨号，听见“嘟”了两声又慌忙按断——算了，快两点了别吵醒老人]
    ~ called_mom_stopped = true
    ~ bond = bond + 1
    -> balcony_cancel_call
* [干脆把手机切进飞行模式，至少让今晚剩下的几个小时彻底归于安静]
    ~ agency = agency + 1
    ~ flight_mode = true
    -> balcony_flight

=== balcony_draft_home ===
我在草稿栏里慢慢敲下：“妈，最近项目是有点累，暂时不想看省考，但这周末想和你们好好视频聊一聊。” #scene:balcony #mood:memory #visual:window_lights #prop:none #anim:typewriter #sfx:tick
没有立刻发出去，但仅仅是把这行字写出来放在那儿，肩膀就好像忽然往下沉了一寸，没那么僵了。 #scene:balcony #mood:stillness #visual:window_lights #prop:none #anim:fade-rise #sfx:chime
-> balcony_to_store

=== balcony_cancel_call ===
电话只响了两声就被我掐断了。夜风里似乎还能听见那两声空旷的回响。 #scene:balcony #mood:memory #visual:window_lights #prop:none #anim:fade-rise #sfx:turn
((大概在很多个凌晨两点，我们都在电话这头差点说出“我有点撑不住了”，最后却又悄悄咽了回去。)) #scene:balcony #mood:night #visual:window_lights #prop:none #anim:whisper #sfx:emphasis
-> balcony_to_store

=== balcony_flight ===
拇指滑过快捷开关，小小的灰色飞机图标亮了起来： #scene:balcony #mood:stillness #visual:window_lights #prop:flight_on #anim:fade-rise #sfx:chime
那一瞬间，工作群的红点、中介的催促、同龄人的喜报，全都安静地退到了玻璃窗外。 #scene:balcony #mood:stillness #visual:window_lights #prop:none #anim:fade-rise #sfx:none
-> balcony_to_store

=== balcony_to_store ===
肚子这时诚实地叫了一声——从昨晚六点那盒半凉的沙拉到现在，已经过去七个多小时。 #scene:balcony #mood:night #visual:window_lights #prop:none #anim:fade-rise #sfx:none
我捏了捏兜里的门禁卡，决定下楼去街角那家24小时便利店喝杯热汤。 #scene:balcony #mood:night #visual:default #prop:none #anim:fade-rise #sfx:turn
-> act_store

=== act_store ===
第四幕 · 02:15 · 24小时便利店 #act:第四幕 · 零点便利店 #scene:store #mood:memory #visual:steam #prop:none #anim:title-card #sfx:bell
楼下的24小时便利店，像整条暗沉街道上唯一还睁着眼睛的灯塔。 #act:第四幕 · 零点便利店 #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:chime
推开玻璃门，自动门铃清脆地响了一声，暖黄色的灯光和关东煮炖白萝卜的香气立刻裹了过来。 #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:none
靠门口那张窄吧台上，一个刚下夜班的年轻骑手正把头盔放在脚边，埋头大口吃着微波炉刚叮好的卤肉饭，吃完立刻拿起水杯灌了半杯，又急匆匆戴上手套推门进夜色里。 #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:none

往里走到靠窗的高脚凳前，我却看到了同单元六楼的林哥。 #scene:store #mood:memory #visual:steam #prop:none #anim:blur-focus #sfx:turn
去年他还在某头部互联网公司带十几个人的产品团队，今年开春业务线整体裁撤，拿完N+1赔偿之后一直没急着找下一份工作。 #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:none
他穿着一件洗皱的灰色卫衣，手里捧着一杯冒热气的萝卜汤，看见我笑了一下：“还没睡？又在赶什么ddl？” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:none

我买了根玉米和两串海带结，在他对面坐下。热气熏在玻璃窗上，把外面的夜雨糊成一片温柔的毛玻璃。 #scene:store #mood:stillness #visual:steam #prop:none #anim:fade-rise #sfx:none
{talked_roommate: 我跟他说起刚才楼上阿哲收拾箱子、明早就要回苏州的事。}
{checked_bank: 我顺口说起下个月中介又要涨三百房租，刚才在楼下路灯底核算了半天账。}
{replied_boss: 我苦笑着说起十一点半刚在地铁上收到总监要求周末改数据口径的微信。}

林哥没有急着讲什么大道理，只是撕开手边一包纸巾，推给我两张。他低声讲起自己刚被裁员的那个周一早晨： #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:none
“那天才离谱——我早上八点五十居然准时醒了，还迷迷糊糊找熨斗想烫衬衫。突然反应过来不用去公司了，一个人穿着睡衣在客厅站了二十分钟，不知道该干嘛。” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:none
“后来我去楼下公园长椅坐了一上午，看着平时十点钟的街道，第一次发现原来没有工牌、没有头衔，地球照样转，风照样吹，我也没立刻饿死。” #scene:store #mood:stillness #visual:steam #prop:none #anim:blur-focus #sfx:chime

我捧着暖烘烘的纸杯，看着汤面上微微晃动的葱花，低声对他说—— #scene:store #mood:night #visual:steam #prop:none #anim:fade-rise #sfx:none

* [“我也常害怕，如果不靠公司的抬头和工牌，突然就不知道怎么介绍自己了”]
    ~ honesty = honesty + 1
    -> store_talk_badge
* [“你至少还拿了一笔赔偿金。我手里这点积蓄，连试错三个月都要反复算账”]
    ~ honesty = honesty + 1
    ~ compromise = compromise + 1
    -> store_talk_money
* [“其实我也想过干脆换个城市重新开始，就是不知道是不是逃避”]
    ~ leave_city = leave_city + 2
    -> store_talk_leave

=== store_talk_badge ===
林哥轻轻笑了一声：“正常。咱们从小学按名次排座位开始，就习惯了拿外面的标签当身份证。” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:turn
“可标签这东西，公司景气时借你披着；真要降本增效那天，它收回得比谁都快。真正能陪你走下半场的，还得是你脱下工牌之后剩下的那点东西。” #scene:store #mood:stillness #visual:steam #prop:none #anim:blur-focus #sfx:emphasis
-> store_napkin

=== store_talk_money ===
林哥点了点头，神情很认真：“所以千万别听网上那些轻飘飘的‘裸辞去追梦’——自由和底气从来不是一回事。” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:turn
“钱不够的时候，先拿工作当挡风玻璃，这不丢人。丢人的是你连挡风玻璃后面自己真正想去哪儿，都彻底懒得想了。” #scene:store #mood:stillness #visual:steam #prop:none #anim:blur-focus #sfx:emphasis
-> store_napkin

=== store_talk_leave ===
“换个地方叫逃避还是止损，外人根本没资格替你定性。”林哥转了转手里的纸杯，“水浅鱼难养，换片池塘游一游，怎么就算认输了？” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:turn
“唯一要分清的是：你是真的厌倦了这座城市的拥挤和账单，还是以为换个邮编就能自动治好心里的迷茫。” #scene:store #mood:stillness #visual:steam #prop:none #anim:blur-focus #sfx:emphasis
-> store_napkin

=== store_napkin ===
说完，林哥从外套兜里摸出一支掉漆的圆珠笔，在一张干纸巾背面唰唰画了三条线，推到我面前： #scene:store #mood:memory #visual:steam #prop:msg_lin_resume #anim:fade-rise #sfx:msg
“这是我焦虑得整夜睡不着那阵子，写给自己保命的三件事。不管以后去哪儿、留不留在这行，想通这三行，人就不会太慌。” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:none
他把最后一口萝卜汤喝完，隔着玻璃窗看了一眼外面渐歇的雨丝，轻轻问了一句： #scene:store #mood:night #visual:steam #prop:none #anim:fade-rise #sfx:none
!!“如果明天开始，不用打卡，也不用向亲戚朋友证明你混得有多体面——@@你心里最想留住的东西，到底是什么？@@”!! #scene:store #mood:dawn #visual:steam #prop:none #anim:blur-focus #sfx:emphasis

* [“说实话，我也不知道。我只是突然发现，我已经很久没真正开心过了。”]
    ~ honesty = honesty + 2
    ~ admitted_lost = true
    -> act_two_lost
* [“我想留住亲手做出点东西的冲动，哪怕它暂时换不来体面的薪水。”]
    ~ agency = agency + 2
    ~ craft = craft + 2
    -> act_two_try
* [“我其实没那么大的野心。我只想要一份下班后能关掉微信、陪陪家人的生活。”]
    ~ bond = bond + 2
    ~ honesty = honesty + 1
    -> act_two_warmth
* [“我想去一个房租不用吃掉一半工资、抬起头还能看见晚霞的城市。”]
    ~ leave_city = leave_city + 2
    ~ agency = agency + 1
    -> act_two_leave

=== act_two_lost ===
林哥没有半点惊讶，只是轻轻叹了口气。 #scene:store #mood:stillness #visual:steam #prop:none #anim:fade-rise #sfx:turn
“咱们这代人从十八岁填志愿开始，就习惯了拿分数线和薪资范围当指南针。”他低声说，“没人教过我们，当外界的评分表撤掉之后，该怎么跟自己相处。” #scene:store #mood:stillness #visual:steam #prop:none #anim:typewriter #sfx:tick
[[“能老老实实承认‘我好像走丢了’，往往比咬着牙假装一切顺利，更需要勇气。”]] #scene:store #mood:dawn #visual:calm_halo #prop:none #anim:whisper #sfx:emphasis
-> store_parting

=== act_two_try ===
他眼睛亮了一下，随即又像老大哥一样实诚地叮嘱我：“那你得先算好房租和半年的备用金，哪怕先用白天的工位养着夜晚那点热爱，也完全不丢人。” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:turn
他站起身把纸杯丢进回收箱，回头拍了拍我的肩：[[“知道自己真正舍不得什么的人，哪怕走得慢一点，也不会算走丢。”]] #scene:store #mood:dawn #visual:calm_halo #prop:none #anim:blur-focus #sfx:emphasis
-> store_parting

=== act_two_warmth ===
林哥轻轻笑了一声：“这可一点也不小。” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:turn
“网上天天教人向上爬、教人搞副业、教人三十岁前实现跃迁，却很少有人提醒你——((把平凡的日子过出踏实感，本来就需要极大的定力。))” #scene:store #mood:stillness #visual:calm_halo #prop:none #anim:whisper #sfx:emphasis
-> store_parting

=== act_two_leave ===
林哥望向窗外空荡荡的斑马线，点点头：“算账不是懦弱，反而是最清醒的自救。” #scene:store #mood:memory #visual:steam #prop:none #anim:fade-rise #sfx:turn
“换一座能看见天色的城市，把生活成本降下来，人才有余力去想‘我喜欢什么’，而不是天天只想着‘怎么撑过下个月’。” #scene:store #mood:dawn #visual:calm_halo #prop:none #anim:blur-focus #sfx:emphasis
-> store_parting

=== store_parting ===
凌晨三点半，我们前后脚走出便利店。林哥朝单元楼走去，挥了挥手说“别逛太晚，早点睡”。 #scene:store #mood:night #visual:steam #prop:none #anim:fade-rise #sfx:turn
可我已经彻底没了睡意。雨停了，空气凉得像刚洗过的玻璃。我沿着巷口往东多走了十分钟，走到城郊那条安静的滨江步道。 #scene:store #mood:night #visual:default #prop:none #anim:fade-rise #sfx:none
-> act_riverside

=== act_riverside ===
第五幕 · 04:00 · 凌晨滨江步道 #act:第五幕 · 凌晨滨江 #scene:riverside #mood:stillness #visual:default #prop:none #anim:title-card #sfx:bell
凌晨四点的江风带着水草的微腥，吹在脸上让人瞬间彻底清醒。 #act:第五幕 · 凌晨滨江 #scene:riverside #mood:stillness #visual:default #prop:none #anim:fade-rise #sfx:turn
远处对岸的写字楼群已经熄灭了绝大部分灯光，只剩下零星几层像还没合眼的眼睛，倒映在黑漆漆的江面上。 #scene:riverside #mood:night #visual:default #prop:none #anim:fade-rise #sfx:none
一位穿橙色马甲的环卫阿姨正推着清洁车慢慢走过，竹扫帚划过湿漉漉的沥青地面，发出沙、沙、沙的规律轻响。 #scene:riverside #mood:stillness #visual:default #prop:none #anim:fade-rise #sfx:none
不远处还有个穿短裤的老人迎面跑过，呼吸平稳，既不看手机，也不赶时间。 #scene:riverside #mood:stillness #visual:default #prop:none #anim:fade-rise #sfx:none

我在一张有些潮湿的木长椅上坐了下来，把风衣领子竖起来。 #scene:riverside #mood:stillness #visual:flight_mode #prop:none #anim:blur-focus #sfx:chime
{flight_mode: 手机还停在飞行模式，世界暂时安静得像一块没有划痕的黑胶。}
{not flight_mode: 屏幕最后亮了一下，锁屏上的时间数字提醒我离早上上班闹钟只剩下不多几个小时：}
{not flight_mode: 我顺手把手机也调成了静音反扣在长椅上，第一次不想去数里面还剩几条未读。 #prop:alarm_set #sfx:turn}

这一整夜的碎片忽然在江风里重新浮了上来： #scene:riverside #mood:memory #visual:flight_mode #prop:none #anim:fade-rise #sfx:none
{replied_work: 十一点四十在站台下意识秒回的那句“收到”，}
{opened_draft: 合租屋里那段久违地敲出两百字的个人手记，}
{closed_laptop: 关掉主灯后小台灯照亮的那一寸旧木桌面，}
{called_mom_stopped: 走廊阳台风里响了两声又被我匆忙掐断的语音拨号，}
{admitted_lost: 还有在便利店热汤前，终于说出口的那句“其实我有点走丢了”。}

周围再也没有谁在催促我交方案、补数据、或者回答“你混得怎么样”。 #scene:riverside #mood:stillness #visual:flight_mode #prop:none #anim:typewriter #sfx:tick
!!当所有外部噪音都暂时退场之后，我突然很想问问坐在长椅上的自己——@@此刻最让我害怕的，究竟是什么？@@!! #scene:riverside #mood:night #visual:flight_mode #prop:none #anim:blur-focus #sfx:emphasis

* [“怕只要停下来歇一口气，就会被同龄人彻底甩在身后”]
    ~ honesty = honesty + 1
    -> river_fear_pace
* [“怕现在选了任何一条路，五年后回头看，发现自己又选错了”]
    ~ honesty = honesty + 1
    ~ agency = agency + 1
    -> river_fear_regret
* [“怕自己就这样顺着惯性忙到三十五岁，却从没认真替自己选过一天”]
    ~ agency = agency + 2
    ~ honesty = honesty + 1
    -> river_fear_numb

=== river_fear_pace ===
江面上一艘早起的货船缓缓驶过，激起一圈圈慢慢扩散的水波。 #scene:riverside #mood:stillness #visual:flight_mode #prop:none #anim:fade-rise #sfx:turn
其实从来没有什么统一的“人生赛道”。二十多岁买房的、三十岁转行的、三十五岁重新读书的，各自都在自己的水系里走着。 #scene:riverside #mood:stillness #visual:flight_mode #prop:none #anim:fade-rise #sfx:none
[[把别人的人生当成自己的闹钟，才是让人永远睡不踏实的原因。]] #scene:riverside #mood:dawn #visual:flight_mode #prop:none #anim:whisper #sfx:emphasis
-> river_to_bridge

=== river_fear_regret ===
没有人能在二十多岁的时候拿到一份“保证不后悔”的未来说明书。 #scene:riverside #mood:stillness #visual:flight_mode #prop:none #anim:fade-rise #sfx:turn
选安稳可能会遗憾没试过折腾，选冒险可能会经历几个月的局促和慌张——可只要是你清醒之后亲手做的决定，哪怕弯路，也算长在自己脚下的路。 #scene:riverside #mood:dawn #visual:flight_mode #prop:none #anim:blur-focus #sfx:emphasis
-> river_to_bridge

=== river_fear_numb ===
这大概才是深夜最令人发冷的事——不是吃苦，而是习惯了把“麻木”当成“情绪稳定”，把“将就”当成“懂事”。 #scene:riverside #mood:stillness #visual:flight_mode #prop:none #anim:fade-rise #sfx:turn
好在今晚，我至少醒了过来。哪怕天亮之后生活还是那个样子，我也已经看清自己手里还有哪些牌。 #scene:riverside #mood:dawn #visual:flight_mode #prop:none #anim:blur-focus #sfx:emphasis
-> river_to_bridge

=== river_to_bridge ===
天边悄悄泛出一层极淡的靛青。江面上的雾气散了一点，远处的广播体操音乐还没响起，整座城市处在最温柔的苏醒前夜。 #scene:riverside #mood:dawn #visual:flight_mode #prop:none #anim:fade-rise #sfx:none
我站起身拍掉衣角的水汽，走上那座横跨主干道的人行天桥。 #scene:riverside #mood:dawn #visual:default #prop:none #anim:fade-rise #sfx:turn
-> act_three

=== act_three ===
终幕 · 05:30 · 天桥与微明 #act:终幕 · 黎明岔路 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:title-card #sfx:bell
走上人行天桥时，桥下第一班洒水车正放着缓慢而熟悉的老歌驶过湿漉漉的柏油路。 #act:终幕 · 黎明岔路 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:blur-focus #sfx:turn
东边玻璃幕墙与老楼顶层的缝隙之间，缓缓透出一抹淡青与琥珀交织的微光，把铁栏杆上的露水照得晶亮。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:fade-rise #sfx:none
早点铺的蒸笼已经支了起来，白色的蒸汽从十字路口街角缓缓升起。再过半小时，千万个睡醒的人又会汇进同一个地铁口。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:fade-rise #sfx:none

我停在天桥正中央，看着脚下稀稀落落、却各自奔向不同去处的车灯。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:typewriter #sfx:tick
一夜的思考并没有神奇地解决房租、加班、或者父母的牵挂。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:fade-rise #sfx:none
!!但我知道，今天早上的自己，终于可以决定@@先从哪一个小动作开始，不再敷衍自己。@@!! #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:blur-focus #sfx:emphasis

* [在备忘录新建一条约定：每天下班后划出“一小时空白”，只留给自己真正想做的事]
    ~ agency = agency + 2
    ~ honesty = honesty + 1
    -> resolve_ending_light
* [趁着早饭前给家里发一条不加粉饰的微信，约好这周末好好视频聊聊近况]
    ~ bond = bond + 3
    ~ honesty = honesty + 1
    -> resolve_ending_home
* [认真打开算账笔记，定下三个月内调研二线城市与换乘生活的具体期限]
    ~ leave_city = leave_city + 3
    ~ agency = agency + 1
    -> resolve_ending_south
* [长按卸载掉两个只会放大同辈焦虑的软件，接受自己按自己的时区慢慢走]
    ~ honesty = honesty + 3
    -> resolve_ending_shore
* [整理好被雨吹皱的衣领走下天桥，准时搭上早班地铁，先稳稳守住眼前的秩序]
    ~ compromise = compromise + 3
    -> resolve_ending_seat

=== resolve_ending_light ===
{
    - craft >= 2:
        -> ending_midnight_draft
    - else:
        -> ending_ember
}

=== resolve_ending_home ===
-> ending_beyond_glass

=== resolve_ending_south ===
{
    - leave_city >= 3 and honesty >= 2:
        -> ending_southbound
    - else:
        -> ending_ember
}

=== resolve_ending_shore ===
{
    - craft >= 3:
        -> ending_midnight_draft
    - else:
        -> ending_quiet_shore
}

=== resolve_ending_seat ===
{
    - agency >= 4 and honesty >= 4:
        -> ending_ember
    - else:
        -> ending_empty_seat
}

=== ending_ember ===
~ ending_id = "ember"
晨光顺着天桥的铁栏杆缓缓铺开，微温，却足以照亮脚下这一米见方的地面。 #act:结局 · 自己亮起的那盏灯 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:msg_self_note #anim:blur-focus #sfx:ending
下周一我依然要挤地铁，依然要面对并不完美的工作与房租账单，生活并没有因为一夜的清醒就突然变成童话。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:fade-rise #sfx:none
但我把那本写满小字的新备忘录放到了桌面第一排，就像在漫长的工作日里，悄悄替自己预留了一间不收房租的避难所。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:typewriter #sfx:tick
!![[迷茫不会一夜消失，但只要开始为自己留出那一小时的光，你就不再只是被生活推着走的人。]]!! #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:whisper #sfx:chime #ending:ember
-> END

=== ending_beyond_glass ===
~ ending_id = "beyond_glass"
我靠在微凉的栏杆上，趁着阳光刚爬上对面楼顶，把那句打了又删的消息真正发了出去：“妈，最近工作有点累，但这周末想和你们视频，认真聊聊我现在的打算。” #act:结局 · 推开阳台的窗 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:typewriter #sfx:ending
大约十分钟后，手机屏幕在掌心轻轻震了一下——大概是早起买菜的她正巧看见了消息： #scene:dawn_bridge #mood:memory #visual:sunrise #prop:msg_mom_reply #anim:fade-rise #sfx:msg
站在越来越亮的天光里，我突然笑了一下，眼睛却有点发酸。原来很多时候，我们以为必须先变得“足够成功”才配被爱、才敢开口。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:blur-focus #sfx:none
!![[推开那扇逞强的窗户，早风虽然还有点凉，但身后终于有了真实的人间灯火。]]!! #scene:dawn_bridge #mood:stillness #visual:sunrise #prop:none #anim:whisper #sfx:chime #ending:beyond_glass
-> END

=== ending_quiet_shore ===
~ ending_id = "quiet_shore"
在天桥的风里，我按住那两个每天轮番推送“同龄人已经甩开你”“三十岁之前必须做到什么”的图标，依次点了卸载。 #act:结局 · 按自己的时区走路 #scene:dawn_bridge #mood:stillness #visual:sunrise #prop:flight_on #anim:blur-focus #sfx:ending
手机桌面一下子空出了一整块深色的夜空。原来没有那些虚张声势的数字和标题，天也没有塌下来。 #scene:dawn_bridge #mood:stillness #visual:sunrise #prop:none #anim:fade-rise #sfx:none
早风吹散了最后一丝沉闷。别人买房、上岸、升职，那是别人的季节；而此刻，我只想去巷口喝一碗热豆浆，然后安稳地睡到中午。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:typewriter #sfx:tick
!![[允许自己按照自己的时区慢慢发芽，从来不是退缩，而是清醒的开始。]]!! #scene:dawn_bridge #mood:stillness #visual:sunrise #prop:none #anim:whisper #sfx:chime #ending:quiet_shore
-> END

=== ending_southbound ===
~ ending_id = "southbound"
我站定在天桥东侧，看着高架桥上往城外方向驶去的一列早班高铁。 #act:结局 · 一张单程的换乘票 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:msg_lin_resume #anim:blur-focus #sfx:ending
昨晚林哥画在纸巾上的那三笔账、阿哲那盆留不下的绿萝、还有银行账单上的数字，此刻突然清清楚楚地连成了一条线。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:fade-rise #sfx:none
这不是灰头土脸地逃跑，而是认真计算过自己想要的生活代价之后，决定把后半程的人生换一片更开阔的晴天来过。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:typewriter #sfx:tick
!![[离开不是失败，而是在算清自己真正想要的日子之后，替自己重新买一张去往晴天的车票。]]!! #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:whisper #sfx:chime #ending:southbound
-> END

=== ending_midnight_draft ===
~ ending_id = "midnight_draft"
我打开备忘录，把昨晚在合租屋新写的那两百字，和三年前那条置顶草稿并排放在了一起。 #act:结局 · 凌晨四点的未完稿 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:draft_note #anim:blur-focus #sfx:ending
我大概还是会在下周一准时去公司开会、对着甲方表格皱眉——因为那份月薪正稳稳替我支付着房租和体面，我不再羞愧于依赖它。 #scene:dawn_bridge #mood:memory #visual:sunrise #prop:none #anim:fade-rise #sfx:none
但我也不再强迫自己非得辞职孤注一掷才算有梦想。白天做个清醒的打工人，夜晚和周末留给那份未完成的稿子，这就已经够了。 #scene:dawn_bridge #mood:dawn #visual:sunrise #prop:none #anim:typewriter #sfx:tick
!![[允许自己在“安稳过日子”和“笨拙地做点热爱”之间同时走两条路，本身就是成年人最温柔的叛逆。]]!! #scene:dawn_bridge #mood:stillness #visual:sunrise #prop:none #anim:whisper #sfx:chime #ending:midnight_draft
-> END

=== ending_empty_seat ===
~ ending_id = "empty_seat"
六点半，早高峰的第一列地铁准时进站。我随着安静的人群刷卡上车，意外找到了一个靠窗的空位。 #act:结局 · 早高峰的靠窗位 #scene:subway #mood:night #visual:default #prop:alarm_set #anim:blur-focus #sfx:ending
车厢里大家各自戴着降噪耳机低头看手机，风衣擦过风衣，一切看起来体面、安全、秩序井然。 #scene:subway #mood:memory #visual:default #prop:none #anim:fade-rise #sfx:none
我知道接下来的几个月，我依然会按时交方案、按时交房租，把所有犹豫和疲惫工整地折叠进工牌里——眼前的安稳也同样值得珍惜。 #scene:subway #mood:tension #visual:default #prop:none #anim:typewriter #sfx:tick
只是当列车再次驶出黑暗隧道、第一缕晨光照在车窗上的那一刻，!![[玻璃倒影里的我，悄悄记住了昨晚凌晨两点那个还没彻底睡着的问题。]]!! #scene:subway #mood:night #visual:calm_halo #prop:none #anim:whisper #sfx:chime #ending:empty_seat
-> END
