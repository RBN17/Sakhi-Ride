import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  X,
  PhoneCall,
  ShieldAlert,
  CheckCircle,
  Radio,
  MapPin,
} from 'lucide-react';
import { EMERGENCY_HOTLINES } from '../data/mockData';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState<number>(5);
  const [status, setStatus] = useState<'countdown' | 'dispatched' | 'cancelled'>('countdown');

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setStatus('countdown');
      return;
    }

    if (status === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setStatus('dispatched');
      }
    }
  }, [isOpen, countdown, status]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-rose-300 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-rose-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <h3 className="font-bold text-sm sm:text-base font-display">
              {status === 'countdown' && 'Emergency SOS Armed (Drill Mode)'}
              {status === 'dispatched' && 'HIGH PRIORITY SOS DISPATCHED'}
              {status === 'cancelled' && 'SOS Cancelled'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-center">
          
          {/* STATE 1: COUNTDOWN */}
          {status === 'countdown' && (
            <div className="space-y-4">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-rose-200 animate-ping opacity-60" />
                <div className="w-20 h-20 rounded-full bg-rose-50 border-4 border-rose-600 flex items-center justify-center">
                  <span className="text-3xl font-extrabold font-mono text-rose-600">
                    {countdown}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  Triggering Emergency Response Drill
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  In a real emergency, this automatically dials Police 112, transmits your live GPS coordinates, and alerts your emergency contacts via SMS.
                </p>
              </div>

              <div className="flex gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setStatus('cancelled')}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Cancel Drill
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('dispatched')}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  Trigger Immediately
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: DISPATCHED */}
          {status === 'dispatched' && (
            <div className="space-y-4 text-left">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Simulated Police &amp; Sakhi Patrol Units Alerted</span>
                </div>
                <div className="text-[11px] text-rose-800">
                  Transmitted GPS: 12.9716° N, 77.5946° E · Indiranagar 100ft Rd Corridor
                </div>
              </div>

              {/* Status Checklist */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dual Emergency Contacts pinged with live satellite link</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>City Police PCR Van #42 dispatched (Est: 2 mins)</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sakhi All-Women Command Desk audio line opened</span>
                </div>
              </div>

              {/* Instant Call Helplines */}
              <div className="pt-2 border-t border-stone-200 space-y-2">
                <div className="text-xs font-bold text-slate-900">Direct National Hotlines:</div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:112"
                    className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Dial 112 (Police)</span>
                  </a>
                  <a
                    href="tel:1091"
                    className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>1091 (Women Line)</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
                >
                  Close Drill Simulation
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: CANCELLED */}
          {status === 'cancelled' && (
            <div className="py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-slate-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-display">
                Drill Cancelled
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                No real emergency alert was transmitted. Your account is standing by in normal standby mode.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Done
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
