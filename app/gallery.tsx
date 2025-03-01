import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, useColorScheme, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Filter, Download, Share2, Plus, Image as ImageIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const imageWidth = (width - 48) / 2; // 2 columns with padding

// Sample gallery data
const galleryImages = [
  {
    id: '1',
    title: 'Lakeside Villa Exterior',
    category: 'Properties',
    date: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    title: 'Downtown Apartment Interior',
    category: 'Properties',
    date: '2025-01-14',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    title: 'Team Building Event',
    category: 'Events',
    date: '2025-01-13',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    title: 'Garden Townhouse',
    category: 'Properties',
    date: '2025-01-12',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    title: 'Annual Awards Ceremony',
    category: 'Events',
    date: '2025-01-11',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    title: 'Luxury Penthouse View',
    category: 'Properties',
    date: '2025-01-10',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '7',
    title: 'Office Opening',
    category: 'Events',
    date: '2025-01-09',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '8',
    title: 'Marketing Brochure',
    category: 'Marketing',
    date: '2025-01-08',
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '9',
    title: 'Company Logo',
    category: 'Marketing',
    date: '2025-01-07',
    image: 'https://moneytreerealty.com/assets/img/logo.png'
  },
  {
    id: '10',
    title: 'Social Media Banner',
    category: 'Marketing',
    date: '2025-01-06',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
];

export default function GalleryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const filteredImages = galleryImages.filter(image => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'properties') return image.category === 'Properties';
    if (activeFilter === 'events') return image.category === 'Events';
    if (activeFilter === 'marketing') return image.category === 'Marketing';
    
    return true;
  });

  const renderGalleryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.galleryItem}
      onPress={() => setSelectedImage(item)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.galleryImage}
        resizeMode="cover"
      />
      <View style={[
        styles.galleryOverlay, 
        { backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)' }
      ]}>
        <Text style={styles.galleryTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.galleryCategory}>
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderImageViewer = () => {
    if (!selectedImage) return null;
    
    return (
      <View style={[styles.imageViewerContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.8)' }]}>
        <View style={styles.imageViewerHeader}>
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.imageViewerTitle}>{selectedImage.title}</Text>
          <View style={styles.imageViewerActions}>
            <TouchableOpacity style={styles.imageViewerAction}>
              <Download size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageViewerAction}>
              <Share2 size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.imageViewerContent}>
          <Image 
            source={{ uri: selectedImage.image }} 
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.imageViewerFooter}>
          <Text style={styles.imageViewerInfo}>
            {selectedImage.category} • {selectedImage.date}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Gallery
        </Text>
        <TouchableOpacity>
          <Filter size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <ScrollableFilter 
          options={[
            { id: 'all', label: 'All' },
            { id: 'properties', label: 'Properties' },
            { id: 'events', label: 'Events' },
            { id: 'marketing', label: 'Marketing' }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isDark={isDark}
        />
      </View>
      
      <FlatList
        data={filteredImages}
        renderItem={renderGalleryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.galleryContainer}
        numColumns={2}
        columnWrapperStyle={styles.galleryRow}
      />
      
      <TouchableOpacity style={styles.addButton}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      {renderImageViewer()}
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
  galleryContainer: {
    padding: 16,
  },
  galleryRow: {
    justifyContent: 'space-between',
  },
  galleryItem: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  galleryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  galleryTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  galleryCategory: {
    color: '#DDDDDD',
    fontSize: 12,
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
  imageViewerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'space-between',
  },
  imageViewerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  imageViewerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  imageViewerActions: {
    flexDirection: 'row',
  },
  imageViewerAction: {
    marginLeft: 16,
  },
  imageViewerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '80%',
  },
  imageViewerFooter: {
    padding: 16,
    alignItems: 'center',
  },
  imageViewerInfo: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});