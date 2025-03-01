import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Filter, Chrome as Home, Bed, Bath, Square, Tag, MapPin } from 'lucide-react-native';

// Sample inventory data
const properties = [
  {
    id: '1',
    title: 'Lakeside Villa',
    type: 'Villa',
    address: '123 Lakeside Dr, Lakeview',
    price: '$850,000',
    bedrooms: 4,
    bathrooms: 3,
    area: '3,200 sq ft',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    title: 'Downtown Apartment',
    type: 'Apartment',
    address: '555 Main St, Downtown',
    price: '$450,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,200 sq ft',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    title: 'Suburban House',
    type: 'House',
    address: '456 Maple St, Suburbia',
    price: '$650,000',
    bedrooms: 3,
    bathrooms: 2.5,
    area: '2,400 sq ft',
    status: 'Under Contract',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    title: 'Garden Townhouse',
    type: 'Townhouse',
    address: '321 Garden Ln, Greenville',
    price: '$550,000',
    bedrooms: 3,
    bathrooms: 2,
    area: '1,800 sq ft',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    title: 'Luxury Penthouse',
    type: 'Penthouse',
    address: '789 Skyline Ave, Downtown',
    price: '$1,250,000',
    bedrooms: 3,
    bathrooms: 3.5,
    area: '2,800 sq ft',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    title: 'Countryside Cottage',
    type: 'Cottage',
    address: '987 Rural Rd, Countryside',
    price: '$375,000',
    bedrooms: 2,
    bathrooms: 1,
    area: '1,100 sq ft',
    status: 'Sold',
    image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
];

export default function InventoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'available') return matchesSearch && property.status === 'Available';
    if (activeFilter === 'under-contract') return matchesSearch && property.status === 'Under Contract';
    if (activeFilter === 'sold') return matchesSearch && property.status === 'Sold';
    
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available':
        return '#005b52';
      case 'Under Contract':
        return '#FFA000';
      case 'Sold':
        return '#D32F2F';
      default:
        return '#005b52';
    }
  };

  const renderProperty = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.propertyItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.propertyImage}
        resizeMode="cover"
      />
      <View style={[
        styles.statusBadge, 
        { backgroundColor: getStatusColor(item.status) }
      ]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
      <View style={styles.propertyContent}>
        <Text style={[styles.propertyTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.title}
        </Text>
        <Text style={[styles.propertyType, { color: isDark ? '#AAAAAA' : '#888888' }]}>
          {item.type}
        </Text>
        
        <View style={styles.propertyDetailRow}>
          <MapPin size={14} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.propertyDetail, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.address}
          </Text>
        </View>
        
        <View style={styles.propertyFeatures}>
          <View style={styles.propertyFeature}>
            <Bed size={14} color={isDark ? '#AAAAAA' : '#666666'} />
            <Text style={[styles.propertyFeatureText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              {item.bedrooms}
            </Text>
          </View>
          
          <View style={styles.propertyFeature}>
            <Bath size={14} color={isDark ? '#AAAAAA' : '#666666'} />
            <Text style={[styles.propertyFeatureText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              {item.bathrooms}
            </Text>
          </View>
          
          <View style={styles.propertyFeature}>
            <Square size={14} color={isDark ? '#AAAAAA' : '#666666'} />
            <Text style={[styles.propertyFeatureText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              {item.area}
            </Text>
          </View>
        </View>
        
        <View style={styles.propertyFooter}>
          <View style={styles.propertyPriceContainer}>
            <Tag size={14} color="#005b52" />
            <Text style={[styles.propertyPrice, { color: '#005b52' }]}>
              {item.price}
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
          Inventory
        </Text>
        <TouchableOpacity>
          <Filter size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <Search size={20} color={isDark ? '#CCCCCC' : '#666666'} />
        <TextInput
          style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#333333' }]}
          placeholder="Search properties..."
          placeholderTextColor={isDark ? '#999999' : '#888888'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <ScrollableFilter 
          options={[
            { id: 'all', label: 'All' },
            { id: 'available', label: 'Available' },
            { id: 'under-contract', label: 'Under Contract' },
            { id: 'sold', label: 'Sold' }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isDark={isDark}
        />
      </View>
      
      <FlatList
        data={filteredProperties}
        renderItem={renderProperty}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  propertyItem: {
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  propertyImage: {
    width: '100%',
    height: 180,
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  propertyContent: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  propertyType: {
    fontSize: 14,
    marginBottom: 8,
  },
  propertyDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyDetail: {
    fontSize: 14,
    marginLeft: 8,
  },
  propertyFeatures: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  propertyFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  propertyFeatureText: {
    fontSize: 14,
    marginLeft: 4,
  },
  propertyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});