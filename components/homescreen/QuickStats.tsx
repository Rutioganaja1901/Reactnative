// app/(tabs)/components/QuickStats.tsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

const QuickStats: React.FC = () => {
  // Using valid Ionicons names and proper gradient color types
  const stats = [
    { 
      icon: 'shield-checkmark' as const, 
      number: '12', 
      label: 'OTP', 
      colors: ['#E0E7FF', '#C7D2FE'] as [string, string], 
      iconColor: '#6366F1' 
    },
    { 
      icon: 'card' as const, 
      number: '8', 
      label: 'Finance', 
      colors: ['#DCFCE7', '#BBF7D0'] as [string, string], 
      iconColor: '#16A34A' 
    },
    { 
      icon: 'cart' as const, 
      number: '5', 
      label: 'Shopping', 
      colors: ['#FEF3C7', '#FDE68A'] as [string, string], 
      iconColor: '#D97706' 
    },
  ];

  // Calculate card width based on screen size
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 40 - 24) / 3; // 40px horizontal padding + 24px gap

  return (
    <View style={styles.quickStats}>
      {stats.map((stat, index) => (
        <View key={index} style={[styles.statCard, { width: cardWidth }]}>
          <LinearGradient 
            colors={stat.colors}
            style={styles.statCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={stat.icon} size={28} color={stat.iconColor} />
            <ThemedText 
              style={styles.statCardNumber}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {stat.number}
            </ThemedText>
            <ThemedText 
              style={styles.statCardLabel}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {stat.label}
            </ThemedText>
          </LinearGradient>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  statCard: {
    height: 120, // Fixed height
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  statCardGradient: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  statCardNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 8,
    textAlign: 'center',
  },
  statCardLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 14, // Consistent line height
  },
});

export default QuickStats;