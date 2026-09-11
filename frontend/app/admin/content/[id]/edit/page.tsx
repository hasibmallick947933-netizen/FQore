'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Content } from '@/lib/types';
import { ContentEditorForm } from '@/components/admin/ContentEditorForm';
import { ArrowLeft, Edit } from 'lucide-react';

export default function EditContentPage() {
  const params = useParams();
  const id = params?.id as string;
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      api.get<{ success: boolean; content: Content }>(`/content/id/${id}`)
        .then((res) => setContent(res.content))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center font-mono text-xs text-slate-500">
        Loading material specifications...
      </div>
    );
  }

  if (!content) {
    return (
      <div className="py-20 text-center">
        <p className="text-white font-bold">Content not found.</p>
        <Link href="/admin/content" className="text-xs text-cyan-400 hover:underline mt-2 inline-block">
          Return to Content List
        </Link>
      </div>
    );
  }

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
            <Edit className="w-5 h-5 text-cyan-400" /> Edit Educational Material
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Editing: <span className="text-cyan-300 font-semibold">{content.title}</span>
          </p>
        </div>
      </div>

      <ContentEditorForm initialData={content} isEdit={true} />
    </div>
  );
}
