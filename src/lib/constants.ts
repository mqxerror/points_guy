import { Program } from '@/types';

export const PROGRAMS: Program[] = [
  {
    slug: 'portugal',
    name: 'Portugal Golden Visa',
    tagline: 'European residency through luxury hospitality investment',
    heroImage: '/images/portugal/hero.jpg',
    description:
      "Gain EU residency through Portugal's Golden Visa program by investing in Mercan's regulated hospitality fund. Enjoy visa-free travel across the Schengen Area, a path to citizenship after 5 years, and a buyback guarantee after 6 years.",
    benefits: [
      {
        title: 'EU Residency',
        description: 'Live, work, and study anywhere in the European Union with Portuguese residency.',
        icon: 'Globe',
      },
      {
        title: 'Regulated Fund Investment',
        description: "Invest in Mercan's CMVM-regulated hospitality fund — professionally managed, fully compliant.",
        icon: 'Shield',
      },
      {
        title: 'Buyback Guarantee',
        description: 'Your investment is protected with a buyback guarantee after 6 years.',
        icon: 'BadgeCheck',
      },
      {
        title: 'Minimal Stay Requirement',
        description: 'Only 7 days per year average stay required to maintain residency.',
        icon: 'Calendar',
      },
    ],
    investmentDetails: [
      { label: 'Minimum Investment', value: '€500,000' },
      { label: 'Investment Type', value: 'Regulated Hospitality Fund' },
      { label: 'Residency Timeline', value: '18-24 months (total process)' },
      { label: 'Path to Citizenship', value: '5 years' },
      { label: 'Buyback Guarantee', value: 'After 6 years' },
      { label: 'Minimum Stay', value: '7 days/year average' },
    ],
    lifestyleDescription:
      "Portugal offers world-class cuisine, stunning coastlines, a thriving tech scene, and one of the safest countries in the world. From Lisbon's vibrant neighborhoods to the Algarve's golden beaches, Portugal is where European culture meets modern living.",
  },
  {
    slug: 'greece',
    name: 'Greece Golden Visa',
    tagline: 'Mediterranean living through prime real estate investment',
    heroImage: '/images/greece/hero.jpg',
    description:
      "Secure EU residency through Greece's Golden Visa program with a direct real estate investment. Enjoy one of Europe's most affordable entry points, stunning Mediterranean lifestyle, and access to the entire Schengen Area.",
    benefits: [
      {
        title: 'Direct Property Ownership',
        description: 'Own premium real estate in Greece — from Athens apartments to island villas.',
        icon: 'Home',
      },
      {
        title: 'Schengen Access',
        description: 'Travel freely across 27 Schengen countries with Greek residency.',
        icon: 'Plane',
      },
      {
        title: 'Rental Income Potential',
        description: "Greece's booming tourism market offers strong rental yield opportunities.",
        icon: 'TrendingUp',
      },
      {
        title: 'Family Inclusion',
        description: 'Include your spouse, children, and parents in a single application.',
        icon: 'Users',
      },
    ],
    investmentDetails: [
      { label: 'Minimum Investment', value: '€250,000' },
      { label: 'Investment Type', value: 'Real Estate Purchase' },
      { label: 'Residency Timeline', value: '3-6 months' },
      { label: 'Renewal', value: 'Every 5 years' },
      { label: 'Family Coverage', value: 'Spouse, children, parents' },
      { label: 'Minimum Stay', value: 'No requirement' },
    ],
    lifestyleDescription:
      'Greece offers an unparalleled Mediterranean lifestyle — ancient history, crystal-clear waters, world-renowned cuisine, and warm hospitality. Whether you prefer the cosmopolitan energy of Athens or the tranquility of the islands, Greece is a timeless destination.',
  },
  {
    slug: 'panama',
    name: 'Panama Qualified Investor Visa',
    tagline: 'Americas hub with fast-track residency through investment',
    heroImage: '/images/panama/hero.jpg',
    description:
      'Obtain permanent residency in Panama through the Qualified Investor Visa program. Panama offers a strategic location, territorial tax system, US dollar economy, and one of the fastest residency timelines in the Americas.',
    benefits: [
      {
        title: 'Permanent Residency',
        description: 'Get permanent residency from day one — no temporary status required.',
        icon: 'Award',
      },
      {
        title: 'Territorial Tax System',
        description: 'Panama only taxes locally sourced income — foreign income is tax-free.',
        icon: 'DollarSign',
      },
      {
        title: 'US Dollar Economy',
        description: 'Panama uses the US dollar, eliminating currency exchange risk.',
        icon: 'Banknote',
      },
      {
        title: 'Strategic Location',
        description: 'Hub of the Americas — direct flights to North and South America, Europe, and Asia.',
        icon: 'MapPin',
      },
    ],
    investmentDetails: [
      { label: 'Minimum Investment', value: '$300,000' },
      { label: 'Investment Type', value: 'Real Estate or Business' },
      { label: 'Residency Timeline', value: '30-60 days' },
      { label: 'Residency Type', value: 'Permanent from day one' },
      { label: 'Tax System', value: 'Territorial (foreign income tax-free)' },
      { label: 'Currency', value: 'US Dollar' },
    ],
    lifestyleDescription:
      "Panama combines tropical living with modern infrastructure. Panama City's skyline rivals Miami, while beaches, rainforests, and mountain towns are just hours away. A thriving expat community, excellent healthcare, and year-round warm weather make Panama an ideal base.",
  },
];

