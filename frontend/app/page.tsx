import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { MarketTicker } from '@/components/home/MarketTicker';
import { CategoryExplorer } from '@/components/home/CategoryExplorer';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { StatsBanner } from '@/components/home/StatsBanner';
import { DeviceShowcase } from '@/components/home/DeviceShowcase';
import { HomePricingSection } from '@/components/home/HomePricingSection';
import { InteractiveTopics } from '@/components/home/InteractiveTopics';
import { BrandMarquee } from '@/components/home/BrandMarquee';
import { Content, Category, Plan } from '@/lib/types';
import { DEFAULT_PLANS } from '@/lib/constants';
import { ArrowUpRight, Clock, Eye } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section (Learnova 2-Column Split Layout with Floating Animated Badges) */}
      <HeroSection />

      {/* 2. Continuous Animated Market Ticker Tape */}
      <MarketTicker />

      {/* 3. Popular Categories (Learnova Horizontal Grid with Colorful Badges) */}
      <CategoryExplorer categories={categories} />

      {/* 4. Most Popular Courses / Featured Modules (Learnova Card Grid with Ratings & Prices) */}
      <FeaturedGrid items={featured} />

      {/* 5. Full-Width Stats Banner (10,000+ Learners, 100+ PDFs, 50+ Models) */}
      <StatsBanner />

      {/* 6. "Learn On Your Terms" Feature Showcase with Interactive Multi-Device Mockup */}
      <DeviceShowcase />

      {/* 7. Dedicated Pricing Section (Starter ₹59, Growth ₹99, Premium ₹149) */}
      <HomePricingSection initialPlans={plans} />

      {/* 8. Interactive Curriculum Matrix / Track Selector */}
      <InteractiveTopics />

      {/* 9. Latest Insights Feed */}
      {latest.length > 0 && (
        <section className="py-16 sm:py-24 border-b border-cyan-500/15 bg-[#030713]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-800/80 gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                  CONTINUOUS RESEARCH STREAM
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Latest Publications
                </h2>
              </div>
              <Link
                href="/search"
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 group"
              >
                <span>Explore All Releases</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((item) => (
                <Link
                  key={item._id}
                  href={`/content/${item.slug}`}
                  className="group rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-400/50 hover:bg-[#080d1c] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:-translate-y-1.5"
                >
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={item.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-cyan-500/30 text-[10px] font-mono uppercase text-cyan-300 font-bold backdrop-blur-md">
                      {item.contentType.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>{item.readTimeMinutes || 5} min read</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-slate-400" /> {item.views || 0} views
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Partner Logos Marquee (Learnova Style) */}
      <BrandMarquee />
    </div>
  );
}
