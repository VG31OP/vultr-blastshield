import React from 'react';
import { Image, FileText, Download, CheckCircle } from 'lucide-react';
import type { Artifact } from '../types';

interface ArtifactViewerProps {
  artifacts: Artifact[];
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifacts }) => {
  if (artifacts.length === 0) return null;

  return (
    <div className="geo-panel bg-white p-6 relative overflow-visible shadow-[5px_5px_0_#252b3a]">
      {/* Playful Book Tab */}
      <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-md bg-[#ffd05b] border-[2px] border-[#252b3a] text-[11px] font-black uppercase tracking-wider text-[#252b3a] shadow-[2px_2px_0_#252b3a]">
        Verified Output Gallery ({artifacts.length})
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-4 border-b-[2px] border-[#252b3a]/15">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#9bf1cd] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a] flex items-center justify-center">
            <Image className="w-4 h-4 text-[#252b3a]" />
          </div>
          <h2 className="text-base font-black text-[#253044] font-display">
            Sandbox Verified Artifacts & Receipts
          </h2>
        </div>
        <span className="text-xs font-bold text-[#0c7c4b] bg-[#e9fff5] px-3 py-1 rounded-full border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a] flex items-center gap-1.5 font-reading">
          <CheckCircle className="w-3.5 h-3.5" />
          Rendered in Isolation
        </span>
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {artifacts.map((art, idx) => {
          const isImage = art.type.startsWith('image/');
          const imgSrc = isImage && art.content_base64
            ? `data:${art.type};base64,${art.content_base64}`
            : undefined;

          return (
            <div
              key={idx}
              className="rounded-2xl border-[2.5px] border-[#252b3a] bg-[#fffdf5] p-5 flex flex-col justify-between gap-4 shadow-[3px_3px_0_#252b3a]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isImage ? (
                      <div className="w-7 h-7 rounded-lg bg-[#f1ebff] border-[1.5px] border-[#252b3a] flex items-center justify-center">
                        <Image className="w-4 h-4 text-[#6434df]" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-[#ffecf5] border-[1.5px] border-[#252b3a] flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#ff78c5]" />
                      </div>
                    )}
                    <span className="text-sm font-black text-[#253044] font-display">{art.title}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#252b3a] bg-white px-2.5 py-1 rounded-full border-[1.5px] border-[#252b3a]">
                    {art.filename}
                  </span>
                </div>

                {/* Image Render */}
                {isImage && imgSrc && (
                  <div className="mt-4 rounded-xl border-[2.5px] border-[#252b3a] overflow-hidden bg-white shadow-[2px_2px_0_#252b3a] p-2 flex items-center justify-center">
                    <img
                      src={imgSrc}
                      alt={art.title}
                      className="max-h-80 w-auto object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* CSV / Text Render */}
                {!isImage && art.data && (
                  <pre className="mt-4 p-4 rounded-xl bg-white font-mono text-xs text-[#253044] max-h-52 overflow-y-auto border-[2px] border-[#252b3a]">
                    {art.data}
                  </pre>
                )}
              </div>

              {/* Download / Action Button */}
              {isImage && imgSrc && (
                <a
                  href={imgSrc}
                  download={art.filename}
                  className="geo-btn-secondary py-2 px-4 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#6434df]" />
                  <span>Download Artifact Receipt</span>
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
