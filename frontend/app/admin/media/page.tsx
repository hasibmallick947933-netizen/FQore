'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { MediaItem } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import {
  Upload,
  HardDrive,
  Copy,
  Trash2,
  Check,
  FileSpreadsheet,
  FileText,
  Video,
  Image as ImageIcon,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ success: boolean; media: MediaItem[] }>('/media');
      setMediaList(res.media || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus(`Uploading ${file.name}...`);
    try {
      await api.uploadFile(file);
      setUploadStatus('Upload successful!');
      fetchMedia();
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadStatus(''), 3000);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete media asset "${name}"?`)) return;
    try {
      await api.delete(`/media/${id}`);
      setMediaList((prev) => prev.filter((m) => m._id !== id));
    } catch (err: any) {
      alert(err.message || 'Deletion failed');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getMediaIcon = (type: string, format: string) => {
    if (['xlsx', 'xls', 'csv'].includes(format.toLowerCase())) {
      return <FileSpreadsheet className="w-8 h-8 text-emerald-400" />;
    }
    if (['pdf'].includes(format.toLowerCase())) {
      return <FileText className="w-8 h-8 text-blue-400" />;
    }
    if (type === 'video' || ['mp4', 'mov', 'webm'].includes(format.toLowerCase())) {
      return <Video className="w-8 h-8 text-cyan-400" />;
    }
    return <ImageIcon className="w-8 h-8 text-purple-400" />;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black uppercase text-white font-mono flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-cyan-400" /> Cloudinary Media Storage Library
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Store and manage media assets, videos, PDFs, and Excel models stored externally on Cloudinary.
        </p>
      </div>

      {/* Upload Drop Area */}
      <div className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-8 text-center bg-slate-950/40 glass-panel">
        <Upload className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-white mb-1">
          Upload Files to Cloudinary
        </h3>
        <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
          Upload educational media (Images, Videos, PDFs, Excel sheets up to 50MB). Files are streamed to Cloudinary and metadata saved in MongoDB.
        </p>

        <label className="btn-chrome px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer inline-flex items-center gap-2">
          <span>{uploading ? 'Processing Stream...' : 'Select File to Upload'}</span>
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {uploadStatus && (
          <div className="mt-3 text-xs font-mono text-emerald-400 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{uploadStatus}</span>
          </div>
        )}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading ? (
          <div className="col-span-full py-16 text-center text-xs font-mono text-slate-500">
            Fetching Media Catalog...
          </div>
        ) : mediaList.length > 0 ? (
          mediaList.map((item) => (
            <div
              key={item._id}
              className="glass-panel rounded-xl p-4 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="h-32 rounded-lg bg-slate-900/80 flex items-center justify-center mb-3 overflow-hidden border border-slate-800/80 relative">
                  {item.resourceType === 'image' && item.secureUrl ? (
                    <img
                      src={item.secureUrl}
                      alt={item.originalName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getMediaIcon(item.resourceType, item.format)
                  )}
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-slate-950/80 border border-slate-800 text-slate-300">
                    .{item.format}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">
                  {item.originalName}
                </h4>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-3">
                  <span>{formatBytes(item.size)}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
                <button
                  onClick={() => handleCopyUrl(item.secureUrl, item._id)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-center gap-1 transition-colors"
                >
                  {copiedId === item._id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-cyan-400" /> Copy URL
                    </>
                  )}
                </button>

                <a
                  href={item.secureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  title="Open file"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleDelete(item._id, item.originalName)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-red-400 border border-slate-800"
                  title="Delete file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-slate-800 text-slate-500 text-xs font-mono">
            No media files uploaded yet. Upload your first PDF, video, or spreadsheet above.
          </div>
        )}
      </div>
    </div>
  );
}
