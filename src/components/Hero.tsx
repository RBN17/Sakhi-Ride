import React, { useState } from 'react';
import { ShieldCheck, MapPin, Navigation, ArrowRight, Clock, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/mockData';
import { LocationOption, RideType } from '../types';

interface HeroProps {
  onStartBooking: (pickup: LocationOption, dropoff: LocationOption, type: RideType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBooking }) => {
  const [pickupId, setPickupId] = useState<string>(POPULAR_LOCATIONS[0].id);
  const [dropoffId, setDropoffId] = useState<string>(POPULAR_LOCATIONS[1].id);
  const [selectedType, setSelectedType] = useState<RideType>('solo');

  const selectedPickup = POPULAR_LOCATIONS.find((l) => l.id === pickupId) || POPULAR_LOCATIONS[0];
  const selectedDropoff = POPULAR_LOCATIONS.find((l) => l.id === dropoffId) || POPULAR_LOCATIONS[1];

  // Rough estimation logic
  const estDistanceKm = 8.4;
  const estMinutes = 22;
  const baseFares: Record<RideType, number> = {
    solo: Math.round(35 + estDistanceKm * 8),
    express: Math.round(45 + estDistanceKm * 9.5),
    nightshield: Math.round(40 + estDistanceKm * 8.5),
    ev: Math.round(35 + estDistanceKm * 7.5),
  };

  const handleBook = () => {
    onStartBooking(selectedPickup, selectedDropoff, selectedType);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <span>India&apos;s 1st 100% Women-Operated Two-Wheeler Commute Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] font-display text-balance">
              Commute with total freedom. Ridden by women,{' '}
              <span className="text-rose-600 underline decoration-rose-300 decoration-wavy decoration-2 underline-offset-6">
                for women.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              No uneasy stares, no uncomfortable conversations, no route anxiety. Every captain is a thoroughly police-verified female professional with sanitized helmets, live GPS geofencing, and 24/7 all-women emergency command backup.
            </p>

            {/* Trust highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Zero Male Drivers</div>
                  <div className="text-xs text-slate-500">100% verified women</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">NightShield Protocol</div>
                  <div className="text-xs text-slate-500">Live check-in post 8 PM</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Dual-Contact Ping</div>
                  <div className="text-xs text-slate-500">Auto SMS with live GPS</div>
                </div>
              </div>
            </div>

            {/* Proof numbers */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-8 text-slate-800">
              <div>
                <div className="text-2xl font-bold font-display tabular-nums text-slate-900">620,000+</div>
                <div className="text-xs text-slate-500">Safe Kilometers Driven</div>
              </div>
              <div className="h-8 w-px bg-stone-300 hidden sm:block" />
              <div>
                <div className="text-2xl font-bold font-display tabular-nums text-slate-900">2,400+</div>
                <div className="text-xs text-slate-500">Verified Women Captains</div>
              </div>
              <div className="h-8 w-px bg-stone-300 hidden sm:block" />
              <div>
                <div className="text-2xl font-bold font-display tabular-nums text-rose-600 flex items-center gap-1">
                  4.96 <Star className="w-4 h-4 fill-rose-600 text-rose-600" />
                </div>
                <div className="text-xs text-slate-500">Passenger Safety Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset + Instant Booking Estimator */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Hero Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100 aspect-16/10 group">
              <img
                src="/src/assets/images/hero_women_bike_taxi_1790578486406.jpg"
                alt="Empowered female bike taxi rider captain on modern electric scooter"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-rose-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>340+ Captains Active Right Now in Bengaluru</span>
                </div>
                <p className="text-sm font-semibold text-white/95 mt-1">
                  Captain Anjali Sharma · 1,640 Safe Rides · Ather 450X
                </p>
              </div>
            </div>

            {/* Quick Fare & Ride Launcher Card */}
            <div
              id="booking-calculator"
              className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <span className="text-xs font-bold tracking-wider uppercase text-rose-700">
                  Instant Ride Estimator
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> Avg pickup: 3 mins
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {/* Pickup */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={pickupId}
                      onChange={(e) => setPickupId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 truncate"
                    >
                      {POPULAR_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id} disabled={loc.id === dropoffId}>
                          {loc.name} ({loc.area})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Drop-off */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <Navigation className="w-4 h-4 text-rose-600 absolute left-3 top-3 pointer-events-none" />
                    <select
                      value={dropoffId}
                      onChange={(e) => setDropoffId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 truncate"
                    >
                      {POPULAR_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id} disabled={loc.id === pickupId}>
                          {loc.name} ({loc.area})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Ride Type Selector */}
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Select Sakhi Ride Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedType('solo')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        selectedType === 'solo'
                          ? 'border-rose-600 bg-rose-50/60 ring-1 ring-rose-600'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">Sakhi Solo</div>
                      <div className="text-[11px] text-slate-500">Standard verified captain</div>
                      <div className="text-xs font-bold text-rose-600 mt-1 tabular-nums">
                        ₹{baseFares.solo}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedType('nightshield')}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        selectedType === 'nightshield'
                          ? 'border-rose-600 bg-rose-50/60 ring-1 ring-rose-600'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                        <span>NightShield</span>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </div>
                      <div className="text-[11px] text-slate-500">Auto emergency ping</div>
                      <div className="text-xs font-bold text-rose-600 mt-1 tabular-nums">
                        ₹{baseFares.nightshield}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Summary calculation & CTA */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-600">
                  <span>Est. {estDistanceKm} km · ~{estMinutes} mins</span>
                  <span className="font-semibold text-slate-900">
                    Fare: <span className="text-base text-rose-600 font-bold tabular-nums">₹{baseFares[selectedType]}</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleBook}
                  className="w-full mt-2 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Request Verified Sakhi Captain</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
