import React from 'react';
import { HubLayout } from '@/components/content/HubLayout';
import { Content } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function getBusinessData() {
  try {
    const res = await fetch(`${API_BASE}/content?category=business-models`, { cache: 'no-store' });
    const data = await res.json();
    return (data.content || []) as Content[];
  } catch (err) {
    return [];
  }
}

export default async function BusinessPage() {
  const content = await getBusinessData();

  return (
    <HubLayout
      title="Business Models & Economic Engines"
      badge="Business Intelligence"
      description="Deconstructing how companies make money, scale operational capacity, structure gross margins, and defend their market position against commoditization."
      subcategories={['SaaS Economics', 'Marketplace', 'DTC & Retail', 'Manufacturing', 'Strategic Moats']}
      initialContent={content}
    />
  );
}
