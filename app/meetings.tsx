import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Filter, Calendar, Clock, User, Plus, MapPin } from 'lucide-react-native';

// Sample meetings data
const meetings = [
  {
    id: '1',
    title: 'Property Viewing - Lakeside Villa',
    client: 'Robert Johnson',
    date: '2025-01-25',
    time: '10:30 AM',
    location: '123 Lakeside Dr, Lakeview',
    status: 'Scheduled',
    type: 'Viewing'
  },
  {
    id: '2',
    title: 'Contract Discussion',
    client: 'Jennifer Williams',
    date: '2025-01-26',
    time: '2:45 PM',
    location: 'Money Tree Office',
    status: 'Scheduled',
    type: 'Discussion'
  },
  {
    id: '3',
    title: 'Initial Consultation',
    client: 'Thomas Anderson',
    date: '2025-01-27',
    time: '11:15 AM',
    location: 'Money Tree Office',
    status: 'Scheduled',
    type: 'Consultation'
  },
  {
    id: '4',
    title: 'Mortgage Discussion',
    client: 'Lisa Martinez',
    date: '2025-01-28',
    time: '4:00 PM',
    location: 'Money Tree Office',
    status: 'Scheduled',
    type: 'Consultation'
  },
  {
    id: '5',
    title: 'Property Viewing - Luxury Penthouse',
    client: 'Kevin Clark',
    date: '2025-01-29',
    time: '1:00 PM',
    location: '789 Skyline Ave, Downtown',
    status: 'Scheduled',
    type: 'Viewing'
  },
  {
    id: '6',
    title: 'Property Viewing - Garden Townhouse',
    client: 'Sarah Wilson',
    date: '2025-01-22',
    time: '3:00 PM',
    location: '321 Garden Ln, Greenville',
    status: 'Completed',
    type: 'Viewing'
  },
  {
    id: '7',
    title: 'Contract Signing',
    client: 'Michael Brown',
    date: '2025-01-23',
    time: '11:30 AM',
    location: 'Money Tree Office',
    status: 'Completed',
    type: 'Signing'
  },
  {
    id: '8',
    title: 'Property Viewing - Downtown Apartment',
    client: 'Emily Johnson',
    date: '2025-01-20',
    time: '10:00 AM',
    location: '555 Main St, Downtown',
    status: 'Cancelled',
    type: 'Viewing'
  }
];

