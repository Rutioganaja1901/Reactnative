// app/financial/components/TimeTabs.tsx
import { ThemedText } from '@/components/themed-text';
import { tabs } from '@/data/mockData';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';


interface TimeTabsProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function TimeTabs({ activeTab, onTabPress }: TimeTabsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabsContainer}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab
          ]}
          onPress={() => onTabPress(tab)}
        >
          <ThemedText style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText
          ]}>
            {tab}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    paddingVertical: 2,
    gap: 8,
    marginBottom:15,
    
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
});