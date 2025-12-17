// app/financial/components/MenuModal.tsx
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function MenuModal({ visible, onClose }: MenuModalProps) {
  const menuItems = [
    { icon: 'settings', label: 'Settings' },
    { icon: 'analytics', label: 'Experots Data' },
    { icon: 'shield-checkmark', label: 'Security Settings' },
    { icon: 'time', label: 'Message Scheduling' },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Ionicons name={item.icon as any} size={20} color="blue" />
              <ThemedText style={styles.menuText}>{item.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});