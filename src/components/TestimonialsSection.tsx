import React from 'react';
import { Star, ShieldCheck, Heart, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="stories" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Real Voices, Real Freedom</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display text-balance">
            Trusted by Over 45,000 Women Commuters
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Hear from working professionals, university students, and female fleet captains who commute and earn with peace of mind every single day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {item.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                <div className="text-xs text-slate-500">{item.role}</div>
                <div className="text-[11px] text-stone-400 mt-1">
                  {item.city} · {item.commute}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Report Card Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              100%
            </div>
            <div className="text-xs font-semibold text-slate-700">Verified Women Fleet</div>
            <div className="text-[11px] text-slate-400">Zero male drivers permitted</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-emerald-700 font-display tabular-nums">
              &lt; 90s
            </div>
            <div className="text-xs font-semibold text-slate-700">SOS Response Time</div>
            <div className="text-[11px] text-slate-400">Direct PCR &amp; Command Center</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-rose-600 font-display tabular-nums">
              4.96 / 5
            </div>
            <div className="text-xs font-semibold text-slate-700">Safety Trust Score</div>
            <div className="text-[11px] text-slate-400">Over 380,000 ratings</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              0
            </div>
            <div className="text-xs font-semibold text-slate-700">Unresolved Incidents</div>
            <div className="text-[11px] text-slate-400">24/7 dedicated escalation desk</div>
          </div>
        </div>

      </div>
    </section>
  );
};
