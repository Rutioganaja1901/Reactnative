// app/(tabs)/data/home-data.ts
export const CATEGORIES = [
  { id: '1', title: 'OTP Messages', subtitle: 'One-time passwords', type: 'OTP' },
  { id: '2', title: 'Bank Alerts', subtitle: 'Financial notifications', type: 'Finance' },
  { id: '3', title: 'Shopping Updates', subtitle: 'E-commerce notifications', type: 'Shopping' },
  { id: '4', title: 'Social Media', subtitle: 'Social updates', type: 'Others' },
];

export const HEADER_CHIPS = [
  { id: 'all', label: 'All' },
  { id: 'otp', label: 'OTP' },
  { id: 'finance', label: 'Finance' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'others', label: 'Others' },
];

export const SAMPLE_QUICK_ACTIONS = [
  { id: '1', title: 'Scan', description: 'Scan messages', icon: 'scan' },
  { id: '2', title: 'Filter', description: 'Filter content', icon: 'filter' },
  { id: '3', title: 'Export', description: 'Export data', icon: 'download' },
];