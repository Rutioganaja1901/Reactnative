// app/financial/components/Header.tsx
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  onMenuPress: () => void;
}

export default function Header({ onMenuPress }: HeaderProps) {
  return (
    <ThemedView style={styles.header}>
      <View style={styles.headerContent}>
        <ThemedText type="title" style={styles.headerTitle}>
          Financial Reminders
        </ThemedText>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={onMenuPress}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    paddingTop: 0, // Remove the gap
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10, // Small padding for content inside
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  menuButton: {
    padding: 8,
  },
});