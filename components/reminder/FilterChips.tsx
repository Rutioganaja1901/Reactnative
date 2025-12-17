// components/FilterChips.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { ChipStatus } from '@/app/types/types';
import { COLORS, GRADIENTS, FILTER_CHIPS } from '@/constants/constants';

interface FilterChipsProps {
  selected: ChipStatus;
  onSelect: (status: ChipStatus) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ selected, onSelect }) => (
  <View style={chipStyles.filterSection}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={chipStyles.filterScrollContent}>
      {FILTER_CHIPS.map((chip, index) => {
        const isSelected = chip.name === selected;
        return (
          <MotiView
            key={chip.name}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 100 }}
          >
            <TouchableOpacity
              style={[
                chipStyles.filterChip,
                isSelected ? chipStyles.filterChipSelected : chipStyles.filterChipNormal,
              ]}
              onPress={() => onSelect(chip.name)}
            >
              <LinearGradient
                colors={isSelected ? GRADIENTS.primary : GRADIENTS.whiteToGray}
                style={chipStyles.chipGradient}
              >
                <View style={chipStyles.chipContent}>
                  <Ionicons
                    name={chip.icon}
                    size={18}
                    color={isSelected ? '#fff' : COLORS.primary}
                  />
                  <View style={chipStyles.chipTextContainer}>
                    <Text
                      style={[
                        chipStyles.chipText,
                        isSelected ? chipStyles.chipTextSelected : chipStyles.chipTextNormal,
                      ]}
                    >
                      {chip.name}
                    </Text>
                    <Text
                      style={[
                        chipStyles.chipCount,
                        isSelected ? chipStyles.chipCountSelected : chipStyles.chipCountNormal,
                      ]}
                    >
                      {chip.count}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>
        );
      })}
    </ScrollView>
  </View>
);

const chipStyles = StyleSheet.create({
  filterSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  filterScrollContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  filterChipNormal: {
    backgroundColor: '#fff',
  },
  filterChipSelected: {
    backgroundColor: COLORS.primary,
  },
  chipGradient: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 120,
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipTextContainer: {
    marginLeft: 8,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  chipTextNormal: {
    color: COLORS.textPrimary,
  },
  chipTextSelected: {
    color: '#fff',
  },
  chipCount: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
  chipCountNormal: {
    color: COLORS.textSecondary,
  },
  chipCountSelected: {
    color: 'rgba(255,255,255,0.9)',
  },
});

export default FilterChips; // Make sure this export exists