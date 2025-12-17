// components/NoRemindersCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS } from '@/constants/constants';


const NoRemindersCard: React.FC = () => (
  <MotiView
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    style={listStyles.noRemindersCard}
  >
    <LinearGradient
      colors={GRADIENTS.background}
      style={listStyles.noRemindersGradient}
    >
      <View style={listStyles.noRemindersIcon}>
        <Ionicons name="checkmark-done-circle" size={80} color={COLORS.primary} />
      </View>
      <Text style={listStyles.noRemindersText}>
        All Caught Up!
      </Text>
      <Text style={listStyles.noRemindersSubText}>
        You're all done for now. Enjoy your free time!
      </Text>
      <TouchableOpacity style={listStyles.addReminderButton}>
        <LinearGradient
          colors={GRADIENTS.primary}
          style={listStyles.addButtonGradient}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={listStyles.addReminderText}>Add New Reminder</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  </MotiView>
);

const listStyles = StyleSheet.create({
  noRemindersCard: {
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    overflow: 'hidden',
  },
  noRemindersGradient: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRemindersIcon: {
    marginBottom: 20,
  },
  noRemindersText: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  noRemindersSubText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  addReminderButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  addReminderText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default NoRemindersCard;