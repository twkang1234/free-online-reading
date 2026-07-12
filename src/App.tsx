/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CategoryType, CardItem, DivinationState } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import CardDeck from './components/CardDeck';
import ResultScreen from './components/ResultScreen';
import { Compass, Sparkle } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<DivinationState>({
    category: '感情',
    question: '',
    currentStep: 'welcome',
    drawnCards: {}
  });

  // 開始占卜
  const handleStartDivination = (category: CategoryType, question: string) => {
    setState((prev) => ({
      ...prev,
      category,
      question,
      currentStep: 'draw_palace'
    }));
  };

  // 當某一步驟抽卡完成
  const handleDrawComplete = (card: CardItem) => {
    setState((prev) => {
      const nextDrawn = { ...prev.drawnCards };
      
      if (prev.currentStep === 'draw_palace') {
        nextDrawn.palace = card;
        return { ...prev, drawnCards: nextDrawn, currentStep: 'draw_god' };
      }
      if (prev.currentStep === 'draw_god') {
        nextDrawn.god = card;
        return { ...prev, drawnCards: nextDrawn, currentStep: 'draw_star' };
      }
      if (prev.currentStep === 'draw_star') {
        nextDrawn.star = card;
        return { ...prev, drawnCards: nextDrawn, currentStep: 'draw_gate' };
      }
      if (prev.currentStep === 'draw_gate') {
        nextDrawn.gate = card;
        return { ...prev, drawnCards: nextDrawn, currentStep: 'result' };
      }

      return prev;
    });
  };

  // 重新占卜重置
  const handleReset = () => {
    setState({
      category: '感情',
      question: '',
      currentStep: 'welcome',
      drawnCards: {}
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0815] text-purple-100 flex flex-col justify-between font-sans relative overflow-hidden" id="app-root-container">
      
      {/* 背景裝飾：星塵粒子與漸層星雲 */}
      <div className="absolute inset-0 z-0 pointer-events-none" id="cosmic-background">
        {/* 背景大暈光 */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 filter blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 filter blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
        
        {/* 微弱星光背景點綴 */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      {/* 頂部導航列 (極簡精緻) */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-purple-500/10 backdrop-blur-md bg-[#0b0815]/40" id="app-header">
        <button onClick={handleReset} className="flex items-center gap-2 cursor-pointer group" id="logo-button">
          <div className="p-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 group-hover:rotate-45 transition-transform duration-500">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-serif font-bold text-sm md:text-base tracking-widest text-yellow-100 group-hover:text-yellow-200 transition-colors">
            奇門遁甲抽卡盤
          </span>
        </button>

        <div className="flex items-center gap-3" id="header-badge">
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-serif px-2.5 py-1 rounded-full bg-purple-900/30 border border-purple-500/20 text-purple-300">
            <Sparkle className="w-3 h-3 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
            宇宙玄機已就緒
          </div>
          <span className="text-xs font-mono text-purple-400/80">v1.2.0</span>
        </div>
      </header>

      {/* 主內容容器 */}
      <main className="relative z-10 flex-grow flex items-center justify-center w-full" id="app-main">
        <AnimatePresence mode="wait">
          {state.currentStep === 'welcome' && (
            <WelcomeScreen key="welcome" onStart={handleStartDivination} />
          )}

          {state.currentStep.startsWith('draw_') && (
            <CardDeck
              key={state.currentStep}
              step={state.currentStep as any}
              onDrawComplete={handleDrawComplete}
            />
          )}

          {state.currentStep === 'result' && (
            <ResultScreen
              key="result"
              drawnCards={state.drawnCards}
              initialCategory={state.category}
              initialQuestion={state.question}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 底部 Footer */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-purple-500/5 text-[11px] text-purple-400/40 font-serif" id="app-footer">
        <p>© 2026 奇門遁甲 AI 提示詞大師 ‧ 專屬客製化抽卡平台</p>
      </footer>

    </div>
  );
}
