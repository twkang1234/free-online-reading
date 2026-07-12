/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CardItem, CategoryType } from '../types';
import { generateDivinePrompt, getQuestionPlaceholder } from '../utils/divinationData';
import { Copy, ArrowUpRight, RotateCcw, Check, Sparkles, Heart, Briefcase, Rocket, HelpCircle } from 'lucide-react';

interface ResultScreenProps {
  key?: string;
  drawnCards: {
    palace?: CardItem;
    god?: CardItem;
    star?: CardItem;
    gate?: CardItem;
  };
  initialCategory: CategoryType;
  initialQuestion: string;
  onReset: () => void;
}

export default function ResultScreen({ drawnCards, initialCategory, initialQuestion, onReset }: ResultScreenProps) {
  const [category, setCategory] = useState<CategoryType>(initialCategory);
  const [question, setQuestion] = useState(initialQuestion);
  const [copied, setCopied] = useState(false);

  const { palace, god, star, gate } = drawnCards;

  const generatedPrompt = generateDivinePrompt(category, question);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  const handleGoToAI = async (url: string) => {
    // 複製提示詞
    await handleCopy();
    // 打開 AI 新分頁
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const categories: { type: CategoryType; label: string; icon: React.ReactNode }[] = [
    { type: '感情', label: '感情', icon: <Heart className="w-3.5 h-3.5" /> },
    { type: '工作', label: '工作', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { type: '創業', label: '創業', icon: <Rocket className="w-3.5 h-3.5" /> },
    { type: '提問指引', label: '通用', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8 min-h-[90vh]"
      id="result-container"
    >
      {/* 標題與起卦成功 */}
      <div className="text-center" id="result-header">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs tracking-wider mb-3 font-serif"
        >
          <Check className="w-3.5 h-3.5" />
          奇門遁甲起卦完畢
        </motion.div>
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-yellow-100 tracking-wider">
          奇門四柱 ‧ 盤象揭曉
        </h1>
        <p className="text-xs md:text-sm text-purple-200/60 mt-1">
          天機已現，各歸其位。以下為您求得的四個占卜卡牌
        </p>
      </div>

      {/* 四張卡牌並列展示 (響應式) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="result-cards-board">
        {[
          { item: palace, label: '宮位 (地理)', color: 'border-emerald-500/30 shadow-[0_4px_20px_rgba(16,185,129,0.15)]' },
          { item: god, label: '神助 (無形)', color: 'border-amber-500/30 shadow-[0_4px_20px_rgba(245,158,11,0.15)]' },
          { item: star, label: '星勢 (天時)', color: 'border-blue-500/30 shadow-[0_4px_20px_rgba(59,130,246,0.15)]' },
          { item: gate, label: '門位 (人事)', color: 'border-red-500/30 shadow-[0_4px_20px_rgba(239,68,68,0.15)]' }
        ].map(({ item, label, color }, idx) => {
          if (!item) return null;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id}
              className={`rounded-2xl bg-[#17132a] border p-4 flex flex-col items-center justify-between text-center relative overflow-hidden h-52 sm:h-56 ${color}`}
              id={`result-card-${item.id}`}
            >
              <span className="text-[10px] text-purple-400 font-serif mb-2 tracking-wider uppercase block">{label}</span>
              
              <div className="flex flex-col items-center my-auto">
                <span className="font-serif text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-500 filter drop-shadow mb-1">
                  {item.symbol}
                </span>
                <span className="font-serif text-base font-bold text-yellow-100 tracking-wide mt-1">
                  {item.name}
                </span>
                <span className="text-[10px] text-purple-300 bg-purple-900/30 border border-purple-500/20 px-1.5 py-0.5 rounded mt-1.5 font-sans">
                  屬{item.element}
                </span>
              </div>

              <div className="w-full border-t border-purple-500/10 pt-2.5 mt-2.5">
                <p className="text-[10px] text-yellow-200/80 font-serif leading-relaxed line-clamp-2">
                  {item.tagline}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 問測參數調整 */}
      <div className="bg-[#151125]/90 border border-purple-500/15 rounded-2xl p-6 shadow-xl flex flex-col gap-5" id="result-settings">
        <h3 className="font-serif text-sm font-semibold text-yellow-200/80 tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          占卜提問客製化微調
        </h3>

        {/* 分類重新選擇 */}
        <div>
          <label className="block text-[11px] font-sans font-semibold tracking-wider text-purple-300 uppercase mb-2">
            主提問分類
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = category === cat.type;
              return (
                <button
                  key={cat.type}
                  onClick={() => setCategory(cat.type)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'border-yellow-500/60 bg-yellow-500/15 text-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.1)]'
                      : 'border-purple-500/10 bg-[#1e1933]/50 text-purple-400 hover:text-purple-200 hover:border-purple-500/30'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 問題重新編輯 */}
        <div>
          <label className="block text-[11px] font-sans font-semibold tracking-wider text-purple-300 uppercase mb-2">
            問題細節細描
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={getQuestionPlaceholder(category)}
            className="w-full h-20 px-3 py-2 text-xs sm:text-sm bg-[#0e0a1b] text-purple-100 border border-purple-500/15 rounded-xl focus:border-yellow-500/40 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 placeholder-purple-400/30 transition-all resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* 提示詞生成區 */}
      <div className="flex flex-col gap-3" id="prompt-display-area">
        <div className="flex justify-between items-center px-1">
          <span className="font-serif text-sm font-semibold tracking-wider text-yellow-200/80">
            生成的 AI 占卜提示詞
          </span>
          <span className="text-[10px] text-purple-400 font-sans">
            複製後，貼上給任何 AI (如 ChatGPT / Gemini)
          </span>
        </div>

        <div className="relative rounded-2xl bg-[#0a0715] border border-purple-500/20 shadow-inner p-4 md:p-5 overflow-hidden" id="prompt-box">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full filter blur-2xl pointer-events-none" />

          {/* 程式碼 / 提示詞文本 */}
          <pre className="font-mono text-xs md:text-sm text-purple-200/90 whitespace-pre-wrap leading-relaxed select-all">
            {generatedPrompt}
          </pre>

          {/* 一鍵複製覆蓋 */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-yellow-950 text-xs font-semibold cursor-pointer shadow-lg transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  已複製！
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  複製提示詞
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 下方核心操作按鈕 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2" id="action-buttons">
        <button
          onClick={() => handleGoToAI('https://chatgpt.com')}
          className="py-4 bg-[#1e143c] hover:bg-[#25194a] border border-purple-500/30 text-purple-200 font-medium text-sm md:text-base rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          <span>複製並前往 ChatGPT 問測</span>
          <ArrowUpRight className="w-4 h-4 text-purple-400" />
        </button>

        <button
          onClick={() => handleGoToAI('https://gemini.google.com')}
          className="py-4 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-yellow-950 font-serif font-bold text-sm md:text-base rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all shadow-lg border border-yellow-400/20"
        >
          <span>複製並前往 Gemini 深度解析</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* 重新測算按鈕 */}
      <div className="text-center mt-6" id="reset-button-area">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-purple-400/80 hover:text-yellow-200 tracking-wider font-serif cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          重新誠心起卦
        </button>
      </div>

    </motion.div>
  );
}
