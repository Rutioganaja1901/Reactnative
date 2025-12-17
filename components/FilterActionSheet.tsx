import React from 'react';
import { 
  Modal, 
  Pressable, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  StyleProp,
  ViewStyle 
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

const { height: screenHeight } = Dimensions.get('window');

// --- Generic Types for Reusability ---
export type FilterTypeBase = string;

export interface FilterOption<T extends FilterTypeBase> {
  id: T;
  label: string;
  count?: number;
  icon: string;
  color: string;
}

export interface FilterActionSheetProps<T extends FilterTypeBase> {
  isVisible: boolean;
  onClose: () => void;
  options: FilterOption<T>[];
  onSelect: (id: T) => void;
  activeFilter?: T;
  title?: string;
  theme?: 'light' | 'dark';
  showCancel?: boolean;
  cancelText?: string;
  primaryColor?: string;
}

// --- Main Filter Action Sheet Component ---
export function FilterActionSheet<T extends FilterTypeBase>({
  isVisible,
  onClose,
  options,
  onSelect,
  activeFilter,
  title = "Filter Options",
  theme = 'light',
  showCancel = true,
  cancelText = "Cancel",
  primaryColor = '#007AFF'
}: FilterActionSheetProps<T>) {
  
  const handleSelect = (id: T) => {
    onSelect(id);
    onClose();
  };

  const themeColors = Colors[theme];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />
      
      {/* Action Sheet Container */}
      <View style={styles.container}>
        <ThemedView style={styles.sheet}>
          {/* Grabber/Handle */}
          <View style={styles.grabber} />
          
          {/* Title */}
          <ThemedText style={styles.title}>{title}</ThemedText>
          
          {/* Options Container */}
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id as string}
                style={[
                  styles.optionRow,
                  activeFilter === option.id && styles.selectedRow
                ]}
                onPress={() => handleSelect(option.id)}
              >
                {/* Icon with background */}
                <View style={[
                  styles.iconWrapper, 
                  { backgroundColor: option.color + '20' }
                ]}>
                  <IconSymbol
                    name={option.icon as any}
                    size={20}
                    color={option.color}
                  />
                </View>
                
                {/* Label */}
                <ThemedText style={styles.optionText}>
                  {option.label}
                  {option.count !== undefined && ` (${option.count})`}
                </ThemedText>
                
                {/* Active Checkmark */}
                {activeFilter === option.id && (
                  <IconSymbol
                    name="checkmark"
                    size={20}
                    color={themeColors?.tint || primaryColor}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Cancel Button */}
          {showCancel && (
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <ThemedText style={[styles.cancelText, { color: primaryColor }]}>
                {cancelText}
              </ThemedText>
            </Pressable>
          )}
        </ThemedView>
      </View>
    </Modal>
  );
}

// --- Alternative Compact Version ---
export interface CompactFilterSheetProps<T extends FilterTypeBase> {
  isVisible: boolean;
  onClose: () => void;
  options: Array<{ id: T; label: string; icon: string; color: string }>;
  onSelect: (id: T) => void;
  activeFilter?: T;
}

export function CompactFilterSheet<T extends FilterTypeBase>({
  isVisible,
  onClose,
  options,
  onSelect,
  activeFilter
}: CompactFilterSheetProps<T>) {
  
  const handleSelect = (id: T) => {
    onSelect(id);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={compactStyles.backdrop} onPress={onClose}>
        <View style={compactStyles.popover}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id as string}
              style={[
                compactStyles.optionItem,
                activeFilter === option.id && compactStyles.selectedItem
              ]}
              onPress={() => handleSelect(option.id)}
            >
              <IconSymbol name={option.icon as any} size={24} color={option.color} />
              <ThemedText style={compactStyles.optionLabel}>
                {option.label}
              </ThemedText>
              {activeFilter === option.id && (
                <IconSymbol name="checkmark" size={20} color={option.color} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    minHeight: screenHeight * 0.3,
  },
  grabber: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#D1D1D6',
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5EA',
  },
  selectedRow: {
    backgroundColor: '#F8F9FA',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 17,
    fontWeight: '600',
  },
});

// --- Compact Version Styles ---
const compactStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  popover: {
    position: 'absolute',
    top: 100, // Fixed position or calculate from prop
    right: 20,
    backgroundColor: '#2A2A2E',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#444444',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selectedItem: {
    backgroundColor: '#404040',
  },
  optionLabel: {
    fontSize: 16,
    color: '#E0E0E0',
    marginLeft: 10,
    flex: 1,
    fontWeight: '500',
  },
});

export default FilterActionSheet;
