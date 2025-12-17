// app/financial/components/FraudAlerts.tsx
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { fraudAlerts } from '@/app/data/mockData';


export default function FraudAlerts() {
  return (
    <View style={styles.section}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Fraud Alerts
      </ThemedText>
      <View style={styles.alertsList}>
        {fraudAlerts.map((alert) => (
          <View 
            key={alert.id} 
            style={[
              styles.alertCard,
              alert.severity === 'high' && styles.highAlert,
              alert.severity === 'medium' && styles.mediumAlert
            ]}
          >
            <Ionicons 
              name="warning" 
              size={20} 
              color={alert.severity === 'high' ? '#FF3B30' : '#FF9500'} 
            />
            <ThemedText style={styles.alertMessage}>
              {alert.message}
            </ThemedText>
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
  alertsList: {
    gap: 12,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  highAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  mediumAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  alertMessage: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});