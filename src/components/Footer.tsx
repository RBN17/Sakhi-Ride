import React from 'react';
import { Bike, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenSos: () => void;
  onOpenHotlines: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenSos,
  onOpenHotlines,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold">
                <Bike className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                SakhiRide
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              India&apos;s premier two-wheeler mobility network built exclusively by women, for women. Providing safe, swift, and respectful daily commutes while generating dignified livelihoods for female fleet captains.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Police Verified Female Captains</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Commute Services
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-rose-400 transition-colors text-left"
                >
                  Book Sakhi Solo
                </button>
              </li>
              <li>
                <a href="#nightshield" className="hover:text-rose-400 transition-colors">
                  NightShield (8 PM - 5 AM)
                </a>
              </li>
              <li>
                <a href="#booking-calculator" className="hover:text-rose-400 transition-colors">
                  Fare Calculator
                </a>
              </li>
              <li>
                <a href="#safety-shield" className="hover:text-rose-400 transition-colors">
                  6-Layer Safety Shield
                </a>
              </li>
              <li>
                <a href="#route-safety-checker" className="hover:text-rose-400 transition-colors">
                  Route Safety Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Captain Portal */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              For Women Captains
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#drive-with-us" className="hover:text-rose-400 transition-colors">
                  Earnings Calculator
                </a>
              </li>
              <li>
                <a href="#drive-with-us" className="hover:text-rose-400 transition-colors">
                  ₹0 Deposit EV Lease
                </a>
              </li>
              <li>
                <a href="#drive-with-us" className="hover:text-rose-400 transition-colors">
                  Captain Rest Lounges
                </a>
              </li>
              <li>
                <a href="#drive-with-us" className="hover:text-rose-400 transition-colors">
                  Apply Online
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency & Cities */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              24/7 Rapid Response
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div>
                <span className="text-slate-300 font-semibold block">Police Control Room:</span>
                <span className="font-mono text-rose-400 font-bold">112 (Toll Free)</span>
              </div>
              <div>
                <span className="text-slate-300 font-semibold block">Women Helpline:</span>
                <span className="font-mono text-rose-400 font-bold">1091</span>
              </div>
              <div>
                <span className="text-slate-300 font-semibold block">Sakhi 24x7 Safety Desk:</span>
                <span className="font-mono text-white font-bold">1800-725-4474</span>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenHotlines}
                  className="text-xs text-rose-400 hover:text-rose-300 underline font-semibold"
                >
                  View All National Helplines ➔
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Operating Cities Row */}
        <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-400">Currently Serving:</span>
            <span>Bengaluru</span>
            <span>·</span>
            <span>Delhi NCR (Gurugram &amp; Noida)</span>
            <span>·</span>
            <span>Hyderabad</span>
            <span>·</span>
            <span>Pune</span>
            <span>·</span>
            <span>Jaipur</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Safety Terms</a>
            <a href="#" className="hover:text-slate-400">Captain Code of Conduct</a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} SakhiRide Technologies Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for women&apos;s freedom of mobility</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
