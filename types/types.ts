// types/types.ts
export type ChipStatus = 'All' | 'Pending' | 'Completed' | 'Overdue';
export type ChipType = 'Bills' | 'Appointments' | 'Travel' | 'Payments' | 'Events' | 'Tasks';

export interface Reminder {
  id: string;
  title: string;
  status: ChipStatus;
  type: ChipType;
  date?: string;
  time?: string;
}

export type GradientColors = [string, string, ...string[]];


