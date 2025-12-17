// app/(tabs)/components/EnhancedPopup.tsx
import React from 'react';
import { Modal, Pressable, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

interface PopupContent {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface EnhancedPopupProps {
  visible: boolean;
  content: PopupContent | null;
  onClose: () => void;
}

const EnhancedPopup: React.FC<EnhancedPopupProps> = ({ visible, content, onClose }) => {
  if (!visible || !content) return null;
  
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.modalHeader}
          >
            <View style={styles.modalIcon}>
              <Ionicons name="information-circle" size={32} color="#fff" />
            </View>
            <ThemedText type="title" style={styles.modalTitle}>{content.title}</ThemedText>
          </LinearGradient>
          
          <View style={styles.modalBody}>
            {'subtitle' in content && content.subtitle && (
              <View style={styles.modalRow}>
                <Ionicons name="pricetag" size={18} color="#6366F1" />
                <ThemedText style={styles.modalSubtitle}>{content.subtitle}</ThemedText>
              </View>
            )}
            
            {'description' in content && content.description && (
              <View style={styles.modalRow}>
                <Ionicons name="document-text" size={18} color="#6366F1" />
                <ThemedText style={styles.modalDescription}>{content.description}</ThemedText>
              </View>
            )}
            
            <View style={styles.modalRow}>
              <Ionicons name="finger-print" size={18} color="#6366F1" />
              <ThemedText style={styles.modalId}>ID: {content.id}</ThemedText>
            </View>
          </View>

          <Pressable onPress={onClose} style={styles.modalCloseButton}>
            <Ionicons name="close-circle" size={28} color="#94A3B8" />
          </Pressable>

          <Pressable onPress={onClose} style={styles.modalActionButton}>
            <ThemedText style={styles.modalActionText}>Got It</ThemedText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '85%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  modalHeader: {
    padding: 24,
    alignItems: 'center',
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  modalBody: {
    padding: 24,
    gap: 16,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
  },
  modalDescription: {
    fontSize: 14,
    color: '#64748B',
    flex: 1,
    lineHeight: 20,
  },
  modalId: {
    fontSize: 12,
    color: '#94A3B8',
    flex: 1,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  modalActionButton: {
    backgroundColor: '#6366F1',
    margin: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalActionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EnhancedPopup;