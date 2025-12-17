// app/(tabs)/index.tsx
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Import components from the correct path
import CategoriesSection from '@/components/homescreen/CategoriesSection';
import CustomSearchHeader from '@/components/homescreen/CustomSearchHeader';
import EnhancedPopup from '@/components/homescreen/EnhancedPopup';
import FilterSection from '@/components/homescreen/FilterSection';
import MiniDrawer from '@/components/homescreen/MiniDrawer';
import QuickActionsSection from '@/components/homescreen/QuickActionsSection';
import QuickStats from '@/components/homescreen/QuickStats';
import WelcomeHeader from '@/components/homescreen/WelcomeHeader';
import { CATEGORIES, HEADER_CHIPS, SAMPLE_QUICK_ACTIONS } from '@/data/home-data';

type Card = { id: string; title: string; subtitle?: string; type: 'All' | 'OTP' | 'Finance' | 'Shopping' | 'Others' };
type PopupContent = Card | any;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [activeChip, setActiveChip] = useState('all');
  const [isMiniDrawerOpen, setIsMiniDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupContent>(null);

  const categories: Card[] = useMemo(() => CATEGORIES, []);
  
  const filteredCategories = useMemo(() => {
    const chipToType: Record<string, Card['type']> = {
      all: 'All',
      otp: 'OTP',
      finance: 'Finance',
      shopping: 'Shopping',
      others: 'Others',
    };
    const byChip = chipToType[activeChip] === 'All' ? categories : categories.filter((c) => c.type === chipToType[activeChip]);
    const q = query.trim().toLowerCase();
    if (!q) return byChip;
    return byChip.filter((c) => c.title.toLowerCase().includes(q) || (c.subtitle ?? '').toLowerCase().includes(q));
  }, [categories, activeChip, query]);

  const handleCardPress = (content: PopupContent) => {
    setPopupContent(content);
    setIsPopupVisible(true);
  };

  useLayoutEffect(() => {
    // Hide the default header since we're using custom headers in the content
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Hide the default header and use custom layout */}
       {/* Search Header - Below Welcome Header */}
        <View style={styles.searchSection}>
          <CustomSearchHeader 
            value={query} 
            onChangeText={setQuery}
            onProfilePress={() => setIsMiniDrawerOpen(true)}
          />
        </View>

     
        {/* Welcome Header - At the top */}
        <WelcomeHeader categoriesCount={categories.length} />

       
        {/* Quick Stats */}
        <QuickStats />

         {/* Main Content with Scroll */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Filter Section */}
        <FilterSection 
          chips={HEADER_CHIPS}
          activeChip={activeChip}
          onChipSelect={setActiveChip}
        />

        {/* Categories Section */}
        <CategoriesSection 
          categories={filteredCategories}
          onCategoryPress={handleCardPress}
        />

        {/* Quick Actions Section */}
        <QuickActionsSection 
          actions={SAMPLE_QUICK_ACTIONS}
          onActionPress={handleCardPress}
        />
      </ScrollView>

      {/* Mini Drawer */}
      <MiniDrawer 
        visible={isMiniDrawerOpen} 
        onClose={() => setIsMiniDrawerOpen(false)} 
      />

      {/* Enhanced Popup */}
      <EnhancedPopup
        visible={isPopupVisible}
        content={popupContent}
        onClose={() => setIsPopupVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
});