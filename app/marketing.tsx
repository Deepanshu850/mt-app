import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, Image } from 'react-native';
import { router } from 'expo-router';
import { 
  ArrowLeft, Filter, Share2, Heart, MessageCircle, 
  Facebook, Instagram, Twitter, Linkedin, Youtube, Plus
} from 'lucide-react-native';

// Sample marketing posts data
const marketingPosts = [
  {
    id: '1',
    title: 'New Listing: Lakeside Villa',
    content: 'Discover luxury living with this stunning 4-bedroom villa overlooking the lake. Perfect for families seeking space and tranquility.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    platform: 'Facebook',
    date: '2025-01-15',
    likes: 45,
    comments: 12,
    shares: 8
  },
  {
    id: '2',
    title: 'Downtown Living at its Finest',
    content: 'Modern 2-bedroom apartment in the heart of downtown. Walking distance to restaurants, shops, and entertainment.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    platform: 'Instagram',
    date: '2025-01-14',
    likes: 78,
    comments: 23,
    shares: 15
  },
  {
    id: '3',
    title: 'Join Our Team!',
    content: 'Money Tree Realty is hiring experienced real estate agents. Join our growing team and take your career to the next level!',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    platform: 'LinkedIn',
    date: '2025-01-13',
    likes: 32,
    comments: 8,
    shares: 10
  },
  {
    id: '4',
    title: 'Market Update: January 2025',
    content: "The latest trends in the real estate market. Find out what is happening with property values in your neighborhood.",
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    platform: 'Twitter',
    date: '2025-01-12',
    likes: 28,
    comments: 6,
    shares: 14
  },
  {
    id: '5',
    title: 'Virtual Tour: Luxury Penthouse',
    content: 'Take a virtual tour of our newest luxury penthouse listing. Panoramic city views and premium amenities await!',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    platform: 'YouTube',
    date: '2025-01-11',
    likes: 112,
    comments: 34,
    shares: 27
  },
  {
    id: '6',
    title: 'Home Staging Tips',
    content: 'Prepare your home for a quick sale with these professional staging tips from our expert team.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    platform: 'Facebook',
    date: '2025-01-10',
    likes: 56,
    comments: 19,
    shares: 12
  }
];

