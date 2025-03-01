import { useState, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, useColorScheme, Alert, Modal } from 'react-native';
import { router } from 'expo-router';
import { 
  User, Settings, Moon, LogOut, Lock, ChevronRight, Mail, Phone, 
  Home, Edit2, Save, X, Eye, EyeOff, Camera, Upload
} from 'lucide-react-native';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [darkMode, setDarkMode] = useState(isDark);
  const [userType, setUserType] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  // Edit profile state
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Change password state
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const storedUserType = await SecureStore.getItemAsync('userType');
        const storedEmail = await SecureStore.getItemAsync('userEmail');
        
        setUserType(storedUserType);
        setUserEmail(storedEmail);
        
        // Set initial profile data
        setFullName(storedUserType === 'employee' ? 'John Doe' : 'Sarah Johnson');
        setEmail(storedEmail || 'user@example.com');
        setPhone('+1 (555) 123-4567');
        setAddress('123 Main St, Anytown, USA');
      } catch (error) {
        console.log('Error retrieving user info:', error);
      }
    };
    
    getUserInfo();
  }, []);
  
  // This would actually toggle the system theme in a real app
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would update the system theme here
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
  
  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to a backend
    Alert.alert(
      "Success",
      "Profile updated successfully!",
      [{ text: "OK", onPress: () => setEditProfileVisible(false) }]
    );
  };
  
  const handleChangePassword = () => {
    // Validate passwords
    if (!currentPassword) {
      Alert.alert("Error", "Please enter your current password");
      return;
    }
    
    if (!newPassword) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }
    
    // In a real app, you would verify the current password and update to the new password
    Alert.alert(
      "Success",
      "Password changed successfully!",
      [{ 
        text: "OK", 
        onPress: () => {
          setChangePasswordVisible(false);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } 
      }]
    );
  };

  const renderEditProfileModal = () => (
    <Modal
      visible={editProfileVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setEditProfileVisible(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              Edit Profile
            </Text>
            <TouchableOpacity onPress={() => setEditProfileVisible(false)}>
              <X size={24} color={isDark ? '#FFFFFF' : '#333333'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileImageEdit}>
            <View style={styles.profileImageContainer}>
              <User size={60} color="#005b52" />
            </View>
            <View style={styles.imageEditButtons}>
              <TouchableOpacity style={[styles.imageEditButton, { backgroundColor: isDark ? '#333333' : '#E0F2F1' }]}>
                <Camera size={20} color="#005b52" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.imageEditButton, { backgroundColor: isDark ? '#333333' : '#E0F2F1' }]}>
                <Upload size={20} color="#005b52" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor={isDark ? '#999999' : '#888888'}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Phone</Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor={isDark ? '#999999' : '#888888'}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Address</Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#333333' : '#F5F5F5',
                  color: isDark ? '#FFFFFF' : '#333333',
                  borderColor: isDark ? '#444444' : '#DDDDDD'
                }
              ]}
              value={address}
              onChangeText={setAddress}
              placeholderTextColor={isDark ? '#999999' : '#888888'}
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: '#005b52' }]}
            onPress={handleSaveProfile}
          >
            <Save size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
  
  const renderChangePasswordModal = () => (
    <Modal
      visible={changePasswordVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setChangePasswordVisible(false)}
    >
      <View style={[styles.modalContainer, { backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#333333' }]}>
              Change Password
            </Text>
            <TouchableOpacity onPress={() => setChangePasswordVisible(false)}>
              <X size={24} color={isDark ? '#FFFFFF' : '#333333'} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Current Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                placeholderTextColor={isDark ? '#999999' : '#888888'}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff size={20} color={isDark ? '#CCCCCC' : '#666666'} />
                ) : (
                  <Eye size={20} color={isDark ? '#CCCCCC' : '#666666'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>New Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholderTextColor={isDark ? '#999999' : '#888888'}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff size={20} color={isDark ? '#CCCCCC' : '#666666'} />
                ) : (
                  <Eye size={20} color={isDark ? '#CCCCCC' : '#666666'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#CCCCCC' : '#666666' }]}>Confirm New Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  { 
                    backgroundColor: isDark ? '#333333' : '#F5F5F5',
                    color: isDark ? '#FFFFFF' : '#333333',
                    borderColor: isDark ? '#444444' : '#DDDDDD'
                  }
                ]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor={isDark ? '#999999' : '#888888'}
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color={isDark ? '#CCCCCC' : '#666666'} />
                ) : (
                  <Eye size={20} color={isDark ? '#CCCCCC' : '#666666'} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: '#005b52' }]}
            onPress={handleChangePassword}
          >
            <Lock size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => setEditProfileVisible(true)}
        >
          <View style={styles.settingLeft}>
            <Edit2 size={20} color="#005b52" />
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
        
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={() => setChangePasswordVisible(true)}
        >
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
      
      {renderEditProfileModal()}
      {renderChangePasswordModal()}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImageEdit: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageEditButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageEditButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 0,
  },
  eyeIcon: {
    padding: 12,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});