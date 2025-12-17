import { ReactNode, useRef, useState } from 'react';
import { Animated, FlatList, Pressable, ScrollView, StyleSheet, TextInput, View, ViewStyle, useWindowDimensions } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { CategoryCard as CategoryCardType, DetailedQuickAction as DetailedQuickActionType } from '@/data/home-data';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function SearchHeader({ value, onChangeText }: { value: string; onChangeText: (v: string) => void }) {
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.searchContainer, { backgroundColor: colorScheme === 'dark' ? '#242627' : '#f1f1f3', borderColor: colorScheme === 'dark' ? '#2c2e2f' : '#e3e3e7' }]}> 
      <IconSymbol size={18} name="magnifyingglass" color={Colors[colorScheme ?? 'light'].icon} />
      <TextInput
        placeholder="Search categories"
        placeholderTextColor={colorScheme === 'dark' ? '#9BA1A6' : '#687076'}
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </View>
  );
}

export type ColorChip = { id: string; label: string; icon: any; color: string };

export function ChipsRow({ chips, activeId, onSelect }: { chips: ColorChip[]; activeId: string; onSelect: (id: string) => void }) {
  const { width } = useWindowDimensions();
  // Scale relative to a baseline width (iPhone 11/12 ~375)
  const scale = Math.min(Math.max(width / 375, 0.85), 1.3);
  const chipHeight = Math.round(34 * scale);
  const chipPaddingX = Math.round(12 * scale);
  const chipMinWidth = Math.round(72 * scale);
  const iconSize = Math.round(14 * scale);
  const fontSize = Math.round(13 * scale);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
      {chips.map((chip) => {
        const isActive = chip.id === activeId;
        const bg = isActive ? '#000' : chip.color;
        const textColor = '#fff';
        return (
          <Pressable
            key={chip.id}
            onPress={() => onSelect(chip.id)}
            style={[
              styles.chip,
              {
                backgroundColor: bg,
                borderColor: 'transparent',
                height: chipHeight,
                paddingHorizontal: chipPaddingX,
                borderRadius: chipHeight / 2,
                minWidth: chipMinWidth,
              },
            ]}
          > 
            <IconSymbol name={chip.icon} size={iconSize} color={textColor} />
            <ThemedText style={[styles.chipText, { color: textColor, fontSize }]} numberOfLines={1}>{chip.label}</ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export function SectionHeader({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <ThemedText type="subtitle">{title}</ThemedText>
      {right}
    </View>
  );
}

export type CategoryItem = { id: string; title: string; subtitle?: string }; // Kept for reference but actual items use CategoryCardType

// Updated CategoryList to use CategoryCardType and pass the full item on press
export function CategoryList({ items, onPressItem, emptyText = 'Not Found', maxHeight = 320 }: { items: CategoryCardType[]; onPressItem?: (item: CategoryCardType) => void; emptyText?: string; maxHeight?: number }) {
  const colorScheme = useColorScheme();
  if (items.length === 0) {
    return <ThemedText style={styles.notFound}>{emptyText}</ThemedText>;
  }
  return (
    <View style={[styles.categoryListContainer, { maxHeight }]}> 
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={styles.cardList}
        renderItem={({ item, index }) => (
          <CategoryCard
            key={item.id}
            item={item}
            index={index}
            // Update: Pass the full item to the handler
            onPress={() => onPressItem?.(item)} 
          />
        )}
      />
    </View>
  );
}

// Updated CategoryCard to use CategoryCardType and pass the full item on press
function CategoryCard({ item, index, onPress }: { item: CategoryCardType; index: number; onPress?: () => void }) {
  const colorScheme = useColorScheme();

  const CATEGORY_COLORS = [
    { accentBg: '#EFF6FF', accent: '#1D4ED8', border: '#DBEAFE' }, // blue
    { accentBg: '#F5F3FF', accent: '#7C3AED', border: '#E9D5FF' }, // purple
    { accentBg: '#ECFEFF', accent: '#0891B2', border: '#A5F3FC' }, // cyan
    { accentBg: '#FFF1F2', accent: '#E11D48', border: '#FECDD3' }, // rose
    { accentBg: '#FEFCE8', accent: '#CA8A04', border: '#FEF08A' }, // yellow
    { accentBg: '#ECFDF5', accent: '#059669', border: '#A7F3D0' }, // emerald
  ];
  const palette = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

  const pressedScale = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const onPressIn = () => {
    setIsPressed(true);
    Animated.spring(pressedScale, { toValue: 0.985, useNativeDriver: true, speed: 20, bounciness: 0 }).start();
  };
  const onPressOut = () => {
    Animated.spring(pressedScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start(() => {
      setIsPressed(false);
      onPress?.();
    });
  };

  const animatedStyle = {
    transform: [{ scale: pressedScale }],
  } as const;

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={({ pressed }) => [styles.cardPressable, pressed && styles.cardRowPressed] as ViewStyle[]}> 
      <Animated.View
        style={[
          styles.cardRow,
          isPressed ? styles.categoryCardShadowPressed : styles.categoryCardShadow,
          animatedStyle,
          {
            backgroundColor: colorScheme === 'dark' ? '#18191a' : '#ffffff',
            borderColor: colorScheme === 'dark' ? '#2c2e2f' : palette.border,
          },
        ]}
      >
        <View style={[styles.cardLeftIcon, { backgroundColor: palette.accentBg }]}> 
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={18} color={palette.accent} />
        </View>
        <View style={styles.cardTextCol}>
          <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
          {item.subtitle ? (
            <ThemedText style={[styles.cardSubtitle, { color: colorScheme === 'dark' ? '#a1a1aa' : '#6b7280' }]}>
              {item.subtitle}
            </ThemedText>
          ) : null}
        </View>
        <View style={[styles.cardRightPill, { borderColor: colorScheme === 'dark' ? '#2c2e2f' : palette.border, backgroundColor: colorScheme === 'dark' ? '#111315' : '#fff' }]}> 
          <IconSymbol name="chevron.right" size={16} color={colorScheme === 'dark' ? '#c7c7cc' : palette.accent} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

export type QuickAction = { id: string; title: string };

// NEW TYPE: Richer data structure for the cards
export type DetailedQuickAction = DetailedQuickActionType; // Used imported type

export function QuickActionsRow({ actions }: { actions: QuickAction[] }) {
  return (
    <FlatList
      data={actions}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.quickList}
      renderItem={({ item }) => (
        <ThemedView style={styles.quickCard}>
          <ThemedText>{item.title}</ThemedText>
        </ThemedView>
      )}
    />
  );
}

// Updated DetailedQuickActionCard to accept and use the onPress prop
export function DetailedQuickActionCard({ action, index, onPress }: { action: DetailedQuickAction; index: number; onPress: (action: DetailedQuickAction) => void }) {
  const colorScheme = useColorScheme();

  // Colorful, light-themed palette
  const CARD_COLORS = [
    { bg: '#FDF2F8', border: '#FBCFE8', title: '#831843', desc: '#9D174D' }, // pink
    { bg: '#ECFEFF', border: '#A5F3FC', title: '#155E75', desc: '#0E7490' }, // cyan
    { bg: '#EEF2FF', border: '#C7D2FE', title: '#3730A3', desc: '#4338CA' }, // indigo
    { bg: '#F0FDF4', border: '#BBF7D0', title: '#166534', desc: '#15803D' }, // green
    { bg: '#FEF3C7', border: '#FDE68A', title: '#92400E', desc: '#B45309' }, // amber
    { bg: '#FFF7ED', border: '#FED7AA', title: '#9A3412', desc: '#C2410C' }, // orange
  ];

  const palette = CARD_COLORS[index % CARD_COLORS.length];

  // Interactive animation values
  const pressedScale = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const onPressIn = () => {
    setIsPressed(true);
    Animated.spring(pressedScale, { toValue: 0.98, useNativeDriver: true, speed: 20, bounciness: 0 }).start();
  };
  const onPressOut = () => {
    Animated.spring(pressedScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start(() => {
      setIsPressed(false);
      onPress(action);
    });
  };

  const animatedStyle = {
    transform: [{ scale: pressedScale }],
  } as const;

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={{ marginRight: 12 }}>
      <Animated.View
        style={[
          styles.detailedQuickCard,
          isPressed ? styles.detailedQuickCardShadowPressed : styles.detailedQuickCardShadow,
          animatedStyle,
          {
            backgroundColor: colorScheme === 'dark' ? '#1f2123' : palette.bg,
            borderColor: colorScheme === 'dark' ? '#2c2e2f' : palette.border,
          },
        ]}
      >
        <ThemedText type="defaultSemiBold" style={[styles.detailedQuickCardTitle, { color: palette.title }]}> 
          {action.title}
        </ThemedText>
        <ThemedText style={[styles.detailedQuickCardDescription, { color: palette.desc }]} numberOfLines={2}>
          {action.description}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

// Updated QuickActionsSection to pass the onPressAction handler down
export function QuickActionsSection({ actions, onPressAction }: { actions: DetailedQuickAction[], onPressAction: (action: DetailedQuickAction) => void }) {
  return (
    <>
      <SectionHeader title="Quick Actions" />
      <FlatList
        data={actions}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.detailedQuickList}
        renderItem={({ item, index }) => <DetailedQuickActionCard action={item} index={index} onPress={onPressAction} />}
      />
    </>
  );
}

export function DrawerOverlay({ visible, translateStyle, onClose, children }: { visible: boolean; translateStyle?: any; onClose: () => void; children: ReactNode }) {
  if (!visible) return null;
  return (
    <Pressable onPress={onClose} style={styles.menuOverlay}>
      <Animated.View style={[styles.menuPanel, translateStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 220,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    padding: 0,
  }, 
   chipsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
    marginTop: 0, 
  },
 
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 0,
    marginRight: 8,
    marginTop:10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 2,
    marginBottom:20,
   marginTop:10,
    paddingBottom: 4,
  },
  cardList: {
    gap: 8,
    paddingHorizontal: 12,
    marginBottom: 0,
  },
  categoryListContainer: {
    paddingTop: 0,
    marginBottom: 0,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  cardPressable: {
    borderRadius: 14,
  },
  categoryCardShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  categoryCardShadowPressed: {
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardRowPressed: {
    opacity: 0.9,
  },
  cardLeftIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef2ff',
    marginRight: 14,
  },
  cardTextCol: {
    flex: 1,
  },
  cardSubtitle: {
    marginTop: 4,
    opacity: 0.8,
  },
  cardRightPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  quickList: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  quickCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 8,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff10',
  },
  
  // --- NEW STYLES for Detailed Quick Actions ---
  detailedQuickList: {
    paddingHorizontal: 16, 
    paddingVertical: 4,
    gap: 12, 
    marginBottom: 8,
  },
  detailedQuickCard: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 200, 
    height: 100, 
    justifyContent: 'flex-start',
  },
  detailedQuickCardShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  detailedQuickCardShadowPressed: {
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  detailedQuickCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailedQuickCardDescription: {
    fontSize: 13,
    opacity: 0.7,
  },
  
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000055',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuPanel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    paddingTop: 14,
    paddingHorizontal: 12,
  },
  notFound: {
    paddingVertical: 24,
    textAlign: 'center',
    opacity: 0.7,
  },
});

