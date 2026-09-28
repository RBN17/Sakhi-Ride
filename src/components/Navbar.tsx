import React from 'react';
import { Shield, PhoneCall, Bike } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenSos: () => void;
  onOpenHotlines: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenSos,
  onOpenHotlines,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold shadow-sm transition-transform group-hover:scale-105">
            <Bike className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
            SakhiRide
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#booking-calculator"
            className="hover:text-rose-600 transition-colors"
          >
            Book Ride
          </a>
          <a
            href="#safety-shield"
            className="hover:text-rose-600 transition-colors"
          >
            Safety Shield
          </a>
          <a
            href="#nightshield"
            className="hover:text-rose-600 transition-colors"
          >
            NightShield
          </a>
          <a
            href="#route-safety-checker"
            className="hover:text-rose-600 transition-colors"
          >
            Safety Audit
          </a>
          <a
            href="#drive-with-us"
            className="hover:text-rose-600 transition-colors"
          >
            Drive With Us
          </a>
          <a
            href="#stories"
            className="hover:text-rose-600 transition-colors"
          >
            Stories
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenHotlines}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
            title="Emergency Numbers & 24/7 Command Center"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>24/7 Helpline</span>
          </button>

          <button
            onClick={onOpenSos}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-lg shadow-sm transition-all"
            title="Test SOS Safety Drill"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>SOS Drill</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            Book Sakhi
          </button>
        </div>
      </div>
    </header>
  );
};
