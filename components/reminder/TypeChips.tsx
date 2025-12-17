// components/TypeChips.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { ChipType } from '@/app/types/types';
import { COLORS, GRADIENTS, TYPE_CHIPS } from '@/constants/constants';

interface TypeChipsProps {
  selected: ChipType | null;
  onSelect: (type: ChipType | null) => void;
}

const TypeChips: React.FC<TypeChipsProps> = ({ selected, onSelect }) => (
  <View style={chipStyles.typeSection}>
    <Text style={chipStyles.typeHeader}>Categories</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={chipStyles.typeScrollContent}>
      {TYPE_CHIPS.map((chip, index) => {
        const isSelected = chip.name === selected;
        return (
          <MotiView
            key={chip.name}
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 100, type: 'spring' }}
          >
            <TouchableOpacity
              onPress={() => onSelect(isSelected ? null : chip.name)}
            >
              <LinearGradient
                colors={isSelected ? GRADIENTS.whiteToGray : chip.gradient}
                style={[
                  chipStyles.typeChip,
                  isSelected && chipStyles.typeChipSelected,
                ]}
              >
                <Ionicons
                  name={chip.icon}
                  size={20}
                  color={isSelected ? chip.color : '#fff'}
                />
                <Text
                  style={[
                    chipStyles.typeChipText,
                    isSelected && chipStyles.typeChipTextSelected,
                  ]}
                >
                  {chip.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>
        );
      })}
    </ScrollView>
  </View>
);

const chipStyles = StyleSheet.create({
  typeSection: {
    marginVertical: 15,
  },
  typeHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  typeScrollContent: {
    paddingHorizontal: 20,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 100,
  },
  typeChipSelected: {
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  typeChipText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  typeChipTextSelected: {
    color: COLORS.textPrimary,
  },
});

export default TypeChips;