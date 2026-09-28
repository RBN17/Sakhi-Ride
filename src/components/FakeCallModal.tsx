import React, { useState } from 'react';
import { Phone, PhoneOff, ShieldCheck, User, Radio, Volume2, Check } from 'lucide-react';

interface FakeCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerSos: () => void;
}

export const FakeCallModal: React.FC<FakeCallModalProps> = ({
  isOpen,
  onClose,
  onTriggerSos,
}) => {
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');

  if (!isOpen) return null;

  const handleAccept = () => {
    setCallState('connected');
  };

  const handleDecline = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
      setCallState('ringing');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-sm w-full border border-slate-800 shadow-2xl overflow-hidden p-6 text-center space-y-6">
        
        {/* Ringing State */}
        {callState === 'ringing' && (
          <div className="space-y-8 py-4">
            <div className="space-y-2">
              <div className="w-20 h-20 rounded-full bg-rose-600/30 border border-rose-500/50 flex items-center justify-center mx-auto animate-pulse">
                <ShieldCheck className="w-10 h-10 text-rose-400" />
              </div>
              <div className="text-xl font-bold font-display text-white">
                Sakhi Safety Command
              </div>
              <div className="text-xs text-rose-300 font-mono">
                Automated Protective Check-in Call
              </div>
              <div className="text-[11px] text-slate-400">
                Incoming call from All-Women Dispatch Desk
              </div>
            </div>

            <div className="flex items-center justify-around pt-6">
              {/* Decline */}
              <button
                type="button"
                onClick={handleDecline}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center text-white shadow-lg transition-transform group-active:scale-90">
                  <PhoneOff className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-slate-400">Decline</span>
              </button>

              {/* Accept */}
              <button
                type="button"
                onClick={handleAccept}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center text-white shadow-lg transition-transform group-active:scale-90 animate-bounce">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold">Answer</span>
              </button>
            </div>
          </div>
        )}

        {/* Connected State */}
        {callState === 'connected' && (
          <div className="space-y-5 py-2">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Call Secure (256-bit Encrypted)
              </span>
              <span>00:14</span>
            </div>

            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
              <Volume2 className="w-8 h-8 text-rose-400 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="font-bold text-white text-base">
                Officer Neha (Sakhi Command Desk)
              </div>
              <div className="text-xs text-slate-400">
                Live Audio Escort Active
              </div>
            </div>

            {/* Audio Transcript */}
            <div className="p-3.5 bg-slate-800/80 rounded-xl text-left text-xs space-y-1.5 border border-slate-700">
              <div className="text-[10px] uppercase font-bold text-rose-400 font-mono">
                Live Escort Agent Transcript:
              </div>
              <p className="text-slate-200 text-xs leading-relaxed italic">
                &ldquo;Hello Ananya, this is Sakhi Safety Control. We are tracking your position on Indiranagar 100ft road. Your verified captain is arriving. Stay on the line if you need us to alert patrol units.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={handleDecline}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>I Am Safe</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleDecline();
                  onTriggerSos();
                }}
                className="py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Radio className="w-4 h-4" />
                <span>Alert Police</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
