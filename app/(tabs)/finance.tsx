// app/tabs/financial.tsx
import { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import PinSetupScreen from '../financial/pin-setup';
import PinEntryScreen from '../financial/pin-entry';
import ProtectedContent from '../financial/protected-content';
import { PinService } from '../utils/pin-service';


export default function FinancialScreen() {
  const [hasPin, setHasPin] = useState<boolean | null>(null);
  const [isPinVerified, setIsPinVerified] = useState(false);

  useEffect(() => {
    checkPinStatus();
  }, []);

  const checkPinStatus = async () => {
    const pinExists = await PinService.hasPin();
    setHasPin(pinExists);
  };

  const handlePinSet = () => {
    setHasPin(true);
    setIsPinVerified(true);
  };

  const handlePinVerified = () => {
    setIsPinVerified(true);
  };

  // Show loading while checking PIN status
  if (hasPin === null) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText style={styles.loadingText}>Checking security...</ThemedText>
      </ThemedView>
    );
  }

  // Show PIN setup if no PIN exists
  if (!hasPin) {
    return <PinSetupScreen onPinSet={handlePinSet} />;
  }

  // Show PIN entry if PIN exists but not verified
  if (!isPinVerified) {
    return <PinEntryScreen onPinVerified={handlePinVerified} />;
  }

  // Show protected financial content after PIN verification
  return <ProtectedContent />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    opacity: 0.7,
  },
});