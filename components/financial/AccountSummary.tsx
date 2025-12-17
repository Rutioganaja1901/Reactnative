// app/financial/components/AccountSummary.tsx
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

export default function AccountSummary() {
  const accountCards = [
    {
      title: 'Total Balance',
      amount: '₹0.00',
      icon: 'wallet-outline',
      trend: '0%',
      trendDirection: 'neutral',
      description: 'No transactions yet'
    },
  ];

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return '#10B981';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'remove-outline';
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Account Overview
        </ThemedText>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, styles.statusNeutral]} />
          <ThemedText style={styles.statusText}>No Activity</ThemedText>
        </View>
      </View>

      {/* Account Cards Grid */}
      <View style={styles.cardsGrid}>
        {accountCards.map((card, index) => (
          <ThemedView key={index} style={styles.accountCard}>
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name={card.icon as any} size={20} color="#6366F1" />
              </View>
              <View style={styles.trendContainer}>
                <Ionicons 
                  name={getTrendIcon(card.trendDirection) as any} 
                  size={14} 
                  color={getTrendColor(card.trendDirection)} 
                />
                <ThemedText style={[styles.trendText, { color: getTrendColor(card.trendDirection) }]}>
                  {card.trend}
                </ThemedText>
              </View>
            </View>

            {/* Card Content */}
            <View style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>{card.title}</ThemedText>
              <ThemedText style={styles.cardAmount}>{card.amount}</ThemedText>
              <ThemedText style={styles.cardDescription}>{card.description}</ThemedText>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground}>
                <View style={[styles.progressFill, { width: '0%' }]} />
              </View>
            </View>
          </ThemedView>
        ))}
      </View>

      {/* Setup Prompt */}
      <ThemedView style={styles.setupPrompt}>
        <View style={styles.promptHeader}>
          <Ionicons name="rocket-outline" size={24} color="#8B5CF6" />
          <ThemedText style={styles.promptTitle}>Ready to Get Started?</ThemedText>
        </View>
        <ThemedText style={styles.promptDescription}>
          Connect your accounts or add transactions to see your financial summary and track your spending patterns.
        </ThemedText>
        <View style={styles.actionButtons}>
          <View style={[styles.actionButton, styles.primaryButton]}>
            <Ionicons name="add-circle" size={16} color="#FFFFFF" />
            <ThemedText style={styles.primaryButtonText}>Add Transaction</ThemedText>
          </View>
          <View style={[styles.actionButton, styles.secondaryButton]}>
            <Ionicons name="link" size={16} color="#6366F1" />
            <ThemedText style={styles.secondaryButtonText}>Connect Bank</ThemedText>
          </View>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.5,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusNeutral: {
    backgroundColor: '#6B7280',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  cardsGrid: {
    gap: 16,
    marginBottom: 20,
  },
  accountCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  setupPrompt: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  promptDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  primaryButton: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#E5E7EB',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
});