export default function MeetingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showForm, setShowForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    client: '',
    date: '',
    time: '',
    location: '',
    type: 'Viewing',
    notes: ''
  });
  
  const filteredMeetings = meetings.filter(meeting => {
    if (activeTab === 'scheduled') return meeting.status === 'Scheduled';
    if (activeTab === 'completed') return meeting.status === 'Completed';
    if (activeTab === 'cancelled') return meeting.status === 'Cancelled';
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled':
        return '#005b52';
      case 'Completed':
        return '#00796B';
      case 'Cancelled':
        return '#D32F2F';
      default:
        return '#005b52';
    }
  };

  const renderMeeting = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.meetingItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <View style={[styles.meetingTypeIndicator, { backgroundColor: getStatusColor(item.status) }]} />
      <View style={styles.meetingContent}>
        <Text style={[styles.meetingTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.title}
        </Text>
        
        <View style={styles.meetingDetailRow}>
          <User size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.meetingDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.client}
          </Text>
        </View>
        
        <View style={styles.meetingDetailRow}>
          <Calendar size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.meetingDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.date}
          </Text>
          <Clock size={14} color={isDark ? '#AAAAAA' : '#666666'} style={{ marginLeft: 12 }} />
          <Text style={[styles.meetingDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.time}
          </Text>
        </View>
        
        <View style={styles.meetingDetailRow}>
          <MapPin size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.meetingDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.location}
          </Text>
        </View>
        
        <View style={styles.meetingFooter}>
          <View style={[
            styles.meetingTypeBadge, 
            { backgroundColor: isDark ? '#333333' : '#E0F2F1' }
          ]}>
            <Text style={[styles.meetingTypeText, { color: isDark ? '#FFFFFF' : '#005b52' }]}>
              {item.type}
            </Text>
          </View>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Meetings
        </Text>
        <TouchableOpacity>
          <Filter size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      {showForm && (
        <ScrollView style={[styles.formContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Schedule New Meeting
          </Text>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Meeting Title</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter meeting title"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              value={newMeeting.title}
              onChangeText={(text) => setNewMeeting({...newMeeting, title: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Client Name</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter client name"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              value={newMeeting.client}
              onChangeText={(text) => setNewMeeting({...newMeeting, client: text})}
            />
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formField, { flex: 1, marginRight: 8 }]}>
              <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Date</Text>
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={isDark ? '#999999' : '#888888'}
                value={newMeeting.date}
                onChangeText={(text) => setNewMeeting({...newMeeting, date: text})}
              />
            </View>
            
            <View style={[styles.formField, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Time</Text>
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                placeholder="HH:MM AM/PM"
                placeholderTextColor={isDark ? '#999999' : '#888888'}
                value={newMeeting.time}
                onChangeText={(text) => setNewMeeting({...newMeeting, time: text})}
              />
            </View>
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Location</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter meeting location"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              value={newMeeting.location}
              onChangeText={(text) => setNewMeeting({...newMeeting, location: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Meeting Type</Text>
            <View style={styles.typeSelector}>
              {['Viewing', 'Discussion', 'Consultation', 'Signing', 'Walkthrough'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeOption,
                    newMeeting.type === type && { backgroundColor: '#005b52' }
                  ]}
                  onPress={() => setNewMeeting({...newMeeting, type})}
                >
                  <Text 
                    style={[
                      styles.typeOptionText,
                      { color: newMeeting.type === type ? '#FFFFFF' : (isDark ? '#CCCCCC' : '#666666') }
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Notes</Text>
            <TextInput
              style={[
                styles.formTextarea,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter meeting notes"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              multiline
              numberOfLines={4}
              value={newMeeting.notes}
              onChangeText={(text) => setNewMeeting({...newMeeting, notes: text})}
            />
          </View>
          
          <View style={styles.formButtons}>
            <TouchableOpacity 
              style={[styles.formButton, styles.cancelButton, { backgroundColor: isDark ? '#333333' : '#EEEEEE' }]}
              onPress={() => setShowForm(false)}
            >
              <Text style={[styles.formButtonText, { color: isDark ? '#FFFFFF' : '#333333' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.formButton, styles.submitButton, { backgroundColor: '#005b52' }]}
              onPress={() => {
                // In a real app, you would save the meeting to a database
                setShowForm(false);
                // Reset form
                setNewMeeting({
                  title: '',
                  client: '',
                  date: '',
                  time: '',
                  location: '',
                  type: 'Viewing',
                  notes: ''
                });
              }}
            >
              <Text style={styles.submitButtonText}>Schedule Meeting</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      
      <View style={[styles.tabContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'scheduled' && [styles.activeTab, { borderColor: '#005b52' }]
          ]}
          onPress={() => setActiveTab('scheduled')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'scheduled' && [styles.activeTabText, { color: '#005b52' }],
              { color: isDark ? '#CCCCCC' : '#666666' }
            ]}
          >
            Scheduled
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'completed' && [styles.activeTab, { borderColor: '#005b52' }]
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'completed' && [styles.activeTabText, { color: '#005b52' }],
              { color: isDark ? '#CCCCCC' : '#666666' }
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'cancelled' && [styles.activeTab, { borderColor: '#005b52' }]
          ]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'cancelled' && [styles.activeTabText, { color: '#005b52' }],
              { color: isDark ? '#CCCCCC' : '#666666' }
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredMeetings}
        renderItem={renderMeeting}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setShowForm(!showForm)}
      >
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
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  meetingItem: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  meetingTypeIndicator: {
    width: 6,
  },
  meetingContent: {
    flex: 1,
    padding: 16,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meetingDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  meetingDetail: {
    fontSize: 14,
    marginLeft: 8,
  },
  meetingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  meetingTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  meetingTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
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
  },
  formContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    maxHeight: 400,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  formInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  formTextarea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  typeOptionText: {
    fontSize: 14,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  formButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 8,
  },
  submitButton: {
    marginLeft: 8,
  },
  formButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});