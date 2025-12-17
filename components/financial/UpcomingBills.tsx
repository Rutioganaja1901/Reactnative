// app/financial/components/UpcomingBills.tsx
import { ThemedText } from '@/components/themed-text';
import { upcomingBills } from '@/data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';


export default function UpcomingBills() {
  return (
    <View style={styles.section}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Upcoming Bills
      </ThemedText>
      <View style={styles.billsList}>
        {upcomingBills.map((bill) => (
          <View key={bill.id} style={styles.billCard}>
            <View style={styles.billLeft}>
              <Ionicons name="calendar" size={20} color="#FF6B6B" />
              <ThemedText style={styles.billName}>{bill.name}</ThemedText>
            </View>
            <View style={styles.billRight}>
              <ThemedText style={styles.billAmount}>{bill.amount}</ThemedText>
              <ThemedText style={styles.billDate}>Due {bill.dueDate}</ThemedText>
            </View>
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
  billsList: {
    gap: 12,
  },
  billCard: {
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
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  billName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  billRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  billAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  billDate: {
    fontSize: 12,
    color: '#666',
  },
});