import { LocationOption, Captain, EmergencyContact } from '../types';

export const POPULAR_LOCATIONS: LocationOption[] = [
  {
    id: 'loc-1',
    name: 'Indiranagar 100ft Road Metro',
    area: 'Indiranagar',
    type: 'metro',
    landmark: 'Exit Gate 2, near CMH Road'
  },
  {
    id: 'loc-2',
    name: 'Manyata Tech Park (Gate 5)',
    area: 'Nagavara / Hebbal',
    type: 'techpark',
    landmark: 'Back gate pickup bay'
  },
  {
    id: 'loc-3',
    name: 'Mount Carmel College Main Gate',
    area: 'Vasanth Nagar',
    type: 'college',
    landmark: 'Palace Road crossing'
  },
  {
    id: 'loc-4',
    name: 'Koramangala 5th Block (Forum Mall)',
    area: 'Koramangala',
    type: 'mall',
    landmark: 'Hosur Road Auto/Bike pickup stand'
  },
  {
    id: 'loc-5',
    name: 'HSR Layout Sector 2 BDA Complex',
    area: 'HSR Layout',
    type: 'residential',
    landmark: 'Opposite 27th Main intersection'
  },
  {
    id: 'loc-6',
    name: 'Whitefield ITPL Main Gate',
    area: 'Whitefield',
    type: 'techpark',
    landmark: 'Next to Pattandur Agrahara Metro'
  },
  {
    id: 'loc-7',
    name: 'Electronic City Phase 1 Toll Plaza',
    area: 'Electronic City',
    type: 'techpark',
    landmark: 'Infosys Gate 1 walkway'
  },
  {
    id: 'loc-8',
    name: 'Kempegowda Majestic Metro Interchange',
    area: 'Majestic / Central',
    type: 'transit',
    landmark: 'Platform 3 Subway entrance'
  },
  {
    id: 'loc-9',
    name: 'MG Road Trinity Metro Station',
    area: 'MG Road / CBD',
    type: 'metro',
    landmark: 'Near Taj Vivanta Gate'
  },
  {
    id: 'loc-10',
    name: 'Jayanagar 4th Block Shopping Complex',
    area: 'Jayanagar',
    type: 'mall',
    landmark: 'Near cool joint circle'
  }
];

export const CAPTAIN_ROSTER: Captain[] = [
  {
    id: 'cap-1',
    name: 'Captain Anjali Sharma',
    rating: 4.97,
    ridesCompleted: 1640,
    vehicleModel: 'Ather 450X (Electric)',
    vehicleNumber: 'KA-03-EX-4182',
    experienceYears: 3,
    languages: ['English', 'Hindi', 'Kannada'],
    safetyBadges: ['Police Verified', 'Defensive Rider Pro', 'NightShield Certified', 'CPR Trained'],
    policeVerified: true,
    evVehicle: true
  },
  {
    id: 'cap-2',
    name: 'Captain Pooja Varma',
    rating: 4.95,
    ridesCompleted: 1220,
    vehicleModel: 'Honda Activa 6G Premium',
    vehicleNumber: 'KA-05-MM-7829',
    experienceYears: 2,
    languages: ['Hindi', 'English', 'Tamil'],
    safetyBadges: ['Police Verified', 'Sanitation Star', 'Top Safe Captain 2025'],
    policeVerified: true,
    evVehicle: false
  },
  {
    id: 'cap-3',
    name: 'Captain Meera Nambiar',
    rating: 4.99,
    ridesCompleted: 2180,
    vehicleModel: 'Ola S1 Pro Gen 2',
    vehicleNumber: 'KA-01-EQ-9304',
    experienceYears: 4,
    languages: ['English', 'Malayalam', 'Kannada', 'Hindi'],
    safetyBadges: ['Police Verified', 'Master Navigator', 'NightShield Elite', 'First Aid Certified'],
    policeVerified: true,
    evVehicle: true
  },
  {
    id: 'cap-4',
    name: 'Captain Sunita Devi',
    rating: 4.92,
    ridesCompleted: 980,
    vehicleModel: 'TVS iQube Electric',
    vehicleNumber: 'KA-04-EV-2041',
    experienceYears: 2,
    languages: ['Hindi', 'Kannada', 'Telugu'],
    safetyBadges: ['Police Verified', 'Defensive Rider Pro', 'Gentle Commute Specialist'],
    policeVerified: true,
    evVehicle: true
  }
];

