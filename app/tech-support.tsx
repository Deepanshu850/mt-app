import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MessageSquare, Send, Clock, Check, X, CircleAlert as AlertCircle, User, Plus, Paperclip } from 'lucide-react-native';

// Sample support tickets data
const supportTickets = [
  {
    id: '1',
    title: 'Login Issues',
    description: 'I am unable to log in to the mobile app. It keeps showing an error message.',
    status: 'Open',
    priority: 'High',
    created: '2025-01-15',
    lastUpdated: '2025-01-15',
    messages: [
      {
        id: '1-1',
        sender: 'John Smith',
        isAgent: false,
        message: 'I am unable to log in to the mobile app. It keeps showing an error message saying "Authentication failed".',
        time: '10:30 AM',
        date: '2025-01-15'
      },
      {
        id: '1-2',
        sender: 'Tech Support',
        isAgent: true,
        message: 'Hello John, I\'m sorry you\'re experiencing issues. Could you please tell me what device and operating system you\'re using?',
        time: '11:15 AM',
        date: '2025-01-15'
      },
      {
        id: '1-3',
        sender: 'John Smith',
        isAgent: false,
        message: 'I\'m using an iPhone 14 with the latest iOS version.',
        time: '11:30 AM',
        date: '2025-01-15'
      }
    ]
  },
  {
    id: '2',
    title: 'App Crashing',
    description: 'The app crashes when I try to upload property photos.',
    status: 'In Progress',
    priority: 'Medium',
    created: '2025-01-14',
    lastUpdated: '2025-01-15',
    messages: [
      {
        id: '2-1',
        sender: 'Sarah Johnson',
        isAgent: false,
        message: 'The app crashes every time I try to upload property photos. This is happening since yesterday.',
        time: '2:45 PM',
        date: '2025-01-14'
      },
      {
        id: '2-2',
        sender: 'Tech Support',
        isAgent: true,
        message: 'Hi Sarah, I\'m sorry for the inconvenience. Could you please tell me how many photos you\'re trying to upload at once?',
        time: '3:30 PM',
        date: '2025-01-14'
      },
      {
        id: '2-3',
        sender: 'Sarah Johnson',
        isAgent: false,
        message: 'I was trying to upload about 15 photos at once.',
        time: '4:00 PM',
        date: '2025-01-14'
      },
      {
        id: '2-4',
        sender: 'Tech Support',
        isAgent: true,
        message: 'Thank you for the information. We\'ve identified the issue. There\'s a limit of 10 photos per upload. Could you try uploading them in smaller batches?',
        time: '9:15 AM',
        date: '2025-01-15'
      }
    ]
  },
  {
    id: '3',
    title: 'Feature Request',
    description: 'Would like to have a dark mode option in the app.',
    status: 'Open',
    priority: 'Low',
    created: '2025-01-13',
    lastUpdated: '2025-01-13',
    messages: [
      {
        id: '3-1',
        sender: 'Michael Brown',
        isAgent: false,
        message: 'I would like to request a dark mode option for the app. It would be easier on the eyes when using the app at night.',
        time: '11:15 AM',
        date: '2025-01-13'
      }
    ]
  },
  {
    id: '4',
    title: 'Data Sync Issue',
    description: 'My client data is not syncing between devices.',
    status: 'Resolved',
    priority: 'High',
    created: '2025-01-12',
    lastUpdated: '2025-01-13',
    messages: [
      {
        id: '4-1',
        sender: 'Emily Wilson',
        isAgent: false,
        message: 'My client data is not syncing between my phone and tablet. I updated some information on my phone but it\'s not showing up on my tablet.',
        time: '4:20 PM',
        date: '2025-01-12'
      },
      {
        id: '4-2',
        sender: 'Tech Support',
        isAgent: true,
        message: 'Hello Emily, I\'m sorry you\'re experiencing this issue. Could you please try logging out and back in on both devices?',
        time: '5:00 PM',
        date: '2025-01-12'
      },
      {
        id: '4-3',
        sender: 'Emily Wilson',
        isAgent: false,
        message: 'I tried that but it didn\'t work.',
        time: '5:15 PM',
        date: '2025-01-12'
      },
      {
        id: '4-4',
        sender: 'Tech Support',
        isAgent: true,
        message: 'Thank you for trying. We\'ve identified a sync issue on our servers. Our team is working on it and it should be resolved within a few hours.',
        time: '5:30 PM',
        date: '2025-01-12'
      },
      {
        id: '4-5',
        sender: 'Tech Support',
        isAgent: true,
        message: 'The sync issue has been resolved. Please check if your data is now syncing correctly between your devices.',
        time: '9:00 AM',
        date: '2025-01-13'
      },
      {
        id: '4-6',
        sender: 'Emily Wilson',
        isAgent: false,
        message: 'Yes, it\'s working now. Thank you!',
        time: '9:30 AM',
        date: '2025-01-13'
      }
    ]
  }
];

