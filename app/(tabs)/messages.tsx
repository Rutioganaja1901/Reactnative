import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock data - replace with your actual data
const mockData = {
  totalSpend: 12560.75,
  creditCardSpend: 8450.25,
  bankSpend: 4110.50,
  categories: [
    { name: 'Credit Card', amount: 8450.25, color: '#FF6B6B', icon: 'card' },
    { name: 'Shopping', amount: 2340.80, color: '#4ECDC4', icon: 'cart' },
    { name: 'Entertainment', amount: 890.45, color: '#45B7D1', icon: 'game-controller' },
    { name: 'Payments', amount: 1567.30, color: '#96CEB4', icon: 'cash' },
    { name: 'Self/Cash', amount: 780.20, color: '#FFEAA7', icon: 'person' },
    { name: 'Government', amount: 532.75, color: '#DDA0DD', icon: 'business' },
  ],
  upcomingPayments: [
    { card: 'HDFC Platinum', dueDate: '2024-01-15', amount: 12500, daysLeft: 5 },
    { card: 'ICICI Amazon', dueDate: '2024-01-20', amount: 8450, daysLeft: 10 },
    { card: 'SBI SimplySave', dueDate: '2024-01-25', amount: 5670, daysLeft: 15 },
  ],
  fraudAlerts: [
    { message: 'Suspicious transaction: ₹15,000 to unknown merchant', severity: 'high' },
    { message: 'Multiple small payments to same number', severity: 'medium' },
    { message: 'Unusual spending pattern detected', severity: 'low' },
  ],
  spendingTrend: [45, 52, 38, 65, 72, 58, 80, 65, 70, 75, 68, 72],
};

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'custom', label: 'Custom' },
  ];

  const handleExport = () => {
    Alert.alert('Export', 'Choose export format:', [
      { text: 'PDF', onPress: () => console.log('Exporting PDF') },
      { text: 'CSV', onPress: () => console.log('Exporting CSV') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#FF4757';
      case 'medium': return '#FFA502';
      case 'low': return '#2ED573';
      default: return '#747D8C';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color }: any) => (
    <LinearGradient
      colors={[color, `${color}DD`]}
      style={styles.statCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={24} color="#fff" />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>₹{value.toLocaleString()}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </LinearGradient>
  );

  const CategoryPill = ({ category, isSelected, onPress }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryPill,
        isSelected && styles.categoryPillSelected,
        { backgroundColor: category.color }
      ]}
      onPress={onPress}
    >
      <Ionicons 
        name={category.icon as any} 
        size={16} 
        color="#fff" 
        style={styles.categoryIcon} 
      />
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1F2B" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1A1F2B', '#2D3748']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome Back!</Text>
            <Text style={styles.subGreeting}>Here's your financial overview</Text>
          </View>
          <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
            <Ionicons name="download-outline" size={20} color="#fff" />
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.id && styles.periodButtonSelected,
                ]}
                onPress={() => setSelectedPeriod(period.id)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === period.id && styles.periodButtonTextSelected,
                  ]}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Spend"
            value={mockData.totalSpend}
            subtitle="This period"
            icon="trending-up"
            color="#667EEA"
          />
          <StatCard
            title="Credit Card"
            value={mockData.creditCardSpend}
            subtitle="Card expenses"
            icon="card"
            color="#FF6B6B"
          />
          <StatCard
            title="Bank Spend"
            value={mockData.bankSpend}
            subtitle="Bank transactions"
            icon="business"
            color="#4ECDC4"
          />
          <StatCard
            title="Savings Rate"
            value={28.5}
            subtitle="Of income"
            icon="pie-chart"
            color="#FFA502"
          />
        </View>

        {/* Category-wise Spend */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category-wise Spend</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {mockData.categories.map((category, index) => (
              <CategoryPill
                key={category.name}
                category={category}
                isSelected={selectedCategory === category.name.toLowerCase()}
                onPress={() => setSelectedCategory(category.name.toLowerCase())}
              />
            ))}
          </ScrollView>

          <View style={styles.categoryDetails}>
            {mockData.categories.map((category) => (
              <View key={category.name} style={styles.categoryRow}>
                <View style={styles.categoryInfo}>
                  <View style={[styles.colorDot, { backgroundColor: category.color }]} />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <Text style={styles.categoryAmount}>₹{category.amount.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Payments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Payments</Text>
            <Ionicons name="notifications" size={20} color="#667EEA" />
          </View>
          
          {mockData.upcomingPayments.map((payment, index) => (
            <View key={payment.card} style={styles.paymentCard}>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentCardName}>{payment.card}</Text>
                <Text style={styles.paymentDueDate}>
                  Due in {payment.daysLeft} days • {payment.dueDate}
                </Text>
              </View>
              <View style={styles.paymentAmountContainer}>
                <Text style={styles.paymentAmount}>₹{payment.amount.toLocaleString()}</Text>
                <TouchableOpacity style={styles.payNowButton}>
                  <Text style={styles.payNowText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Fraud Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Fraud Alerts</Text>
            <Ionicons name="shield-checkmark" size={20} color="#FF4757" />
          </View>
          
          {mockData.fraudAlerts.map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <View style={[styles.severityDot, { backgroundColor: getSeverityColor(alert.severity) }]} />
                <Text style={styles.alertSeverity}>
                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Risk
                </Text>
              </View>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <View style={styles.alertActions}>
                <TouchableOpacity style={styles.alertButton}>
                  <Text style={styles.alertButtonText}>Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.alertButton}>
                  <Text style={styles.alertButtonText}>Ignore</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Spending Trend Chart Placeholder */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spending Trend</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View Details</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.chartContainer}>
            <LinearGradient
              colors={['#667EEA', '#764BA2']}
              style={styles.chart}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.chartPlaceholder}>Interactive Chart</Text>
              <Text style={styles.chartSubtitle}>Visual representation of spending patterns</Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 14,
    color: '#CBD5E0',
    marginTop: 4,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  exportText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  periodSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  periodButtonSelected: {
    backgroundColor: '#667EEA',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  periodButtonTextSelected: {
    color: '#fff',
  },
  statsGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 40) / 2 - 6,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 11,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  seeAllText: {
    fontSize: 14,
    color: '#667EEA',
    fontWeight: '600',
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryPillSelected: {
    transform: [{ scale: 1.05 }],
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryDetails: {
    gap: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    marginBottom: 8,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentCardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 4,
  },
  paymentDueDate: {
    fontSize: 12,
    color: '#718096',
  },
  paymentAmountContainer: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  payNowButton: {
    backgroundColor: '#667EEA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  payNowText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  alertCard: {
    backgroundColor: '#FEF5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF4757',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  alertSeverity: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  alertMessage: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
    lineHeight: 18,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 12,
  },
  alertButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
  },
  alertButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF4757',
  },
  chartContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  chart: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholder: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  chartSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});