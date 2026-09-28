import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Moon,
  Sun,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Trash2,
  Send,
  Sparkles,
} from 'lucide-react';
import { POPULAR_LOCATIONS, DEFAULT_EMERGENCY_CONTACTS } from '../data/mockData';
import { EmergencyContact } from '../types';

export const SafetyCheckerTool: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<number>(21); // 9 PM
  const [selectedRouteId, setSelectedRouteId] = useState<string>('loc-1');
  const [contacts, setContacts] = useState<EmergencyContact[]>(() => {
    try {
      const saved = localStorage.getItem('sakhi_contacts');
      return saved ? JSON.parse(saved) : DEFAULT_EMERGENCY_CONTACTS;
    } catch {
      return DEFAULT_EMERGENCY_CONTACTS;
    }
  });

  const [newContactName, setNewContactName] = useState<string>('');
  const [newContactPhone, setNewContactPhone] = useState<string>('');
  const [newContactRelation, setNewContactRelation] = useState<string>('Sister');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [testSmsSent, setTestSmsSent] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('sakhi_contacts', JSON.stringify(contacts));
    } catch (e) {
      console.error(e);
    }
  }, [contacts]);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    const newContact: EmergencyContact = {
      id: `ec-${Date.now()}`,
      name: newContactName.trim(),
      phone: newContactPhone.trim(),
      relation: newContactRelation,
    };

    setContacts([...contacts, newContact]);
    setNewContactName('');
    setNewContactPhone('');
    setShowAddForm(false);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleSendTestAlert = () => {
    setTestSmsSent(true);
    setTimeout(() => setTestSmsSent(false), 4000);
  };

  // Route safety heuristics
  const isNight = selectedHour >= 20 || selectedHour < 5;
  const corridorSafetyScore = isNight ? 96 : 99;
  const litStreetScore = isNight ? 92 : 100;
  const captainDensity = isNight ? 'Very High (NightShield Fleet On-Duty)' : 'Peak Availability';

  return (
    <section id="route-safety-checker" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Interactive Safety Preparedness</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display text-balance">
            Night Travel Audit & Emergency Contact Sync
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Check route safety metrics for late commutes and configure your primary emergency contacts so they are instantly notified whenever you ride.
          </p>
        </div>

        {/* Two-Column Grid: Route Safety Audit & Contact Manager */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Route Safety Audit Tool */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-slate-900 text-base font-display">
                Route Safety Assessment
              </h3>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Live Geofence Scanner
              </span>
            </div>

            {/* Travel Time Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Select Commute Time</span>
                <span className="text-slate-500 font-mono">
                  {selectedHour.toString().padStart(2, '0')}:00 {selectedHour >= 12 ? 'PM' : 'AM'}
                </span>
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-500" /> Morning 6 AM
                </span>
                <span className="flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-600" /> Evening 6 PM
                </span>
                <span className="flex items-center gap-1 font-semibold text-indigo-700">
                  <Moon className="w-3 h-3 text-indigo-600" /> Late Night 11 PM
                </span>
              </div>
            </div>

            {/* Travel Corridor */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Corridor / Destination Hub
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3 pointer-events-none" />
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                >
                  {POPULAR_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} · {loc.area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scorecard Cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Route Safety Index
                </div>
                <div className="text-2xl font-bold font-display text-emerald-700 tabular-nums mt-0.5">
                  {corridorSafetyScore}%
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Main thoroughfare routing with zero unverified shortcuts.
                </div>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  Street Illumination
                </div>
                <div className="text-2xl font-bold font-display text-slate-900 tabular-nums mt-0.5">
                  {litStreetScore}%
                </div>
                <div className="text-[11px] text-slate-600 mt-1">
                  Verified well-lit corridor with active CCTV coverage.
                </div>
              </div>
            </div>

            {/* NightShield Status */}
            <div className={`p-3.5 rounded-xl border text-xs ${
              isNight
                ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {isNight ? (
                  <>
                    <Moon className="w-4 h-4 text-rose-600" />
                    <span>NightShield Protocol Auto-Armed</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Daylight Fast Lane Active</span>
                  </>
                )}
              </div>
              <p className="text-[11px] mt-1 leading-relaxed">
                {isNight
                  ? 'Between 8 PM and 5 AM, rides on this route receive mandatory 24/7 command center check-ins, automated SMS to your contacts, and 200m route deviation tracking.'
                  : 'High captain density across metro junctions. Average female captain pickup within 3 minutes.'}
              </p>
            </div>
          </div>

          {/* Column 2: Emergency Contact Manager & Live SMS Preview */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base font-display">
                  Emergency Contacts Sync
                </h3>
                <p className="text-xs text-slate-500">
                  Designated guardians receive your live tracking link whenever a ride starts.
                </p>
              </div>

              {!showAddForm && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1 border border-rose-200"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Contact</span>
                </button>
              )}
            </div>

            {/* Add Contact Inline Form */}
            {showAddForm && (
              <form onSubmit={handleAddContact} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div className="text-xs font-bold text-slate-900">Add Trusted Guardian</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Full Name (e.g. Priya)"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    required
                    className="px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (+91 98450...)"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    required
                    className="px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={newContactRelation}
                    onChange={(e) => setNewContactRelation(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none"
                  >
                    <option value="Sister">Sister</option>
                    <option value="Mother">Mother</option>
                    <option value="Roommate">Roommate</option>
                    <option value="Friend">Friend</option>
                    <option value="Father">Father</option>
                    <option value="Partner">Partner</option>
                  </select>

                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Save Contact
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Contact List */}
            <div className="space-y-2">
              {contacts.length === 0 ? (
                <div className="text-xs text-stone-400 py-4 text-center">
                  No emergency contacts configured yet. Add at least one guardian.
                </div>
              ) : (
                contacts.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{c.name}</span>
                        <span className="text-[10px] font-normal text-slate-500 bg-white border border-stone-200 px-1.5 py-0.2 rounded">
                          {c.relation}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-600 mt-0.5">{c.phone}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Active Sync
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteContact(c.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Delete contact"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Simulated Live SMS Preview */}
            <div className="p-3.5 bg-stone-900 text-stone-200 rounded-xl text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-stone-400 pb-1 border-b border-stone-800 font-mono">
                <span>Auto-SMS Sample Sent to Contacts</span>
                <span>Just Now</span>
              </div>
              <p className="font-mono text-[11px] leading-relaxed text-stone-300">
                &ldquo;SakhiRide Alert: Ananya started ride with Captain Anjali (KA-03-EX-4182, Ather 450X).
                Live GPS Link: https://sakhiride.safe/live/KA03. ETA: 22 mins. Speed: 28km/h. Sakhi 24/7 Desk: 1800-725-4474&rdquo;
              </p>
            </div>

            {/* Test alert trigger */}
            <div className="pt-1 flex items-center justify-between">
              <button
                type="button"
                onClick={handleSendTestAlert}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-rose-600" />
                <span>Simulate Test Notification</span>
              </button>

              {testSmsSent && (
                <span className="text-xs font-semibold text-emerald-700 animate-in fade-in flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Test SMS ping dispatched!</span>
                </span>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