export const DEFAULT_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'ec-1',
    name: 'Priyanka (Sister)',
    phone: '+91 98450 12345',
    relation: 'Family'
  },
  {
    id: 'ec-2',
    name: 'Sneha (Roommate)',
    phone: '+91 97110 56789',
    relation: 'Roommate'
  }
];

export const EMERGENCY_HOTLINES = [
  { name: 'Police Emergency Response Support System', number: '112', desc: 'Direct GPS dispatch to closest PCR van' },
  { name: 'Women Helpline (All India)', number: '1091', desc: 'Toll-free 24x7 crisis intervention and counselling' },
  { name: 'National Commission for Women (NCW)', number: '7827170170', desc: 'Official WhatsApp & helpline 24/7' },
  { name: 'SakhiRide 24/7 Command Control Room', number: '1800-725-4474', desc: 'All-women response coordinators' }
];

export const SAFETY_PILLARS = [
  {
    title: '100% Women-Only Ecosystem',
    description: 'Every single captain is a verified woman rider. No male riders or drivers are onboarded to the Sakhi platform under any circumstance.',
    metric: 'Zero Compromise'
  },
  {
    title: 'Multi-Tier Police & Physical Verification',
    description: 'Strict 5-step background vetting: Aadhaar e-KYC, criminal record clearance, driving history audit, and in-person defensive riding certification.',
    metric: '100% Police Verified'
  },
  {
    title: 'Dual Emergency Contact Live Sync',
    description: 'When your trip starts, your designated emergency contacts receive an auto-generated live GPS track link with captain name, vehicle number, and live telemetry.',
    metric: 'Real-Time Auto Ping'
  },
  {
    title: 'NightShield Geofence & Route Deviation',
    description: 'Our system tracks route deviations greater than 200m. If your captain deviates from the well-lit safety corridor, the Sakhi Command Center initiates an audio check-in.',
    metric: '200m Deviation Alert'
  },
  {
    title: 'Sanitized ISI Helmet & Hairnet Protocol',
    description: 'Your captain carries a sanitized ISI-standard pillion helmet and provides a fresh disposable biodegradable hair cover with each trip for hygiene.',
    metric: 'Hygiene First'
  },
  {
    title: 'One-Tap SOS & Audio Safety PIN',
    description: 'Rides only commence once the commuter shares a confidential 4-digit PIN. An emergency SOS triggers instant silent alarms to nearest police units.',
    metric: '< 90s Response Drill'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Rhea Sen',
    role: 'Product Designer at Tech Mahindra',
    city: 'Bengaluru',
    commute: 'Daily Indiranagar to Manyata Tech Park (12 km)',
    quote: 'As a woman working late shifts ending at 9:30 PM, public transport felt stressful and ordinary bike taxis felt uneasy. SakhiRide changed my life. Riding with Captain Anjali feels like travelling with an elder sister. I feel totally relaxed and reach home in half the time of a car cab.',
    rating: 5,
    tag: 'Verified Daily Commuter'
  },
  {
    name: 'Shreya Kulkarni',
    role: 'Law Student at NLSIU',
    city: 'Bengaluru',
    commute: 'Metro to Campus Commutes',
    quote: 'The dual-contact auto SMS gives my parents in Pune complete peace of mind. The moment I get on the bike, Mom gets a live link showing Captain Pooja’s photo and our live speed. Plus, the clean helmet with disposable inner cap is a thoughtful touch!',
    rating: 5,
    tag: 'NightShield User'
  },
  {
    name: 'Captain Meera Nambiar',
    role: 'SakhiRide Fleet Captain',
    city: 'Bengaluru',
    commute: '3,200+ Safe Trips Completed',
    quote: 'Before SakhiRide, I struggled to find dignified, flexible work while taking care of my two children. Here, I earn ₹34,000 every month riding an electric scooter, pick my own 5-hour hours, and ferrying young working women safely gives me immense self-respect.',
    rating: 5,
    tag: 'Top Rated Female Captain'
  }
];
