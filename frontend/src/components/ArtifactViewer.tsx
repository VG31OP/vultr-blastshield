import React from 'react';
import { Image, FileText, Download, CheckCircle } from 'lucide-react';
import type { Artifact } from '../types';

interface ArtifactViewerProps {
  artifacts: Artifact[];
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifacts }) => {
  if (artifacts.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
            Sandbox Verified Artifacts & Receipts ({artifacts.length})
          </h2>
        </div>
        <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
          <CheckCircle className="w-3.5 h-3.5" />
          Rendered in Isolation
        </span>
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artifacts.map((art, idx) => {
          const isImage = art.type.startsWith('image/');
          const imgSrc = isImage && art.content_base64
            ? `data:${art.type};base64,${art.content_base64}`
            : undefined;

          return (
            <div
              key={idx}
              className="rounded-lg border border-slate-800 bg-slate-950 p-4 flex flex-col justify-between gap-3 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isImage ? (
                      <Image className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-purple-400" />
                    )}
                    <span className="text-xs font-semibold text-slate-200">{art.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {art.filename}
                  </span>
                </div>

                {/* Image Render */}
                {isImage && imgSrc && (
                  <div className="mt-3 rounded border border-slate-800 overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img
                      src={imgSrc}
                      alt={art.title}
                      className="max-h-72 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* CSV / Text Render */}
                {!isImage && art.data && (
                  <pre className="mt-3 p-3 rounded bg-slate-900 font-mono text-xs text-slate-300 max-h-48 overflow-y-auto border border-slate-800">
                    {art.data}
                  </pre>
                )}
              </div>

              {/* Download / Action Button */}
              {isImage && imgSrc && (
                <a
                  href={imgSrc}
                  download={art.filename}
                  className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Artifact</span>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
