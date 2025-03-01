import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, Phone, Mail, Star, MapPin, UserPlus } from 'lucide-react-native';

// Sample team members data
const teamMembers = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Senior Sales Executive',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@moneytree.com',
    location: 'Main Office',
    rating: 4.9,
    deals: 24,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    phone: '+1 (555) 987-6543',
    email: 'sarah.j@moneytree.com',
    location: 'Main Office',
    rating: 4.8,
    deals: 18,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Property Manager',
    phone: '+1 (555) 456-7890',
    email: 'michael.b@moneytree.com',
    location: 'Downtown Branch',
    rating: 4.7,
    deals: 15,
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    name: 'Emily Wilson',
    role: 'Sales Executive',
    phone: '+1 (555) 789-0123',
    email: 'emily.w@moneytree.com',
    location: 'Suburban Branch',
    rating: 4.6,
    deals: 12,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    name: 'David Lee',
    role: 'Financial Advisor',
    phone: '+1 (555) 234-5678',
    email: 'david.l@moneytree.com',
    location: 'Main Office',
    rating: 4.5,
    deals: 10,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    name: 'Jessica Martinez',
    role: 'Client Relations',
    phone: '+1 (555) 345-6789',
    email: 'jessica.m@moneytree.com',
    location: 'Downtown Branch',
    rating: 4.7,
    deals: 14,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
];

export default function MyTeamScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredTeamMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'sales') return matchesSearch && member.role.includes('Sales');
    if (activeFilter === 'marketing') return matchesSearch && member.role.includes('Marketing');
    if (activeFilter === 'management') return matchesSearch && (member.role.includes('Manager') || member.role.includes('Director'));
    
    return matchesSearch;
  });

  const renderTeamMember = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.memberItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.memberImage}
        resizeMode="cover"
      />
      <View style={styles.memberContent}>
        <Text style={[styles.memberName, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.name}
        </Text>
        <Text style={[styles.memberRole, { color: isDark ? '#AAAAAA' : '#888888' }]}>
          {item.role}
        </Text>
        
        <View style={styles.memberDetailRow}>
          <Phone size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.memberDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.phone}
          </Text>
        </View>
        
        <View style={styles.memberDetailRow}>
          <Mail size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.memberDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.email}
          </Text>
        </View>
        
        <View style={styles.memberDetailRow}>
          <MapPin size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.memberDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.location}
          </Text>
        </View>
        
        <View style={styles.memberFooter}>
          <View style={styles.memberRating}>
            <Star size={14} color="#FFC107" />
            <Text style={[styles.memberRatingText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              {item.rating}
            </Text>
          </View>
          <View style={[
            styles.memberDealsBadge, 
            { backgroundColor: '#005b52' }
          ]}>
            <Text style={styles.memberDealsText}>
              {item.deals} Deals
            </Text>
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
          My Team
        </Text>
        <TouchableOpacity>
          <Filter size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <Search size={20} color={isDark ? '#CCCCCC' : '#666666'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#333333' }]}
          placeholder="Search team members..."
          placeholderTextColor={isDark ? '#999999' : '#888888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <ScrollableFilter 
          options={[
            { id: 'all', label: 'All' },
            { id: 'sales', label: 'Sales' },
            { id: 'marketing', label: 'Marketing' },
            { id: 'management', label: 'Management' }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isDark={isDark}
        />
      </View>
      
      <FlatList
        data={filteredTeamMembers}
        renderItem={renderTeamMember}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <UserPlus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

function ScrollableFilter({ options, activeFilter, onFilterChange, isDark }) {
  return (
    <View style={styles.scrollableFilter}>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.filterOption,
            activeFilter === option.id && [styles.activeFilterOption, { backgroundColor: '#005b52' }]
          ]}
          onPress={() => onFilterChange(option.id)}
        >
          <Text
            style={[
              styles.filterOptionText,
              { color: isDark ? '#CCCCCC' : '#666666' },
              activeFilter === option.id && { color: '#FFFFFF' }
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
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
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  scrollableFilter: {
    flexDirection: 'row',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  activeFilterOption: {
    borderColor: '#005b52',
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  memberItem: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  memberImage: {
    width: 100,
    height: 'auto',
    aspectRatio: 3/4,
  },
  memberContent: {
    flex: 1,
    padding: 12,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    marginBottom: 8,
  },
  memberDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  memberDetail: {
    fontSize: 14,
    marginLeft: 8,
  },
  memberFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  memberRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberRatingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  memberDealsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  memberDealsText: {
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
});