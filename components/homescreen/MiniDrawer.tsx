// app/(tabs)/components/MiniDrawer.tsx
import React, { useRef, useEffect } from 'react';
import { Animated, Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

interface MiniDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  if (!visible) return null;

  // Using valid Ionicons names
  const menuItems = [
    { icon: 'settings-outline' as const, label: 'Settings', color: '#6366F1' },
    { icon: 'information-circle-outline' as const, label: 'About', color: '#10B981' },
    { icon: 'help-circle-outline' as const, label: 'Help & Support', color: '#F59E0B' },
    { icon: 'shield-checkmark-outline' as const, label: 'Privacy', color: '#EF4444' },
    { icon: 'moon-outline' as const, label: 'Dark Mode', color: '#8B5CF6' },
    { icon: 'notifications-outline' as const, label: 'Notifications', color: '#06B6D4' },
  ];

  return (
    <>
      <Pressable style={styles.drawerOverlay} onPress={onClose} />
      <Animated.View style={[styles.miniDrawer, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.drawerHeader}>
          <ThemedText style={styles.drawerTitle}>Quick Menu</ThemedText>
          <Pressable onPress={onClose} style={styles.drawerCloseButton}>
            <Ionicons name="chevron-down" size={24} color="#64748B" />
          </Pressable>
        </View>
        
        <View style={styles.drawerContent}>
          {menuItems.map((item, index) => (
            <Pressable 
              key={index} 
              style={styles.drawerItem}
              onPress={() => {
                // Handle menu item press here
                console.log(`Pressed: ${item.label}`);
                onClose();
              }}
            >
              <View style={[styles.drawerIcon, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <ThemedText style={styles.drawerItemText}>{item.label}</ThemedText>
              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  drawerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  miniDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    maxHeight: '60%',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  drawerCloseButton: {
    padding: 4,
  },
  drawerContent: {
    padding: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  drawerIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  drawerItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
});

export default MiniDrawer;