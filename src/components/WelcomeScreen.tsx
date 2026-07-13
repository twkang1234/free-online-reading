/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CategoryType } from '../types';
import { getQuestionPlaceholder } from '../utils/divinationData';
import { Sparkles, Heart, Briefcase, Rocket, HelpCircle } from 'lucide-react';

interface WelcomeScreenProps {
  key?: string;
  onStart: (category: CategoryType, question: string) => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('感情');
  const [question, setQuestion] = useState('');

  const categories: { type: CategoryType; label: string; icon: React.ReactNode; color: string }[] = [
    { type: '感情', label: '感情測算', icon: <Heart className="w-4 h-4" />, color: 'from-pink-500/20 to-rose-500/10 hover:border-rose-500/50' },
    { type: '工作', label: '工作運勢', icon: <Briefcase className="w-4 h-4" />, color: 'from-blue-500/20 to-indigo-500/10 hover:border-blue-500/50' },
    { type: '創業', label: '創業開局', icon: <Rocket className="w-4 h-4" />, color: 'from-emerald-500/20 to-teal-500/10 hover:border-emerald-500/50' },
    { type: '提問指引', label: '提問指引', icon: <HelpCircle className="w-4 h-4" />, color: 'from-amber-500/20 to-orange-500/10 hover:border-amber-500/50' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(selectedCategory, question);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[85vh]"
      id="welcome-container"
    >
      {/* 旋轉的八卦 / 陰陽星盤背景 */}
      <div className="relative mb-8 flex justify-center items-center" id="welcome-logo">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 md:w-40 md:h-40 opacity-15 border border-dashed border-yellow-500 rounded-full flex items-center justify-center"
        >
          <div className="w-4/5 h-4/5 border border-dashed border-yellow-500 rounded-full" />
        </motion.div>
        
        {/* 核心太極印記 */}
        <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-600/30 to-amber-950/40 rounded-full border border-yellow-500/40 shadow-[0_0_25px_rgba(234,179,8,0.25)] flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-yellow-400 animate-pulse" />
        </div>
      </div>

      <div className="text-center mb-8" id="welcome-header">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-yellow-100 tracking-wider mb-3">
          線上免費占卜｜AI 命運指引盤
        </h1>
        <p className="text-sm md:text-base text-purple-200/80 font-sans tracking-wide">
          「誠心啟問，為您解惑」—— 靜心抽卡，探尋東方神祕學之理
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full bg-[#161224]/80 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 md:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col gap-6" id="welcome-form">
        
        {/* 類別選擇 */}
        <div id="category-section">
          <label className="block text-xs md:text-sm font-medium text-yellow-200/80 mb-3 tracking-wider uppercase font-serif">
            一、選擇占卜問測主題
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.type;
              return (
                <button
                  key={cat.type}
                  type="button"
                  onClick={() => setSelectedCategory(cat.type)}
                  className={`relative flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'border-yellow-500 bg-gradient-to-b from-yellow-500/20 to-amber-950/20 text-yellow-100 shadow-[0_0_15px_rgba(234,179,8,0.15)] scale-[1.03]'
                      : `border-purple-500/10 bg-[#1f1933]/50 text-purple-300/70 hover:text-purple-200 ${cat.color}`
                  }`}
                  id={`cat-btn-${cat.type}`}
                >
                  <div className={`mb-2 p-1.5 rounded-lg ${isActive ? 'bg-yellow-500/20 text-yellow-300' : 'bg-purple-900/30 text-purple-400'}`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs md:text-sm font-medium tracking-wide">{cat.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBorder"
                      className="absolute inset-0 border-2 border-yellow-500/60 rounded-xl pointer-events-none"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 問題輸入 */}
        <div id="question-section">
          <label className="block text-xs md:text-sm font-medium text-yellow-200/80 mb-3 tracking-wider uppercase font-serif">
            二、誠心默禱並輸入問題
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={getQuestionPlaceholder(selectedCategory)}
            className="w-full h-28 px-4 py-3 text-sm md:text-base bg-[#0e0a1b] text-purple-100 border border-purple-500/20 rounded-xl focus:border-yellow-500/60 focus:outline-none focus:ring-1 focus:ring-yellow-500/30 placeholder-purple-400/40 transition-all resize-none leading-relaxed"
            id="question-textarea"
          />
          <p className="text-[11px] text-purple-400/60 mt-1.5 italic">
            * 提示：請盡量描述具體的人、事、時、地，默禱15秒後再點擊啟動占卜，效果最靈驗。
          </p>
        </div>

        {/* 啟動按鈕 */}
        <motion.button
          whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(234,179,8,0.3)' }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600 text-yellow-950 font-serif font-bold tracking-widest text-base md:text-lg rounded-xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-yellow-400/30"
          id="btn-start-divination"
        >
          <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
          默禱完畢，進入奇門占卜
        </motion.button>

      </form>
    </motion.div>
  );
}
