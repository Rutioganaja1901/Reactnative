// components/ReminderItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { ChipStatus, Reminder } from '@/app/types/types';
import { COLORS, GRADIENTS, TYPE_CHIPS } from '@/constants/constants';


interface ReminderItemProps {
  reminder: Reminder;
}

const ReminderItem: React.FC<ReminderItemProps> = ({ reminder }) => {
  const getStatusConfig = (status: ChipStatus) => {
    switch (status) {
      case 'Pending':
        return { color: COLORS.warning, bgColor: '#FEF3C7', icon: 'time' as const };
      case 'Completed':
        return { color: COLORS.success, bgColor: '#D1FAE5', icon: 'checkmark-circle' as const };
      case 'Overdue':
        return { color: COLORS.error, bgColor: '#FEE2E2', icon: 'alert-circle' as const };
      default:
        return { color: COLORS.textTertiary, bgColor: COLORS.border, icon: 'help-circle' as const };
    }
  };

  const statusConfig = getStatusConfig(reminder.status);
  const typeConfig = TYPE_CHIPS.find(t => t.name === reminder.type);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring' }}
      style={listStyles.card}
    >
      <View style={listStyles.cardContent}>
        <View style={listStyles.cardMain}>
          <LinearGradient
            colors={typeConfig?.gradient || GRADIENTS.primary}
            style={listStyles.typeIndicator}
          >
            <Ionicons name={typeConfig?.icon || 'help'} size={16} color="#fff" />
          </LinearGradient>
          
          <View style={listStyles.textContent}>
            <Text style={listStyles.cardTitle}>{reminder.title}</Text>
            
            <View style={listStyles.metaContainer}>
              <View style={[listStyles.statusTag, { backgroundColor: statusConfig.bgColor }]}>
                <Ionicons name={statusConfig.icon} size={12} color={statusConfig.color} />
                <Text style={[listStyles.statusText, { color: statusConfig.color }]}>
                  {reminder.status}
                </Text>
              </View>
              
              <View style={listStyles.timeContainer}>
                <Ionicons name="time-outline" size={12} color={COLORS.textTertiary} />
                <Text style={listStyles.timeText}>{reminder.time}</Text>
              </View>
              
              <View style={listStyles.dateContainer}>
                <Ionicons name="calendar-outline" size={12} color={COLORS.textTertiary} />
                <Text style={listStyles.dateText}>{reminder.date}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={listStyles.actionButton}>
          <Ionicons 
            name={reminder.status === 'Completed' ? 'checkmark-circle' : 'ellipse-outline'} 
            size={24} 
            color={reminder.status === 'Completed' ? COLORS.success : COLORS.border} 
          />
        </TouchableOpacity>
      </View>
    </MotiView>
  );
};

const listStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginBottom: 12,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
  },
  cardMain: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  typeIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
    lineHeight: 22,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginLeft: 4,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionButton: {
    padding: 6,
    marginLeft: 10,
  },
});

export default ReminderItem;