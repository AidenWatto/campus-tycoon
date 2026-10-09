import type { BuildingDef, GameEvent, GameConfig, GameGoal, SustainabilityUpgrade, ResearchArea } from './types';

// ============================================================
// DIFFICULTY CONFIGURATIONS
// ============================================================

export const DIFFICULTY_CONFIGS: Record<string, GameConfig> = {
  easy: {
    startingBudget: 2_500_000,
    startingStudents: 450,
    startingFaculty: 35,
    startingStaff: 20,
    startingCapacity: 600,
    startingReputation: 55,
    startingSatisfaction: 70,
    startingAcademicQuality: 58,
    startingSustainability: 50,
    eventFrequency: 0.25,
    maintenanceMultiplier: 0.8,
    enrollmentPressure: 1.3,
    financialConstraint: 0.7,
  },
  standard: {
    startingBudget: 2_000_000,
    startingStudents: 450,
    startingFaculty: 35,
    startingStaff: 20,
    startingCapacity: 600,
    startingReputation: 50,
    startingSatisfaction: 65,
    startingAcademicQuality: 55,
    startingSustainability: 45,
    eventFrequency: 0.35,
    maintenanceMultiplier: 1.0,
    enrollmentPressure: 1.0,
    financialConstraint: 1.0,
  },
  challenge: {
    startingBudget: 1_500_000,
    startingStudents: 400,
    startingFaculty: 30,
    startingStaff: 15,
    startingCapacity: 550,
    startingReputation: 45,
    startingSatisfaction: 60,
    startingAcademicQuality: 50,
    startingSustainability: 40,
    eventFrequency: 0.5,
    maintenanceMultiplier: 1.3,
    enrollmentPressure: 0.7,
    financialConstraint: 1.4,
  },
};

// ============================================================
// GOAL DEFINITIONS
// ============================================================

export const GOAL_DEFS: Record<GameGoal, { name: string; description: string; icon: string }> = {
  'academic-excellence': {
    name: 'Academic Excellence',
    description: 'Focus on research and teaching quality. Win by reaching Academic Quality ≥ 90.',
    icon: 'GraduationCap',
  },
  'student-experience': {
    name: 'Student Experience',
    description: 'Focus on satisfaction and campus life. Win by reaching Satisfaction ≥ 90.',
    icon: 'Smile',
  },
  'financial-stability': {
    name: 'Financial Stability',
    description: 'Focus on sustainable finances. Win by maintaining positive cash flow for 5 consecutive years.',
    icon: 'TrendingUp',
  },
  'sustainable-campus': {
    name: 'Sustainable Campus',
    description: 'Focus on green infrastructure. Win by reaching Sustainability ≥ 90.',
    icon: 'Leaf',
  },
  'balanced-university': {
    name: 'Balanced University',
    description: 'Maintain balanced performance. Win by keeping all major metrics above 75.',
    icon: 'Scale',
  },
};

// ============================================================
// BUILDING DEFINITIONS
// ============================================================