export default function MarketingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeFilter, setActiveFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    platform: 'Facebook',
    image: ''
  });
  
  const filteredPosts = marketingPosts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'facebook') return post.platform === 'Facebook';
    if (activeFilter === 'instagram') return post.platform === 'Instagram';
    if (activeFilter === 'twitter') return post.platform === 'Twitter';
    if (activeFilter === 'linkedin') return post.platform === 'LinkedIn';
    if (activeFilter === 'youtube') return post.platform === 'YouTube';
    
    return true;
  });

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'Facebook':
        return <Facebook size={16} color="#1877F2" />;
      case 'Instagram':
        return <Instagram size={16} color="#E1306C" />;
      case 'Twitter':
        return <Twitter size={16} color="#1DA1F2" />;
      case 'LinkedIn':
        return <Linkedin size={16} color="#0A66C2" />;
      case 'YouTube':
        return <Youtube size={16} color="#FF0000" />;
      default:
        return null;
    }
  };

  const renderMarketingPost = ({ item }) => (
    <View 
      style={[
        styles.postItem, 
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
    >
      <View style={styles.postHeader}>
        <View style={styles.platformContainer}>
          {getPlatformIcon(item.platform)}
          <Text style={[styles.platformText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.platform}
          </Text>
        </View>
        <Text style={[styles.postDate, { color: isDark ? '#AAAAAA' : '#888888' }]}>
          {item.date}
        </Text>
      </View>
      
      <Image 
        source={{ uri: item.image }} 
        style={styles.postImage}
        resizeMode="cover"
      />
      
      <View style={styles.postContent}>
        <Text style={[styles.postTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {item.title}
        </Text>
        <Text style={[styles.postText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
          {item.content}
        </Text>
      </View>
      
      <View style={styles.postStats}>
        <View style={styles.postStat}>
          <Heart size={16} color={isDark ? '#CCCCCC' : '#666666'} />
          <Text style={[styles.postStatText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.likes}
          </Text>
        </View>
        
        <View style={styles.postStat}>
          <MessageCircle size={16} color={isDark ? '#CCCCCC' : '#666666'} />
          <Text style={[styles.postStatText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.comments}
          </Text>
        </View>
        
        <View style={styles.postStat}>
          <Share2 size={16} color={isDark ? '#CCCCCC' : '#666666'} />
          <Text style={[styles.postStatText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
            {item.shares}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.shareButton, { backgroundColor: '#005b52' }]}
      >
        <Share2 size={16} color="#FFFFFF" />
        <Text style={styles.shareButtonText}>Share Again</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
      <View style={[styles.header, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#005b52" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Marketing
        </Text>
        <TouchableOpacity>
          <Filter size={24} color="#005b52" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.filterContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <ScrollableFilter 
          options={[
            { id: 'all', label: 'All Platforms' },
            { id: 'facebook', label: 'Facebook' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'twitter', label: 'Twitter' },
            { id: 'linkedin', label: 'LinkedIn' },
            { id: 'youtube', label: 'YouTube' }
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isDark={isDark}
        />
      </View>
      
      {showForm && (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            Create New Marketing Post
          </Text>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Title</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter post title"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              value={newPost.title}
              onChangeText={(text) => setNewPost({...newPost, title: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Content</Text>
            <TextInput
              style={[
                styles.formTextarea,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter post content"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              multiline
              numberOfLines={4}
              value={newPost.content}
              onChangeText={(text) => setNewPost({...newPost, content: text})}
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Platform</Text>
            <View style={styles.platformSelector}>
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map((platform) => (
                <TouchableOpacity
                  key={platform}
                  style={[
                    styles.platformOption,
                    newPost.platform === platform && { backgroundColor: '#005b52' }
                  ]}
                  onPress={() => setNewPost({...newPost, platform})}
                >
                  {getPlatformIcon(platform)}
                  <Text 
                    style={[
                      styles.platformOptionText,
                      { color: newPost.platform === platform ? '#FFFFFF' : (isDark ? '#CCCCCC' : '#666666') }
                    ]}
                  >
                    {platform}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.formField}>
            <Text style={[styles.formLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Image URL</Text>
            <TextInput
              style={[
                styles.formInput,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              placeholder="Enter image URL"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
              value={newPost.image}
              onChangeText={(text) => setNewPost({...newPost, image: text})}
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
                // In a real app, you would save the post to a database
                setShowForm(false);
                // Reset form
                setNewPost({
                  title: '',
                  content: '',
                  platform: 'Facebook',
                  image: ''
                });
              }}
            >
              <Text style={styles.formButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <FlatList
        data={filteredPosts}
        renderItem={renderMarketingPost}
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

function ScrollableFilter({ options, activeFilter, onFilterChange, isDark }) {
  return (
    <FlatList
      data={options}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.filterOption,
            activeFilter === item.id && [styles.activeFilterOption, { backgroundColor: '#005b52' }]
          ]}
          onPress={() => onFilterChange(item.id)}
        >
          <Text
            style={[
              styles.filterOptionText,
              { color: isDark ? '#CCCCCC' : '#666666' },
              activeFilter === item.id && { color: '#FFFFFF' }
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginLeft: 12,
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
  postItem: {
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformText: {
    fontSize: 14,
    marginLeft: 6,
  },
  postDate: {
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postContent: {
    padding: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postText: {
    fontSize: 14,
    lineHeight: 20,
  },
  postStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 12,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  postStatText: {
    fontSize: 14,
    marginLeft: 4,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
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
  formContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
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
  platformSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  platformOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  platformOptionText: {
    fontSize: 14,
    marginLeft: 4,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#FFFFFF',
  },
});