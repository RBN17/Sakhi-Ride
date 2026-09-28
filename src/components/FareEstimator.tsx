import React, { useState } from 'react';
import {
  Calculator,
  Bike,
  Zap,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingDown,
  Info,
  CheckCircle2,
  Sliders,
  DollarSign
} from 'lucide-react';
import { RideType } from '../types';

export interface VehicleRateConfig {
  type: RideType;
  name: string;
  tagline: string;
  baseFare: number;
  perKmRate: number;
  perMinRate: number;
  safetyFee: number; // 0 always for transparency
  icon: typeof Bike;
  vehicleTypes: string;
  isPopular?: boolean;
}

export const VEHICLE_CONFIGS: VehicleRateConfig[] = [
  {
    type: 'solo',
    name: 'Sakhi Solo Standard',
    tagline: 'Verified petrol/standard scooter (Activa, Jupiter)',
    baseFare: 30,
    perKmRate: 8.5,
    perMinRate: 1.2,
    safetyFee: 0,
    icon: Bike,
    vehicleTypes: 'Honda Activa 6G, TVS Jupiter 125, Hero Pleasure+',
    isPopular: true,
  },
  {
    type: 'ev',
    name: 'Sakhi EV Eco-Glide',
    tagline: '100% silent green electric ride with lowest emissions',
    baseFare: 28,
    perKmRate: 7.5,
    perMinRate: 1.0,
    safetyFee: 0,
    icon: Zap,
    vehicleTypes: 'Ather 450X, Ola S1 Pro, TVS iQube, Bajaj Chetak EV',
  },
  {
    type: 'nightshield',
    name: 'NightShield Protected (8 PM - 5 AM)',
    tagline: '24/7 command center audio escort + dual guardian live SMS',
    baseFare: 38,
    perKmRate: 9.0,
    perMinRate: 1.5,
    safetyFee: 0,
    icon: Sparkles,
    vehicleTypes: 'Verified NightShield Fleet (High-visibility reflective gear)',
  },
  {
    type: 'express',
    name: 'Sakhi Priority Express',
    tagline: 'Guaranteed under 2-min dispatch for urgent rush hours',
    baseFare: 42,
    perKmRate: 10.5,
    perMinRate: 1.8,
    safetyFee: 0,
    icon: Sparkles,
    vehicleTypes: 'Top-tier 4.95+ rated captains within 1 km radius',
  },
];

interface FareEstimatorProps {
  initialDistanceKm?: number;
  selectedVehicleType?: RideType;
  onSelectAndBook?: (distanceKm: number, vehicleType: RideType, estimatedFare: { min: number; max: number; expected: number }) => void;
  className?: string;
  compactMode?: boolean;
}