export const BUILDING_DEFS: BuildingDef[] = [
  // --- Academic Zone ---
  {
    id: 'lecture-hall',
    name: 'Lecture Hall',
    zone: 'academic',
    cost: 200_000,
    capacity: 100,
    maintenance: 5_000,
    academicImpact: 4,
    satisfactionImpact: 2,
    staffRequirement: 3,
    sustainabilityImpact: 0,
    constructionTime: 2,
    description: 'A large lecture hall for introductory and core courses.',
    iconName: 'Presentation',
    upgradeLevels: [
      { level: 2, name: 'Modern Lecture Hall', cost: 120_000, capacityBonus: 50, academicBonus: 3, satisfactionBonus: 2, maintenanceIncrease: 2_000, sustainabilityBonus: 0, description: 'Smart boards and updated seating.' },
      { level: 3, name: 'Premier Lecture Hall', cost: 200_000, capacityBonus: 50, academicBonus: 2, satisfactionBonus: 2, maintenanceIncrease: 3_000, sustainabilityBonus: 1, description: 'State-of-the-art multimedia systems.' },
    ],
  },
  {
    id: 'cs-building',
    name: 'Computer Science Building',
    zone: 'academic',
    cost: 450_000,
    capacity: 120,
    maintenance: 12_000,
    academicImpact: 10,
    satisfactionImpact: 4,
    staffRequirement: 5,
    sustainabilityImpact: -1,
    constructionTime: 3,
    description: 'Computer labs and software engineering studios.',
    iconName: 'Laptop',
    upgradeLevels: [
      { level: 2, name: 'Advanced CS Building', cost: 250_000, capacityBonus: 60, academicBonus: 5, satisfactionBonus: 3, maintenanceIncrease: 4_000, sustainabilityBonus: 0, description: 'AI/ML labs and expanded workstation access.' },
      { level: 3, name: 'Research CS Building', cost: 400_000, capacityBonus: 60, academicBonus: 4, satisfactionBonus: 3, maintenanceIncrease: 5_000, sustainabilityBonus: 1, description: 'Cutting-edge research facilities.' },
    ],
  },
  {
    id: 'science-building',
    name: 'Science Building',
    zone: 'academic',
    cost: 400_000,
    capacity: 110,
    maintenance: 10_000,
    academicImpact: 9,
    satisfactionImpact: 3,
    staffRequirement: 4,
    sustainabilityImpact: -1,
    constructionTime: 3,
    description: 'Chemistry, biology, and physics laboratories.',
    iconName: 'FlaskConical',
    upgradeLevels: [
      { level: 2, name: 'Advanced Science Building', cost: 220_000, capacityBonus: 50, academicBonus: 4, satisfactionBonus: 2, maintenanceIncrease: 3_500, sustainabilityBonus: 0, description: 'Modern lab equipment and expanded facilities.' },
      { level: 3, name: 'Research Science Building', cost: 350_000, capacityBonus: 50, academicBonus: 4, satisfactionBonus: 2, maintenanceIncrease: 4_500, sustainabilityBonus: 1, description: 'World-class research laboratories.' },
    ],
  },
  {
    id: 'library',
    name: 'Library',
    zone: 'academic',
    cost: 350_000,
    capacity: 150,
    maintenance: 8_000,
    academicImpact: 8,
    satisfactionImpact: 5,
    staffRequirement: 3,
    sustainabilityImpact: 0,
    constructionTime: 3,
    description: 'A central library with study spaces and collections.',
    iconName: 'Library',
    upgradeLevels: [
      { level: 2, name: 'Digital Library', cost: 180_000, capacityBonus: 50, academicBonus: 4, satisfactionBonus: 3, maintenanceIncrease: 3_000, sustainabilityBonus: 1, description: 'Digital archives and online resources.' },
      { level: 3, name: 'Research Library', cost: 300_000, capacityBonus: 50, academicBonus: 4, satisfactionBonus: 3, maintenanceIncrease: 4_000, sustainabilityBonus: 2, description: 'Comprehensive research collections.' },
    ],
  },
  // --- Student Life Zone ---
  {
    id: 'student-center',
    name: 'Student Centre',
    zone: 'student-life',
    cost: 300_000,
    capacity: 80,
    maintenance: 7_000,
    academicImpact: 1,
    satisfactionImpact: 10,
    staffRequirement: 4,
    sustainabilityImpact: 0,
    constructionTime: 2,
    description: 'Clubs, dining, and student organization spaces.',
    iconName: 'Users',
    upgradeLevels: [
      { level: 2, name: 'Expanded Student Centre', cost: 160_000, capacityBonus: 40, academicBonus: 0, satisfactionBonus: 5, maintenanceIncrease: 2_500, sustainabilityBonus: 0, description: 'More clubs and event spaces.' },
      { level: 3, name: 'Premier Student Centre', cost: 280_000, capacityBonus: 40, academicBonus: 1, satisfactionBonus: 4, maintenanceIncrease: 3_500, sustainabilityBonus: 1, description: 'Convention-quality gathering spaces.' },
    ],
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    zone: 'student-life',
    cost: 180_000,
    capacity: 60,
    maintenance: 6_000,
    academicImpact: 0,
    satisfactionImpact: 7,
    staffRequirement: 5,
    sustainabilityImpact: -1,
    constructionTime: 2,
    description: 'Dining hall with diverse food options.',
    iconName: 'Utensils',
    upgradeLevels: [
      { level: 2, name: 'Modern Cafeteria', cost: 100_000, capacityBonus: 30, academicBonus: 0, satisfactionBonus: 3, maintenanceIncrease: 2_000, sustainabilityBonus: 1, description: 'Improved food quality and variety.' },
      { level: 3, name: 'Gourmet Dining Hall', cost: 180_000, capacityBonus: 30, academicBonus: 0, satisfactionBonus: 3, maintenanceIncrease: 3_000, sustainabilityBonus: 2, description: 'Restaurant-quality campus dining.' },
    ],
  },
  {
    id: 'sports-center',
    name: 'Sports Centre',
    zone: 'student-life',
    cost: 500_000,
    capacity: 70,
    maintenance: 14_000,
    academicImpact: 0,
    satisfactionImpact: 12,
    staffRequirement: 6,
    sustainabilityImpact: -2,
    constructionTime: 4,
    description: 'Gymnasium, pool, and athletic facilities.',
    iconName: 'Dumbbell',
    upgradeLevels: [
      { level: 2, name: 'Expanded Sports Centre', cost: 300_000, capacityBonus: 30, academicBonus: 0, satisfactionBonus: 4, maintenanceIncrease: 4_000, sustainabilityBonus: 0, description: 'Added courts and fitness studios.' },
      { level: 3, name: 'Olympic Sports Complex', cost: 500_000, capacityBonus: 30, academicBonus: 0, satisfactionBonus: 5, maintenanceIncrease: 6_000, sustainabilityBonus: 1, description: 'Competition-grade athletic facilities.' },
    ],
  },
  {
    id: 'residence-hall',
    name: 'Residence Hall',
    zone: 'student-life',
    cost: 380_000,
    capacity: 100,
    maintenance: 9_000,
    academicImpact: 1,
    satisfactionImpact: 8,
    staffRequirement: 4,
    sustainabilityImpact: -1,
    constructionTime: 3,
    description: 'On-campus student housing.',
    iconName: 'Building2',
    upgradeLevels: [
      { level: 2, name: 'Modern Residence Hall', cost: 200_000, capacityBonus: 50, academicBonus: 0, satisfactionBonus: 4, maintenanceIncrease: 3_000, sustainabilityBonus: 1, description: 'Updated rooms and common areas.' },
      { level: 3, name: 'Premium Residence Hall', cost: 350_000, capacityBonus: 50, academicBonus: 1, satisfactionBonus: 4, maintenanceIncrease: 4_000, sustainabilityBonus: 2, description: 'Apartment-style living with amenities.' },
    ],
  },
  // --- Administration Zone ---
  {
    id: 'admin-building',
    name: 'Administration Building',
    zone: 'administration',
    cost: 250_000,
    capacity: 40,
    maintenance: 6_000,
    academicImpact: 2,
    satisfactionImpact: 3,
    staffRequirement: 8,
    sustainabilityImpact: 0,
    constructionTime: 2,
    description: 'Central administration and operations offices.',
    iconName: 'Landmark',
    upgradeLevels: [
      { level: 2, name: 'Modern Administration Building', cost: 140_000, capacityBonus: 20, academicBonus: 1, satisfactionBonus: 2, maintenanceIncrease: 2_000, sustainabilityBonus: 1, description: 'Streamlined administrative services.' },
      { level: 3, name: 'Central Administration Complex', cost: 250_000, capacityBonus: 20, academicBonus: 1, satisfactionBonus: 2, maintenanceIncrease: 3_000, sustainabilityBonus: 1, description: 'Comprehensive administrative hub.' },
    ],
  },
  {
    id: 'faculty-office',
    name: 'Faculty Office',
    zone: 'administration',
    cost: 220_000,
    capacity: 50,
    maintenance: 5_500,
    academicImpact: 5,
    satisfactionImpact: 2,
    staffRequirement: 6,
    sustainabilityImpact: 0,
    constructionTime: 2,
    description: 'Office space for faculty and teaching staff.',
    iconName: 'Briefcase',
    upgradeLevels: [
      { level: 2, name: 'Modern Faculty Office', cost: 120_000, capacityBonus: 25, academicBonus: 3, satisfactionBonus: 1, maintenanceIncrease: 2_000, sustainabilityBonus: 0, description: 'Improved workspaces for faculty.' },
      { level: 3, name: 'Research Faculty Wing', cost: 200_000, capacityBonus: 25, academicBonus: 3, satisfactionBonus: 2, maintenanceIncrease: 3_000, sustainabilityBonus: 1, description: 'Faculty offices with research spaces.' },
    ],
  },
  {
    id: 'admissions-center',
    name: 'Admissions Centre',
    zone: 'administration',
    cost: 200_000,
    capacity: 30,
    maintenance: 5_000,
    academicImpact: 1,
    satisfactionImpact: 3,
    staffRequirement: 5,
    sustainabilityImpact: 0,
    constructionTime: 2,
    description: 'Admissions, recruitment, and enrollment services.',
    iconName: 'ClipboardCheck',
    upgradeLevels: [
      { level: 2, name: 'Modern Admissions Centre', cost: 110_000, capacityBonus: 15, academicBonus: 0, satisfactionBonus: 2, maintenanceIncrease: 1_500, sustainabilityBonus: 0, description: 'Digital-first admissions process.' },
      { level: 3, name: 'Premier Admissions Centre', cost: 190_000, capacityBonus: 15, academicBonus: 1, satisfactionBonus: 2, maintenanceIncrease: 2_500, sustainabilityBonus: 1, description: 'Comprehensive enrollment services.' },
    ],
  },
  // --- Infrastructure Zone ---
  {
    id: 'parking',
    name: 'Parking Structure',
    zone: 'infrastructure',
    cost: 150_000,
    capacity: 50,
    maintenance: 3_000,
    academicImpact: 0,
    satisfactionImpact: 3,
    staffRequirement: 2,
    sustainabilityImpact: -2,
    constructionTime: 2,
    description: 'Multi-level parking for students and staff.',
    iconName: 'Car',
    upgradeLevels: [
      { level: 2, name: 'Expanded Parking', cost: 80_000, capacityBonus: 30, academicBonus: 0, satisfactionBonus: 1, maintenanceIncrease: 1_000, sustainabilityBonus: 0, description: 'More parking spaces.' },
      { level: 3, name: 'Smart Parking Complex', cost: 140_000, capacityBonus: 30, academicBonus: 0, satisfactionBonus: 2, maintenanceIncrease: 2_000, sustainabilityBonus: 1, description: 'EV charging and smart guidance.' },
    ],
  },
  {
    id: 'transport-hub',
    name: 'Transport Hub',
    zone: 'infrastructure',
    cost: 280_000,
    capacity: 40,
    maintenance: 6_000,
    academicImpact: 0,
    satisfactionImpact: 4,
    staffRequirement: 3,
    sustainabilityImpact: 4,
    constructionTime: 3,
    description: 'Bus and shuttle terminal connecting campus.',
    iconName: 'Bus',
    upgradeLevels: [
      { level: 2, name: 'Expanded Transport Hub', cost: 150_000, capacityBonus: 20, academicBonus: 0, satisfactionBonus: 2, maintenanceIncrease: 2_000, sustainabilityBonus: 2, description: 'More routes and electric shuttles.' },
      { level: 3, name: 'Intermodal Transit Centre', cost: 260_000, capacityBonus: 20, academicBonus: 0, satisfactionBonus: 3, maintenanceIncrease: 3_000, sustainabilityBonus: 3, description: 'Full intermodal transit hub.' },
    ],
  },
  {
    id: 'power-facility',
    name: 'Power Facility',
    zone: 'infrastructure',
    cost: 320_000,
    capacity: 30,
    maintenance: 7_000,
    academicImpact: 0,
    satisfactionImpact: 1,
    staffRequirement: 3,
    sustainabilityImpact: -3,
    constructionTime: 3,
    description: 'On-campus power generation and distribution.',
    iconName: 'Zap',
    upgradeLevels: [
      { level: 2, name: 'Efficient Power Facility', cost: 170_000, capacityBonus: 15, academicBonus: 0, satisfactionBonus: 0, maintenanceIncrease: 1_500, sustainabilityBonus: 2, description: 'Higher efficiency, lower emissions.' },
      { level: 3, name: 'Green Power Plant', cost: 300_000, capacityBonus: 15, academicBonus: 0, satisfactionBonus: 1, maintenanceIncrease: 2_500, sustainabilityBonus: 4, description: 'Renewable energy integration.' },
    ],
  },
  {
    id: 'maintenance-center',
    name: 'Maintenance Centre',
    zone: 'infrastructure',
    cost: 170_000,
    capacity: 25,
    maintenance: 4_000,
    academicImpact: 0,
    satisfactionImpact: 2,
    staffRequirement: 6,
    sustainabilityImpact: 1,
    constructionTime: 2,
    description: 'Facilities maintenance and repair depot.',
    iconName: 'Wrench',
    upgradeLevels: [
      { level: 2, name: 'Modern Maintenance Centre', cost: 90_000, capacityBonus: 15, academicBonus: 0, satisfactionBonus: 1, maintenanceIncrease: 1_000, sustainabilityBonus: 1, description: 'Better tools and faster response.' },
      { level: 3, name: 'Advanced Maintenance Complex', cost: 160_000, capacityBonus: 15, academicBonus: 0, satisfactionBonus: 1, maintenanceIncrease: 2_000, sustainabilityBonus: 2, description: 'Preventive maintenance systems.' },
    ],
  },
];

