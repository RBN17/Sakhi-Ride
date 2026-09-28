import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  MapPin,
  Navigation,
  Check,
  Share2,
  AlertTriangle,
  PhoneCall,
  Sparkles,
  Award,
  Zap,
  Star,
  Copy,
  CheckCircle,
} from 'lucide-react';
import { POPULAR_LOCATIONS, CAPTAIN_ROSTER } from '../data/mockData';
import { LocationOption, RideType, Captain } from '../types';
import { SafetyCanvasMap } from './SafetyCanvasMap';

interface RideBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPickup?: LocationOption;
  initialDropoff?: LocationOption;
  initialType?: RideType;
  onTriggerSos: () => void;
  onTriggerFakeCall: () => void;
}

export const RideBookingModal: React.FC<RideBookingModalProps> = ({
  isOpen,
  onClose,
  initialPickup,
  initialDropoff,
  initialType = 'solo',
  onTriggerSos,
  onTriggerFakeCall,
}) => {
  const [pickup, setPickup] = useState<LocationOption>(initialPickup || POPULAR_LOCATIONS[0]);
  const [dropoff, setDropoff] = useState<LocationOption>(initialDropoff || POPULAR_LOCATIONS[1]);
  const [rideType, setRideType] = useState<RideType>(initialType);

  // Flow states: 'config' | 'searching' | 'active_ride' | 'completed'
  const [flowState, setFlowState] = useState<'config' | 'searching' | 'active_ride' | 'completed'>('config');
  const [assignedCaptain, setAssignedCaptain] = useState<Captain>(CAPTAIN_ROSTER[0]);
  const [ridePin, setRidePin] = useState<string>('4819');
  
  // In-ride simulation state
  const [progress, setProgress] = useState<number>(0.15);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isDeviated, setIsDeviated] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Sanitized Helmet Provided', 'Defensive & Calm Driving']);

  // Sync props when opening
  useEffect(() => {
    if (initialPickup) setPickup(initialPickup);
    if (initialDropoff) setDropoff(initialDropoff);
    if (initialType) setRideType(initialType);
  }, [initialPickup, initialDropoff, initialType, isOpen]);

  // Fare calculation
  const distanceKm = 8.6;
  const estimatedMin = 24;
  const fareMap: Record<RideType, number> = {
    solo: Math.round(35 + distanceKm * 8),
    express: Math.round(45 + distanceKm * 9.5),
    nightshield: Math.round(40 + distanceKm * 8.5),
    ev: Math.round(35 + distanceKm * 7.5),
  };
  const totalFare = fareMap[rideType];

  // Simulator loop when active_ride is running
  useEffect(() => {
    if (flowState !== 'active_ride' || !isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(timer);
          setFlowState('completed');
          return 1;
        }
        return prev + 0.04;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [flowState, isPlaying]);

  const handleStartBooking = () => {
    setFlowState('searching');
    // Simulate smart matching algorithm finding the closest police-verified female captain
    setTimeout(() => {
      const randomCaptain = CAPTAIN_ROSTER[Math.floor(Math.random() * CAPTAIN_ROSTER.length)];
      const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
      setAssignedCaptain(randomCaptain);
      setRidePin(randomPin);
      setProgress(0.1);
      setIsDeviated(false);
      setFlowState('active_ride');
      setIsPlaying(true);
    }, 2200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://sakhiride.safe/track/${assignedCaptain.id}?pin=${ridePin}&user=active`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">
              {flowState === 'config' && 'Book Verified Sakhi Ride'}
              {flowState === 'searching' && 'Connecting to Nearest Female Captain...'}
              {flowState === 'active_ride' && 'Live Protected Trip'}
              {flowState === 'completed' && 'Trip Completed Safely'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto space-y-5">
          
          {/* STATE 1: CONFIGURATION */}
          {flowState === 'config' && (
            <div className="space-y-4">
              {/* Pickup selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={pickup.id}
                    onChange={(e) => {
                      const found = POPULAR_LOCATIONS.find((l) => l.id === e.target.value);
                      if (found) setPickup(found);
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} disabled={loc.id === dropoff.id}>
                        {loc.name} · {loc.area}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-[11px] text-stone-500 mt-1 pl-1">
                  Landmark: {pickup.landmark}
                </div>
              </div>

              {/* Dropoff selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination Drop-off
                </label>
                <div className="relative">
                  <Navigation className="w-4 h-4 text-rose-600 absolute left-3 top-3 pointer-events-none" />
                  <select
                    value={dropoff.id}
                    onChange={(e) => {
                      const found = POPULAR_LOCATIONS.find((l) => l.id === e.target.value);
                      if (found) setDropoff(found);
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id} disabled={loc.id === pickup.id}>
                        {loc.name} · {loc.area}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-[11px] text-stone-500 mt-1 pl-1">
                  Landmark: {dropoff.landmark}
                </div>
              </div>

              {/* Ride Tiers */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Commute Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Solo */}
                  <button
                    type="button"
                    onClick={() => setRideType('solo')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      rideType === 'solo'
                        ? 'border-rose-600 bg-rose-50/70 ring-1 ring-rose-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Sakhi Solo</span>
                      <span className="text-xs font-bold text-rose-600 tabular-nums">₹{fareMap.solo}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Standard verified woman captain with sanitized helmet & hairnet.
                    </p>
                  </button>

                  {/* NightShield */}
                  <button
                    type="button"
                    onClick={() => setRideType('nightshield')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      rideType === 'nightshield'
                        ? 'border-rose-600 bg-rose-50/70 ring-1 ring-rose-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>NightShield</span>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </span>
                      <span className="text-xs font-bold text-rose-600 tabular-nums">₹{fareMap.nightshield}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Active route deviation monitor + dual contact live SMS ping.
                    </p>
                  </button>

                  {/* Express */}
                  <button
                    type="button"
                    onClick={() => setRideType('express')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      rideType === 'express'
                        ? 'border-rose-600 bg-rose-50/70 ring-1 ring-rose-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-500" /> Sakhi Express
                      </span>
                      <span className="text-xs font-bold text-rose-600 tabular-nums">₹{fareMap.express}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Priority dispatch for urgent peak-hour office and metro rushes.
                    </p>
                  </button>

                  {/* EV Eco */}
                  <button
                    type="button"
                    onClick={() => setRideType('ev')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      rideType === 'ev'
                        ? 'border-rose-600 bg-rose-50/70 ring-1 ring-rose-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Sakhi EV Green</span>
                      <span className="text-xs font-bold text-rose-600 tabular-nums">₹{fareMap.ev}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      100% silent electric scooter commute (Ather / Ola / TVS).
                    </p>
                  </button>
                </div>
              </div>

              {/* Safety Guarantees Checklist */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 space-y-1.5 text-xs text-slate-600">
                <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Included with every Sakhi trip at no extra charge:</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% Female Captain Only
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Sanitized ISI Helmet
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> 4-Digit Security PIN
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Live GPS Contact Sync
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-slate-500">Total All-Inclusive Fare</div>
                  <div className="text-xl font-bold text-slate-900 tabular-nums">
                    ₹{totalFare}{' '}
                    <span className="text-xs font-normal text-slate-500">
                      (~{estimatedMin} mins · {distanceKm} km)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleStartBooking}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>Confirm Ride</span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 2: SEARCHING / MATCHING */}
          {flowState === 'searching' && (
            <div className="py-10 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-rose-200 animate-ping opacity-75" />
                <div className="relative w-20 h-20 rounded-full bg-rose-50 border-2 border-rose-500 flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-rose-600 animate-bounce" />
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-display">
                  Matching with nearby verified female captain...
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Verifying captain background rating, helmet sanitation audit, and closest lighted corridor dispatch.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-xs text-slate-600 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ETA to pickup: 3 minutes</span>
              </div>
            </div>
          )}

          {/* STATE 3: ACTIVE RIDE & LIVE SIMULATOR */}
          {flowState === 'active_ride' && (
            <div className="space-y-4">
              {/* Captain Profile Bar */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-rose-600 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                      {assignedCaptain.name.split(' ')[1]?.[0] || 'C'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-white">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {assignedCaptain.name}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-slate-700 font-semibold">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {assignedCaptain.rating}
                      </span>
                      <span>·</span>
                      <span>{assignedCaptain.ridesCompleted}+ trips</span>
                      <span>·</span>
                      <span className="text-rose-700 font-semibold">{assignedCaptain.vehicleModel}</span>
                    </div>
                  </div>
                </div>

                {/* Secret Start OTP */}
                <div className="text-right border-l border-stone-200 pl-3">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                    Start PIN
                  </span>
                  <span className="text-xl font-bold font-mono text-slate-900 tracking-wider">
                    {ridePin}
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    {assignedCaptain.vehicleNumber}
                  </span>
                </div>
              </div>

              {/* Interactive Canvas Map */}
              <SafetyCanvasMap
                progress={progress}
                pickupName={pickup.name}
                dropoffName={dropoff.name}
                isDeviated={isDeviated}
                speedKmH={isDeviated ? 18 : 28}
              />

              {/* In-Ride Security & Interactive Tools */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Share Live Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-slate-700 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 text-[11px]">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-slate-600" />
                      <span className="text-[11px]">Share GPS Link</span>
                    </>
                  )}
                </button>

                {/* Fake Call Trigger */}
                <button
                  type="button"
                  onClick={onTriggerFakeCall}
                  className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-slate-700 text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors"
                  title="Receive simulated reassurance call from Sakhi Command Desk"
                >
                  <PhoneCall className="w-4 h-4 text-indigo-600" />
                  <span className="text-[11px]">Safety Call Me</span>
                </button>

                {/* Test Route Deviation */}
                <button
                  type="button"
                  onClick={() => setIsDeviated(!isDeviated)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-colors ${
                    isDeviated
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-slate-700'
                  }`}
                  title="Simulate what happens if rider turns into an unverified alley"
                >
                  <AlertTriangle className={`w-4 h-4 ${isDeviated ? 'text-amber-600' : 'text-slate-600'}`} />
                  <span className="text-[11px]">
                    {isDeviated ? 'Resolve Detour' : 'Test Deviation'}
                  </span>
                </button>

                {/* SOS Emergency Drill */}
                <button
                  type="button"
                  onClick={onTriggerSos}
                  className="p-2.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex flex-col items-center justify-center gap-1 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span className="text-[11px]">Trigger SOS</span>
                </button>
              </div>

              {/* Deviation Notification if triggered */}
              {isDeviated && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Sakhi Command Alert: Route Deviation (+220m)</div>
                    <div className="text-[11px] text-amber-800 mt-0.5">
                      Command center is initiating automated audio check-in with Captain {assignedCaptain.name.split(' ')[1]}. Dual emergency contacts notified via SMS.
                    </div>
                  </div>
                </div>
              )}

              {/* Progress & Speed Controls for Simulation */}
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-2.5 py-1 bg-white border border-stone-300 rounded font-semibold text-slate-700 hover:bg-stone-100"
                  >
                    {isPlaying ? 'Pause Simulation' : 'Resume Trip'}
                  </button>
                  <span className="text-stone-500 font-mono text-[11px]">
                    Progress: {Math.round(progress * 100)}%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setProgress(1);
                    setFlowState('completed');
                  }}
                  className="text-xs text-rose-600 font-semibold hover:underline"
                >
                  Fast Forward to Destination ➔
                </button>
              </div>
            </div>
          )}

          {/* STATE 4: COMPLETED & RATING */}
          {flowState === 'completed' && (
            <div className="space-y-5 text-center py-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900 font-display">
                  You Have Arrived Safely!
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Safe trip completed with Captain {assignedCaptain.name}. Dual emergency contacts received arrival confirmation.
                </p>
              </div>

              {/* Receipt card */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200 font-semibold text-slate-800">
                  <span>Trip Summary Receipt</span>
                  <span className="font-mono text-emerald-700 font-bold">PAID (UPI)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Base fare ({distanceKm} km · {estimatedMin} mins)</span>
                  <span className="font-mono font-medium text-slate-900">₹{totalFare}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Women Safety Shield & Geofencing Fee</span>
                  <span className="text-emerald-700 font-semibold">₹0 (Free Always)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Sanitized ISI Helmet & Hairnet</span>
                  <span className="text-emerald-700 font-semibold">Provided</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Amount</span>
                  <span className="font-mono text-rose-600">₹{totalFare}</span>
                </div>
              </div>

              {/* Rating system */}
              {!ratingSubmitted ? (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-semibold text-slate-700">
                    How was your commute with Captain {assignedCaptain.name}?
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= userRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Safety feedback tags */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    {[
                      'Sanitized Helmet Provided',
                      'Defensive & Calm Driving',
                      'Polite & Respectful Captain',
                      'Great Route Navigation',
                      'Felt 100% Safe',
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setRatingSubmitted(true)}
                    className="mt-3 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
                  >
                    Submit Feedback & Tip Captain
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold animate-in fade-in">
                  Thank you! Your feedback helps us maintain our 4.96 safety standard.
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFlowState('config');
                    setRatingSubmitted(false);
                  }}
                  className="text-xs text-rose-600 font-semibold hover:underline"
                >
                  Book Another Sakhi Ride
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
