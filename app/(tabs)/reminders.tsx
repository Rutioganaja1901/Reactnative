// reminders.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Import components


// Import types and constants

import FilterChips from '@/components/reminder/FilterChips';
import NoRemindersCard from '@/components/reminder/NoRemindersCard';
import ReminderItem from '@/components/reminder/ReminderItem';
import RemindersHeader from '@/components/reminder/RemindersHeader';
import TypeChips from '@/components/reminder/TypeChips';
import { COLORS, DUMMY_REMINDERS, GRADIENTS } from '@/constants/constants';
import { ChipStatus, ChipType } from '@/types/types';

export default function RemindersScreen() {
  const [filterStatus, setFilterStatus] = useState<ChipStatus>('All');
  const [filterType, setFilterType] = useState<ChipType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering Logic
  const filteredReminders = DUMMY_REMINDERS.filter((reminder) => {
    const statusMatch = filterStatus === 'All' || reminder.status === filterStatus;
    const typeMatch = filterType === null || reminder.type === filterType;
    const searchMatch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && typeMatch && searchMatch;
  });

  return (
    <View style={styles.screenContainer}>
      {/* Enhanced Header with gradient */}
      <RemindersHeader onSearch={setSearchTerm} />

      {/* Main content */}
      <ScrollView 
        style={styles.contentScroll} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Chips with counts */}
        <FilterChips selected={filterStatus} onSelect={setFilterStatus} />

        {/* Category Chips */}
        <TypeChips selected={filterType} onSelect={setFilterType} />

        {/* Reminders Section Header */}
        <View style={listStyles.sectionHeader}>
          <Text style={listStyles.sectionTitle}>Your Reminders</Text>
          <Text style={listStyles.sectionCount}>{filteredReminders.length} items</Text>
        </View>

        {/* Reminders List or Empty State */}
        {filteredReminders.length > 0 ? (
          <View style={listStyles.remindersList}> 
            {filteredReminders.map((reminder) => (
              <ReminderItem key={reminder.id} reminder={reminder} />
            ))}
          </View>
        ) : (
          <NoRemindersCard />
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', delay: 500 }}
        style={styles.fab}
      >
        <TouchableOpacity style={styles.fabButton}>
          <LinearGradient
            colors={GRADIENTS.primary}
            style={styles.fabGradient}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const listStyles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  sectionCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
    backgroundColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  remindersList: {
    paddingHorizontal: 15,
  },
});