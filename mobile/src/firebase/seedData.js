// Same shape as web/src/utils/seedData.js — used when Firebase isn't configured yet.
export const seedEvents = [
  { id: 'e1', title: 'Annual Blood Donation Drive', date: '2026-09-14', time: '09:00', location: 'Astack Community Centre, Karachi', status: 'upcoming', registrationCount: 128, capacity: 200 },
  { id: 'e2', title: 'Free Eye Camp', date: '2026-09-28', time: '10:00', location: 'Astack Health Clinic, Landhi', status: 'upcoming', registrationCount: 76, capacity: 150 },
];

export const seedPrograms = [
  { id: 'p1', title: 'Roshni Education Program', category: 'Education', progress: 72, achieved: 1080, target: 1500, unit: 'children enrolled', status: 'active' },
  { id: 'p2', title: 'Sehat Mobile Clinics', category: 'Health', progress: 45, achieved: 22500, target: 50000, unit: 'patients treated', status: 'active' },
  { id: 'p3', title: 'Clean Water Initiative', category: 'Infrastructure', progress: 100, achieved: 40, target: 40, unit: 'wells installed', status: 'completed' },
];

export const seedGallery = [
  { id: 'g1', title: 'Winter Ration Drive', category: 'Relief', imageUrl: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600' },
  { id: 'g2', title: 'Community Health Camp', category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600' },
  { id: 'g3', title: 'Girls Literacy Class', category: 'Education', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600' },
];
