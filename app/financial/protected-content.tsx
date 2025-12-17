// app/financial/protected-content.tsx
import { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import Header from '@/components/financial/Header';
import MenuModal from '@/components/financial/MenuModal';
import TimeTabs from '@/components/financial/TimeTabs';
import AccountSummary from '@/components/financial/AccountSummary';
import SpendingOverview from '@/components/financial/SpendingOverview';
import SpendingCategories from '@/components/financial/SpendingCategories';
import RecentTransactions from '@/components/financial/RecentTransactions';
import UpcomingBills from '@/components/financial/UpcomingBills';
import FraudAlerts from '@/components/financial/FraudAlerts';

// Import Components


export default function ProtectedContent() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header onMenuPress={() => setMenuVisible(true)} />

      {/* Menu Modal */}
      <MenuModal 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Time Period Tabs */}
        <TimeTabs activeTab={activeTab} onTabPress={setActiveTab} />

        {/* All Components */}
        <AccountSummary />
        <SpendingOverview />
        <SpendingCategories />
        <RecentTransactions />
        <UpcomingBills />
        <FraudAlerts />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
});