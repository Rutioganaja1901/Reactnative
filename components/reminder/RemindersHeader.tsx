// components/RemindersHeader.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Modal,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS } from '@/constants/constants';

const { width: screenWidth } = Dimensions.get('window');

interface RemindersHeaderProps {
  onSearch: (text: string) => void;
}

const RemindersHeader: React.FC<RemindersHeaderProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  const handleClearSearch = () => {
    setSearchText('');
    onSearch('');
  };

  const handleMenuPress = (event: any) => {
    // Get the position of the menu button
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({
      x: pageX,
      y: pageY + 50, // Position below the button
    });
    setIsMenuVisible(true);
  };

  const handleMenuOptionPress = (option: string) => {
    console.log('Selected option:', option);
    setIsMenuVisible(false);
    // Handle menu options here
  };

  const menuOptions = [
    { id: 'filter', label: 'Message Schedul', icon: 'filter' },
    { id: 'sort', label: 'Notification', icon: 'swap-vertical' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'export', label: 'Navigation samrt.insights', icon: 'download' },
  ];

  return (
    <View style={headerStyles.container}>
      <LinearGradient
        colors={GRADIENTS.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={headerStyles.gradientBackground}
      >
        <MotiView
          from={{ translateY: -20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'spring', duration: 800 }}
        >
          <View style={headerStyles.headerContent}>
            <View style={headerStyles.headerTextContainer}>
              <Text style={headerStyles.greeting}>Good morning! 👋</Text>
              <Text style={headerStyles.title}>Your Reminders</Text>
              <Text style={headerStyles.subGreeting}>3 pending tasks today</Text>
            </View>

            <View style={headerStyles.profileContainer}>
              <LinearGradient
                colors={GRADIENTS.profile}
                style={headerStyles.profileIcon}
              >
                <Ionicons name="person" size={20} color="#fff" />
              </LinearGradient>
            </View>
          </View>

          {/* Search Bar */}
          <MotiView
            from={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 200, type: 'spring' }}
            style={headerStyles.searchContainer}
          >
            <View style={headerStyles.searchInner}>
              {/* Search Icon */}
              <Ionicons name="search" size={20} color={COLORS.textSecondary} />
              
              {/* Search Input */}
              <TextInput
                placeholder="Search reminders..."
                value={searchText}
                onChangeText={handleSearchChange}
                style={headerStyles.searchInput}
                placeholderTextColor={COLORS.textTertiary}
              />
              
              {/* Dynamic Right Icon */}
              {searchText.length > 0 ? (
                // Clear Button - Shows when there's text
                <MotiView
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <TouchableOpacity 
                    onPress={handleClearSearch}
                    style={headerStyles.clearButton}
                  >
                    <Ionicons name="close-circle" size={20} color={COLORS.textTertiary} />
                  </TouchableOpacity>
                </MotiView>
              ) : (
                // Three-dot Menu Button - Shows when no text
                <TouchableOpacity 
                  onPress={handleMenuPress}
                  style={headerStyles.menuButton}
                >
                  <Ionicons name="ellipsis-vertical" size={20} color={COLORS.textTertiary} />
                </TouchableOpacity>
              )}
            </View>
          </MotiView>
        </MotiView>
      </LinearGradient>

      {/* Menu Popup Modal */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity 
          style={headerStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View 
            style={[
              headerStyles.menuContainer,
              {
                position: 'absolute',
                top: menuPosition.y,
                right: screenWidth - menuPosition.x - 20,
              }
            ]}
          >
            {/* Arrow pointer */}
            <View style={headerStyles.menuPointer} />
            
            {/* Menu Options */}
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  headerStyles.menuOption,
                  index < menuOptions.length - 1 && headerStyles.menuOptionBorder
                ]}
                onPress={() => handleMenuOptionPress(option.id)}
              >
                <Ionicons 
                  name={option.icon as any} 
                  size={18} 
                  color={COLORS.primary} 
                  style={headerStyles.menuIcon}
                />
                <Text style={headerStyles.menuOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 15,
    overflow: 'hidden',
  },
  gradientBackground: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  profileContainer: {
    marginLeft: 15,
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  searchInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  menuButton: {
    padding: 4,
    marginLeft: 4,
  },
  // Menu Popup Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    width: 200,
    minWidth: 180,
  },
  menuPointer: {
    position: 'absolute',
    top: -6,
    right: 12,
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
    borderTopLeftRadius: 2,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIcon: {
    marginRight: 12,
    width: 20,
    
  },
  menuOptionText: {
    fontSize: 16,
    color: '#361e3bff',
    fontWeight: '500',
  },
});

export default RemindersHeader;