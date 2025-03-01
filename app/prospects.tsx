import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, Search, Upload, User, Phone, Mail, Calendar, FileText, MapPin, DollarSign } from 'lucide-react-native';

// Sample prospects data
const prospects = [
  {
    id: '1',
    name: 'Robert Johnson',
    phone: '+1 (555) 111-2233',
    email: 'robert.j@example.com',
    property: 'Lakeside Villa',
    date: '2025-01-18',
    status: 'Interested',
    notes: 'Looking for a 3-bedroom property with a lake view.'
  },
  {
    id: '2',
    name: 'Jennifer Williams',
    phone: '+1 (555) 444-5566',
    email: 'jennifer.w@example.com',
    property: 'Downtown Apartment',
    date: '2025-01-17',
    status: 'Very Interested',
    notes: 'Prefers a modern style apartment in the city center.'
  },
  {
    id: '3',
    name: 'Thomas Anderson',
    phone: '+1 (555) 777-8899',
    email: 'thomas.a@example.com',
    property: 'Suburban House',
    date: '2025-01-16',
    status: 'Negotiating',
    notes: 'Interested in the property but negotiating on price.'
  },
  {
    id: '4',
    name: 'Lisa Martinez',
    phone: '+1 (555) 222-3344',
    email: 'lisa.m@example.com',
    property: 'Garden Townhouse',
    date: '2025-01-15',
    status: 'Interested',
    notes: 'Looking for a property with a garden for her children.'
  },
  {
    id: '5',
    name: 'Kevin Clark',
    phone: '+1 (555) 666-7788',
    email: 'kevin.c@example.com',
    property: 'Luxury Penthouse',
    date: '2025-01-14',
    status: 'Very Interested',
    notes: 'Has a high budget and looking for premium amenities.'
  },
];

export default function ProspectsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newProspect, setNewProspect] = useState({
    name: '',
    phone: '',
    email: '',
    property: '',
    budget: '',
    status: 'Interested',
    notes: ''
  });
  
  const filteredProspects = prospects.filter(prospect => 
    prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prospect.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prospect.phone.includes(searchQuery) ||
    prospect.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Very Interested':
        return '#00796B';
      case 'Interested':
        return '#FFA000';
      case 'Negotiating':
        return '#7B1FA2';
      default:
        return '#005b52';
    }
  };

  const renderProspect = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.prospectItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <View style={styles.prospectAvatar}>
        <User size={24} color="#005b52" />
      </View>
      <View style={styles.prospectContent}>
        <Text style={[styles.prospectName, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.name}
        </Text>
        <View style={styles.prospectDetailRow}>
          <Phone size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.prospectDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.phone}
          </Text>
        </View>
        <View style={styles.prospectDetailRow}>
          <Mail size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.prospectDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.email}
          </Text>
        </View>
        <View style={styles.prospectDetailRow}>
          <FileText size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.prospectDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.property}
          </Text>
        </View>
        <View style={styles.prospectFooter}>
          <View style={styles.prospectDateContainer}>
            <Calendar size={14} color={isDark ? '#AAAAAA' : '#666666'} />
            <Text style={[styles.prospectDate, { color: isDark ? '#AAAAAA' : '#888888' }]}>
              {item.date}
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
          Prospects
        </Text>
        <TouchableOpacity onPress={() => setShowUploadSection(!showUploadSection)}>
          <Upload size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      {showUploadSection && (
        <View style={[styles.uploadSection, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.uploadTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Upload Prospect Data
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
            Add New Prospect
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
              value={newProspect.name}
              onChangeText={(text) => setNewProspect({...newProspect, name: text})}
            />
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formField, { flex: 1, marginRight: 8 }]}>
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
                value={newProspect.phone}
                onChangeText={(text) => setNewProspect({...newProspect, phone: text})}
              />
            </View>
            
            <View style={[styles.formField, { flex: 1, marginLeft: 8 }]}>
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
                value={newProspect.email}
                onChangeText={(text) => setNewProspect({...newProspect, email: text})}
              />
            </View>
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formField, { flex: 1, marginRight: 8 }]}>
              <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Interested Property</Text>
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                placeholder="Property name"
                placeholderTextColor={isDark ? '#999999' : '#888888'}
                value={newProspect.property}
                onChangeText={(text) => setNewProspect({...newProspect, property: text})}
              />
            </View>
            
            <View style={[styles.formField, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Budget</Text>
              <TextInput
                style={[
                  styles.formInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                placeholder="e.g. $500,000"
                placeholderTextColor={isDark ? '#999999' : '#888888'}
                keyboardType="numeric"
                value={newProspect.budget}
                onChangeText={(text) => setNewProspect({...newProspect, budget: text})}
              />
            </View>
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Interest Level</Text>
            <View style={styles.statusSelector}>
              {['Interested', 'Very Interested', 'Negotiating'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusOption,
                    newProspect.status === status && { backgroundColor: getStatusColor(status) }
                  ]}
                  onPress={() => setNewProspect({...newProspect, status})}
                >
                  <Text 
                    style={[
                      styles.statusOptionText,
                      { color: newProspect.status === status ? '#FFFFFF' : (isDark ? '#CCCCCC' : '#666666') }
                    ]}
                  >
                    {status}
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
              value={newProspect.notes}
              onChangeText={(text) => setNewProspect({...newProspect, notes: text})}
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
                // In a real app, you would save the prospect to a database
                setShowForm(false);
                // Reset form
                setNewProspect({
                  name: '',
                  phone: '',
                  email: '',
                  property: '',
                  budget: '',
                  status: 'Interested',
                  notes: ''
                });
              }}
            >
              <Text style={styles.submitButtonText}>Add Prospect</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      
      <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <Search size={20} color={isDark ? '#CCCCCC' : '#666666'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#333333' }]}
          placeholder="Search prospects..."
          placeholderTextColor={isDark ? '#999999' : '#888888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredProspects}
        renderItem={renderProspect}
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
  prospectItem: {
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
  prospectAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  prospectContent: {
    flex: 1,
  },
  prospectName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  prospectDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  prospectDetail: {
    fontSize: 14,
    marginLeft: 8,
  },
  prospectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  prospectDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prospectDate: {
    fontSize: 12,
    marginLeft: 4,
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
  statusSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '500',
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