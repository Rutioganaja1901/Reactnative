// app/financial/components/SpendingOverview.tsx
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { spendingData } from '@/app/data/mockData';


export default function SpendingOverview() {
  const spendingCards = [
    { icon: 'wallet', label: 'Total Spent', amount: spendingData.totalSpent, color: '#007AFF' },
    { icon: 'trending-up', label: 'Avg. Spending', amount: spendingData.averageSpending, color: '#34C759' },
    { icon: 'receipt', label: 'Transactions', amount: spendingData.totalTransactions, color: '#FF9500' },
  ];

  return (
    <View style={styles.section}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Spending Overview
      </ThemedText>
      <View style={styles.spendingGrid}>
        {spendingCards.map((card, index) => (
          <View key={index} style={styles.spendingCard}>
            <Ionicons name={card.icon as any} size={24} color={card.color} />
            <ThemedText style={styles.spendingAmount}>{card.amount}</ThemedText>
            <ThemedText style={styles.spendingLabel}>{card.label}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  spendingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  spendingCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  spendingAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 8,
    color: '#1a1a1a',
  },
  spendingLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});