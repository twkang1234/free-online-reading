/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryType = '感情' | '工作' | '創業' | '提問指引';

export interface CardItem {
  id: string;
  name: string;
  type: 'palace' | 'god' | 'star' | 'gate';
  title: string;
  symbol: string;
  tagline: string;
  description: string;
  element: string; // 五行屬性
  direction?: string; // 方位
}

export interface DivinationState {
  category: CategoryType;
  question: string;
  currentStep: 'welcome' | 'draw_palace' | 'draw_god' | 'draw_star' | 'draw_gate' | 'result';
  drawnCards: {
    palace?: CardItem;
    god?: CardItem;
    star?: CardItem;
    gate?: CardItem;
  };
}
