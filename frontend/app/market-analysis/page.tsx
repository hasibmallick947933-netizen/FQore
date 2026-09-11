import React from 'react';
import { HubLayout } from '@/components/content/HubLayout';
import { Content } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function getMarketAnalysisData() {
  try {
    const res = await fetch(`${API_BASE}/content?category=market-analysis`, { cache: 'no-store' });
    const data = await res.json();
    return (data.content || []) as Content[];
  } catch (err) {
    return [];
  }
}

export default async function MarketAnalysisPage() {
  const content = await getMarketAnalysisData();

  return (
    <HubLayout
      title="Macroeconomic Trends & Market Analysis"
      badge="Global Macro"
      description="Analytical frameworks for evaluating interest rate shifts, central bank liquidity balances, sovereign yield curve signals, and sector rotation cycles."
      subcategories={['Macroeconomics', 'Federal Reserve & Rates', 'Yield Curves & Credit', 'Inflation & Commodities', 'Liquidity Cycles']}
      initialContent={content}
    />
  );
}
