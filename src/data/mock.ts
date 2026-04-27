export interface Shelter {
  id: string;
  name: string;
  type: "shelter" | "hospital" | "food" | "charging" | "boat" | "police" | "govcamp";
  address: string;
  capacity?: number;
  available?: number;
  phone?: string;
  lat: number;
  lng: number;
}

export const SHELTERS: Shelter[] = [
  { id: "s1", name: "Government Higher Sec School", type: "shelter", address: "Anna Nagar, Chennai", capacity: 400, available: 120, phone: "+91-44-2345-6789", lat: 13.0850, lng: 80.2101 },
  { id: "s2", name: "Stanley Medical Hospital", type: "hospital", address: "Old Jail Rd, Royapuram", phone: "+91-44-2528-1351", lat: 13.1067, lng: 80.2911 },
  { id: "s3", name: "Apollo Hospitals Greams Rd", type: "hospital", address: "Greams Lane, Chennai", phone: "+91-44-2829-3333", lat: 13.0635, lng: 80.2519 },
  { id: "s4", name: "Amma Unavagam Food Camp", type: "food", address: "T. Nagar, Chennai", phone: "+91-44-2434-1212", lat: 13.0418, lng: 80.2341 },
  { id: "s5", name: "Mobile Charging Hub", type: "charging", address: "Egmore Railway Stn", lat: 13.0732, lng: 80.2609 },
  { id: "s6", name: "NDRF Rescue Boat Unit 4", type: "boat", address: "Velachery Lake Rd", phone: "+91-44-2253-9991", lat: 12.9756, lng: 80.2207 },
  { id: "s7", name: "Mylapore Police Station", type: "police", address: "Luz Ch Rd, Mylapore", phone: "100", lat: 13.0339, lng: 80.2619 },
  { id: "s8", name: "Tambaram Govt Relief Camp", type: "govcamp", address: "GST Rd, Tambaram", capacity: 800, available: 240, phone: "+91-44-2226-1100", lat: 12.9229, lng: 80.1275 },
  { id: "s9", name: "Chetpet Community Shelter", type: "shelter", address: "Chetpet, Chennai", capacity: 250, available: 0, phone: "+91-44-2836-7000", lat: 13.0734, lng: 80.2418 },
  { id: "s10", name: "St Thomas Mt Food Camp", type: "food", address: "St Thomas Mount", lat: 13.0030, lng: 80.1968 },
];

export const HELPLINES = [
  { name: "National Emergency Number", number: "112", desc: "All-in-one emergency", category: "primary" },
  { name: "Police", number: "100", desc: "Crime & public safety", category: "police" },
  { name: "Fire & Rescue", number: "101", desc: "Fire & extraction", category: "fire" },
  { name: "Ambulance", number: "108", desc: "Medical emergency", category: "medical" },
  { name: "Disaster Management Helpline", number: "1077", desc: "District control room", category: "disaster" },
  { name: "NDRF Control Room", number: "011-2438-3097", desc: "National Disaster Response Force", category: "disaster" },
  { name: "Coast Guard", number: "1554", desc: "Coastal rescue", category: "rescue" },
  { name: "Women Helpline", number: "1091", desc: "24x7 support", category: "support" },
  { name: "Child Helpline", number: "1098", desc: "Child in distress", category: "support" },
  { name: "Tamil Nadu State Helpline", number: "1070", desc: "State emergency control", category: "disaster" },
  { name: "District Collector — Chennai", number: "+91-44-2567-0345", desc: "Civil administration", category: "govt" },
  { name: "Indian Red Cross Society", number: "011-2371-6441", desc: "Relief & first aid", category: "ngo" },
  { name: "Goonj NGO", number: "011-4140-1216", desc: "Relief material distribution", category: "ngo" },
  { name: "Local Volunteer Coordinator", number: "+91-98400-12345", desc: "Neighborhood team", category: "volunteer" },
];

export const ALERTS = [
  { id: "a1", level: "severe", area: "Adyar River, T.Nagar", message: "Adyar River crossing danger mark. Evacuation advised within 2 km.", time: "12 min ago" },
  { id: "a2", level: "warning", area: "Velachery low-lying", message: "Water-logging up to 1.2m reported. Avoid Velachery–Tambaram road.", time: "34 min ago" },
  { id: "a3", level: "info", area: "Mylapore", message: "Stanley Hospital running emergency triage. 24h availability.", time: "1 hr ago" },
  { id: "a4", level: "warning", area: "Coastal Chennai", message: "Heavy rain forecast: 18 cm in next 12 hours. Stay indoors.", time: "2 hr ago" },
];

export const UPDATES = [
  { id: "u1", verified: true, type: "rescue", title: "12 families rescued from Mudichur", body: "NDRF Team 4 evacuated 12 families to Tambaram Relief Camp. All safe.", time: "8 min ago", source: "District Control" },
  { id: "u2", verified: true, type: "road", title: "GST Road blocked at Pallavaram", body: "Water-logging up to 4 ft. Use Inner Ring Road via Madipakkam.", time: "26 min ago", source: "Traffic Police" },
  { id: "u3", verified: true, type: "shelter", title: "Chetpet Shelter at full capacity", body: "Please redirect new arrivals to Anna Nagar Govt School (120 beds open).", time: "47 min ago", source: "Relief Coordinator" },
  { id: "u4", verified: true, type: "info", title: "Power restored in Adyar West", body: "TANGEDCO confirms grid restoration. Avoid wet switches for 6 hours.", time: "1 hr ago", source: "TANGEDCO" },
  { id: "u5", verified: true, type: "rescue", title: "Boat units deployed to Velachery", body: "Two NDRF boats now operating from Velachery Lake. Call 1077 for pickup.", time: "1 hr ago", source: "NDRF" },
];