export default function TechSupportScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTicket, setActiveTicket] = useState(null);
  const [message, setMessage] = useState('');
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Open':
        return '#FFA000';
      case 'In Progress':
        return '#2196F3';
      case 'Resolved':
        return '#00796B';
      default:
        return '#005b52';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Open':
        return <AlertCircle size={14} color="#FFFFFF" />;
      case 'In Progress':
        return <Clock size={14} color="#FFFFFF" />;
      case 'Resolved':
        return <Check size={14} color="#FFFFFF" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High':
        return '#D32F2F';
      case 'Medium':
        return '#FFA000';
      case 'Low':
        return '#00796B';
      default:
        return '#005b52';
    }
  };

  const renderTicketItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.ticketItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
      onPress={() => setActiveTicket(item)}
    >
      <View style={styles.ticketHeader}>
        <Text style={[styles.ticketTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.title}
        </Text>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          {getStatusIcon(item.status)}
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text 
        style={[styles.ticketDescription, { color: isDark ? '#CCCCCC' : '#666666' }]}
        numberOfLines={2}
      >
        {item.description}
      </Text>
      
      <View style={styles.ticketFooter}>
        <View style={[
          styles.priorityBadge, 
          { backgroundColor: getPriorityColor(item.priority) }
        ]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
        
        <View style={styles.ticketInfo}>
          <Clock size={14} color={isDark ? '#AAAAAA' : '#888888'} />
          <Text style={[styles.ticketDate, { color: isDark ? '#AAAAAA' : '#888888' }]}>
            {item.lastUpdated}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderChatMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isAgent ? styles.agentMessage : styles.userMessage
    ]}>
      <View style={styles.messageSender}>
        <Text style={[
          styles.senderName, 
          { color: isDark ? '#AAAAAA' : '#888888' }
        ]}>
          {item.sender}
        </Text>
        <Text style={[
          styles.messageTime, 
          { color: isDark ? '#AAAAAA' : '#888888' }
        ]}>
          {item.time} • {item.date}
        </Text>
      </View>
      <View style={[
        styles.messageBubble,
        item.isAgent ? 
          [styles.agentBubble, { backgroundColor: isDark ? '#333333' : '#E5E5E5' }] : 
          [styles.userBubble, { backgroundColor: '#005b52' }]
      ]}>
        <Text style={[
          styles.messageText,
          { color: item.isAgent ? (isDark ? '#FFFFFF' : '#333333') : '#FFFFFF' }
        ]}>
          {item.message}
        </Text>
      </View>
    </View>
  );

  if (activeTicket) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
        <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <TouchableOpacity onPress={() => setActiveTicket(null)}>
            <ArrowLeft size={24} color="#005b52" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              {activeTicket.title}
            </Text>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: getStatusColor(activeTicket.status) }
            ]}>
              {getStatusIcon(activeTicket.status)}
              <Text style={styles.statusText}>{activeTicket.status}</Text>
            </View>
          </View>
          <View style={{ width: 24 }} />
        </View>
        
        <FlatList
          data={activeTicket.messages}
          renderItem={renderChatMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContainer}
        />
        
        <View style={[styles.inputContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color={isDark ? '#CCCCCC' : '#666666'} />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDark ? '#333333' : '#F0F0F0',
                color: isDark ? '#FFFFFF' : '#333333'
              }
            ]}
            placeholder="Type a message..."
            placeholderTextColor={isDark ? '#999999' : '#888888'}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Tech Support
        </Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={[styles.ticketStats, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#FFA000' }]}>
            <AlertCircle size={16} color="#FFFFFF" />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>2</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>Open</Text>
          </View>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#2196F3' }]}>
            <Clock size={16} color="#FFFFFF" />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>1</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>In Progress</Text>
          </View>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.statIcon, { backgroundColor: '#00796B' }]}>
            <Check size={16} color="#FFFFFF" />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>1</Text>
            <Text style={[styles.statLabel, { color: isDark ? '#AAAAAA' : '#888888' }]}>Resolved</Text>
          </View>
        </View>
      </View>
      
      <FlatList
        data={supportTickets}
        renderItem={renderTicketItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statContent: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  listContainer: {
    padding: 16,
  },
  ticketItem: {
    borderRadius: 10,
    marginBottom: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  ticketDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ticketInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketDate: {
    fontSize: 12,
    marginLeft: 4,
  },
  chatContainer: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  agentMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  messageSender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 12,
  },
  messageTime: {
    fontSize: 10,
    marginLeft: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  agentBubble: {
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#005b52',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#005b52',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});