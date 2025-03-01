import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { MessageSquare, Send, Users } from 'lucide-react-native';

// Sample chat data
const chatGroups = [
  {
    id: '1',
    name: 'Sales Team',
    lastMessage: 'Great job on closing that deal!',
    time: '10:30 AM',
    unread: 3,
  },
  {
    id: '2',
    name: 'Marketing Team',
    lastMessage: 'New campaign materials are ready',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    name: 'Management',
    lastMessage: 'Meeting scheduled for tomorrow',
    time: 'Yesterday',
    unread: 1,
  },
  {
    id: '4',
    name: 'Tech Support',
    lastMessage: 'Your ticket has been resolved',
    time: '2 days ago',
    unread: 0,
  },
  {
    id: '5',
    name: 'New Agents',
    lastMessage: 'Welcome to the team, everyone!',
    time: '1 week ago',
    unread: 0,
  },
];

// Sample messages for a selected chat
const sampleMessages = [
  {
    id: '1',
    text: 'Hello team! How is everyone doing today?',
    sender: 'John Doe',
    time: '10:00 AM',
    isMine: false,
  },
  {
    id: '2',
    text: 'I\'m doing great! Just closed a big deal.',
    sender: 'Me',
    time: '10:05 AM',
    isMine: true,
  },
  {
    id: '3',
    text: 'Congratulations! That\'s fantastic news.',
    sender: 'Sarah Johnson',
    time: '10:10 AM',
    isMine: false,
  },
  {
    id: '4',
    text: 'Thank you! It was a challenging one but worth it.',
    sender: 'Me',
    time: '10:15 AM',
    isMine: true,
  },
  {
    id: '5',
    text: 'Can you share some details about the deal in our next meeting?',
    sender: 'Michael Brown',
    time: '10:20 AM',
    isMine: false,
  },
];

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  
  const renderChatGroup = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.chatItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
      onPress={() => setSelectedChat(item)}
    >
      <View style={styles.chatAvatar}>
        <Users size={24} color="#005b52" />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.chatName, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            {item.name}
          </Text>
          <Text style={[styles.chatTime, { color: isDark ? '#999999' : '#888888' }]}>
            {item.time}
          </Text>
        </View>
        <Text 
          style={[styles.chatMessage, { color: isDark ? '#CCCCCC' : '#666666' }]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isMine ? styles.myMessage : styles.otherMessage
    ]}>
      {!item.isMine && (
        <Text style={[styles.messageSender, { color: isDark ? '#AAAAAA' : '#888888' }]}>
          {item.sender}
        </Text>
      )}
      <View style={[
        styles.messageBubble,
        item.isMine ? 
          [styles.myMessageBubble, { backgroundColor: '#005b52' }] : 
          [styles.otherMessageBubble, { backgroundColor: isDark ? '#333333' : '#E5E5E5' }]
      ]}>
        <Text style={[
          styles.messageText,
          { color: item.isMine ? '#FFFFFF' : (isDark ? '#FFFFFF' : '#333333') }
        ]}>
          {item.text}
        </Text>
      </View>
      <Text style={[
        styles.messageTime,
        { color: isDark ? '#999999' : '#888888' }
      ]}>
        {item.time}
      </Text>
    </View>
  );

  if (selectedChat) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
        <View style={[styles.chatHeader, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <TouchableOpacity onPress={() => setSelectedChat(null)}>
            <Text style={[styles.backButton, { color: '#005b52' }]}>Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            {selectedChat.name}
          </Text>
          <View style={{ width: 40 }} />
        </View>
        
        <FlatList
          data={sampleMessages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          inverted={false}
        />
        
        <View style={[styles.inputContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
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
      <FlatList
        data={chatGroups}
        renderItem={renderChatGroup}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  chatItem: {
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
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatTime: {
    fontSize: 12,
  },
  chatMessage: {
    fontSize: 14,
  },
  unreadBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#005b52',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  backButton: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontSize: 12,
    marginBottom: 4,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  myMessageBubble: {
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#005b52',
    justifyContent: 'center',
    alignItems: 'center',
  },
});