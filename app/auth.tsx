import { useState, useEffect } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Fingerprint, User, Users, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

// Mock user data - in a real app, this would come from a backend
const MOCK_USERS = {
  employees: [
    { email: 'employee@moneytree.com', password: 'password123' },
    { email: 'admin@moneytree.com', password: 'admin123' }
  ],
  customers: [
    { email: 'customer@example.com', password: 'customer123' },
    { email: 'client@example.com', password: 'client123' }
  ]
};

export default function AuthScreen() {
  const [userType, setUserType] = useState<'employee' | 'customer' | null>(null);
  const [authMethod, setAuthMethod] = useState<'biometric' | 'credentials'>('biometric');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkBiometricAvailability();
    checkPreviousLogin();
  }, []);

  const checkBiometricAvailability = async () => {
    if (Platform.OS === 'web') {
      setIsBiometricAvailable(false);
      return;
    }

    const available = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setIsBiometricAvailable(available && enrolled);
  };

  const checkPreviousLogin = async () => {
    try {
      const savedUserType = await SecureStore.getItemAsync('userType');
      const savedEmail = await SecureStore.getItemAsync('userEmail');
      
      if (savedUserType && savedEmail) {
        setUserType(savedUserType as 'employee' | 'customer');
        setEmail(savedEmail);
      }
    } catch (error) {
      console.log('Error retrieving saved login:', error);
    }
  };

  const handleBiometricAuth = async () => {
    if (Platform.OS === 'web') {
      // Web doesn't support biometric auth, so just navigate
      saveLoginInfo();
      router.replace('/(tabs)');
      return;
    }

    try {
      setIsLoading(true);
      const results = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue',
        fallbackLabel: 'Use passcode',
      });

      if (results.success) {
        saveLoginInfo();
        router.replace('/(tabs)');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsLogin = () => {
    setIsLoading(true);
    setError('');

    // Simulate API call with timeout
    setTimeout(() => {
      const users = userType === 'employee' ? MOCK_USERS.employees : MOCK_USERS.customers;
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        saveLoginInfo();
        router.replace('/(tabs)');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const saveLoginInfo = async () => {
    try {
      await SecureStore.setItemAsync('userType', userType);
      await SecureStore.setItemAsync('userEmail', email);
      await SecureStore.setItemAsync('isLoggedIn', 'true');
    } catch (error) {
      console.log('Error saving login info:', error);
    }
  };

  const renderUserTypeSelection = () => (
    <View style={styles.userTypeContainer}>
      <Text style={[styles.title, { fontFamily: 'Inter-Bold' }]}>Select User Type</Text>
      
      <Pressable 
        style={[styles.userTypeButton, { backgroundColor: '#005b52' }]} 
        onPress={() => setUserType('employee')}
      >
        <Users color="#FFFFFF" size={24} />
        <Text style={[styles.buttonText, { fontFamily: 'Inter-Medium', color: '#FFFFFF' }]}>Employee</Text>
      </Pressable>
      
      <Pressable 
        style={[styles.userTypeButton, { backgroundColor: '#005b52' }]}
        onPress={() => setUserType('customer')}
      >
        <User color="#FFFFFF" size={24} />
        <Text style={[styles.buttonText, { fontFamily: 'Inter-Medium', color: '#FFFFFF' }]}>Customer</Text>
      </Pressable>
    </View>
  );

  const renderAuthMethodSelection = () => (
    <View style={styles.authContainer}>
      <Text style={[styles.title, { fontFamily: 'Inter-Bold', color: '#005b52' }]}>
        Login as {userType === 'employee' ? 'Employee' : 'Customer'}
      </Text>
      
      {isBiometricAvailable && (
        <Pressable 
          style={[styles.authButton, { backgroundColor: '#005b52' }]}
          onPress={handleBiometricAuth}
          disabled={isLoading}
        >
          <Fingerprint color="#FFFFFF" size={24} />
          <Text style={[styles.authButtonText, { fontFamily: 'Inter-Medium' }]}>Login with Face ID</Text>
        </Pressable>
      )}
      
      <Pressable 
        style={[styles.authButton, { backgroundColor: '#005b52' }]}
        onPress={() => setAuthMethod('credentials')}
        disabled={isLoading}
      >
        <Mail color="#FFFFFF" size={24} />
        <Text style={[styles.authButtonText, { fontFamily: 'Inter-Medium' }]}>Login with Email</Text>
      </Pressable>
      
      <Pressable 
        style={styles.backButton}
        onPress={() => setUserType(null)}
        disabled={isLoading}
      >
        <Text style={[styles.backButtonText, { fontFamily: 'Inter-Regular', color: '#005b52' }]}>Back</Text>
      </Pressable>
    </View>
  );

  const renderCredentialsLogin = () => (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.credentialsContainer}>
        <Text style={[styles.title, { fontFamily: 'Inter-Bold', color: '#005b52' }]}>
          {userType === 'employee' ? 'Employee Login' : 'Customer Login'}
        </Text>
        
        {error ? <Text style={[styles.errorText, { fontFamily: 'Inter-Regular' }]}>{error}</Text> : null}
        
        <View style={styles.inputContainer}>
          <Mail color="#005b52" size={20} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { fontFamily: 'Inter-Regular' }]}
            placeholder="Email Address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Lock color="#005b52" size={20} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { fontFamily: 'Inter-Regular' }]}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff color="#999" size={20} />
            ) : (
              <Eye color="#999" size={20} />
            )}
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={[styles.forgotPasswordText, { fontFamily: 'Inter-Regular', color: '#005b52' }]}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.disabledButton, { backgroundColor: '#005b52' }]}
          onPress={handleCredentialsLogin}
          disabled={isLoading || !email || !password}
        >
          <Text style={[styles.loginButtonText, { fontFamily: 'Inter-Bold' }]}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
        
        {isBiometricAvailable && (
          <TouchableOpacity 
            style={styles.biometricOption}
            onPress={() => setAuthMethod('biometric')}
            disabled={isLoading}
          >
            <Fingerprint color="#005b52" size={20} />
            <Text style={[styles.biometricText, { fontFamily: 'Inter-Regular', color: '#005b52' }]}>Use Face ID Instead</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setAuthMethod('biometric')}
          disabled={isLoading}
        >
          <Text style={[styles.backButtonText, { fontFamily: 'Inter-Regular', color: '#005b52' }]}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://moneytreerealty.com/assets/img/logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {!userType ? (
        renderUserTypeSelection()
      ) : authMethod === 'biometric' ? (
        renderAuthMethodSelection()
      ) : (
        renderCredentialsLogin()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    width: '70%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  userTypeContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#005b52',
  },
  userTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  authContainer: {
    width: '100%',
    alignItems: 'center',
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    marginBottom: 15,
  },
  authButtonText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#FFFFFF',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
  },
  credentialsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  biometricOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  biometricText: {
    fontSize: 16,
    marginLeft: 10,
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 15,
    textAlign: 'center',
    width: '80%',
  },
});