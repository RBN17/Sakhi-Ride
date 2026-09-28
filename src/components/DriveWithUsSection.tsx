import React, { useState } from 'react';
import {
  Bike,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Calendar,
  Clock,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
} from 'lucide-react';

export const DriveWithUsSection: React.FC = () => {
  const [dailyHours, setDailyHours] = useState<number>(6);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form fields
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantPhone, setApplicantPhone] = useState<string>('');
  const [applicantCity, setApplicantCity] = useState<string>('Bengaluru');
  const [hasScooter, setHasScooter] = useState<string>('need_ev');
  const [dlNumber, setDlNumber] = useState<string>('');

  // Earnings model: approx ₹190/hour net + ₹3,000 monthly safety/attendance incentive
  const estimatedRidesPerDay = Math.round(dailyHours * 1.8);
  const monthlyRidingHours = dailyHours * daysPerWeek * 4.2;
  const estimatedMonthlyEarnings = Math.round(monthlyRidingHours * 185 + (dailyHours >= 6 ? 3500 : 1500));

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="drive-with-us" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Financial Independence &amp; Respect</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-display text-balance">
            Become a Sakhi Captain. Earn With Dignity.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Join thousands of proud women riding electric two-wheelers in your city. Work when you want, ferry verified women commuters only, and take home dignified monthly earnings.
          </p>
        </div>

        {/* Content Showcase: Visual + Earnings Calculator Bento */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Captain Empowerment Image */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-md group">
            <div className="aspect-4/3 overflow-hidden">
              <img
                src="/src/assets/images/captain_earning_empowerment_1790578525494.jpg"
                alt="Empowered female bike taxi rider partner standing proudly beside electric scooter holding ride app"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-5 bg-white border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Captain Kavita Murthy · Joined 2024
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Earned ₹38,200 last month
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                &ldquo;I ride 5 hours a day after sending my children to school. Ferrying college girls and IT employees safely gives me respect and complete financial self-reliance.&rdquo;
              </p>
            </div>
          </div>

          {/* Interactive Earnings Calculator */}
          <div className="lg:col-span-6 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-bold text-slate-900 text-lg font-display">
                Captain Monthly Earnings Estimator
              </h3>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                100% Female Commuters
              </span>
            </div>

            {/* Slider 1: Daily Riding Hours */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-600" />
                  Riding Hours per Day:
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {dailyHours} hours/day
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                value={dailyHours}
                onChange={(e) => setDailyHours(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[11px] text-stone-500">
                <span>3 hrs (Part-time)</span>
                <span>6 hrs (Standard)</span>
                <span>10 hrs (Full-time)</span>
              </div>
            </div>

            {/* Slider 2: Days per Week */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-600" />
                  Days active per Week:
                </span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {daysPerWeek} days/week
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="7"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[11px] text-stone-500">
                <span>3 days</span>
                <span>5 days (Mon–Fri)</span>
                <span>7 days (All-week)</span>
              </div>
            </div>

            {/* Calculated Earnings Card */}
            <div className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-sm space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] uppercase font-bold text-stone-500 tracking-wider">
                    Estimated Net Monthly Take-Home
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tabular-nums mt-0.5">
                    ₹{estimatedMonthlyEarnings.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-slate-500">/ month</span>
                  </div>
                </div>
                <div className="text-right text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                  ~{estimatedRidesPerDay} safe trips/day
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Daily automated bank payouts</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Free ₹5 Lakh safety medical cover</span>
                </div>
              </div>
            </div>

            {/* Launch Apply Modal Button */}
            <button
              type="button"
              onClick={() => {
                setShowApplyModal(true);
                setSubmitted(false);
              }}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Apply to Become a Sakhi Captain</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

        {/* Benefits Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Women Passengers Only</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never match captains with male passengers. Both rider and passenger identity are verified before any ride commences.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              <BatteryCharging className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Zero Down-Payment EV Lease</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Don&apos;t own a scooter? Get brand-new Ather or Ola EV scooters with ₹0 deposit and subsidized daily rental deducted from rides.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Zero Forced Night Dispatches</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete autonomy over your schedule. Choose daylight-only shifts, or opt in to premium-paying NightShield rides if you prefer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Captain Rest Lounges</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Access to clean, dedicated female rest lounges at major metro transit stations with washrooms, tea, and mobile charging.
            </p>
          </div>
        </div>

      </div>

      {/* Captain Onboarding Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">
                Sakhi Captain Onboarding Form
              </h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {!submitted ? (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name (As on Driving License)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunita Devi"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98450 12345"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Operating City
                      </label>
                      <select
                        value={applicantCity}
                        onChange={(e) => setApplicantCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                      >
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Jaipur">Jaipur</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Driving License (2-Wheeler with Gear / Non-Gear)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KA03 20210004567"
                      value={dlNumber}
                      onChange={(e) => setDlNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Two-Wheeler Vehicle Status
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHasScooter('own')}
                        className={`p-2.5 rounded-lg border text-left text-xs font-medium ${
                          hasScooter === 'own'
                            ? 'border-rose-600 bg-rose-50 text-rose-900'
                            : 'border-stone-200 bg-stone-50 text-slate-700'
                        }`}
                      >
                        I have my own scooter
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasScooter('need_ev')}
                        className={`p-2.5 rounded-lg border text-left text-xs font-medium ${
                          hasScooter === 'need_ev'
                            ? 'border-rose-600 bg-rose-50 text-rose-900'
                            : 'border-stone-200 bg-stone-50 text-slate-700'
                        }`}
                      >
                        I need ₹0 deposit EV rental
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-slate-500 space-y-1">
                    <div className="font-semibold text-slate-700">Documents required at physical verification:</div>
                    <div>1. Original Driving License · 2. Aadhaar Card · 3. Bank Passbook or UPI</div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    Submit Application for Police &amp; Skill Verification
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    Application Received, Sister!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Our all-women onboarding coordinator will contact you at{' '}
                    <span className="font-semibold text-slate-900">{applicantPhone || '+91 98450 12345'}</span>{' '}
                    within 24 hours to schedule your free helmet kit pickup and defensive riding briefing.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="mt-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
