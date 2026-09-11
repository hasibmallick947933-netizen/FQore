import React from 'react';
import { HubLayout } from '@/components/content/HubLayout';
import { Content } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function getCompanyData() {
  try {
    const res = await fetch(`${API_BASE}/content?category=company-analysis`, { cache: 'no-store' });
    const data = await res.json();
    return (data.content || []) as Content[];
  } catch (err) {
    return [];
  }
}

export default async function CompaniesPage() {
  const content = await getCompanyData();

  return (
    <HubLayout
      title="Company Deep Dives & Equity Research"
      badge="Equity Research"
      description="Forensic institutional assessments of public and private companies, dissecting software moats, semiconductor ecosystems, balance sheet leverage, and management track records."
      subcategories={['Semiconductors', 'Enterprise Software', 'Consumer Monopolies', 'Industrial Tech', 'Energy & Infrastructure']}
      initialContent={content}
    />
  );
}
