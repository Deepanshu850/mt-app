import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { 
  ArrowLeft, Search, Filter, FileText, Download, Share2, 
  Calendar, Clock, User, Plus, File, FilePlus2
} from 'lucide-react-native';

// Sample documents data
const documents = [
  {
    id: '1',
    title: 'Purchase Agreement - Lakeside Villa',
    type: 'Contract',
    client: 'Robert Johnson',
    date: '2025-01-15',
    time: '10:30 AM',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: '2',
    title: 'Property Disclosure - Downtown Apartment',
    type: 'Disclosure',
    client: 'Jennifer Williams',
    date: '2025-01-14',
    time: '2:45 PM',
    size: '1.8 MB',
    format: 'PDF'
  },
  {
    id: '3',
    title: 'Inspection Report - Suburban House',
    type: 'Report',
    client: 'Thomas Anderson',
    date: '2025-01-13',
    time: '11:15 AM',
    size: '3.2 MB',
    format: 'PDF'
  },
  {
    id: '4',
    title: 'Mortgage Pre-Approval - Garden Townhouse',
    type: 'Financial',
    client: 'Lisa Martinez',
    date: '2025-01-12',
    time: '4:20 PM',
    size: '1.1 MB',
    format: 'PDF'
  },
  {
    id: '5',
    title: 'Closing Documents - Luxury Penthouse',
    type: 'Contract',
    client: 'Kevin Clark',
    date: '2025-01-11',
    time: '1:30 PM',
    size: '4.5 MB',
    format: 'PDF'
  },
  {
    id: '6',
    title: 'Listing Agreement - Countryside Cottage',
    type: 'Contract',
    client: 'Sarah Wilson',
    date: '2025-01-10',
    time: '9:45 AM',
    size: '1.9 MB',
    format: 'PDF'
  },
];

export default function DocumentsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredDocuments = documents.filter(document => {
    const matchesSearch = 
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.type.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'contract') return matchesSearch && document.type === 'Contract';
    if (activeFilter === 'disclosure') return matchesSearch && document.type === 'Disclosure';
    if (activeFilter === 'report') return matchesSearch && document.type === 'Report';
    if (activeFilter === 'financial') return matchesSearch && document.type === 'Financial';
    
    return matchesSearch;
  });

  const getDocumentTypeColor = (type) => {
    switch(type) {
      case 'Contract':
        return '#005b52';
      case 'Disclosure':
        return '#FFA000';
      case 'Report':
        return '#7B1FA2';
      case 'Financial':
        return '#1976D2';
      default:
        return '#005b52';
    }
  };

  const renderDocument = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.documentItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <View style={[
        styles.documentIcon, 
        { backgroundColor: isDark ? '#333333' : '#E0F2F1' }
      ]}>
        <FileText size={24} color={getDocumentTypeColor(item.type)} />
      </View>
      <View style={styles.documentContent}>
        <Text style={[styles.documentTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.title}
        </Text>
        
        <View style={styles.documentDetailRow}>
          <User size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.documentDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.client}
          </Text>
        </View>
        
        <View style={styles.documentDetailRow}>
          <Calendar size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.documentDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.date}
          </Text>
          <Clock size={14} color={isDark ? '#AAAAAA' : '#666666'} style={{ marginLeft: 12 }} />
          <Text style={[styles.documentDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.time}
          </Text>
        </View>
        
        <View style={styles.documentFooter}>
          <View style={[
            styles.documentTypeBadge, 
            { backgroundColor: getDocumentTypeColor(item.type) }
          ]}>
            <Text style={styles. documentTypeBadgeText}>{item.type}</Text>
          </View>
          <Text style={[styles.documentFormat, { color: isDark ? '#AAAAAA' : '#888888' }]}>
            {item.format} • {item.size}
          </Text>
        </View>
      </View>
      <View style={styles.documentActions}>
        <TouchableOpacity style={styles.documentAction}>
          <Download size={20} color="#005b52" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.documentAction}>
          <Share2 size={20} color="#005b52" />
        </TouchableOpacity>
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
          Documents
        </Text>
        <TouchableOpacity>
          <Filter size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <Search size={20} color={isDark ? '#CCCCCC' : '#666666'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#333333' }]}
          placeholder="Search documents..."
          placeholderTextColor={isDark ? '#999999' : '#888888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <ScrollableFilter 
          options={[
            { id: 'all', label: 'All' },
            { id: 'contract', label: 'Contracts' },
            { id: 'disclosure', label: 'Disclosures' },
            { id: 'report', label: 'Reports' },
            { id: 'financial', label: 'Financial' }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isDark={isDark}
        />
      </View>
      
      <FlatList
        data={filteredDocuments}
        renderItem={renderDocument}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <View style={styles.fabContainer}>
        <TouchableOpacity style={[styles.fabSecondary, { backgroundColor: isDark ? '#333333' : '#E0F2F1' }]}>
          <File size={20} color="#005b52" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabPrimary}>
          <FilePlus2 size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
  documentItem: {
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
  documentIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentContent: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  documentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  documentDetail: {
    fontSize: 14,
    marginLeft: 8,
  },
  documentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  documentTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  documentTypeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  documentFormat: {
    fontSize: 12,
  },
  documentActions: {
    justifyContent: 'space-around',
    paddingLeft: 10,
  },
  documentAction: {
    padding: 8,
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fabSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  fabPrimary: {
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