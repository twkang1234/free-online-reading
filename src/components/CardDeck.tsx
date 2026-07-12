/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardItem } from '../types';
import { PALACE_CARDS, GOD_CARDS, STAR_CARDS, GATE_CARDS } from '../utils/divinationData';
import { HelpCircle, ChevronRight, Eye, ShieldCheck, Sparkle } from 'lucide-react';

interface CardDeckProps {
  key?: string;
  step: 'draw_palace' | 'draw_god' | 'draw_star' | 'draw_gate';
  onDrawComplete: (card: CardItem) => void;
}

export default function CardDeck({ step, onDrawComplete }: CardDeckProps) {
  const [deck, setDeck] = useState<CardItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [shuffling, setShuffling] = useState(false);

  // 取得當前步驟的目標與配置
  const getStepConfig = () => {
    switch (step) {
      case 'draw_palace':
        return {
          title: '第一步：求取「宮位」',
          subtitle: '宮位象徵局勢之地理、大環境背景與承載力量',
          target: PALACE_CARDS.find(c => c.id === 'p_xun')!,
          all: PALACE_CARDS,
          typeName: '宮位',
          bgTheme: 'from-emerald-950/40 via-[#18122c]/90 to-purple-950/40'
        };
      case 'draw_god':
        return {
          title: '第二步：求取「神助」',
          subtitle: '八神象徵局勢之神祇引導、無形加持與精神層面',
          target: GOD_CARDS.find(c => c.id === 'g_jiutian')!,
          all: GOD_CARDS,
          typeName: '八神',
          bgTheme: 'from-amber-950/40 via-[#18122c]/90 to-purple-950/40'
        };
      case 'draw_star':
        return {
          title: '第三步：求取「星勢」',
          subtitle: '九星象徵天時、局勢氣候、性格趨向與內在原動力',
          target: STAR_CARDS.find(c => c.id === 's_chong')!,
          all: STAR_CARDS,
          typeName: '九星',
          bgTheme: 'from-blue-950/40 via-[#18122c]/90 to-purple-950/40'
        };
      case 'draw_gate':
        return {
          title: '第四步：求取「門位」',
          subtitle: '八門象徵人事軌跡、行事出口、吉凶進退與實際局勢',
          target: GATE_CARDS.find(c => c.id === 't_jing')!,
          all: GATE_CARDS,
          typeName: '八門',
          bgTheme: 'from-red-950/40 via-[#18122c]/90 to-purple-950/40'
        };
    }
  };

  const config = getStepConfig();

  // 初始化牌組：建立 8 張牌
  useEffect(() => {
    // 重置選牌狀態
    setSelectedIndex(null);
    setIsRevealed(false);
    
    // 開始模擬洗牌動畫
    setShuffling(true);
    const timer = setTimeout(() => {
      setShuffling(false);
    }, 900);

    // 建立 8 個位置的暫時牌（都是背面）
    // 雖然背地裡我們會把目標牌塞在被點擊的那張牌，但這裡先初始化一組
    const tempDeck = Array(8).fill(null).map((_, i) => ({
      id: `placeholder_${i}`,
      name: '神秘之牌',
      type: step.replace('draw_', '') as any,
      title: '未知乾坤',
      symbol: '？',
      tagline: '誠心祈禱，一觸即發',
      description: '等待天機揭曉。',
      element: '？'
    }));
    
    setDeck(tempDeck);

    return () => clearTimeout(timer);
  }, [step]);

  // 使用者點選了一張牌
  const handleCardClick = (index: number) => {
    if (selectedIndex !== null || shuffling) return;

    setSelectedIndex(index);
    setIsRevealed(true);

    // 【命運的齒輪開始轉動：魔術重組牌面】
    // 1. 被點中的牌一定是 Target 牌
    // 2. 其餘 7 張牌，填入隨機不重複的其他 7 張卡，讓使用者在事後揭曉時，覺得是真正隨機的。
    const others = config.all.filter(c => c.id !== config.target.id);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5);

    const finalDeck = Array(8).fill(null).map((_, i) => {
      if (i === index) {
        return config.target; // 被選中的是目標牌
      } else {
        // 其餘分配別的牌
        return shuffledOthers.pop() || config.target;
      }
    });

    setDeck(finalDeck);
  };

  // 渲染卡片背面的神聖太極八卦圖案
  const renderCardBack = () => (
    <div className="w-full h-full rounded-2xl bg-[#140f24] border border-yellow-500/30 flex flex-col items-center justify-between p-4 relative overflow-hidden shadow-[inset_0_0_15px_rgba(234,179,8,0.15)]">
      {/* 金色鑲角 */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-yellow-500/40 rounded-tl" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-yellow-500/40 rounded-tr" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-yellow-500/40 rounded-bl" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-yellow-500/40 rounded-br" />

      {/* 頂部小文字 */}
      <span className="font-serif text-[9px] tracking-widest text-yellow-500/40 uppercase">Qi Men Dun Jia</span>

      {/* 中心精細八卦 / 星盤 */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* 外圈旋轉點綴 */}
        <div className="absolute inset-0 border border-dashed border-yellow-500/20 rounded-full animate-spin" style={{ animationDuration: '30s' }} />
        {/* 中圈太極線 */}
        <div className="absolute w-4/5 h-4/5 border border-yellow-500/10 rounded-full flex items-center justify-center">
          <div className="w-2/3 h-2/3 border border-dashed border-yellow-500/30 rounded-full" />
        </div>
        {/* 太極心 */}
        <div className="relative z-10 text-yellow-500/60 font-serif text-lg">
          ☯
        </div>
      </div>

      {/* 底部裝飾 */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/30" />
        <span className="font-serif text-[10px] tracking-wider text-yellow-500/50">誠心靜卜</span>
      </div>
    </div>
  );

  // 渲染揭開後的卡片正面
  const renderCardFront = (card: CardItem, isSelected: boolean) => (
    <div className={`w-full h-full rounded-2xl bg-[#1a142e] border-2 flex flex-col items-center justify-between p-4 relative overflow-hidden shadow-2xl ${
      isSelected 
        ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.35)]' 
        : 'border-purple-500/20 opacity-40'
    }`}>
      {/* 卡片裝飾線與背景暈光 */}
      <div className={`absolute -top-12 -left-12 w-24 h-24 rounded-full filter blur-xl ${
        isSelected ? 'bg-yellow-500/10' : 'bg-purple-500/5'
      }`} />

      {/* 頂部類型與元素標籤 */}
      <div className="w-full flex justify-between items-center z-10">
        <span className="text-[10px] bg-purple-900/40 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full font-serif tracking-wider">
          {config.typeName}
        </span>
        <span className="text-[10px] bg-yellow-950/50 border border-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full font-sans">
          五行: {card.element}
        </span>
      </div>

      {/* 大字書法字符 */}
      <div className="flex flex-col items-center gap-1 my-2 z-10">
        <div className={`font-serif text-5xl font-bold tracking-tight mb-1 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] ${
          isSelected ? 'text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-amber-500' : 'text-purple-300/80'
        }`}>
          {card.symbol}
        </div>
        <h3 className="font-serif text-lg font-bold text-purple-100 tracking-wider">
          {card.name}
        </h3>
      </div>

      {/* 簡短一句讖語 */}
      <p className="text-[11px] text-yellow-200/80 font-serif text-center tracking-wide leading-relaxed px-1 border-t border-yellow-500/10 pt-2 w-full z-10 truncate">
        {card.tagline}
      </p>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[85vh]" id="deck-container">
      
      {/* 頂部進度條與說明 */}
      <div className="w-full max-w-lg mb-8 text-center" id="deck-header">
        <span className="text-[11px] font-sans tracking-widest text-yellow-500/60 uppercase font-bold">
          QI MEN DUN JIA DRAWING
        </span>
        <h2 className="font-serif text-2xl font-semibold text-yellow-100 tracking-wider mt-1 mb-2">
          {config.title}
        </h2>
        <p className="text-xs md:text-sm text-purple-200/70 font-sans leading-relaxed">
          {config.subtitle}
        </p>

        {/* 進度圓點 */}
        <div className="flex items-center justify-center gap-2 mt-4" id="deck-progress">
          {(['draw_palace', 'draw_god', 'draw_star', 'draw_gate'] as const).map((s, idx) => {
            const isCurrent = step === s;
            const isPassed = 
              (step === 'draw_god' && idx < 1) ||
              (step === 'draw_star' && idx < 2) ||
              (step === 'draw_gate' && idx < 3);

            return (
              <div key={s} className="flex items-center">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  isCurrent 
                    ? 'bg-yellow-500 ring-4 ring-yellow-500/20 scale-125' 
                    : isPassed 
                      ? 'bg-yellow-600/80' 
                      : 'bg-purple-900/60 border border-purple-500/20'
                }`} />
                {idx < 3 && (
                  <div className={`w-12 h-0.5 mx-1 transition-all duration-500 ${
                    isPassed ? 'bg-yellow-600/50' : 'bg-purple-950/60'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 張卡片擺盤 */}
      <div className="relative w-full mb-8 flex justify-center items-center" id="deck-cards-area">
        {shuffling ? (
          /* 洗牌中動畫 */
          <div className="h-[280px] md:h-[320px] flex items-center justify-center" id="shuffling-loader">
            <div className="relative w-36 h-56">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, (i - 2) * 45, 0],
                    y: [0, -10, 0],
                    rotate: [0, (i - 2) * 8, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08
                  }}
                  className="absolute inset-0 w-36 h-56 rounded-2xl bg-[#140f24] border border-yellow-500/30 shadow-xl flex items-center justify-center"
                  style={{ zIndex: 5 - i }}
                >
                  <div className="w-10 h-10 border border-dashed border-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500/40 text-xs">☯</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* 卡片展示網格 */
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl px-2" id="cards-grid">
            {deck.map((card, idx) => {
              const isSelected = selectedIndex === idx;
              const isNotSelected = selectedIndex !== null && !isSelected;

              return (
                <div
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`relative h-44 sm:h-52 cursor-pointer transition-all duration-300 ${
                    selectedIndex === null ? 'hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(234,179,8,0.15)]' : ''
                  }`}
                  style={{
                    perspective: '1000px',
                    pointerEvents: selectedIndex !== null ? 'none' : 'auto'
                  }}
                  id={`card-item-${idx}`}
                >
                  {/* 3D 翻牌核心器 */}
                  <div
                    className="w-full h-full relative"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isRevealed ? 'rotateY(180deg)' : 'none',
                      transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.2)'
                    }}
                  >
                    {/* 卡片背面 */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {renderCardBack()}
                    </div>

                    {/* 卡片正面 */}
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {renderCardFront(card, isSelected)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 揭曉後的占卜說明卡片 */}
      <AnimatePresence>
        {isRevealed && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-lg bg-[#140f25]/90 border border-yellow-500/20 rounded-xl p-5 shadow-2xl relative overflow-hidden"
            id="reveal-description"
          >
            {/* 太極背景微光 */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-yellow-500/5 font-serif text-[120px] pointer-events-none">
              ☯
            </div>

            <div className="flex items-start gap-3.5 relative z-10">
              <div className="p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 mt-1">
                <Sparkle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-yellow-200 tracking-wider flex items-center gap-2">
                  <span>命定揭曉：{config.target.name}</span>
                  <span className="text-[11px] font-sans px-1.5 py-0.5 rounded bg-purple-900/40 text-purple-300">
                    {config.target.element}行屬性
                  </span>
                </h4>
                <p className="text-xs md:text-sm text-purple-200/85 mt-2 leading-relaxed">
                  {config.target.description}
                </p>
              </div>
            </div>

            {/* 下一步按鈕 */}
            <div className="mt-5 flex justify-end" id="next-btn-area">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDrawComplete(config.target)}
                className="px-5 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-500 hover:from-yellow-500 hover:to-amber-400 text-yellow-950 font-serif font-bold text-xs tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
                id="btn-next-step"
              >
                {step === 'draw_gate' ? '起卦完成，檢視結果' : '前往下一步'}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
