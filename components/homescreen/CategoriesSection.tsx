// app/(tabs)/components/CategoriesSection.tsx
import React from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

interface Category {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, onCategoryPress }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <ThemedText type="subtitle" style={styles.sectionTitle}>All Categories</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Organized by type</ThemedText>
        </View>
        <View style={styles.countBadge}>
          <ThemedText style={styles.countBadgeText}>{categories.length}</ThemedText>
        </View>
      </View>
      
      <View style={styles.categoryList}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 360 }}>
          {categories.map((item) => (
            <Pressable
              key={item.id}
              style={styles.categoryItem}
              onPress={() => onCategoryPress(item)}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name="folder" size={20} color="#6366F1" />
              </View>
              <View style={styles.categoryContent}>
                <ThemedText style={styles.categoryTitle}>{item.title}</ThemedText>
                {item.subtitle && (
                  <ThemedText style={styles.categorySubtitle}>{item.subtitle}</ThemedText>
                )}
              </View>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </Pressable>
          ))}
        </ScrollView>
      </View>
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
  countBadge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryList: {
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
});

export default CategoriesSection;