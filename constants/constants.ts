// constants.ts
import { Reminder, GradientColors } from '@/app/types/types';

// --- Color Palette ---
export const COLORS = {
  primary: '#6366F1',
  primaryLight: '#8B5CF6',
  secondary: '#06B6D4',
  accent: '#F59E0B',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  border: '#E2E8F0',
};

// --- Gradients ---
export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.primaryLight] as GradientColors,
  whiteToGray: ['#FFFFFF', '#F8FAFC'] as GradientColors,
  profile: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'] as GradientColors,
  background: ['#F8FAFC', '#F1F5F9'] as GradientColors,
  bills: ['#EF4444', '#DC2626'] as GradientColors,
  appointments: ['#06B6D4', '#0891B2'] as GradientColors,
  travel: ['#6366F1', '#4F46E5'] as GradientColors,
  payments: ['#10B981', '#059669'] as GradientColors,
  events: ['#F59E0B', '#D97706'] as GradientColors,
  tasks: ['#8B5CF6', '#7C3AED'] as GradientColors,
};

// --- Dummy Data ---
export const DUMMY_REMINDERS: Reminder[] = [
  { id: '1', title: 'Pay Credit Card Bill', status: 'Pending', type: 'Payments', date: 'Today', time: '18:00' },
  { id: '2', title: 'Dental Check-up', status: 'Pending', type: 'Appointments', date: 'Tomorrow', time: '10:30' },
  { id: '3', title: 'Book Flight to Paris', status: 'Completed', type: 'Travel', date: 'Completed', time: '14:20' },
  { id: '4', title: 'Finish Project Report', status: 'Pending', type: 'Tasks', date: 'Today', time: '23:59' },
  { id: '5', title: 'Send Invitation Cards', status: 'Overdue', type: 'Events', date: 'Yesterday', time: '16:00' },
  { id: '6', title: 'Car Maintenance', status: 'Completed', type: 'Appointments', date: 'Completed', time: '09:15' },
];

// --- Filter Chips Data ---
export const FILTER_CHIPS = [
  { name: 'All' as const, icon: 'apps' as const, count: 6 },
  { name: 'Pending' as const, icon: 'time' as const, count: 3 },
  { name: 'Completed' as const, icon: 'checkmark-done' as const, count: 2 },
  { name: 'Overdue' as const, icon: 'alert-circle' as const, count: 1 },
];

// --- Type Chips Data ---
export const TYPE_CHIPS = [
  { name: 'Bills' as const, icon: 'card' as const, color: COLORS.error, gradient: GRADIENTS.bills },
  { name: 'Appointments' as const, icon: 'calendar' as const, color: COLORS.secondary, gradient: GRADIENTS.appointments },
  { name: 'Travel' as const, icon: 'airplane' as const, color: COLORS.primary, gradient: GRADIENTS.travel },
  { name: 'Payments' as const, icon: 'cash' as const, color: COLORS.success, gradient: GRADIENTS.payments },
  { name: 'Events' as const, icon: 'gift' as const, color: COLORS.accent, gradient: GRADIENTS.events },
  { name: 'Tasks' as const, icon: 'checkbox' as const, color: '#8B5CF6', gradient: GRADIENTS.tasks },
];