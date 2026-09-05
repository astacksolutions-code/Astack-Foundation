// Demo-mode seed data. Mirrors the exact shape documents will have in Firestore,
// so switching from demo mode to a live Firebase project is a drop-in change.

export const seedGallery = [
  { id: 'g1', title: 'Winter Ration Drive', category: 'Relief', imageUrl: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800', createdAt: '2026-01-12T10:00:00Z' },
  { id: 'g2', title: 'Community Health Camp', category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800', createdAt: '2026-02-04T10:00:00Z' },
  { id: 'g3', title: 'Girls Literacy Class', category: 'Education', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', createdAt: '2026-02-18T10:00:00Z' },
  { id: 'g4', title: 'Clean Water Well Handover', category: 'Infrastructure', imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800', createdAt: '2026-03-02T10:00:00Z' },
  { id: 'g5', title: 'Vocational Stitching Workshop', category: 'Livelihood', imageUrl: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800', createdAt: '2026-03-20T10:00:00Z' },
  { id: 'g6', title: 'Eid Gift Distribution', category: 'Relief', imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800', createdAt: '2026-04-01T10:00:00Z' },
];

export const seedEvents = [
  {
    id: 'e1', title: 'Annual Blood Donation Drive', description: 'A city-wide blood donation camp in partnership with local hospitals.',
    date: '2026-09-14', time: '09:00', location: 'Astack Community Centre, Karachi',
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800',
    registrationCount: 128, capacity: 200, status: 'upcoming',
  },
  {
    id: 'e2', title: 'Free Eye Camp', description: 'Free eye check-ups and glasses distribution for underserved families.',
    date: '2026-09-28', time: '10:00', location: 'Astack Health Clinic, Landhi',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800',
    registrationCount: 76, capacity: 150, status: 'upcoming',
  },
  {
    id: 'e3', title: 'Ramadan Ration Distribution', description: 'Monthly ration packs delivered to 500 registered families.',
    date: '2026-03-10', time: '11:00', location: 'Multiple Distribution Points',
    imageUrl: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800',
    registrationCount: 500, capacity: 500, status: 'completed',
  },
];

export const seedPrograms = [
  {
    id: 'p1', title: 'Roshni Education Program', category: 'Education',
    description: 'Providing free primary education, books, and uniforms to 1,200 children across 8 informal settlements.',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    progress: 72, target: 1500, achieved: 1080, unit: 'children enrolled', status: 'active',
  },
  {
    id: 'p2', title: 'Sehat Mobile Clinics', category: 'Health',
    description: 'Mobile medical units delivering primary healthcare to remote and low-income communities.',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800',
    progress: 45, target: 50000, achieved: 22500, unit: 'patients treated', status: 'active',
  },
  {
    id: 'p3', title: 'Clean Water Initiative', category: 'Infrastructure',
    description: 'Installing hand-pumps and filtration wells in water-scarce villages.',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800',
    progress: 100, target: 40, achieved: 40, unit: 'wells installed', status: 'completed',
  },
  {
    id: 'p4', title: 'Hunar Skills Academy', category: 'Livelihood',
    description: 'Six-month vocational training in tailoring, IT, and electrical work for young adults.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800',
    progress: 10, target: 300, achieved: 30, unit: 'graduates', status: 'upcoming',
  },
];

export const seedTeam = [
  { id: 'tm1', name: 'Ameet Kumar Dhera', role: 'Founder / Chairman', bio: 'Founder & CEO of Astack Solutions, leading Astack Foundation\'s mission to bring education, health, and livelihood support to underserved communities.', avatar: 'https://i.pravatar.cc/300?img=51' },
  { id: 'tm2', name: 'Abdul Bari', role: 'Vice Chairman', bio: 'HR & PR Director at Astack Solutions, overseeing community partnerships and public outreach for the Foundation.', avatar: 'https://i.pravatar.cc/300?img=12' },
  { id: 'tm3', name: 'Hassan Abdullah', role: 'President / General Secretary', bio: 'COO of Astack Solutions, responsible for the Foundation\'s day-to-day operations and program delivery.', avatar: 'https://i.pravatar.cc/300?img=32' },
];

export const seedTestimonials = [
  { id: 't1', name: 'Ayesha Malik', role: 'Parent, Roshni Program', quote: 'My daughter is the first in our family to attend school. Astack made this possible.', avatar: 'https://i.pravatar.cc/100?img=47' },
  { id: 't2', name: 'Imran Sheikh', role: 'Hunar Academy Graduate', quote: 'The tailoring course gave me a real trade and a steady income for my family.', avatar: 'https://i.pravatar.cc/100?img=25' },
  { id: 't3', name: 'Dr. Sana Qureshi', role: 'Volunteer Physician', quote: 'The mobile clinics reach patients who would otherwise have no access to care at all.', avatar: 'https://i.pravatar.cc/100?img=45' },
];

export const seedContacts = [
  { id: 'c1', name: 'Bilal Ahmed', email: 'bilal.ahmed@example.com', subject: 'Volunteering enquiry', message: 'I would like to volunteer for the upcoming eye camp. How do I register?', status: 'unread', createdAt: '2026-08-18T09:20:00Z', reply: null },
  { id: 'c2', name: 'Fatima Noor', email: 'fatima.noor@example.com', subject: 'Donation receipt', message: 'Could you send me a tax receipt for my donation made last week?', status: 'read', createdAt: '2026-08-15T14:05:00Z', reply: 'Hi Fatima, your receipt has been emailed — thank you for your support!' },
  { id: 'c3', name: 'Usman Tariq', email: 'usman.tariq@example.com', subject: 'Partnership proposal', message: 'Our CSR team would like to discuss a partnership for the education program.', status: 'unread', createdAt: '2026-08-19T11:40:00Z', reply: null },
];

export const seedFeedback = [
  { id: 'f1', name: 'Anonymous', rating: 5, category: 'Health', comment: 'The mobile clinic staff were incredibly kind and professional.', anonymous: true, createdAt: '2026-08-10T10:00:00Z', reply: null },
  { id: 'f2', name: 'Zainab Hussain', rating: 4, category: 'Education', comment: 'Great program, though we need more classrooms in our area.', anonymous: false, createdAt: '2026-08-12T10:00:00Z', reply: 'Thank you Zainab — we are actively fundraising for a second classroom block.' },
  { id: 'f3', name: 'Anonymous', rating: 2, category: 'Relief', comment: 'Ration distribution was delayed by two days without any notice.', anonymous: true, createdAt: '2026-08-14T10:00:00Z', reply: null },
  { id: 'f4', name: 'Kamran Ali', rating: 5, category: 'Livelihood', comment: 'The skills academy completely changed my career prospects.', anonymous: false, createdAt: '2026-08-16T10:00:00Z', reply: null },
];

export const seedUsers = [
  { id: 'u1', name: 'Admin User', email: 'admin@astack.org', role: 'Admin', lastActive: '2026-08-20T08:00:00Z' },
  { id: 'u2', name: 'Hira Baig', email: 'hira@astack.org', role: 'Admin', lastActive: '2026-08-19T16:30:00Z' },
];

export const seedActivityLog = [
  { id: 'a1', user: 'Hira Baig', action: 'Added event "Free Eye Camp"', timestamp: '2026-08-19T16:20:00Z' },
  { id: 'a2', user: 'Admin User', action: 'Marked feedback #f2 as replied', timestamp: '2026-08-19T09:10:00Z' },
  { id: 'a3', user: 'Salman Raza', action: 'Viewed contact inbox', timestamp: '2026-08-18T12:15:00Z' },
];

export const orgStats = { livesImpacted: 48200, volunteers: 640, programsRun: 24, citiesServed: 9 };
