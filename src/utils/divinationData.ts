/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardItem, CategoryType } from '../types';

// 宮位卡片庫 (Palace Cards)
export const PALACE_CARDS: CardItem[] = [
  {
    id: 'p_xun',
    name: '巽宮',
    type: 'palace',
    title: '巽宮 (四綠)',
    symbol: '巽',
    tagline: '風行無阻，柔順深入',
    description: '象徵風之流動、無孔不入。巽宮五行屬木，代表進退有度、思維靈活、利於傳播、教育與合約簽訂。此宮多主機謀與智慧流動。',
    element: '木',
    direction: '東南方'
  },
  {
    id: 'p_kan',
    name: '坎宮',
    type: 'palace',
    title: '坎宮 (一白)',
    symbol: '坎',
    tagline: '水流不息，險中求勝',
    description: '象徵水之智慧、暗流湧動。坎宮五行屬水，代表變動、智慧、艱難但蓄勢待發，多主隱秘計畫與感情深度。',
    element: '水',
    direction: '正北方'
  },
  {
    id: 'p_gen',
    name: '艮宮',
    type: 'palace',
    title: '艮宮 (八白)',
    symbol: '艮',
    tagline: '重巒疊嶂，止欲靜守',
    description: '象徵山之穩重、止步不前。艮宮五行屬土，代表停止、轉折、堅守陣地。利於規劃、儲蓄與積累力量。',
    element: '土',
    direction: '東北方'
  },
  {
    id: 'p_zhen',
    name: '震宮',
    type: 'palace',
    title: '震宮 (三碧)',
    symbol: '震',
    tagline: '雷霆萬鈞，動若生氣',
    description: '象徵雷之爆發、生機勃勃。震宮五行屬木，代表震動、開始、開創、進步與突發狀況。利於主動出擊。',
    element: '木',
    direction: '正東方'
  },
  {
    id: 'p_li',
    name: '離宮',
    type: 'palace',
    title: '離宮 (九紫)',
    symbol: '離',
    tagline: '烈火通明，美麗顯耀',
    description: '象徵火之光明、美麗耀眼。離宮五行屬火，代表名聲、文化、演藝、顯著特徵。多主名望與公開之事務。',
    element: '火',
    direction: '正南方'
  },
  {
    id: 'p_kun',
    name: '坤宮',
    type: 'palace',
    title: '坤宮 (二黑)',
    symbol: '坤',
    tagline: '大地母儀，厚德載物',
    description: '象徵大地的包容、默默奉獻。坤宮五行屬土，代表順從、穩健、合作、基層、女性力量與穩定產出。',
    element: '土',
    direction: '西南方'
  },
  {
    id: 'p_dui',
    name: '兌宮',
    type: 'palace',
    title: '兌宮 (七赤)',
    symbol: '兌',
    tagline: '澤潤悅人，言辭交鋒',
    description: '象徵澤之喜悅、口才與爭執。兌宮五行屬金，代表口舌、娛樂、金融、破損或精緻飾品。多主說服與談判。',
    element: '金',
    direction: '正西方'
  },
  {
    id: 'p_qian',
    name: '乾宮',
    type: 'palace',
    title: '乾宮 (六白)',
    symbol: '乾',
    tagline: '天道剛健，領袖風範',
    description: '象徵天之剛健、至高無上。乾宮五行屬金，代表領導、決策、貴人相助、堅定不移的意志與大型組織。',
    element: '金',
    direction: '西北方'
  }
];

