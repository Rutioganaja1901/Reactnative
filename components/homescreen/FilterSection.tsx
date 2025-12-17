// app/(tabs)/components/FilterSection.tsx
import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';

interface FilterSectionProps {
  chips: any[];
  activeChip: string;
  onChipSelect: (chipId: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  chips = [], 
  activeChip, 
  onChipSelect 
}) => {
  const defaultChips = [
    { id: 'all', label: 'All' },
    { id: 'otp', label: 'OTP' },
    { id: 'finance', label: 'Finance' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'others', label: 'Others' },
  ];

  const chipData = chips.length > 0 ? chips : defaultChips;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Filter Categories</ThemedText>
        <ThemedText style={styles.sectionHint}>Tap to filter</ThemedText>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        {chipData.map((chip) => (
          <Pressable
            key={chip.id}
            style={[
              styles.chip,
              activeChip === chip.id && styles.chipActive
            ]}
            onPress={() => onChipSelect(chip.id)}
          >
            <ThemedText style={[
              styles.chipText,
              activeChip === chip.id && styles.chipTextActive
            ]}>
              {chip.label}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  chipsRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  chipText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
  },
});

export default FilterSection;