import React, { useState } from 'react';
import { ShieldCheck, MapPin, Navigation, ArrowRight, Clock, Star, Sparkles, CheckCircle2, Calculator } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/mockData';
import { LocationOption, RideType } from '../types';
import { FareEstimator, VEHICLE_CONFIGS } from './FareEstimator';

interface HeroProps {
  onStartBooking: (pickup: LocationOption, dropoff: LocationOption, type: RideType, customDistance?: number) => void;
}

// Distance approximation between common Bangalore points for realistic calculations
const LOCATION_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'loc-1': { lat: 12.9784, lng: 77.6408 }, // Indiranagar
  'loc-2': { lat: 13.0494, lng: 77.6200 }, // Manyata Tech Park
  'loc-3': { lat: 12.9926, lng: 77.5878 }, // Mount Carmel
  'loc-4': { lat: 12.9352, lng: 77.6245 }, // Koramangala
  'loc-5': { lat: 12.9121, lng: 77.6446 }, // HSR Layout
  'loc-6': { lat: 12.9866, lng: 77.7317 }, // Whitefield
  'loc-7': { lat: 12.8452, lng: 77.6602 }, // Electronic City
  'loc-8': { lat: 12.9772, lng: 77.5713 }, // Majestic
  'loc-9': { lat: 12.9729, lng: 77.6186 }, // MG Road
  'loc-10': { lat: 12.9299, lng: 77.5824 }, // Jayanagar
};

function calculateDistanceBetween(locAId: string, locBId: string): number {
  const a = LOCATION_COORDINATES[locAId] || { lat: 12.97, lng: 77.64 };
  const b = LOCATION_COORDINATES[locBId] || { lat: 13.04, lng: 77.62 };
  // Haversine formula approx in km * 1.35 for city road curves
  const dLat = (b.lat - a.lat) * (Math.PI / 180);
  const dLng = (b.lng - a.lng) * (Math.PI / 180);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const chord = sinDLat * sinDLat + Math.cos(a.lat * (Math.PI / 180)) * Math.cos(b.lat * (Math.PI / 180)) * sinDLng * sinDLng;
  const angular = 2 * Math.atan2(Math.sqrt(chord), Math.sqrt(1 - chord));
  const rawDistKm = 6371 * angular;
  const roadCurveFactor = 1.32;
  const roadKm = Math.max(2.1, Math.round(rawDistKm * roadCurveFactor * 10) / 10);
  return roadKm;
}

export const Hero: React.FC<HeroProps> = ({ onStartBooking }) => {
  const [pickupId, setPickupId] = useState<string>(POPULAR_LOCATIONS[0].id);
  const [dropoffId, setDropoffId] = useState<string>(POPULAR_LOCATIONS[1].id);
  const [selectedType, setSelectedType] = useState<RideType>('solo');
  const [showDetailedEstimator, setShowDetailedEstimator] = useState<boolean>(false);

  const selectedPickup = POPULAR_LOCATIONS.find((l) => l.id === pickupId) || POPULAR_LOCATIONS[0];
  const selectedDropoff = POPULAR_LOCATIONS.find((l) => l.id === dropoffId) || POPULAR_LOCATIONS[1];

  // Dynamically calculate distance between selected points
  const estDistanceKm = calculateDistanceBetween(pickupId, dropoffId);
  const estMinutes = Math.max(6, Math.round((estDistanceKm / 24) * 60));

  // Compute pricing ranges for all vehicle types
  const computeVehicleRange = (type: RideType) => {
    const config = VEHICLE_CONFIGS.find((c) => c.type === type) || VEHICLE_CONFIGS[0];
    const expected = Math.round(config.baseFare + estDistanceKm * config.perKmRate + estMinutes * config.perMinRate);
    const min = Math.max(35, Math.round(expected * 0.93));
    const max = Math.round(expected * 1.07);
    return { min, max, expected, config };
  };

  const currentRange = computeVehicleRange(selectedType);

  const handleBook = () => {
    onStartBooking(selectedPickup, selectedDropoff, selectedType, estDistanceKm);
  };

  const handleEstimatorBook = (dist: number, type: RideType) => {
    onStartBooking(selectedPickup, selectedDropoff, type, dist);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
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

            {/* Full-width toggleable Fare Estimator Utility view on the left when expanded */}
            {showDetailedEstimator && (
              <div className="pt-4">
                <FareEstimator
                  initialDistanceKm={estDistanceKm}
                  selectedVehicleType={selectedType}
                  onSelectAndBook={handleEstimatorBook}
                />
              </div>
            )}
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
                <div className="flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold tracking-wider uppercase text-rose-700">
                    Booking &amp; Fare Estimator
                  </span>
                </div>
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

                {/* Distance & Duration Dynamic Metric */}
                <div className="px-3 py-2 bg-stone-50 rounded-lg border border-stone-200/80 flex items-center justify-between text-xs text-slate-600 font-mono">
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <span>🛣️ {estDistanceKm} km</span>
                  </span>
                  <span>⏱️ ~{estMinutes} mins</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Safe Corridor</span>
                </div>

                {/* Vehicle Selection with Upfront Range for each */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-600">
                      Vehicle Type &amp; Upfront Fare Range
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowDetailedEstimator(!showDetailedEstimator)}
                      className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold underline"
                    >
                      {showDetailedEstimator ? 'Hide Distance Slider' : 'Custom Distance Slider'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {VEHICLE_CONFIGS.map((v) => {
                      const range = computeVehicleRange(v.type);
                      const isSelected = selectedType === v.type;
                      return (
                        <button
                          key={v.type}
                          type="button"
                          onClick={() => setSelectedType(v.type)}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            isSelected
                              ? 'border-rose-600 bg-rose-50/70 ring-1 ring-rose-600'
                              : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {v.name.split(' ')[1] || v.name}
                            </span>
                            {v.type === 'nightshield' && (
                              <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                            )}
                          </div>
                          
                          {/* Upfront Price Range */}
                          <div className="text-xs font-extrabold text-rose-600 mt-1 font-mono tabular-nums">
                            ₹{range.min} - ₹{range.max}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            exp. ₹{range.expected}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Range Guarantee Box */}
                <div className="p-3 bg-stone-900 text-stone-200 rounded-xl space-y-1">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                        Guaranteed Upfront Range ({currentRange.config.name})
                      </span>
                      <div className="text-lg font-bold font-mono text-white tabular-nums">
                        ₹{currentRange.min} - ₹{currentRange.max}{' '}
                        <span className="text-xs font-normal text-stone-400">
                          (Exp: ₹{currentRange.expected})
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-emerald-400 font-mono">
                      ₹0 Surge Fee
                    </div>
                  </div>
                  <div className="text-[10px] text-stone-400 flex items-center justify-between pt-1 border-t border-stone-800">
                    <span>Base: ₹{currentRange.config.baseFare} + ₹{currentRange.config.perKmRate}/km</span>
                    <span className="text-emerald-300">Sanitized Helmet Included</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBook}
                  className="w-full mt-2 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Confirm Ride · Range ₹{currentRange.min} - ₹{currentRange.max}</span>
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
