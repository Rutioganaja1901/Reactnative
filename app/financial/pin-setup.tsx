// app/financial/pin-setup.tsx
import { useState } from 'react';
import { ScrollView, StyleSheet, Alert, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { Ionicons } from '@expo/vector-icons';
import { PinService } from '../utils/pin-service';

interface PinSetupScreenProps {
  onPinSet: () => void;
}

export default function PinSetupScreen({ onPinSet }: PinSetupScreenProps) {
  const [pin, setPin] = useState('');
  const [isSetting, setIsSetting] = useState(false);

  const handleNumberPress = (num: number) => {
    if (pin.length < 6) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSetPin = async () => {
    if (pin.length < 4) {
      Alert.alert('PIN Too Short', 'PIN must be at least 4 digits');
      return;
    }

    setIsSetting(true);
    
    try {
      await PinService.setPin(pin);
      
      // Auto-close after successful PIN set
      setTimeout(() => {
        onPinSet();
      }, 300);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to set PIN. Please try again.');
    } finally {
      setIsSetting(false);
    }
  };

  const renderPinDots = () => {
    return (
      <View style={styles.pinDotsContainer}>
        {[0, 1, 2, 3, 4, 5].map(index => (
          <View
            key={index}
            style={[
              styles.pinDot,
              index < pin.length && styles.pinDotFilled,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={32} color="#007AFF" />
          </View>
          <ThemedText type="title" style={styles.title}>
            Secure Your Finance
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Set a PIN to protect your financial information
          </ThemedText>
        </View>

        {/* PIN Input Section */}
        <View style={styles.pinSection}>
          <ThemedText style={styles.sectionLabel}>Enter PIN</ThemedText>
          {renderPinDots()}
          <ThemedText style={styles.pinHint}>
            {pin.length === 0 ? 'Enter 4-6 digit PIN' : `${6 - pin.length} more digit${6 - pin.length !== 1 ? 's' : ''}`}
          </ThemedText>
        </View>

        {/* Keypad */}
        <View style={styles.keypad}>
          <View style={styles.keypadRow}>
            {[1, 2, 3].map(num => (
              <TouchableOpacity
                key={num}
                style={styles.key}
                onPress={() => handleNumberPress(num)}
              >
                <ThemedText style={styles.keyText}>{num}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {[4, 5, 6].map(num => (
              <TouchableOpacity
                key={num}
                style={styles.key}
                onPress={() => handleNumberPress(num)}
              >
                <ThemedText style={styles.keyText}>{num}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            {[7, 8, 9].map(num => (
              <TouchableOpacity
                key={num}
                style={styles.key}
                onPress={() => handleNumberPress(num)}
              >
                <ThemedText style={styles.keyText}>{num}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keypadRow}>
            <View style={styles.emptyKey} />
            <TouchableOpacity style={styles.key} onPress={() => handleNumberPress(0)}>
              <ThemedText style={styles.keyText}>0</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.key} onPress={handleBackspace}>
              <Ionicons name="backspace-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Set PIN Button */}
        <TouchableOpacity
          style={[
            styles.button,
            (pin.length < 4 || isSetting) && styles.buttonDisabled
          ]}
          onPress={handleSetPin}
          disabled={pin.length < 4 || isSetting}
        >
          {isSetting ? (
            <ThemedText style={styles.buttonText}>Setting PIN...</ThemedText>
          ) : (
            <ThemedText style={styles.buttonText}>Set PIN</ThemedText>
          )}
        </TouchableOpacity>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    gap: 16,
    marginBottom: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 22,
    color: '#666',
  },
  pinSection: {
    alignItems: 'center',
    gap: 16,
    marginBottom: 30,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.8,
    color: '#333',
  },
  pinDotsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  pinDotFilled: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  pinHint: {
    fontSize: 14,
    opacity: 0.6,
    fontStyle: 'italic',
    color: '#666',
  },
  keypad: {
    gap: 16,
    marginBottom: 30,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  key: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyKey: {
    width: 75,
    height: 75,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoTitle: {
    marginBottom: 12,
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    lineHeight: 22,
    opacity: 0.8,
    fontSize: 14,
    color: '#666',
  },
});