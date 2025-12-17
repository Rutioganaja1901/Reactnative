// app/(tabs)/components/WelcomeHeader.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';

interface WelcomeHeaderProps {
  categoriesCount: number;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ categoriesCount }) => {
  return (
    <View style={styles.welcomeSection}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.welcomeGradient}
      >
        <View style={styles.welcomeContent}>
          <View style={styles.welcomeTextContainer}>
            <ThemedText style={styles.welcomeGreeting}>Hello! 👋</ThemedText>
            <ThemedText style={styles.welcomeTitle}>Welcome Back</ThemedText>
            <ThemedText style={styles.welcomeSubtitle}>Manage your categories efficiently</ThemedText>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statCircle}>
              <ThemedText style={styles.statNumber}>{categoriesCount}</ThemedText>
              <ThemedText style={styles.statLabel}>Total</ThemedText>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  welcomeGradient: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeGreeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  statsContainer: {
    alignItems: 'center',
  },
  statCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
});

export default WelcomeHeader;