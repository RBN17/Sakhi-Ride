import React from 'react';
import { X, PhoneCall, ShieldCheck, ExternalLink } from 'lucide-react';
import { EMERGENCY_HOTLINES } from '../data/mockData';

interface EmergencyHotlinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchSosDrill: () => void;
}

export const EmergencyHotlinesModal: React.FC<EmergencyHotlinesModalProps> = ({
  isOpen,
  onClose,
  onLaunchSosDrill,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-rose-50/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">
                Emergency &amp; Women Helplines
              </h3>
              <p className="text-[11px] text-rose-800">
                24/7 Verified Crisis Intervention
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of hotlines */}
        <div className="p-5 sm:p-6 space-y-3">
          {EMERGENCY_HOTLINES.map((h) => (
            <div
              key={h.number}
              className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between hover:border-rose-200 transition-colors"
            >
              <div>
                <div className="font-bold text-xs text-slate-900">{h.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{h.desc}</div>
                <div className="text-xs font-mono font-bold text-rose-600 mt-1">
                  {h.number}
                </div>
              </div>

              <a
                href={`tel:${h.number.replace(/-/g, '')}`}
                className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          ))}

          {/* SOS simulator drill shortcut */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onLaunchSosDrill();
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>Practice Instant In-App SOS Drill</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