// 八神卡片庫 (Eight Gods Cards)
export const GOD_CARDS: CardItem[] = [
  {
    id: 'g_jiutian',
    name: '九天',
    type: 'god',
    title: '九天之神',
    symbol: '天',
    tagline: '威武剛強，志存高遠',
    description: '代表至高無上的發展、理想、旅行與名聲。九天性格剛強，適合大張旗鼓行事、開展宏大計畫或追求卓越。',
    element: '金'
  },
  {
    id: 'g_zhifu',
    name: '直符',
    type: 'god',
    title: '直符 (八神之首)',
    symbol: '符',
    tagline: '貴人相助，逢凶化吉',
    description: '代表領導、核心、貴人、信譽與威嚴。直符所到之處百惡消散，代表事物的主導力量，能得到上級或權威支持。',
    element: '木'
  },
  {
    id: 'g_tengshe',
    name: '螣蛇',
    type: 'god',
    title: '螣蛇之神',
    symbol: '蛇',
    tagline: '虛驚怪異，變化莫測',
    description: '代表糾纏、焦慮、反覆無常、夢境與虛幻。螣蛇多主虛驚怪異之事，提醒你注意暗處的變動或內心的焦躁不安。',
    element: '火'
  },
  {
    id: 'g_taiyin',
    name: '太陰',
    type: 'god',
    title: '太陰之神',
    symbol: '陰',
    tagline: '暗中策劃，喜慶蔭庇',
    description: '代表陰暗、私密、策劃、細膩與女性幫助。太陰主吉，適合暗中運籌帷幄、沉著思考，不宜大張旗鼓。',
    element: '金'
  },
  {
    id: 'g_liuhe',
    name: '六合',
    type: 'god',
    title: '六合之神',
    symbol: '合',
    tagline: '合作交易，和合美滿',
    description: '代表契約、婚姻、合作、中介與和諧。六合性格溫和，利於談判、締結盟約、和解及聚會。',
    element: '木'
  },
  {
    id: 'g_baihu',
    name: '白虎',
    type: 'god',
    title: '白虎之神',
    symbol: '虎',
    tagline: '剛烈凶悍，競爭衝突',
    description: '代表權威、軍警、阻礙、疾病或激烈競爭。白虎性格剛烈，多主阻力與意外，但也象徵強大的威懾力與執行力。',
    element: '金'
  },
  {
    id: 'g_xuanduan',
    name: '玄武',
    type: 'god',
    title: '玄武之神',
    symbol: '武',
    tagline: '暗昧不清，神秘莫測',
    description: '代表盜竊、虛假、暗昧、玄學或不可告人的秘密。玄武多主假像，提醒你需要看清迷霧，防範欺瞞。',
    element: '水'
  },
  {
    id: 'g_jiudi',
    name: '九地',
    type: 'god',
    title: '九地之神',
    symbol: '地',
    tagline: '厚重沉穩，蓄力待發',
    description: '代表長久、屯兵、隱蔽、基層與穩健。九地性格溫和，不宜進攻，但極利於防守、儲存實力及默默耕耘。',
    element: '土'
  }
];

// 九星卡片庫 (Nine Stars Cards)
export const STAR_CARDS: CardItem[] = [
  {
    id: 's_chong',
    name: '天沖',
    type: 'star',
    title: '天沖星 (吉星)',
    symbol: '沖',
    tagline: '雷厲風行，勇猛衝勁',
    description: '代表爆發力、行動力、軍事、體育。天沖星性格急躁，雷厲風行，利於速戰速決、開拓進取，最忌猶豫不決。',
    element: '木'
  },
  {
    id: 's_peng',
    name: '天蓬',
    type: 'star',
    title: '天蓬星 (大凶)',
    symbol: '蓬',
    tagline: '膽大妄為，險中生财',
    description: '代表大智慧或大膽冒險。天蓬星五行屬水，代表暗中行事、智慧超群、投機取巧或面臨巨大挑戰與機會。',
    element: '水'
  },
  {
    id: 's_rui',
    name: '天芮',
    type: 'star',
    title: '天芮星 (凶星)',
    symbol: '芮',
    tagline: '問題瑕疵，虛心求教',
    description: '代表疾病、問題點、土地、學生。天芮星象徵局勢中存在的毛病或漏洞，需要你虛心學習、找出病灶、加以改善。',
    element: '土'
  },
  {
    id: 's_fu',
    name: '天輔',
    type: 'star',
    title: '天輔星 (大吉)',
    symbol: '輔',
    tagline: '儒雅文才，教育相助',
    description: '代表文化、學術、教育、助力。天輔星極具儒雅氣息，代表能得到導師指引、利於升學、求職、規劃及文化事業。',
    element: '木'
  },
  {
    id: 's_qin',
    name: '天禽',
    type: 'star',
    title: '天禽星 (大吉)',
    symbol: '禽',
    tagline: '中正寬厚，百事皆宜',
    description: '代表中正、領袖、寬厚包容、誠信。天禽星坐落中宮，寄生他宮，象徵誠信可靠，是極為穩健而圓滿的象徵。',
    element: '土'
  },
  {
    id: 's_xin',
    name: '天心',
    type: 'star',
    title: '天心星 (大吉)',
    symbol: '心',
    tagline: '醫藥心智，運籌帷幄',
    description: '代表管理、決策、醫藥、智謀。天心星是才華與謀略的化身，能克制邪惡，象徵有卓越的掌控力與分析局勢能力。',
    element: '金'
  },
  {
    id: 's_zhu',
    name: '天柱',
    type: 'star',
    title: '天柱星 (中平)',
    symbol: '柱',
    tagline: '能言善道，頂天立地',
    description: '代表口才、破壞、改革、頂天立地的支柱。天柱星利於雄辯、指出弊端，但也主爭執與既有格局的重組。',
    element: '金'
  },
  {
    id: 's_ren',
    name: '天任',
    type: 'star',
    title: '天任星 (大吉)',
    symbol: '任',
    tagline: '任勞任怨，積沙成塔',
    description: '代表誠實、勤奮、房產、耐力。天任星性格敦厚，象徵持之以恆必有所成，最利於農業、房產及基礎建設。',
    element: '土'
  },
  {
    id: 's_ying',
    name: '天英',
    type: 'star',
    title: '天英星 (中平)',
    symbol: '英',
    tagline: '烈火雄風，華麗張揚',
    description: '代表熱情、急躁、名望、視覺效果。天英星五行屬火，代表虛名、宣傳、引人注目。利於發布會及形象展示。',
    element: '火'
  }
];

