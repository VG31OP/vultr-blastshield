import React from 'react';
import { Image, FileText, Download, CheckCircle } from 'lucide-react';
import type { Artifact } from '../types';

interface ArtifactViewerProps {
  artifacts: Artifact[];
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifacts }) => {
  if (artifacts.length === 0) return null;

  return (
    <div className="geo-panel bg-[#131b2e] p-6 relative overflow-visible shadow-[5px_5px_0_#090d16]">
      {/* Playful Book Tab */}
      <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-md bg-[#fbbf24] border-[2px] border-[#090d16] text-[11px] font-black uppercase tracking-wider text-[#090d16] shadow-[2px_2px_0_#090d16]">
        Verified Output Gallery ({artifacts.length})
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pt-2 pb-4 border-b-[2px] border-[#2a3753]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#34d399] border-[2px] border-[#090d16] shadow-[2px_2px_0_#090d16] flex items-center justify-center">
            <Image className="w-4 h-4 text-[#090d16]" />
          </div>
          <h2 className="text-base font-black text-[#f1f5f9] font-display">
            Sandbox Verified Artifacts & Receipts
          </h2>
        </div>
        <span className="text-xs font-bold text-[#34d399] bg-[#072b21] px-3 py-1 rounded-full border-[2px] border-[#34d399]/40 shadow-[2px_2px_0_#090d16] flex items-center gap-1.5 font-reading">
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
              className="rounded-2xl border-[2.5px] border-[#2a3753] bg-[#0e1628] p-5 flex flex-col justify-between gap-4 shadow-[3px_3px_0_#090d16]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isImage ? (
                      <div className="w-7 h-7 rounded-lg bg-[#20153f] border-[1.5px] border-[#7c4dff]/50 flex items-center justify-center">
                        <Image className="w-4 h-4 text-[#a78bfa]" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-[#330c20] border-[1.5px] border-[#f472b6]/50 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#f472b6]" />
                      </div>
                    )}
                    <span className="text-sm font-black text-[#f1f5f9] font-display">{art.title}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#c4b5fd] bg-[#1a1236] px-2.5 py-1 rounded-full border-[1.5px] border-[#2a3753]">
                    {art.filename}
                  </span>
                </div>

                {/* Image Render */}
                {isImage && imgSrc && (
                  <div className="mt-4 rounded-xl border-[2.5px] border-[#2a3753] overflow-hidden bg-[#090d16] shadow-[2px_2px_0_#090d16] p-2 flex items-center justify-center">
                    <img
                      src={imgSrc}
                      alt={art.title}
                      className="max-h-80 w-auto object-contain rounded-lg"
                    />
                  </div>
                )}

                {/* CSV / Text Render */}
                {!isImage && art.data && (
                  <pre className="mt-4 p-4 rounded-xl bg-[#090d16] font-mono text-xs text-[#cbd5e1] max-h-52 overflow-y-auto border-[2px] border-[#2a3753]">
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
                  <Download className="w-4 h-4 text-[#a78bfa]" />
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
