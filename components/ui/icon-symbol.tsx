// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'bubble.left.and.bubble.right.fill': 'chat',
  'bubble.left.and.bubble.right': 'chat-bubble-outline',
  'bell.fill': 'notifications',
  'dollarsign.circle.fill': 'attach-money',
  'ellipsis': 'more-vert',
  'magnifyingglass': 'search',
  'square.grid.2x2.fill': 'apps',
  'square.grid.2x2': 'apps',
  'star.fill': 'star',
  'star': 'star-border',
  'envelope': 'email',
  'line.3.horizontal.3': 'filter-list',
  'xmark.circle.fill': 'cancel',
  'key.fill': 'vpn-key',
  'creditcard.fill': 'credit-card',
  'bag.fill': 'shopping-bag',
  // --- NEW MAPPINGS FOR ACTION SHEET CONTENT ---
  'clock': 'access-time', // For Newest/Oldest First (Time sorting)
  'flag.fill': 'flag', // For By Priority
  'exclamationmark.triangle.fill': 'warning', // For Show Spam Only
  'arrow.counterclockwise': 'rotate-left', // For Clear All Filters
  'checkmark': 'check', // For Active Selection
  'xmark': 'close', // For closing the sheet
  'gearshape': 'settings', // For Settings popover
  'clock.fill': 'access-time', // For scheduling
};

type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  // Removed unused 'weight' prop
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  // Removed unused 'weight' prop
}) {
  const iconName = MAPPING[name];
  if (!iconName) {
    throw new Error(`Icon "${name}" not found in mapping`);
  }
  return <MaterialIcons color={color} size={size} name={iconName as any} style={style} />;
}