// 八門卡片庫 (Eight Gates Cards)
export const GATE_CARDS: CardItem[] = [
  {
    id: 't_jing',
    name: '驚門',
    type: 'gate',
    title: '驚門 (驚恐)',
    symbol: '驚',
    tagline: '口舌辯論，警覺驚奇',
    description: '代表驚恐、官司、辯論、口舌是非、缺口。驚門五行屬金，代表需要在動盪與言詞交鋒中保持絕對冷靜與高警覺性。',
    element: '金'
  },
  {
    id: 't_kai',
    name: '開門',
    type: 'gate',
    title: '開門 (大吉)',
    symbol: '開',
    tagline: '豁然開朗，大業始創',
    description: '代表事業、開創、公開、順暢。開門五行屬金，象徵新起點、坦誠與希望。利於求職、創業、搬遷。',
    element: '金'
  },
  {
    id: 't_xiu',
    name: '休門',
    type: 'gate',
    title: '休門 (大吉)',
    symbol: '休',
    tagline: '休養生息，貴人蔭庇',
    description: '代表休閒、家庭、婚姻、貴人。休門五行屬水，象徵從容、調整、和諧與美滿。利於調養、求助、聚會。',
    element: '水'
  },
  {
    id: 't_sheng',
    name: '生門',
    type: 'gate',
    title: '生門 (大吉)',
    symbol: '生',
    tagline: '生生不息，財源廣進',
    description: '代表利潤、房產、生機、活力。生門五行屬土，是奇門中最喜慶之吉門，象徵財富增長、生命力綻放。',
    element: '土'
  },
  {
    id: 't_shang',
    name: '傷門',
    type: 'gate',
    title: '傷門 (凶門)',
    symbol: '傷',
    tagline: '競爭拼搏，討債捕獵',
    description: '代表競爭、受傷、討債、駕駛、運動。傷門性格倔強，多主搏殺與突破，雖有勞碌，但利於拼搏與追討。',
    element: '木'
  },
  {
    id: 't_du',
    name: '杜門',
    type: 'gate',
    title: '杜門 (中平)',
    symbol: '杜',
    tagline: '閉門謝客，暗中防護',
    description: '代表阻塞、保密、隱蔽、技術、關卡。杜門五行屬木，象徵堵塞不通，利於技術研發、秘密策劃或守密防守。',
    element: '木'
  },
  {
    id: 't_jing_view',
    name: '景門',
    type: 'gate',
    title: '景門 (中吉)',
    symbol: '景',
    tagline: '光鮮亮麗，宣傳文書',
    description: '代表文書、合約、計畫、宣傳、飯局。景門五行屬火，象徵表面華麗、名聲大噪，但需防虛而不實。',
    element: '火'
  },
  {
    id: 't_si',
    name: '死門',
    type: 'gate',
    title: '死門 (大凶)',
    symbol: '死',
    tagline: '凝滯不動，地產終結',
    description: '代表僵化、終點、土地、雕刻、死板。死門五行屬土，象徵事情陷於停滯，需做出斷捨離、方能迎來新生。',
    element: '土'
  }
];

// 生成 AI 提示詞的函式
export const generateDivinePrompt = (category: CategoryType, questionText: string): string => {
  const finalQuestion = questionText.trim() ? questionText.trim() : '目前雙方屬於倦怠階段，已交往三年。這三年過程中的最後半年，雙方幾乎沒有深度溝通，見面也只是各自玩手機，自己對這段感情感到之無味，想要問這段感情是否該走向終點。';
  
  return `奇門遁甲 問測 (${finalQuestion})
盤的資訊如下
巽宮+九天+天沖+驚門
奇門斷語如下
乙加丙：為奇儀順遂,吉事為遷官進職；凶事為夫妻離別。
庚加丙：為太白入熒,占賊必為,為客進利,為主破財。
驚門有門迫 九天有旬空 此宮位有馬星
請幫我解釋`;
};

// 獲取默認的提示指引
export const getQuestionPlaceholder = (category: CategoryType): string => {
  switch (category) {
    case '感情':
      return '例如：我與交往三年的伴侶感情倦怠，想問是否該繼續走下去？';
    case '工作':
      return '例如：目前工作遇到瓶頸，是否應該在此時選擇轉換跑道？';
    case '創業':
      return '例如：計劃在近期與朋友合夥開咖啡廳，想求問此項目未來的發展前景？';
    case '提問指引':
      return '例如：請輸入您內心最誠心的具體問題，越詳細結果解讀越精準...';
  }
};