export const FareEstimator: React.FC<FareEstimatorProps> = ({
  initialDistanceKm = 8.4,
  selectedVehicleType = 'solo',
  onSelectAndBook,
  className = '',
  compactMode = false,
}) => {
  const [distanceKm, setDistanceKm] = useState<number>(initialDistanceKm);
  const [activeVehicle, setActiveVehicle] = useState<RideType>(selectedVehicleType);
  const [trafficMultiplier, setTrafficMultiplier] = useState<'normal' | 'moderate' | 'peak'>('normal');

  // Traffic conditions affect speed and duration
  const trafficFactors = {
    normal: { speedKmH: 26, surgeMultiplier: 1.0, label: 'Clear Traffic (Normal)' },
    moderate: { speedKmH: 20, surgeMultiplier: 1.08, label: 'Moderate Flow (+8% peak delay)' },
    peak: { speedKmH: 15, surgeMultiplier: 1.15, label: 'Rush Hour Congestion' },
  };

  const currentTraffic = trafficFactors[trafficMultiplier];
  const estimatedMins = Math.max(5, Math.round((distanceKm / currentTraffic.speedKmH) * 60));

  // Calculate pricing range for a specific vehicle config
  const calculateFareRange = (config: VehicleRateConfig) => {
    const rawCost = config.baseFare + (distanceKm * config.perKmRate) + (estimatedMins * config.perMinRate);
    const adjustedCost = rawCost * currentTraffic.surgeMultiplier;
    
    // Range estimation: +/- 7% variance to account for slight route traffic / waiting signals
    const minFare = Math.max(35, Math.round(adjustedCost * 0.93));
    const maxFare = Math.round(adjustedCost * 1.07);
    const expectedFare = Math.round(adjustedCost);

    return {
      min: minFare,
      max: maxFare,
      expected: expectedFare,
      savingsVsCab: Math.round(expectedFare * 1.45) // An ordinary car cab is ~145% more expensive in city traffic
    };
  };

  const activeConfig = VEHICLE_CONFIGS.find((v) => v.type === activeVehicle) || VEHICLE_CONFIGS[0];
  const activeFare = calculateFareRange(activeConfig);

  const handleBookWithEstimate = () => {
    if (onSelectAndBook) {
      onSelectAndBook(distanceKm, activeVehicle, activeFare);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header bar */}
      <div className="px-5 py-4 border-b border-stone-100 bg-stone-50/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display flex items-center gap-1.5">
              <span>Fair Fare Estimator</span>
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                100% Transparent
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Calculate upfront ride cost range based on distance &amp; vehicle type
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero hidden surge fees</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Distance Slider Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-rose-600" />
              <span>Trip Distance:</span>
            </span>
            <span className="text-sm font-bold text-slate-900 font-mono bg-stone-100 px-2 py-0.5 rounded">
              {distanceKm} km
            </span>
          </div>

          <div className="relative flex items-center">
            <input
              type="range"
              min="1"
              max="35"
              step="0.5"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-500">
            <span>1 km (Quick Metro Hopper)</span>
            <span>12 km (City Crossing)</span>
            <span>35 km (Airport/Outer Ring)</span>
          </div>
        </div>

        {/* Traffic / Commute Timing Condition */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Traffic Condition / Hour
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['normal', 'moderate', 'peak'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTrafficMultiplier(mode)}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                  trafficMultiplier === mode
                    ? 'border-rose-600 bg-rose-50/70 text-rose-900 font-semibold ring-1 ring-rose-600'
                    : 'border-stone-200 bg-stone-50/50 text-slate-600 hover:bg-stone-50'
                }`}
              >
                {mode === 'normal' && '🟢 Off-Peak'}
                {mode === 'moderate' && '🟡 Normal Flow'}
                {mode === 'peak' && '🔴 Peak Rush'}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Selection Cards with Upfront Range */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
            <span>Select Vehicle Type &amp; Compare Range</span>
            <span className="text-[11px] font-normal text-slate-500">
              Est. time: ~{estimatedMins} mins
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {VEHICLE_CONFIGS.map((config) => {
              const IconComp = config.icon;
              const range = calculateFareRange(config);
              const isSelected = activeVehicle === config.type;

              return (
                <div
                  key={config.type}
                  onClick={() => setActiveVehicle(config.type)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all relative ${
                    isSelected
                      ? 'border-rose-600 bg-rose-50/60 ring-1 ring-rose-600 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-rose-600 text-white' : 'bg-stone-100 text-slate-700'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{config.name}</span>
                          {config.isPopular && (
                            <span className="text-[9px] uppercase font-bold text-rose-700 bg-rose-100 px-1 rounded">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          {config.vehicleTypes}
                        </div>
                      </div>
                    </div>

                    {/* Range Pill */}
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-rose-600 font-mono tabular-nums">
                        ₹{range.min} - ₹{range.max}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        exp. ₹{range.expected}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Base: ₹{config.baseFare} + ₹{config.perKmRate}/km</span>
                    <span className="text-emerald-700 font-semibold">
                      Save ~₹{range.savingsVsCab - range.expected} vs cab
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown & Upfront Range Display Banner */}
        <div className="p-4 bg-stone-900 text-white rounded-xl space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                Estimated Upfront Price Range for {activeConfig.name}
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums mt-0.5 flex items-baseline gap-2">
                <span>₹{activeFare.min} - ₹{activeFare.max}</span>
                <span className="text-xs font-normal text-stone-400 font-sans">
                  (Expected: ₹{activeFare.expected})
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-emerald-400 block font-semibold">
                ~{estimatedMins} min travel
              </span>
              <span className="text-[10px] text-stone-400">
                for {distanceKm} km route
              </span>
            </div>
          </div>

          {/* Breakdown checklist */}
          <div className="pt-2 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-stone-300">
            <div>
              <span className="text-stone-500 block">Base Pickup:</span>
              <span className="font-mono font-medium">₹{activeConfig.baseFare}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Distance Rate:</span>
              <span className="font-mono font-medium">₹{Math.round(distanceKm * activeConfig.perKmRate)} ({activeConfig.perKmRate}/km)</span>
            </div>
            <div>
              <span className="text-stone-500 block">Safety Shield:</span>
              <span className="font-semibold text-emerald-400">₹0 (Free)</span>
            </div>
            <div>
              <span className="text-stone-500 block">Helmet &amp; Hairnet:</span>
              <span className="font-semibold text-emerald-400">Included</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1">
            <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>Actual fare stays strictly within this range. No unexpected meter jumps or arbitrary surge rates at destination.</span>
          </div>
        </div>

        {/* CTA Button to proceed with this range */}
        {onSelectAndBook && (
          <button
            type="button"
            onClick={handleBookWithEstimate}
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            <span>Proceed with {activeConfig.name} (₹{activeFare.min} - ₹{activeFare.max})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
};
