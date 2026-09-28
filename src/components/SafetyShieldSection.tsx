import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Sparkles,
  MapPin,
  Headphones,
  FileBadge,
  HeartHandshake,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { SAFETY_PILLARS } from '../data/mockData';

export const SafetyShieldSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const icons = [
    UserCheck,
    FileBadge,
    HeartHandshake,
    MapPin,
    ShieldCheck,
    Headphones,
  ];

  return (
    <section id="safety-shield" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Uncompromising Security Standards</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-display text-balance">
            The 6-Layer Female Safety Shield
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Safety isn&apos;t an afterthought or an emergency button added to an existing cab app. Every layer of SakhiRide is designed specifically to solve the real daily fears women face while commuting.
          </p>
        </div>

        {/* Visual Showcase: 2 high-impact generated images + editorial proof */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Captains Image Card */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md group">
            <div className="aspect-4/3 overflow-hidden">
              <img
                src="/src/assets/images/safety_female_captains_1790578499772.jpg"
                alt="Two verified friendly female bike taxi captains standing proudly with their scooters"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 bg-white border-t border-stone-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Sisterhood on Two Wheels
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    100% of our fleet captains are rigorously vetted women from your city.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                    Strict Zero Male Policy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: NightShield Commute Image Card */}
          <div id="nightshield" className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md group">
            <div className="aspect-4/3 overflow-hidden">
              <img
                src="/src/assets/images/nightshield_commute_1790578512767.jpg"
                alt="Female passenger comfortably riding pillion behind a verified female captain along illuminated city boulevard at night"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 bg-white border-t border-stone-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                    <span>NightShield Protocol (8 PM – 5 AM)</span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Late shifts, airport drops, and night campus returns with active live monitoring.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded-md">
                    Live Escort Check-in
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 6 Pillars Interactive Deep-Dive Bento */}
        <div className="mt-14">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-4 text-center">
            Explore All 6 Pillars of Protection
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAFETY_PILLARS.map((pillar, idx) => {
              const IconComp = icons[idx] || ShieldCheck;
              const isSelected = activeTab === idx;

              return (
                <div
                  key={pillar.title}
                  onClick={() => setActiveTab(idx)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-rose-600 bg-rose-50/40 ring-1 ring-rose-600/40 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 text-slate-800 flex items-center justify-center">
                      <IconComp className="w-5 h-5 text-rose-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-stone-100 px-2.5 py-1 rounded-md">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active 24/7 on all routes</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Command Center Banner */}
        <div className="mt-12 bg-slate-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Sakhi Command Control Room Active</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              All-Women Rapid Response Desk
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Trained female emergency coordinators monitor every moving ride in real time. Direct integration with National Emergency 112 and city PCR response teams ensures average on-ground response in &lt; 90 seconds.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:112"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>Emergency 112 Hotline</span>
            </a>
            <a
              href="tel:18007254474"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span>1800-725-4474 (Toll-Free)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
