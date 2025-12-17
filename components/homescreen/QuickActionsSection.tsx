// app/(tabs)/components/QuickActionsSection.tsx
import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface QuickActionsSectionProps {
  actions: QuickAction[];
  onActionPress: (action: QuickAction) => void;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({ actions, onActionPress }) => {
  const defaultActions = [
    { id: '1', title: 'Scan', description: 'Scan messages', icon: 'scan' },
    { id: '2', title: 'Filter', description: 'Filter content', icon: 'filter' },
    { id: '3', title: 'Export', description: 'Export data', icon: 'download' },
  ];

  const actionData = actions && actions.length > 0 ? actions : defaultActions;

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Frequently used features</ThemedText>
        </View>
        <Ionicons name="flash" size={24} color="#F59E0B" />
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
        {actionData.map((action) => (
          <Pressable
            key={action.id}
            style={styles.quickAction}
            onPress={() => onActionPress(action)}
          >
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.quickActionIcon}
            >
              <Ionicons name={action.icon as any || 'flash'} size={24} color="#fff" />
            </LinearGradient>
            <ThemedText style={styles.quickActionTitle}>{action.title}</ThemedText>
            <ThemedText style={styles.quickActionDesc}>{action.description}</ThemedText>
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
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  quickActions: {
    paddingVertical: 8,
  },
  quickAction: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  quickActionDesc: {
    fontSize: 12,
    color: '#64748B',
  },
});

export default QuickActionsSection;