export const NATIONALITIES = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Argentine',
  'Armenian', 'Australian', 'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini',
  'Bangladeshi', 'Barbadian', 'Belarusian', 'Belgian', 'Belizean', 'Beninese',
  'Bhutanese', 'Bolivian', 'Bosnian', 'Brazilian', 'British', 'Bruneian',
  'Bulgarian', 'Burkinabe', 'Burmese', 'Burundian', 'Cambodian', 'Cameroonian',
  'Canadian', 'Central African', 'Chadian', 'Chilean', 'Chinese', 'Colombian',
  'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech', 'Danish',
  'Djiboutian', 'Dominican', 'Dutch', 'Ecuadorian', 'Egyptian', 'Emirati',
  'Equatorial Guinean', 'Eritrean', 'Estonian', 'Ethiopian', 'Fijian', 'Filipino',
  'Finnish', 'French', 'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian',
  'Greek', 'Grenadian', 'Guatemalan', 'Guinean', 'Guyanese', 'Haitian', 'Honduran',
  'Hungarian', 'Icelandic', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish',
  'Israeli', 'Italian', 'Ivorian', 'Jamaican', 'Japanese', 'Jordanian', 'Kazakh',
  'Kenyan', 'Kuwaiti', 'Kyrgyz', 'Lao', 'Latvian', 'Lebanese', 'Liberian',
  'Libyan', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malagasy', 'Malawian',
  'Malaysian', 'Maldivian', 'Malian', 'Maltese', 'Mauritanian', 'Mauritian',
  'Mexican', 'Moldovan', 'Mongolian', 'Montenegrin', 'Moroccan', 'Mozambican',
  'Namibian', 'Nepalese', 'New Zealander', 'Nicaraguan', 'Nigerian', 'Norwegian',
  'Omani', 'Pakistani', 'Palestinian', 'Panamanian', 'Paraguayan', 'Peruvian',
  'Polish', 'Portuguese', 'Qatari', 'Romanian', 'Russian', 'Rwandan', 'Saudi',
  'Senegalese', 'Serbian', 'Sierra Leonean', 'Singaporean', 'Slovak', 'Slovenian',
  'Somali', 'South African', 'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese',
  'Surinamese', 'Swedish', 'Swiss', 'Syrian', 'Taiwanese', 'Tajik', 'Tanzanian',
  'Thai', 'Togolese', 'Trinidadian', 'Tunisian', 'Turkish', 'Turkmen', 'Ugandan',
  'Ukrainian', 'Uruguayan', 'Uzbek', 'Venezuelan', 'Vietnamese', 'Yemeni',
  'Zambian', 'Zimbabwean',
];

export const TIMELINES = [
  { value: 'immediately', label: 'As soon as possible' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-12-months', label: '6-12 months' },
  { value: '12-plus-months', label: '12+ months' },
  { value: 'just-exploring', label: 'Just exploring options' },
];
