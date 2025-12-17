// app/financial/components/SpendingCategories.tsx
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { categories } from '@/app/data/mockData';


export default function SpendingCategories() {
  const totalSpent = categories.reduce((sum, category) => {
    const amount = parseInt(category.amount.replace(/[^0-9]/g, ''));
    return sum + amount;
  }, 0);

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'shopping': return 'cart-outline';
      case 'food': return 'restaurant-outline';
      case 'transport': return 'car-outline';
      case 'entertainment': return 'film-outline';
      case 'bills': return 'document-text-outline';
      default: return 'pie-chart-outline';
    }
  };

  const getCategoryGradient = (color: string) => {
    const gradients: { [key: string]: string[] } = {
      '#FF6B6B': ['#FF6B6B', '#FF8E8E'],
      '#4ECDC4': ['#4ECDC4', '#67D7D0'],
      '#45B7D1': ['#45B7D1', '#5FC1D9'],
      '#FFA07A': ['#FFA07A', '#FFB59A'],
      '#98D8C8': ['#98D8C8', '#B1E2D6'],
    };
    return gradients[color] || [color, color];
  };

  return (
    <View style={styles.section}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Spending Breakdown
          </ThemedText>
          <ThemedText style={styles.sectionSubtitle}>
            Total spent: ₹{totalSpent.toLocaleString()}
          </ThemedText>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#6366F1" />
          <ThemedText style={styles.filterText}>Filter</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Categories Grid */}
      <View style={styles.categoriesGrid}>
        {categories.map((category, index) => {
          const percentageValue = parseInt(category.percentage);
          const [startColor, endColor] = getCategoryGradient(category.color);
          
          return (
            <ThemedView key={index} style={styles.categoryCard}>
              {/* Category Header */}
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <View 
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: `${category.color}20` }
                    ]}
                  >
                    <Ionicons 
                      name={getCategoryIcon(category.name) as any} 
                      size={18} 
                      color={category.color} 
                    />
                  </View>
                  <View>
                    <ThemedText style={styles.categoryName}>
                      {category.name}
                    </ThemedText>
                    <ThemedText style={styles.categoryAmount}>
                      {category.amount}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.percentageBadge}>
                  <ThemedText style={styles.percentageText}>
                    {category.percentage}
                  </ThemedText>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                  <View 
                    style={[
                      styles.progressFill,
                      { 
                        width: `${percentageValue}%`,
                        backgroundColor: category.color
                      }
                    ]} 
                  />
                  {/* Gradient Overlay */}
                  <View 
                    style={[
                      styles.progressGradient,
                      { 
                        width: `${percentageValue}%`,
                        backgroundColor: endColor
                      }
                    ]} 
                  />
                </View>
                
                {/* Progress Indicators */}
                <View style={styles.progressLabels}>
                  <ThemedText style={styles.progressStart}>0%</ThemedText>
                  <ThemedText style={styles.progressEnd}>100%</ThemedText>
                </View>
              </View>

              {/* Trend Indicator */}
              <View style={styles.trendContainer}>
                <Ionicons 
                  name={percentageValue > 20 ? "trending-up" : "trending-down"} 
                  size={14} 
                  color={percentageValue > 20 ? "#10B981" : "#EF4444"} 
                />
                <ThemedText style={[
                  styles.trendText,
                  { color: percentageValue > 20 ? "#10B981" : "#EF4444" }
                ]}>
                  {percentageValue > 20 ? "Above avg" : "Below avg"}
                </ThemedText>
              </View>
            </ThemedView>
          );
        })}
      </View>

      {/* Summary Footer */}
      <ThemedView style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Ionicons name="analytics-outline" size={20} color="#6366F1" />
          <ThemedText style={styles.summaryTitle}>Spending Insights</ThemedText>
        </View>
        <View style={styles.insightsContainer}>
          <View style={styles.insightItem}>
            <ThemedText style={styles.insightLabel}>Top Category</ThemedText>
            <ThemedText style={styles.insightValue}>Shopping</ThemedText>
          </View>
          <View style={styles.insightItem}>
            <ThemedText style={styles.insightLabel}>Avg. per Category</ThemedText>
            <ThemedText style={styles.insightValue}>₹{(totalSpent / categories.length).toLocaleString()}</ThemedText>
          </View>
          <View style={styles.insightItem}>
            <ThemedText style={styles.insightLabel}>Categories</ThemedText>
            <ThemedText style={styles.insightValue}>{categories.length}</ThemedText>
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
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
  },
  categoriesGrid: {
    gap: 16,
    marginBottom: 20,
  },
  categoryCard: {
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  percentageBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressGradient: {
    height: '100%',
    borderRadius: 4,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.7,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStart: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  progressEnd: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  insightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insightItem: {
    alignItems: 'center',
    flex: 1,
  },
  insightLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  insightValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
});