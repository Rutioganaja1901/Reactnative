// app/financial/components/RecentTransactions.tsx
import { ThemedText } from '@/components/themed-text';
import { getTransactionColor, getTransactionIcon, transactions } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';


export default function RecentTransactions() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Recent Transactions
        </ThemedText>
        <ThemedText style={styles.transactionCount}>
          {transactions.length} transactions
        </ThemedText>
      </View>
      <View style={styles.transactionsList}>
        {transactions.map((transaction) => (
          <TouchableOpacity key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionLeft}>
              <View 
                style={[
                  styles.transactionIcon,
                  { backgroundColor: getTransactionColor(transaction.type) }
                ]}
              >
                <Ionicons 
                  name={getTransactionIcon(transaction.type)} 
                  size={20} 
                  color="white" 
                />
              </View>
              <View style={styles.transactionDetails}>
                <ThemedText style={styles.transactionName}>
                  {transaction.name}
                </ThemedText>
                <ThemedText style={styles.transactionDate}>
                  {transaction.date} • {transaction.time}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.transactionAmount}>
              {transaction.amount}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  transactionCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
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
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    gap: 4,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});