// ============================================================
// SUSTAINABILITY UPGRADES
// ============================================================

export const SUSTAINABILITY_UPGRADES: SustainabilityUpgrade[] = [
  { id: 'solar-panels', name: 'Solar Panel Array', cost: 120_000, sustainabilityBoost: 8, maintenanceReduction: 2_000, description: 'Rooftop solar panels across campus buildings.', purchased: false, iconName: 'Sun' },
  { id: 'energy-efficient', name: 'Energy-Efficient Buildings', cost: 90_000, sustainabilityBoost: 6, maintenanceReduction: 1_500, description: 'LED lighting, smart HVAC, and insulation upgrades.', purchased: false, iconName: 'Lightbulb' },
  { id: 'recycling', name: 'Recycling Facilities', cost: 60_000, sustainabilityBoost: 5, maintenanceReduction: 0, description: 'Comprehensive recycling and composting program.', purchased: false, iconName: 'Recycle' },
  { id: 'green-transport', name: 'Green Transport Fleet', cost: 80_000, sustainabilityBoost: 5, maintenanceReduction: 500, description: 'Electric shuttle fleet and bike-sharing program.', purchased: false, iconName: 'Bike' },
  { id: 'rainwater', name: 'Rainwater Collection', cost: 50_000, sustainabilityBoost: 4, maintenanceReduction: 500, description: 'Rainwater harvesting for landscaping and plumbing.', purchased: false, iconName: 'CloudRain' },
  { id: 'green-roof', name: 'Green Roofs', cost: 100_000, sustainabilityBoost: 7, maintenanceReduction: 0, description: 'Living roofs on campus buildings for insulation and biodiversity.', purchased: false, iconName: 'Trees' },
];

