'use client';

import React from 'react';
import Link from 'next/link';
import { ContentEditorForm } from '@/components/admin/ContentEditorForm';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function CreateContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/content"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black uppercase text-white font-mono flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" /> Create Educational Material
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Deploy articles, videos, Excel valuation templates, or company analyses to MongoDB.
          </p>
        </div>
      </div>

      <ContentEditorForm />
    </div>
  );
}
