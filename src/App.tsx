import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SafetyShieldSection } from './components/SafetyShieldSection';
import { SafetyCheckerTool } from './components/SafetyCheckerTool';
import { DriveWithUsSection } from './components/DriveWithUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { RideBookingModal } from './components/RideBookingModal';
import { SosModal } from './components/SosModal';
import { FakeCallModal } from './components/FakeCallModal';
import { EmergencyHotlinesModal } from './components/EmergencyHotlinesModal';
import { LocationOption, RideType } from './types';
import { ShieldAlert, PhoneCall, Sparkles } from 'lucide-react';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [bookingPickup, setBookingPickup] = useState<LocationOption | undefined>(undefined);
  const [bookingDropoff, setBookingDropoff] = useState<LocationOption | undefined>(undefined);
  const [bookingType, setBookingType] = useState<RideType>('solo');
  const [bookingDistanceKm, setBookingDistanceKm] = useState<number>(8.4);

  const [sosOpen, setSosOpen] = useState<boolean>(false);
  const [fakeCallOpen, setFakeCallOpen] = useState<boolean>(false);
  const [hotlinesOpen, setHotlinesOpen] = useState<boolean>(false);

  const handleStartBooking = (pickup: LocationOption, dropoff: LocationOption, type: RideType, customDistance?: number) => {
    setBookingPickup(pickup);
    setBookingDropoff(dropoff);
    setBookingType(type);
    if (customDistance) {
      setBookingDistanceKm(customDistance);
    }
    setBookingOpen(true);
  };

  const handleOpenDirectBooking = () => {
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Top Banner Notice: Safety & Women-Only Pledge */}
      <div className="bg-rose-900 text-rose-100 text-xs py-2 px-4 text-center font-medium border-b border-rose-950 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>
          <strong>100% Women-Only Commutes:</strong> Ridden exclusively by police-verified female captains with sanitized helmets &amp; live GPS geofencing.
        </span>
      </div>

      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={handleOpenDirectBooking}
        onOpenSos={() => setSosOpen(true)}
        onOpenHotlines={() => setHotlinesOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onStartBooking={handleStartBooking} />
        <SafetyShieldSection />
        <SafetyCheckerTool />
        <DriveWithUsSection />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenDirectBooking}
        onOpenSos={() => setSosOpen(true)}
        onOpenHotlines={() => setHotlinesOpen(true)}
      />

      {/* Floating Reassurance SOS & Helpline Button (Discreet, high-touch) */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFakeCallOpen(true)}
          className="px-3 py-2.5 bg-white/95 backdrop-blur-md text-slate-700 hover:text-slate-950 text-xs font-semibold rounded-xl border border-stone-200 shadow-lg hover:shadow-xl transition-all flex items-center gap-1.5"
          title="Simulate incoming safety escort call"
        >
          <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">Safety Call</span>
        </button>

        <button
          type="button"
          onClick={() => setSosOpen(true)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-rose-600/30 transition-all flex items-center gap-1.5"
          title="Launch Instant Emergency Response Drill"
        >
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>SOS Shield</span>
        </button>
      </div>

      {/* Modals & Live Simulators */}
      <RideBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialPickup={bookingPickup}
        initialDropoff={bookingDropoff}
        initialType={bookingType}
        initialDistanceKm={bookingDistanceKm}
        onTriggerSos={() => setSosOpen(true)}
        onTriggerFakeCall={() => setFakeCallOpen(true)}
      />

      <SosModal
        isOpen={sosOpen}
        onClose={() => setSosOpen(false)}
      />

      <FakeCallModal
        isOpen={fakeCallOpen}
        onClose={() => setFakeCallOpen(false)}
        onTriggerSos={() => {
          setFakeCallOpen(false);
          setSosOpen(true);
        }}
      />

      <EmergencyHotlinesModal
        isOpen={hotlinesOpen}
        onClose={() => setHotlinesOpen(false)}
        onLaunchSosDrill={() => setSosOpen(true)}
      />
    </div>
  );
}
