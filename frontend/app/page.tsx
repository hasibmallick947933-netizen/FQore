import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { InteractiveTopics } from '@/components/home/InteractiveTopics';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { CategoryExplorer } from '@/components/home/CategoryExplorer';
import { Button } from '@/components/ui/Button';
import { Content, Category } from '@/lib/types';
import { ArrowUpRight, Download, FileSpreadsheet, FileText, Sparkles, BookOpen, Clock, Eye } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

async function getData() {
  try {
    const [categoriesRes, featuredRes, latestRes, resourcesRes] = await Promise.all([
      fetch(`${API_BASE}/categories`, { cache: 'no-store' }),
      fetch(`${API_BASE}/content?featured=true&limit=4`, { cache: 'no-store' }),
      fetch(`${API_BASE}/content?limit=6&sortBy=newest`, { cache: 'no-store' }),
      fetch(`${API_BASE}/content/resources/all?limit=3`, { cache: 'no-store' }),
    ]);

    const categoriesData = await categoriesRes.json();
    const featuredData = await featuredRes.json();
    const latestData = await latestRes.json();
    const resourcesData = await resourcesRes.json();

    return {
      categories: (categoriesData.categories || []) as Category[],
      featured: (featuredData.content || []) as Content[],
      latest: (latestData.content || []) as Content[],
      resources: (resourcesData.resources || []) as Content[],
    };
  } catch (err) {
    console.error('Error fetching home page data:', err);
    return {
      categories: [],
      featured: [],
      latest: [],
      resources: [],
    };
  }
}

export default async function HomePage() {
  const { categories, featured, latest, resources } = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Futuristic Hero Section */}
      <HeroSection />

      {/* 2. Interactive Tracks / Vision Matrix */}
      <InteractiveTopics />

      {/* 3. Featured Flagship Content (01., 02. numbered cards) */}
      <FeaturedGrid items={featured} />

      {/* 4. Taxonomy Grid */}
      <CategoryExplorer categories={categories} />

      {/* 5. Latest Insights Feed */}
      <section className="py-20 lg:py-24 border-b border-cyan-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
                <Clock className="w-3.5 h-3.5" />
                Continuous Stream
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                Latest Publications
              </h2>
            </div>
            <Link href="/search" className="text-xs font-mono text-cyan-300 hover:underline flex items-center gap-1">
              Explore All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((item) => (
              <Link
                key={item._id}
                href={`/content/${item.slug}`}
                className="group glass-panel rounded-xl overflow-hidden flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
              >
                {/* Thumbnail header */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={item.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e1d] via-[#090e1d]/40 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono uppercase text-cyan-300 font-semibold backdrop-blur-md">
                    {item.contentType.replace('_', ' ')}
                  </span>
                </div>

                {/* Content body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400/80 block mb-1">
                      {item.category?.name || 'Analysis'}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{item.readTimeMinutes} min read</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-400" /> {item.views}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Institutional Resource Repository Highlights */}
      {resources.length > 0 && (
        <section className="py-20 bg-[#02050c] relative border-b border-cyan-500/15 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
                <Download className="w-3.5 h-3.5" />
                Actionable Assets
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                Downloadable Financial Resources
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                Institutional Excel templates, valuation worksheets, and forensic accounting checklists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.map((res) => (
                <div
                  key={res._id}
                  className="glass-panel rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        {res.contentType === 'excel' || res.contentType === 'csv' ? (
                          <FileSpreadsheet className="w-6 h-6" />
                        ) : (
                          <FileText className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                        {res.contentType}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{res.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-6">
                      {res.description}
                    </p>
                  </div>

                  <Link href={`/content/${res.slug}`}>
                    <Button variant="chrome" size="sm" className="w-full" showArrow>
                      Access Resource
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/resources">
                <Button variant="outline" size="md" showArrow>
                  Explore Full Resource Library
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
