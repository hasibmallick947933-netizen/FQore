import React from 'react';
import Link from 'next/link';
import { HeroVideoSection } from '@/components/home/HeroVideoSection';
import { VisionSection } from '@/components/home/VisionSection';
import { DifferentSection } from '@/components/home/DifferentSection';
import { MeetPeopleSection } from '@/components/home/MeetPeopleSection';
import { CommunitySection } from '@/components/home/CommunitySection';
import { ShapingFutureSection } from '@/components/home/ShapingFutureSection';
import { HomePricingSection } from '@/components/home/HomePricingSection';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { BrandMarquee } from '@/components/home/BrandMarquee';
import { Content, Category, Plan } from '@/lib/types';
import { DEFAULT_PLANS } from '@/lib/constants';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function getData() {
  try {
    const [categoriesRes, featuredRes, latestRes, plansRes] = await Promise.all([
      fetch(`${API_BASE}/categories`, { cache: 'no-store' }).catch(() => null),
      fetch(`${API_BASE}/content?featured=true&limit=4`, { cache: 'no-store' }).catch(() => null),
      fetch(`${API_BASE}/content?limit=6&sortBy=newest`, { cache: 'no-store' }).catch(() => null),
      fetch(`${API_BASE}/plans`, { cache: 'no-store' }).catch(() => null),
    ]);

    const categoriesData = categoriesRes ? await categoriesRes.json().catch(() => ({})) : {};
    const featuredData = featuredRes ? await featuredRes.json().catch(() => ({})) : {};
    const latestData = latestRes ? await latestRes.json().catch(() => ({})) : {};
    const plansData = plansRes ? await plansRes.json().catch(() => ({})) : {};

    return {
      categories: (categoriesData.categories || []) as Category[],
      featured: (featuredData.content || []) as Content[],
      latest: (latestData.content || []) as Content[],
      plans: (plansData.plans && plansData.plans.length > 0 ? plansData.plans : DEFAULT_PLANS) as Plan[],
    };
  } catch (err) {
    console.warn('Using default home page data:', err);
    return {
      categories: [],
      featured: [],
      latest: [],
      plans: DEFAULT_PLANS,
    };
  }
}

export default async function HomePage() {
  const { categories, featured, latest, plans } = await getData();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 1. Video Hero Section: 3D Chrome Crystal Wave + "GROW YOURSELF" (frame_005.jpg & frame_020.jpg) */}
      <HeroVideoSection />

      {/* 2. Vision Section: Grid Matrix with Pulsing Nodes + 01., 02., 03., 04. Cards (frame_040.jpg) */}
      <VisionSection />

      {/* 3. How We're Different: Circuit Trace Lines + Geometric Icons + "Learn More ↗" (frame_060.jpg & frame_080.jpg) */}
      <DifferentSection />

      {/* 4. Meet People Behind: Interactive Rows + Dynamic Preview Visual (frame_100.jpg & frame_120.jpg) */}
      <MeetPeopleSection />

      {/* 5. Our Community: Concentric Arc Rings + Floating Pillar Cards (frame_140.jpg) */}
      <CommunitySection />

      {/* 6. Pricing Section: Starter (₹59), Growth (₹99), Premium (₹149) with Razorpay Checkout */}
      <HomePricingSection initialPlans={plans} />

      {/* 7. Most Popular Blueprints & Downloadable PDFs */}
      <FeaturedGrid items={featured} />

      {/* 8. Join Us in Shaping the Future: Glowing Capsule Banner (frame_160.jpg) */}
      <ShapingFutureSection />

      {/* 9. Institutional Trust Marquee */}
      <BrandMarquee />
    </div>
  );
}
