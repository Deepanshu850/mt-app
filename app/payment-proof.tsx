import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, useColorScheme, Image } from 'react-native';
import { router } from 'expo-router';
import { 
  ArrowLeft, Filter, Calendar, Clock, User, DollarSign, 
  Camera, Upload, Plus, Check, X, Eye
} from 'lucide-react-native';

// Sample payment proof data
const payments = [
  {
    id: '1',
    client: 'Robert Johnson',
    property: 'Lakeside Villa',
    amount: '$25,000',
    type: 'Down Payment',
    date: '2025-01-15',
    time: '10:30 AM',
    status: 'Verified',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    client: 'Jennifer Williams',
    property: 'Downtown Apartment',
    amount: '$15,000',
    type: 'Earnest Money',
    date: '2025-01-14',
    time: '2:45 PM',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    client: 'Thomas Anderson',
    property: 'Suburban House',
    amount: '$20,000',
    type: 'Down Payment',
    date: '2025-01-13',
    time: '11:15 AM',
    status: 'Verified',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    client: 'Lisa Martinez',
    property: 'Garden Townhouse',
    amount: '$10,000',
    type: 'Earnest Money',
    date: '2025-01-12',
    time: '4:20 PM',
    status: 'Rejected',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    client: 'Kevin Clark',
    property: 'Luxury Penthouse',
    amount: '$50,000',
    type: 'Down Payment',
    date: '2025-01-11',
    time: '1:30 PM',
    status: 'Verified',
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
];

export default function PaymentProofScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeFilter, setActiveFilter] = useState('all');
  const [showUploadSection, setShowUploadSection] = useState(false);
  
  const filteredPayments = payments.filter(payment => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'verified') return payment.status === 'Verified';
    if (activeFilter === 'pending') return payment.status === 'Pending';
    if (activeFilter === 'rejected') return payment.status === 'Rejected';
    
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Verified':
        return '#00796B';
      case 'Pending':
        return '#FFA000';
      case 'Rejected':
        return '#D32F2F';
      default:
        return '#005b52';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Verified':
        return <Check size={14} color="#FFFFFF" />;
      case 'Pending':
        return <Clock size={14} color="#FFFFFF" />;
      case 'Rejected':
        return <X size={14} color="#FFFFFF" />;
      default:
        return null;
    }
  };

  const renderPayment = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.paymentItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <View style={styles.paymentHeader}>
        <View style={styles.paymentClient}>
          <User size={16} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.paymentClientText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            {item.client}
          </Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          {getStatusIcon(item.status)}
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.paymentImageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.paymentImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.viewButton}>
          <Eye size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.paymentDetails}>
        <View style={styles.paymentDetail}>
          <DollarSign size={16} color="#005b52" />
          <Text style={[styles.paymentDetailText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            {item.amount} - {item.type}
          </Text>
        </View>
        
        <View style={styles.paymentDetail}>
          <Calendar size={16} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.paymentDetailText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.date}
          </Text>
        </View>
        
        <View style={styles.paymentDetail}>
          <Clock size={16} color={isDark ? '#AAAAAA' : '#666666'} />
          <Text style={[styles.paymentDetailText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.time}
          </Text>
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
          Payment Proof
        </Text>
        <TouchableOpacity onPress={() => setShowUploadSection(!showUploadSection)}>
          <Upload size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      {showUploadSection && (
        <View style={[styles.uploadSection, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.uploadTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Upload Payment Proof
          </Text>
          <View style={styles.uploadButtons}>
            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: '#005b52' }]}>
              <Camera size={20} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: '#005b52' }]}>
              <Upload size={20} color="#FFFFFF" />
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <ScrollableFilter 
          options={[
            { id: 'all', label: 'All' },
            { id: 'verified', label: 'Verified' },
            { id: 'pending', label: 'Pending' },
            { id: 'rejected', label: 'Rejected' }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isDark={isDark}
        />
      </View>
      
      <FlatList
        data={filteredPayments}
        renderItem={renderPayment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <Plus size={24} color="#FFFFFF" />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
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
  paymentItem: {
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  paymentClient: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentClientText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  paymentImageContainer: {
    position: 'relative',
  },
  paymentImage: {
    width: '100%',
    height: 180,
  },
  viewButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(0, 91, 82, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentDetails: {
    padding: 12,
  },
  paymentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentDetailText: {
    fontSize: 14,
    marginLeft: 8,
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