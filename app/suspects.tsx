import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Search, Upload, User, Phone, Mail, Calendar, MapPin } from 'lucide-react-native';

// Sample suspects data
const suspects = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@example.com',
    source: 'Website',
    date: '2025-01-15',
    status: 'New',
  },
  {
    id: '2',
    name: 'Emily Johnson',
    phone: '+1 (555) 987-6543',
    email: 'emily.j@example.com',
    source: 'Referral',
    date: '2025-01-14',
    status: 'Contacted',
  },
  {
    id: '3',
    name: 'Michael Brown',
    phone: '+1 (555) 456-7890',
    email: 'michael.b@example.com',
    source: 'Social Media',
    date: '2025-01-13',
    status: 'New',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    phone: '+1 (555) 789-0123',
    email: 'sarah.w@example.com',
    source: 'Property Portal',
    date: '2025-01-12',
    status: 'Contacted',
  },
  {
    id: '5',
    name: 'David Lee',
    phone: '+1 (555) 234-5678',
    email: 'david.l@example.com',
    source: 'Walk-in',
    date: '2025-01-11',
    status: 'New',
  },
];

export default function SuspectsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newSuspect, setNewSuspect] = useState({
    name: '',
    phone: '',
    email: '',
    source: 'Website',
    notes: ''
  });
  
  const filteredSuspects = suspects.filter(suspect => 
    suspect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suspect.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suspect.phone.includes(searchQuery)
  );

  const renderSuspect = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.suspectItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <View style={styles.suspectAvatar}>
        <User size={24} color="#005b52" />
      </View>
      <View style={styles.suspectContent}>
        <Text style={[styles.suspectName, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.name}
        </Text>
        <Text style={[styles.suspectDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
          {item.phone}
        </Text>
        <Text style={[styles.suspectDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
          {item.email}
        </Text>
        <View style={styles.suspectFooter}>
          <Text style={[styles.suspectSource, { color: isDark ? '#AAAAAA' : '#888888' }]}>
            Source: {item.source}
          </Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: item.status === 'New' ? '#005b52' : '#FFA000' }
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
          Suspects
        </Text>
        <TouchableOpacity onPress={() => setShowUploadSection(!showUploadSection)}>
          <Upload size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      {showUploadSection && (
        <View style={[styles.uploadSection, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.uploadTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Upload Lead Data
          </Text>
          <View style={styles.uploadButtons}>
            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: '#005b52' }]}>
              <Text style={styles.uploadButtonText}>Upload CSV</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: '#005b52' }]}>
              <Text style={styles.uploadButtonText}>Upload Excel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {showForm && (
        <ScrollView style={[styles.formContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Add New Suspect
          </Text>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Full Name</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter full name"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              value={newSuspect.name}
              onChangeText={(text) => setNewSuspect({...newSuspect, name: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Phone Number</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter phone number"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              keyboardType="phone-pad"
              value={newSuspect.phone}
              onChangeText={(text) => setNewSuspect({...newSuspect, phone: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Email Address</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter email address"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              keyboardType="email-address"
              value={newSuspect.email}
              onChangeText={(text) => setNewSuspect({...newSuspect, email: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Lead Source</Text>
            <View style={styles.sourceSelector}>
              {['Website', 'Referral', 'Social Media', 'Property Portal', 'Walk-in'].map((source) => (
                <TouchableOpacity
                  key={source}
                  style={[
                    styles.sourceOption,
                    newSuspect.source === source && { backgroundColor: '#005b52' }
                  ]}
                  onPress={() => setNewSuspect({...newSuspect, source})}
                >
                  <Text 
                    style={[
                      styles.sourceOptionText,
                      { color: newSuspect.source === source ? '#FFFFFF' : (isDark ? '#CCCCCC' : '#666666') }
                    ]}
                  >
                    {source}
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
              placeholder="Enter additional notes"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              multiline
              numberOfLines={4}
              value={newSuspect.notes}
              onChangeText={(text) => setNewSuspect({...newSuspect, notes: text})}
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
                // In a real app, you would save the suspect to a database
                setShowForm(false);
                // Reset form
                setNewSuspect({
                  name: '',
                  phone: '',
                  email: '',
                  source: 'Website',
                  notes: ''
                });
              }}
            >
              <Text style={styles.submitButtonText}>Add Suspect</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      
      <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <Search size={20} color={isDark ? '#CCCCCC' : '#666666'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#333333' }]}
          placeholder="Search suspects..."
          placeholderTextColor={isDark ? '#999999' : '#888888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredSuspects}
        renderItem={renderSuspect}
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
  uploadSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  suspectItem: {
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
  suspectAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  suspectContent: {
    flex: 1,
  },
  suspectName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  suspectDetail: {
    fontSize: 14,
    marginBottom: 2,
  },
  suspectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  suspectSource: {
    fontSize: 12,
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
  sourceSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sourceOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  sourceOptionText: {
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