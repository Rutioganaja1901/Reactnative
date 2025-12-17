// app/(tabs)/components/CustomSearchHeader.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  Animated,
  Dimensions,
  Modal,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface CustomSearchHeaderProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearchClose?: () => void;
  onProfilePress?: () => void;
  onLogout?: () => void; // Optional callback for logout
}

const CustomSearchHeader: React.FC<CustomSearchHeaderProps> = ({ 
  value, 
  onChangeText,
  onSearchClose,
  onProfilePress,
  onLogout 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const searchAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  const menuButtonRef = useRef<View>(null);
  const { width } = Dimensions.get('window');
  const router = useRouter();

  useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    onChangeText('');
    inputRef.current?.blur();
    setIsFocused(false);
    onSearchClose?.();
  };

  const handleCancel = () => {
    onChangeText('');
    inputRef.current?.blur();
    setIsFocused(false);
    onSearchClose?.();
  };

  const handleMenuPress = () => {
    // Measure the position of the menu button
    menuButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setMenuPosition({
        x: pageX + width - 200, // Position to the left of the button
        y: pageY + height + 8, // Position below the button with small gap
      });
      setIsMenuVisible(true);
    });
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            setIsMenuVisible(false);
            // Call the onLogout prop if provided
            onLogout?.();
            // Redirect to login page
            router.replace('/login');
          }
        }
      ]
    );
  };

  const handleMenuOptionPress = (option: string) => {
    console.log('Selected option:', option);
    setIsMenuVisible(false);
    
    // Handle different menu options here
    switch (option) {
      case 'Settings':
        // Navigate to settings
        break;
      case 'Cloud Backup':
        // Handle cloud backup action
        break;
      case 'Font Settings':
        // Handle font settings action
        break;
      case 'Notifications':
        // Handle notifications action
        break;
      case 'Message Scheduling':
        // Handle message scheduling action
        break;
      case 'Task Assistance':
        // Handle task assistance action
        break;
      case 'Expiring Messages':
        // Handle expiring messages action
        break;
      case 'OTP Management':
        // Handle OTP management action
        break;
      case 'Offers Hub':
        // Handle offers hub action
        break;
      case 'Priority Messages':
        // Handle priority messages action
        break;
      case 'Export Data':
        // Handle export data action
        break;
      case 'Security Settings':
        // Handle security settings action
        break;
      case 'Logout':
        handleLogout();
        break;
    }
  };

  const searchWidth = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [width - 32, width - 32],
  });

  const menuOptions = [
    'Settings',
    'Cloud Backup', 
    'Font Settings',
    'Notifications',
    'Message Scheduling',
    'Task Assistance',
    'Expiring Messages',
    'OTP Management',
    'Offers Hub',
    'Priority Messages',
    'Export Data',
    'Security Settings',
    'Logout' // Added logout option
  ];

  const getIconName = (option: string) => {
    switch (option) {
      case 'Settings':
        return 'settings';
      case 'Cloud Backup':
        return 'cloud-upload';
      case 'Font Settings':
        return 'text';
      case 'Notifications':
        return 'notifications';
      case 'Message Scheduling':
        return 'time';
      case 'Task Assistance':
        return 'help-buoy';
      case 'Expiring Messages':
        return 'timer';
      case 'OTP Management':
        return 'shield-checkmark';
      case 'Offers Hub':
        return 'pricetag';
      case 'Priority Messages':
        return 'flag';
      case 'Export Data':
        return 'download';
      case 'Security Settings':
        return 'lock-closed';
      case 'Logout':
        return 'log-out';
      default:
        return 'options';
    }
  };

  const getOptionStyle = (option: string) => {
    if (option === 'Logout') {
      return styles.menuOptionLogout;
    }
    return styles.menuOption;
  };

  const getTextStyle = (option: string) => {
    if (option === 'Logout') {
      return styles.menuOptionTextLogout;
    }
    return styles.menuOptionText;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Search Bar */}
        <Animated.View style={[styles.searchContainer, { width: searchWidth }]}>
          {/* Search Icon */}
          <View style={styles.searchIcon}>
            <Ionicons 
              name="search" 
              size={20} 
              color={isFocused ? "#6366F1" : "#94A3B8"} 
            />
          </View>

          {/* Search Input */}
          <TextInput
            ref={inputRef}
            placeholder="Search categories..."
            placeholderTextColor="#94A3B8"
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.searchInput}
            returnKeyType="search"
            clearButtonMode="never"
          />

          {/* Three-dot menu icon (shows when no text) OR Clear button (shows when text exists) */}
          {value.length > 0 ? (
            <Pressable onPress={handleClear} style={styles.clearButton}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </Pressable>
          ) : (
            <Pressable 
              ref={menuButtonRef}
              onPress={handleMenuPress} 
              style={styles.menuButton}
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#94A3B8" />
            </Pressable>
          )}
        </Animated.View>

        {/* Profile Button */}
        <Pressable 
          onPress={onProfilePress} 
          hitSlop={10} 
          style={styles.profileButtonContainer}
        >
          <View style={styles.profileButton}>
            <Ionicons name="grid" size={20} color="#6366F1" />
          </View>
        </Pressable>

        {/* Cancel Button - Shows when focused or has text */}
        {(isFocused || value.length > 0) && (
          <Animated.View 
            style={[
              styles.cancelButtonContainer,
              {
                opacity: searchAnim,
                transform: [{ scale: searchAnim }]
              }
            ]}
          >
            <Pressable onPress={handleCancel} style={styles.cancelButton}>
              <Ionicons name="close" size={20} color="#6366F1" />
            </Pressable>
          </Animated.View>
        )}

        {/* Menu Popup Modal - Positioned near the three-dot icon */}
        <Modal
          visible={isMenuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsMenuVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsMenuVisible(false)}
          >
            <View 
              style={[
                styles.menuContainer,
                {
                  position: 'absolute',
                  top: menuPosition.y,
                  right: width - menuPosition.x - 200, // Position to the left of the button
                }
              ]}
            >
              {/* Small triangle pointer */}
              <View style={styles.menuPointer} />
              
              {menuOptions.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    getOptionStyle(option),
                    index < menuOptions.length - 1 && styles.menuOptionBorder
                  ]}
                  onPress={() => handleMenuOptionPress(option)}
                >
                  <Ionicons 
                    name={getIconName(option)} 
                    size={18} 
                    color={option === 'Logout' ? '#EF4444' : '#6366F1'} 
                    style={styles.menuIcon}
                  />
                  <Text style={getTextStyle(option)}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingTop: 8,
    marginTop:10,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    minHeight: 44,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
    padding: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    paddingVertical: 4,
    paddingHorizontal: 4,
    fontFamily: 'System',
    fontWeight: '400',
  },
  clearButton: {
    padding: 4,
    marginLeft: 4,
  },
  menuButton: {
    padding: 4,
    marginLeft: 4,
  },
  profileButtonContainer: {
    padding: 6,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cancelButtonContainer: {
    marginLeft: 8,
  },
  cancelButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
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
    marginRight: 16,
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
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  menuOptionLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FEF2F2', // Light red background for logout
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
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  menuOptionTextLogout: {
    fontSize: 14,
    color: '#EF4444', // Red color for logout text
    fontWeight: '600',
  },
});

export default CustomSearchHeader;