// ============================================================
// RESEARCH AREAS
// ============================================================

export const RESEARCH_AREAS: ResearchArea[] = [
  { id: 'cs', name: 'Computer Science', level: 0, investment: 0 },
  { id: 'engineering', name: 'Engineering', level: 0, investment: 0 },
  { id: 'life-sciences', name: 'Life Sciences', level: 0, investment: 0 },
  { id: 'environmental', name: 'Environmental Studies', level: 0, investment: 0 },
];

export const RESEARCH_COSTS = [25_000, 50_000, 100_000, 200_000, 400_000];

// ============================================================
// EVENTS
// ============================================================

export const GAME_EVENTS: GameEvent[] = [
  {
    id: 'research-grant',
    title: 'Research Grant Opportunity',
    description: 'A faculty team has received recognition for a research proposal. The grant review board is offering matching funds if the university invests.',
    category: 'opportunity',
    minYear: 1,
    weight: 10,
    choices: [
      {
        label: 'Fund the Research',
        description: 'Cost: $50,000 | Academic Quality +6, Reputation +4',
        apply: (s) => ({ budget: s.budget - 50_000, academicQuality: Math.min(100, s.academicQuality + 6), reputation: Math.min(100, s.reputation + 4), eventMessage: 'Funded research — academic quality and reputation improved.' }),
      },
      {
        label: 'Decline',
        description: 'No cost. No benefit.',
        apply: () => ({ eventMessage: 'Declined the research grant opportunity.' }),
      },
    ],
  },
  {
    id: 'housing-shortage',
    title: 'Housing Shortage',
    description: 'Enrollment has increased faster than housing capacity. Students are struggling to find on-campus housing.',
    category: 'crisis',
    minYear: 1,
    weight: 8,
    condition: (s) => s.students > s.housingCapacity * 0.9,
    choices: [
      {
        label: 'Build Temporary Housing',
        description: 'Cost: $120,000 | Housing capacity +50, Satisfaction +3',
        apply: (s) => ({ budget: s.budget - 120_000, housingCapacity: s.housingCapacity + 50, satisfaction: Math.min(100, s.satisfaction + 3), eventMessage: 'Built temporary housing — relief for students.' }),
      },
      {
        label: 'Accept the Shortage',
        description: 'No cost. Satisfaction -8, Reputation -2',
        apply: (s) => ({ satisfaction: Math.max(0, s.satisfaction - 8), reputation: Math.max(0, s.reputation - 2), eventMessage: 'Housing shortage unresolved — students are unhappy.' }),
      },
    ],
  },
  {
    id: 'student-festival',
    title: 'Student Festival Proposal',
    description: 'The student union proposes a campus festival with music, food, and activities. It could boost morale but requires funding.',
    category: 'student',
    minYear: 1,
    weight: 9,
    choices: [
      {
        label: 'Fund the Festival',
        description: 'Cost: $25,000 | Satisfaction +5, Reputation +2',
        apply: (s) => ({ budget: s.budget - 25_000, satisfaction: Math.min(100, s.satisfaction + 5), reputation: Math.min(100, s.reputation + 2), eventMessage: 'Campus festival was a great success!' }),
      },
      {
        label: 'Decline',
        description: 'No cost. Satisfaction -2',
        apply: (s) => ({ satisfaction: Math.max(0, s.satisfaction - 2), eventMessage: 'Festival denied — students are disappointed.' }),
      },
    ],
  },
  {
    id: 'donation',
    title: 'Alumni Donation',
    description: 'A successful alumnus offers a generous donation to the university.',
    category: 'financial',
    minYear: 2,
    weight: 7,
    condition: (s) => s.reputation >= 45,
    choices: [
      {
        label: 'Accept Donation',
        description: 'Budget +$150,000, Reputation +1',
        apply: (s) => ({ budget: s.budget + 150_000, reputation: Math.min(100, s.reputation + 1), eventMessage: 'Received a $150,000 alumni donation!' }),
      },
      {
        label: 'Accept with Public Recognition',
        description: 'Budget +$150,000, Reputation +3, Satisfaction +2',
        apply: (s) => ({ budget: s.budget + 150_000, reputation: Math.min(100, s.reputation + 3), satisfaction: Math.min(100, s.satisfaction + 2), eventMessage: 'Donation celebrated publicly — boosted campus morale.' }),
      },
    ],
  },
  {
    id: 'faculty-award',
    title: 'Faculty Award Nomination',
    description: 'A senior faculty member has been nominated for a prestigious national teaching award.',
    category: 'academic',
    minYear: 1,
    weight: 6,
    choices: [
      {
        label: 'Support the Nomination',
        description: 'Cost: $15,000 | Academic Quality +3, Reputation +3',
        apply: (s) => ({ budget: s.budget - 15_000, academicQuality: Math.min(100, s.academicQuality + 3), reputation: Math.min(100, s.reputation + 3), eventMessage: 'Faculty member won the award — prestige increased.' }),
      },
      {
        label: 'Skip It',
        description: 'No cost. No benefit.',
        apply: () => ({ eventMessage: 'Did not pursue the award nomination.' }),
      },
    ],
  },
  {
    id: 'infrastructure-failure',
    title: 'Infrastructure Failure',
    description: 'Aging infrastructure has caused a partial power outage in the science building.',
    category: 'crisis',
    minYear: 2,
    weight: 6,
    condition: (s) => s.buildings.some((b) => b.condition < 60),
    choices: [
      {
        label: 'Emergency Repairs',
        description: 'Cost: $40,000 | Restores building condition',
        apply: (s) => {
          const buildings = s.buildings.map((b) => (b.condition < 60 ? { ...b, condition: 85 } : b));
          return { budget: s.budget - 40_000, buildings, eventMessage: 'Emergency repairs completed — power restored.' };
        },
      },
      {
        label: 'Ignore It',
        description: 'No cost. Satisfaction -5, Academic Quality -3',
        apply: (s) => ({ satisfaction: Math.max(0, s.satisfaction - 5), academicQuality: Math.max(0, s.academicQuality - 3), eventMessage: 'Outage ignored — classes disrupted.' }),
      },
    ],
  },
  {
    id: 'enrollment-surge',
    title: 'Enrollment Surge',
    description: 'An unexpected surge in applications has arrived! The admissions office needs guidance on how many to accept.',
    category: 'opportunity',
    minYear: 1,
    weight: 8,
    condition: (s) => s.reputation >= 50,
    choices: [
      {
        label: 'Accept More Students',
        description: 'Students +80, Budget +$200,000 (tuition), but Satisfaction -3 if over capacity',
        apply: (s) => {
          const newStudents = Math.min(80, s.studentCapacity - s.students);
          const overCapacity = s.students + newStudents > s.studentCapacity;
          return {
            students: s.students + newStudents,
            budget: s.budget + newStudents * 2_500,
            satisfaction: overCapacity ? Math.max(0, s.satisfaction - 3) : s.satisfaction,
            eventMessage: `Enrolled ${newStudents} new students — tuition revenue increased.`,
          };
        },
      },
      {
        label: 'Maintain Current Numbers',
        description: 'No change. Reputation +1 for selectivity.',
        apply: (s) => ({ reputation: Math.min(100, s.reputation + 1), eventMessage: 'Maintained enrollment standards — reputation improved.' }),
      },
    ],
  },
  {
    id: 'sustainability-audit',
    title: 'Sustainability Audit',
    description: 'A regional environmental body offers to audit the campus. Passing could unlock green certifications.',
    category: 'opportunity',
    minYear: 2,
    weight: 5,
    choices: [
      {
        label: 'Host the Audit',
        description: 'Cost: $20,000 | If Sustainability ≥ 50: +6 Sustainability, +3 Reputation',
        apply: (s) => {
          if (s.sustainability >= 50) {
            return { budget: s.budget - 20_000, sustainability: Math.min(100, s.sustainability + 6), reputation: Math.min(100, s.reputation + 3), eventMessage: 'Passed the audit — green certification earned!' };
          }
          return { budget: s.budget - 20_000, eventMessage: 'Failed the audit — sustainability too low.' };
        },
      },
      {
        label: 'Decline',
        description: 'No cost. No benefit.',
        apply: () => ({ eventMessage: 'Declined the sustainability audit.' }),
      },
    ],
  },
  {
    id: 'budget-cut',
    title: 'State Budget Cut',
    description: 'The state has announced a reduction in higher education funding. The university will lose some grant income.',
    category: 'financial',
    minYear: 2,
    weight: 5,
    choices: [
      {
        label: 'Absorb the Loss',
        description: 'Budget -$80,000. No other immediate effect.',
        apply: (s) => ({ budget: s.budget - 80_000, eventMessage: 'Absorbed the budget cut — finances strained.' }),
      },
      {
        label: 'Raise Tuition 5%',
        description: 'Tuition +5%. Budget unaffected, Satisfaction -4',
        apply: (s) => ({ tuition: Math.round(s.tuition * 1.05), satisfaction: Math.max(0, s.satisfaction - 4), eventMessage: 'Raised tuition to offset the cut — students unhappy.' }),
      },
    ],
  },
  {
    id: 'student-protest',
    title: 'Student Protest',
    description: 'Students are organizing a protest over rising tuition and inadequate campus services.',
    category: 'student',
    minYear: 2,
    weight: 6,
    condition: (s) => s.satisfaction < 60,
    choices: [
      {
        label: 'Invest in Student Services',
        description: 'Cost: $35,000 | Satisfaction +8, Reputation +1',
        apply: (s) => ({ budget: s.budget - 35_000, satisfaction: Math.min(100, s.satisfaction + 8), reputation: Math.min(100, s.reputation + 1), eventMessage: 'Invested in student services — protest resolved.' }),
      },
      {
        label: 'Ignore the Protest',
        description: 'No cost. Satisfaction -6, Reputation -3',
        apply: (s) => ({ satisfaction: Math.max(0, s.satisfaction - 6), reputation: Math.max(0, s.reputation - 3), eventMessage: 'Protest ignored — reputation damaged.' }),
      },
    ],
  },
  {
    id: 'tech-conference',
    title: 'Tech Conference Opportunity',
    description: 'A major tech company wants to host a conference on campus, bringing visibility and networking.',
    category: 'opportunity',
    minYear: 2,
    weight: 5,
    choices: [
      {
        label: 'Host the Conference',
        description: 'Cost: $30,000 | Reputation +5, Academic Quality +2, Budget +$50,000',
        apply: (s) => ({ budget: s.budget - 30_000 + 50_000, reputation: Math.min(100, s.reputation + 5), academicQuality: Math.min(100, s.academicQuality + 2), eventMessage: 'Conference was a success — reputation and finances improved.' }),
      },
      {
        label: 'Decline',
        description: 'No cost. No benefit.',
        apply: () => ({ eventMessage: 'Declined the conference opportunity.' }),
      },
    ],
  },
  {
    id: 'outbreak',
    title: 'Campus Health Alert',
    description: 'A flu outbreak is spreading through the residence halls. Quick action could contain it.',
    category: 'crisis',
    minYear: 1,
    weight: 4,
    choices: [
      {
        label: 'Fund Health Response',
        description: 'Cost: $25,000 | Satisfaction +2, prevents larger issues',
        apply: (s) => ({ budget: s.budget - 25_000, satisfaction: Math.min(100, s.satisfaction + 2), eventMessage: 'Health response funded — outbreak contained.' }),
      },
      {
        label: 'Let It Run Its Course',
        description: 'No cost. Satisfaction -7, Students -20',
        apply: (s) => ({ satisfaction: Math.max(0, s.satisfaction - 7), students: Math.max(0, s.students - 20), eventMessage: 'Outbreak spread — students left campus.' }),
      },
    ],
  },
];