export const RESCUE_REQUESTS = [
  { id: "r-1042", name: "Rajesh K.", phone: "+91-984••••12", area: "Mudichur", people: 4, medical: false, water: "knee", status: "dispatched", time: "5 min ago" },
  { id: "r-1041", name: "Priya S.", phone: "+91-997••••88", area: "Velachery", people: 7, medical: true, water: "waist", status: "urgent", time: "9 min ago" },
  { id: "r-1040", name: "Mohammed I.", phone: "+91-900••••55", area: "Pallavaram", people: 2, medical: false, water: "ankle", status: "received", time: "14 min ago" },
  { id: "r-1039", name: "Ananya R.", phone: "+91-934••••07", area: "Adyar", people: 5, medical: true, water: "chest", status: "urgent", time: "22 min ago" },
  { id: "r-1038", name: "Vikram T.", phone: "+91-808••••61", area: "Saidapet", people: 3, medical: false, water: "knee", status: "completed", time: "41 min ago" },
];

export const MISSING_PERSONS = [
  { id: "m1", name: "Kavitha Murugan", age: 64, lastSeen: "Velachery Bus Stand", time: "6 hrs ago", contact: "+91-984••••11", status: "missing" },
  { id: "m2", name: "Arjun Subramaniam", age: 9, lastSeen: "Adyar (with school bag)", time: "3 hrs ago", contact: "+91-998••••22", status: "missing" },
  { id: "m3", name: "Mr. Pandian", age: 71, lastSeen: "Mylapore market area", time: "12 hrs ago", contact: "+91-934••••76", status: "found" },
];

export const SAFETY_GUIDES = [
  { id: "g1", title: "Before a flood", icon: "ListChecks", points: ["Pack a 72-hour emergency kit (water, food, torch, radio).", "Charge phones & power banks fully.", "Move valuables and documents to upper floors.", "Know your nearest two evacuation routes.", "Save emergency numbers offline."] },
  { id: "g2", title: "During a flood", icon: "CloudRain", points: ["Move to the highest safe floor immediately.", "Do not walk through moving water above ankle level.", "Avoid driving — 30 cm of water can stall a car.", "Switch off mains electricity if water is rising.", "Keep listening to verified govt radio updates."] },
  { id: "g3", title: "If trapped inside the house", icon: "Home", points: ["Move to the highest accessible point — roof if needed.", "Signal for help with a bright cloth or torch.", "Do NOT enter the attic if it has no exit.", "Save phone battery — text instead of calling.", "Share live location with rescuers via this app."] },
  { id: "g4", title: "If you are in a vehicle", icon: "Car", points: ["Turn around — never cross flooded roads.", "If water rises around the car, abandon it immediately.", "Open the window before water reaches it.", "Climb to higher ground on foot.", "Do not shelter under bridges in flood zones."] },
  { id: "g5", title: "Drinking water safety", icon: "Droplets", points: ["Drink only sealed bottled or boiled water.", "Boil water for at least 1 full minute (rolling boil).", "Use chlorine tablets if boiling isn't possible.", "Do not use flood water for cooking or brushing teeth.", "Discard food that touched flood water."] },
  { id: "g6", title: "Snake & infection precautions", icon: "Bug", points: ["Wear closed shoes / boots when wading.", "Tap the ground with a stick when walking.", "Keep wounds covered & clean — risk of leptospirosis.", "Seek antibiotics early if you have a cut + flood exposure.", "Avoid stagnant water — high mosquito risk."] },
  { id: "g7", title: "Children safety", icon: "Baby", points: ["Never let children play near flood water.", "Keep ID note in the child's pocket with contacts.", "Boil all water for infant feeding.", "Watch for signs of shock — keep them warm and dry.", "Reassure calmly — children mirror your emotions."] },
  { id: "g8", title: "Elderly care", icon: "HeartPulse", points: ["Move elderly family members to safety FIRST.", "Keep a 7-day supply of essential medication.", "Maintain warmth — risk of hypothermia even in tropics.", "Use a chair-carry if mobility is low.", "Note medical conditions on a card in their pocket."] },
  { id: "g9", title: "Electricity dangers", icon: "Zap", points: ["Switch off mains if water is entering the house.", "NEVER touch switches or appliances with wet hands.", "Stay 10 m away from fallen power lines.", "Do not re-enter flooded rooms until cleared.", "Get electrical wiring inspected before reuse."] },
  { id: "g10", title: "Important documents checklist", icon: "FileText", points: ["Aadhaar / national ID", "Passport, PAN card, voter ID", "Property & insurance papers", "Bank passbooks, cheque books", "Medical prescriptions & vaccine cards", "Pack everything in a waterproof zip bag."] },
];