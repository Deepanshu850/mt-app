import { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, useColorScheme, Alert } from 'react-native';
import { router } from 'expo-router';
import { User, Settings, Moon, LogOut, Lock, ChevronRight, Mail, Phone, Chrome as Home } from 'lucide-react-native';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [darkMode, setDarkMode] = useState(isDark);
  const [userType, setUserType] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUserType = await SecureStore.getItemAsync('userType');
        const storedEmail = await SecureStore.getItemAsync('userEmail');
        
        setUserType(storedUserType);
        setUserEmail(storedEmail);
      } catch (error) {
        console.log('Error retrieving user info:', error);
      }
    };
    
    getUserInfo();
  }, []);
  
  // This would actually toggle the system theme in a real app
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              // Clear login status
              await SecureStore.deleteItemAsync('isLoggedIn');
              router.replace('/auth');
            } catch (error) {
              console.log('Error during logout:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.profileHeader, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <View style={styles.profileImageContainer}>
          <User size={60} color="#005b52" />
        </View>
        <Text style={[styles.profileName, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          {userType === 'employee' ? 'John Doe' : 'Sarah Johnson'}
        </Text>
        <Text style={[styles.profileRole, { color: isDark ? '#CCCCCC' : '#666666' }]}>
          {userType === 'employee' ? 'Senior Sales Executive' : 'Valued Customer'}
        </Text>
        <Text style={[styles.profileEmail, { color: isDark ? '#AAAAAA' : '#888888' }]}>
          {userEmail || 'user@example.com'}
        </Text>
      </View>
      
      <View style={styles.sectionTitle}>
        <User size={20} color="#005b52" />
        <Text style={[styles.sectionTitleText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Personal Information
        </Text>
      </View>
      
      <View style={[styles.infoContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <View style={styles.infoItem}>
          <View style={styles.infoLeft}>
            <Mail size={20} color="#005b52" />
            <Text style={[styles.infoLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              Email:
            </Text>
          </View>
          <Text style={[styles.infoValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            {userEmail || 'user@example.com'}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoLeft}>
            <Phone size={20} color="#005b52" />
            <Text style={[styles.infoLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              Phone:
            </Text>
          </View>
          <Text style={[styles.infoValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            +1 (555) 123-4567
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoLeft}>
            <Home size={20} color="#005b52" />
            <Text style={[styles.infoLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>
              Address:
            </Text>
          </View>
          <Text style={[styles.infoValue, { color: isDark ? '#FFFFFF' : '#333333' }]}>
            123 Main St, Anytown, USA
          </Text>
        </View>
      </View>
      
      <View style={styles.sectionTitle}>
        <Settings size={20} color="#005b52" />
        <Text style={[styles.sectionTitleText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
          Settings
        </Text>
      </View>
      
      <View style={[styles.settingsContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <User size={20} color="#005b52" />
            <Text style={[styles.settingText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              Edit Profile
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? '#CCCCCC' : '#666666'} />
        </TouchableOpacity>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Moon size={20} color="#005b52" />
            <Text style={[styles.settingText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              Dark Mode
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#D9D9D9', true: '#80CBC4' }}
            thumbColor={darkMode ? '#005b52' : '#F5F5F5'}
            onValueChange={toggleDarkMode}
            value={darkMode}
          />
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Lock size={20} color="#005b52" />
            <Text style={[styles.settingText, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              Change Password
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? '#CCCCCC' : '#666666'} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: '#005b52' }]}
        onPress={handleLogout}
      >
        <LogOut size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Image
          source={{ uri: 'https://moneytreerealty.com/assets/img/logo.png' }}
          style={styles.footerLogo}
          resizeMode="contain"
        />
        <Text style={[styles.footerText, { color: isDark ? '#CCCCCC' : '#666666' }]}>
          Money Tree Realty © 2025
        </Text>
        <Text style={[styles.versionText, { color: isDark ? '#999999' : '#888888' }]}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 14,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingsContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 30,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerLogo: {
    width: 150,
    height: 50,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
  },
});