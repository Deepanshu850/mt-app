import { FlatList, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Bell, BellOff } from 'lucide-react-native';

// Sample notification data
const notifications = [
  {
    id: '1',
    title: 'New Lead Assigned',
    message: 'A new lead has been assigned to you. Check the suspects section.',
    time: '10 min ago',
    read: false,
  },
  {
    id: '2',
    title: 'Meeting Reminder',
    message: 'You have a meeting with John Doe tomorrow at 10:00 AM.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Payment of $5,000 has been received from client Sarah Johnson.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    title: 'New Marketing Material',
    message: 'New marketing materials have been added to the gallery.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    title: 'Team Meeting',
    message: 'Weekly team meeting scheduled for Friday at 2:00 PM.',
    time: '2 days ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const renderNotification = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' },
        !item.read && styles.unreadNotification
      ]}
    >
      <View style={styles.notificationIcon}>
        <Bell size={24} color="#005b52" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.title}
        </Text>
        <Text style={[styles.notificationMessage, { color: isDark ? '#CCCCCC' : '#666666' }]}>
          {item.message}
        </Text>
        <Text style={[styles.notificationTime, { color: isDark ? '#999999' : '#888888' }]}>
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <BellOff size={60} color="#005b52" />
          <Text style={[styles.emptyText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            No notifications yet
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#005b52',
  },
  notificationIcon: {
    marginRight: 16,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
  },
});